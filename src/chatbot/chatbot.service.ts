import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage, MessageRole } from './entities/chat-message.entity';
import { ChatSession } from './entities/chat-session.entity';
import { DocumentType } from './entities/document-embedding.entity';
import { EmbeddingService } from './embedding.service';
import { VectorStoreService } from './vector-store.service';
import { LLMService, LLMMessage } from './llm.service';
import { SendMessageDto, CreateSessionDto, LLMProvider } from './dto/chatbot.dto';
import { CoursesService } from '../courses/courses.service';

export interface ChatResponse {
  message: ChatMessage;
  session: ChatSession;
  sources?: Array<{
    content: string;
    score: number;
    lessonId?: number;
  }>;
}

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);

  constructor(
    @InjectRepository(ChatMessage)
    private readonly messageRepository: Repository<ChatMessage>,
    @InjectRepository(ChatSession)
    private readonly sessionRepository: Repository<ChatSession>,
    private readonly embeddingService: EmbeddingService,
    private readonly vectorStore: VectorStoreService,
    private readonly llmService: LLMService,
    private readonly coursesService: CoursesService,
  ) {}

  /**
   * Create a new chat session (supports both authenticated and anonymous users)
   */
  async createSession(
    userId: number | null,
    clientId: string,
    dto: CreateSessionDto,
  ): Promise<ChatSession> {
    const session = this.sessionRepository.create({
      userId: userId || undefined,
      clientId: userId ? undefined : clientId, // Only use clientId for anonymous users
      courseId: dto.courseId,
      title: dto.title || 'New Chat',
      context: {
        courseId: dto.courseId,
        systemPrompt: dto.systemPrompt,
      },
    });

    return this.sessionRepository.save(session);
  }

  /**
   * Get user's chat sessions (supports both authenticated and anonymous users)
   */
  async getUserSessions(
    userId: number | null,
    clientId: string,
    courseId?: number,
  ): Promise<ChatSession[]> {
    const queryBuilder = this.sessionRepository
      .createQueryBuilder('session')
      .orderBy('session.updatedAt', 'DESC');

    // Filter by userId for authenticated users, clientId for anonymous
    if (userId) {
      queryBuilder.where('session.userId = :userId', { userId });
    } else if (clientId) {
      queryBuilder.where('session.clientId = :clientId', { clientId });
    } else {
      return []; // No identifier provided
    }

    if (courseId) {
      queryBuilder.andWhere('session.courseId = :courseId', { courseId });
    }

    return queryBuilder.getMany();
  }

  /**
   * Get session with messages (supports both authenticated and anonymous users)
   */
  async getSession(sessionId: string, userId: number | null, clientId: string): Promise<ChatSession> {
    let session: ChatSession | null = null;

    if (userId) {
      session = await this.sessionRepository.findOne({
        where: { id: sessionId, userId },
        relations: ['messages'],
      });
    } else if (clientId) {
      session = await this.sessionRepository.findOne({
        where: { id: sessionId, clientId },
        relations: ['messages'],
      });
    }

    if (!session) {
      throw new NotFoundException('Chat session not found');
    }

    // Sort messages by creation date
    session.messages = session.messages.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );

    return session;
  }

  /**
   * Send a message and get AI response (supports both authenticated and anonymous users)
   */
  async sendMessage(
    userId: number | null,
    clientId: string,
    dto: SendMessageDto,
  ): Promise<ChatResponse> {
    let session: ChatSession;

    // Get or create session
    if (dto.sessionId) {
      session = await this.getSession(dto.sessionId, userId, clientId);
    } else {
      session = await this.createSession(userId, clientId, {
        courseId: dto.courseId,
        title: dto.message.slice(0, 50) + (dto.message.length > 50 ? '...' : ''),
      });
    }

    // Save user message
    const userMessage = this.messageRepository.create({
      content: dto.message,
      role: MessageRole.USER,
      sessionId: session.id,
      userId: userId || undefined,
      clientId: userId ? undefined : clientId,
      metadata: {
        courseId: dto.courseId || session.courseId,
        lessonId: dto.lessonId,
      },
    });
    await this.messageRepository.save(userMessage);

    // Retrieve relevant context using RAG
    const searchResults = await this.vectorStore.search(dto.message, {
      courseId: dto.courseId || session.courseId,
      lessonId: dto.lessonId,
      limit: 5,
      minScore: 0.65,
    });

    // Build context from search results
    const contextParts = searchResults.map(
      (result, index) =>
        `[Source ${index + 1}]: ${result.content}`,
    );
    const context = contextParts.join('\n\n');

    // Get course and lesson info for better context
    let courseTitle: string | undefined;
    let lessonTitle: string | undefined;

    if (session.courseId) {
      try {
        const course = await this.coursesService.findOne(session.courseId);
        courseTitle = course.title;

        if (dto.lessonId) {
          const lesson = await this.coursesService.getLessonByIdInternal(
            session.courseId,
            dto.lessonId,
          );
          lessonTitle = lesson?.title;
        }
      } catch (error) {
        this.logger.warn(`Could not fetch course info: ${error.message}`);
      }
    }

    // Build messages for LLM
    const systemPrompt = this.llmService.buildRAGSystemPrompt(
      context || 'No specific course context available.',
      courseTitle,
      lessonTitle,
    );

    // Get conversation history (last 10 messages)
    const history = await this.messageRepository.find({
      where: { sessionId: session.id },
      order: { createdAt: 'DESC' },
      take: 10,
    });

    const llmMessages: LLMMessage[] = [
      { role: 'system', content: systemPrompt },
      ...history.reverse().map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    // Get AI response
    const llmResponse = await this.llmService.chat(llmMessages, {
      provider: dto.provider || LLMProvider.OPENAI,
      temperature: 0.7,
      maxTokens: 2048,
    });

    // Save assistant message
    const assistantMessage = this.messageRepository.create({
      content: llmResponse.content,
      role: MessageRole.ASSISTANT,
      sessionId: session.id,
      userId: userId || undefined,
      clientId: userId ? undefined : clientId,
      metadata: {
        courseId: dto.courseId || session.courseId,
        lessonId: dto.lessonId,
        sources: searchResults.map((r) => r.id),
        tokens: llmResponse.tokens.total,
        model: llmResponse.model,
      },
    });
    await this.messageRepository.save(assistantMessage);

    // Update session counts directly without reloading with relations
    await this.sessionRepository.update(session.id, {
      messageCount: session.messageCount + 2,
      totalTokens: session.totalTokens + llmResponse.tokens.total,
      updatedAt: new Date(),
    });

    // Refresh session data
    const updatedSession = await this.sessionRepository.findOne({
      where: { id: session.id },
    });

    return {
      message: assistantMessage,
      session: updatedSession,
      sources: searchResults.map((r) => ({
        content: r.content.slice(0, 200) + '...',
        score: r.score,
        lessonId: r.lessonId,
      })),
    };
  }

  /**
   * Index course content for RAG
   */
  async indexCourse(
    courseId: number,
    chunkSize: number = 1000,
    chunkOverlap: number = 200,
  ): Promise<{ indexed: number; chunks: number }> {
    const course = await this.coursesService.findOne(courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Delete existing embeddings for this course
    await this.vectorStore.deleteCoursEmbeddings(courseId);

    const documents: Array<{
      content: string;
      documentType: DocumentType;
      metadata: any;
      courseId: number;
      lessonId?: number;
    }> = [];

    // Index course description
    if (course.description) {
      const descChunks = this.embeddingService.splitTextIntoChunks(
        course.description,
        chunkSize,
        chunkOverlap,
      );

      descChunks.forEach((chunk, index) => {
        documents.push({
          content: chunk,
          documentType: DocumentType.COURSE_DESCRIPTION,
          metadata: {
            title: course.title,
            chunkIndex: index,
            totalChunks: descChunks.length,
          },
          courseId,
        });
      });
    }

    // Index lessons
    const lessons = await this.coursesService.getLessonsInternal(courseId);

    for (const lesson of lessons) {
      if (lesson.content) {
        const lessonChunks = this.embeddingService.splitTextIntoChunks(
          `Lesson: ${lesson.title}\n\n${lesson.content}`,
          chunkSize,
          chunkOverlap,
        );

        lessonChunks.forEach((chunk, index) => {
          documents.push({
            content: chunk,
            documentType: DocumentType.LESSON_CONTENT,
            metadata: {
              title: lesson.title,
              lessonOrder: lesson.order,
              chunkIndex: index,
              totalChunks: lessonChunks.length,
            },
            courseId,
            lessonId: lesson.id,
          });
        });
      }
    }

    // Store all documents
    if (documents.length > 0) {
      await this.vectorStore.storeDocuments(documents);
    }

    this.logger.log(
      `Indexed course ${courseId}: ${documents.length} chunks from ${lessons.length + 1} sources`,
    );

    return {
      indexed: lessons.length + 1,
      chunks: documents.length,
    };
  }

  /**
   * Delete a chat session (supports both authenticated and anonymous users)
   */
  async deleteSession(sessionId: string, userId: number | null, clientId: string): Promise<void> {
    let session: ChatSession | null = null;

    if (userId) {
      session = await this.sessionRepository.findOne({
        where: { id: sessionId, userId },
      });
    } else if (clientId) {
      session = await this.sessionRepository.findOne({
        where: { id: sessionId, clientId },
      });
    }

    if (!session) {
      throw new NotFoundException('Chat session not found');
    }

    await this.sessionRepository.remove(session);
  }

  /**
   * Get chatbot stats for a user (supports both authenticated and anonymous users)
   */
  async getUserStats(userId: number | null, clientId: string): Promise<{
    totalSessions: number;
    totalMessages: number;
    totalTokens: number;
  }> {
    let sessions: ChatSession[] = [];

    if (userId) {
      sessions = await this.sessionRepository.find({
        where: { userId },
      });
    } else if (clientId) {
      sessions = await this.sessionRepository.find({
        where: { clientId },
      });
    }

    return {
      totalSessions: sessions.length,
      totalMessages: sessions.reduce((sum, s) => sum + s.messageCount, 0),
      totalTokens: sessions.reduce((sum, s) => sum + s.totalTokens, 0),
    };
  }

  /**
   * Get vector store stats
   */
  async getIndexStats() {
    return this.vectorStore.getStats();
  }

  /**
   * Check if LLM is configured
   */
  isConfigured(): boolean {
    return this.llmService.isConfigured();
  }

  /**
   * Get available LLM providers
   */
  getAvailableProviders(): LLMProvider[] {
    return this.llmService.getAvailableProviders();
  }
}
