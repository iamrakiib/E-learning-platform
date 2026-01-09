import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';

export interface EmbeddingResult {
  embedding: number[];
  tokens: number;
}

@Injectable()
export class EmbeddingService {
  private readonly logger = new Logger(EmbeddingService.name);
  private readonly openRouterApiKey: string;
  private readonly embeddingModel: string;
  private readonly chunkSize: number;
  private readonly chunkOverlap: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.openRouterApiKey = this.configService.get<string>('OPENROUTER_API_KEY', '');
    this.embeddingModel = this.configService.get<string>(
      'EMBEDDING_MODEL',
      'openai/text-embedding-3-small',
    );
    this.chunkSize = this.configService.get<number>('CHUNK_SIZE', 800);
    this.chunkOverlap = this.configService.get<number>('CHUNK_OVERLAP', 120);
  }

  /**
   * Generate embedding for a single text using OpenRouter
   */
  async generateEmbedding(text: string): Promise<EmbeddingResult> {
    if (!this.openRouterApiKey) {
      this.logger.warn('OpenRouter API key not configured, using mock embedding');
      return this.generateMockEmbedding(text);
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://openrouter.ai/api/v1/embeddings',
          {
            input: text,
            model: this.embeddingModel,
          },
          {
            headers: {
              Authorization: `Bearer ${this.openRouterApiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'http://localhost:3000',
              'X-Title': 'E-Learning Platform',
            },
          },
        ),
      );

      return {
        embedding: response.data.data[0].embedding,
        tokens: response.data.usage?.total_tokens || Math.ceil(text.length / 4),
      };
    } catch (error) {
      this.logger.error(`Failed to generate embedding: ${error.message}`);
      // Fall back to mock embedding on error
      return this.generateMockEmbedding(text);
    }
  }

  /**
   * Generate embeddings for multiple texts in batch
   */
  async generateBatchEmbeddings(texts: string[]): Promise<EmbeddingResult[]> {
    if (!this.openRouterApiKey) {
      this.logger.warn('OpenRouter API key not configured, using mock embeddings');
      return texts.map((text) => this.generateMockEmbedding(text));
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://openrouter.ai/api/v1/embeddings',
          {
            input: texts,
            model: this.embeddingModel,
          },
          {
            headers: {
              Authorization: `Bearer ${this.openRouterApiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'http://localhost:3000',
              'X-Title': 'E-Learning Platform',
            },
          },
        ),
      );

      return response.data.data.map((item: any, index: number) => ({
        embedding: item.embedding,
        tokens: Math.floor((response.data.usage?.total_tokens || texts.join('').length / 4) / texts.length),
      }));
    } catch (error) {
      this.logger.error(`Failed to generate batch embeddings: ${error.message}`);
      // Fall back to mock embeddings on error
      return texts.map((text) => this.generateMockEmbedding(text));
    }
  }

  /**
   * Generate a mock embedding for testing (when no API key)
   */
  private generateMockEmbedding(text: string): EmbeddingResult {
    const hash = crypto.createHash('sha256').update(text).digest('hex');
    const embedding: number[] = [];
    
    // Generate 1536-dimensional mock embedding from hash
    for (let i = 0; i < 1536; i++) {
      const charIndex = i % hash.length;
      const value = parseInt(hash[charIndex], 16) / 16 - 0.5;
      embedding.push(value + Math.sin(i * 0.1) * 0.1);
    }

    // Normalize the vector
    const magnitude = Math.sqrt(
      embedding.reduce((sum, val) => sum + val * val, 0),
    );
    const normalizedEmbedding = embedding.map((val) => val / magnitude);

    return {
      embedding: normalizedEmbedding,
      tokens: Math.ceil(text.length / 4),
    };
  }

  /**
   * Calculate cosine similarity between two embeddings
   */
  cosineSimilarity(embedding1: number[], embedding2: number[]): number {
    if (embedding1.length !== embedding2.length) {
      throw new Error('Embeddings must have the same dimension');
    }

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < embedding1.length; i++) {
      dotProduct += embedding1[i] * embedding2[i];
      norm1 += embedding1[i] * embedding1[i];
      norm2 += embedding2[i] * embedding2[i];
    }

    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  /**
   * Generate content hash for deduplication
   */
  generateContentHash(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  /**
   * Split text into chunks with overlap
   */
  splitTextIntoChunks(
    text: string,
    chunkSize: number = 1000,
    overlap: number = 200,
  ): string[] {
    const chunks: string[] = [];
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    
    let currentChunk = '';
    
    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      
      if ((currentChunk + ' ' + trimmedSentence).length > chunkSize) {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
          // Keep overlap from previous chunk
          const words = currentChunk.split(' ');
          const overlapWords = Math.ceil(overlap / 5); // Approximate words for overlap
          currentChunk = words.slice(-overlapWords).join(' ');
        }
      }
      
      currentChunk += (currentChunk ? ' ' : '') + trimmedSentence + '.';
    }
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks;
  }
}
