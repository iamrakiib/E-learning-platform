import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentEmbedding, DocumentType } from './entities/document-embedding.entity';
import { EmbeddingService } from './embedding.service';

export interface SearchResult {
  id: string;
  content: string;
  score: number;
  metadata: any;
  documentType: DocumentType;
  courseId?: number;
  lessonId?: number;
}

@Injectable()
export class VectorStoreService {
  private readonly logger = new Logger(VectorStoreService.name);

  constructor(
    @InjectRepository(DocumentEmbedding)
    private readonly embeddingRepository: Repository<DocumentEmbedding>,
    private readonly embeddingService: EmbeddingService,
  ) {}

  /**
   * Store document with its embedding
   */
  async storeDocument(
    content: string,
    documentType: DocumentType,
    metadata: any = {},
    courseId?: number,
    lessonId?: number,
  ): Promise<DocumentEmbedding> {
    const contentHash = this.embeddingService.generateContentHash(content);

    // Check if document already exists
    const existing = await this.embeddingRepository.findOne({
      where: { contentHash },
    });

    if (existing) {
      this.logger.log(`Document with hash ${contentHash.slice(0, 8)} already exists`);
      return existing;
    }

    // Generate embedding
    const { embedding, tokens } = await this.embeddingService.generateEmbedding(content);

    const document = this.embeddingRepository.create({
      content,
      contentHash,
      embedding,
      documentType,
      metadata: { ...metadata, tokens },
      courseId,
      lessonId,
    });

    return this.embeddingRepository.save(document);
  }

  /**
   * Store multiple documents in batch
   */
  async storeDocuments(
    documents: Array<{
      content: string;
      documentType: DocumentType;
      metadata?: any;
      courseId?: number;
      lessonId?: number;
    }>,
  ): Promise<DocumentEmbedding[]> {
    const results: DocumentEmbedding[] = [];

    // Process in batches of 20
    const batchSize = 20;
    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize);
      const contents = batch.map((d) => d.content);
      
      const embeddings = await this.embeddingService.generateBatchEmbeddings(contents);

      for (let j = 0; j < batch.length; j++) {
        const doc = batch[j];
        const contentHash = this.embeddingService.generateContentHash(doc.content);

        // Check for existing
        const existing = await this.embeddingRepository.findOne({
          where: { contentHash },
        });

        if (existing) {
          results.push(existing);
          continue;
        }

        const document = this.embeddingRepository.create({
          content: doc.content,
          contentHash,
          embedding: embeddings[j].embedding,
          documentType: doc.documentType,
          metadata: { ...doc.metadata, tokens: embeddings[j].tokens },
          courseId: doc.courseId,
          lessonId: doc.lessonId,
        });

        results.push(await this.embeddingRepository.save(document));
      }
    }

    return results;
  }

  /**
   * Semantic search using cosine similarity
   */
  async search(
    query: string,
    options: {
      courseId?: number;
      lessonId?: number;
      documentTypes?: DocumentType[];
      limit?: number;
      minScore?: number;
    } = {},
  ): Promise<SearchResult[]> {
    const { courseId, lessonId, documentTypes, limit = 5, minScore = 0.7 } = options;

    // Generate query embedding
    const { embedding: queryEmbedding } = await this.embeddingService.generateEmbedding(query);

    // Build query
    let queryBuilder = this.embeddingRepository.createQueryBuilder('doc');

    if (courseId) {
      queryBuilder = queryBuilder.andWhere('doc.courseId = :courseId', { courseId });
    }

    if (lessonId) {
      queryBuilder = queryBuilder.andWhere('doc.lessonId = :lessonId', { lessonId });
    }

    if (documentTypes && documentTypes.length > 0) {
      queryBuilder = queryBuilder.andWhere('doc.documentType IN (:...types)', {
        types: documentTypes,
      });
    }

    const documents = await queryBuilder.getMany();

    // Calculate similarity scores
    const results: SearchResult[] = documents
      .map((doc) => ({
        id: doc.id,
        content: doc.content,
        score: this.embeddingService.cosineSimilarity(queryEmbedding, doc.embedding),
        metadata: doc.metadata,
        documentType: doc.documentType,
        courseId: doc.courseId,
        lessonId: doc.lessonId,
      }))
      .filter((result) => result.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return results;
  }

  /**
   * Delete embeddings for a course
   */
  async deleteCoursEmbeddings(courseId: number): Promise<void> {
    await this.embeddingRepository.delete({ courseId });
    this.logger.log(`Deleted embeddings for course ${courseId}`);
  }

  /**
   * Delete embeddings for a lesson
   */
  async deleteLessonEmbeddings(lessonId: number): Promise<void> {
    await this.embeddingRepository.delete({ lessonId });
    this.logger.log(`Deleted embeddings for lesson ${lessonId}`);
  }

  /**
   * Get embedding stats
   */
  async getStats(): Promise<{
    totalDocuments: number;
    documentsByType: Record<DocumentType, number>;
    documentsByCourse: Array<{ courseId: number; count: number }>;
  }> {
    const totalDocuments = await this.embeddingRepository.count();

    const typeStats = await this.embeddingRepository
      .createQueryBuilder('doc')
      .select('doc.documentType', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('doc.documentType')
      .getRawMany();

    const courseStats = await this.embeddingRepository
      .createQueryBuilder('doc')
      .select('doc.courseId', 'courseId')
      .addSelect('COUNT(*)', 'count')
      .where('doc.courseId IS NOT NULL')
      .groupBy('doc.courseId')
      .getRawMany();

    const documentsByType: Record<string, number> = {};
    typeStats.forEach((stat) => {
      documentsByType[stat.type] = parseInt(stat.count);
    });

    return {
      totalDocuments,
      documentsByType: documentsByType as Record<DocumentType, number>,
      documentsByCourse: courseStats.map((stat) => ({
        courseId: stat.courseId,
        count: parseInt(stat.count),
      })),
    };
  }
}
