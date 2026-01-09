import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LLMProvider } from './dto/chatbot.dto';

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMResponse {
  content: string;
  tokens: {
    prompt: number;
    completion: number;
    total: number;
  };
  model: string;
  finishReason: string;
}

export interface StreamChunk {
  content: string;
  done: boolean;
}

@Injectable()
export class LLMService {
  private readonly logger = new Logger(LLMService.name);
  private readonly openRouterApiKey: string;
  private readonly defaultModel: string;
  private readonly topK: number;
  private readonly factcheckThreshold: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.openRouterApiKey = this.configService.get<string>('OPENROUTER_API_KEY', '');
    this.defaultModel = this.configService.get<string>('LLM_MODEL', 'mistralai/devstral-2512:free');
    this.topK = this.configService.get<number>('TOP_K', 3);
    this.factcheckThreshold = this.configService.get<number>('FACTCHECK_THRESHOLD', 0.75);
  }

  /**
   * Generate a chat completion using OpenRouter
   */
  async chat(
    messages: LLMMessage[],
    options: {
      provider?: LLMProvider;
      model?: string;
      temperature?: number;
      maxTokens?: number;
    } = {},
  ): Promise<LLMResponse> {
    const model = options.model || this.defaultModel;
    const temperature = options.temperature ?? 0.7;
    const maxTokens = options.maxTokens ?? 2048;

    return this.chatOpenRouter(messages, model, temperature, maxTokens);
  }

  /**
   * OpenRouter Chat Completion (unified API for multiple models)
   */
  private async chatOpenRouter(
    messages: LLMMessage[],
    model: string,
    temperature: number,
    maxTokens: number,
  ): Promise<LLMResponse> {
    if (!this.openRouterApiKey) {
      this.logger.warn('OpenRouter API key not configured, using mock response');
      return this.getMockResponse(messages);
    }

    try {
      this.logger.log(`Calling OpenRouter with model: ${model}`);
      
      const response = await firstValueFrom(
        this.httpService.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model,
            messages,
            temperature,
            max_tokens: maxTokens,
          },
          {
            headers: {
              Authorization: `Bearer ${this.openRouterApiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'http://localhost:3000',
              'X-Title': 'E-Learning Platform Chatbot',
            },
          },
        ),
      );

      const data = response.data;
      
      return {
        content: data.choices[0].message.content,
        tokens: {
          prompt: data.usage?.prompt_tokens || 0,
          completion: data.usage?.completion_tokens || 0,
          total: data.usage?.total_tokens || 0,
        },
        model: data.model || model,
        finishReason: data.choices[0].finish_reason || 'stop',
      };
    } catch (error) {
      this.logger.error(`OpenRouter API error: ${error.message}`);
      if (error.response?.data) {
        this.logger.error(`Response data: ${JSON.stringify(error.response.data)}`);
      }
      // Return mock response on error so the chat doesn't break
      return this.getMockResponse(messages);
    }
  }

  /**
   * Mock response for testing without API keys
   */
  private getMockResponse(messages: LLMMessage[]): LLMResponse {
    const lastMessage = messages[messages.length - 1];
    const mockResponses = [
      "I understand you're asking about course content. Let me help you with that. Based on the available materials, I can provide guidance and explanations for your learning journey.",
      "That's a great question! In the context of this course, the concept relates to the foundational principles we've been discussing. Would you like me to elaborate on any specific aspect?",
      "Based on the course materials, here's what I can tell you: This topic is covered in detail in the lessons. The key points to remember are the core concepts and their practical applications.",
      "I'm here to assist with your learning. The material you're asking about connects to several important concepts in this course. Let me break it down for you step by step.",
    ];

    return {
      content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
      tokens: {
        prompt: Math.ceil(lastMessage.content.length / 4),
        completion: 50,
        total: Math.ceil(lastMessage.content.length / 4) + 50,
      },
      model: 'mock-model',
      finishReason: 'stop',
    };
  }

  /**
   * Build RAG system prompt
   */
  buildRAGSystemPrompt(
    context: string,
    courseTitle?: string,
    lessonTitle?: string,
  ): string {
    return `You are an intelligent AI tutor assistant for an e-learning platform. Your role is to help students understand course materials, answer questions, and provide guidance.

${courseTitle ? `Current Course: ${courseTitle}` : ''}
${lessonTitle ? `Current Lesson: ${lessonTitle}` : ''}

CONTEXT FROM COURSE MATERIALS:
${context}

INSTRUCTIONS:
1. Use the context provided above to answer the student's question accurately
2. If the context doesn't contain enough information, acknowledge this and provide general guidance
3. Be encouraging and supportive in your responses
4. Break down complex concepts into simpler explanations
5. Provide examples when helpful
6. If the student seems confused, offer to explain differently
7. Keep responses concise but comprehensive
8. Use markdown formatting for better readability when appropriate
9. Cite specific parts of the course material when relevant

Remember: Your goal is to facilitate learning, not just provide answers. Help students understand the 'why' behind concepts.`;
  }

  /**
   * Check if OpenRouter API key is configured
   */
  isConfigured(): boolean {
    return !!this.openRouterApiKey;
  }

  /**
   * Get available providers (OpenRouter supports many models)
   */
  getAvailableProviders(): LLMProvider[] {
    if (this.openRouterApiKey) {
      return [LLMProvider.OPENAI, LLMProvider.ANTHROPIC, LLMProvider.GOOGLE];
    }
    return [];
  }

  /**
   * Get the default model
   */
  getDefaultModel(): string {
    return this.defaultModel;
  }
}
