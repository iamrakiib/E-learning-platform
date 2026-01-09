import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { EmbeddingService } from './embedding.service';
import { VectorStoreService } from './vector-store.service';
import { LLMService } from './llm.service';
import { ChatMessage } from './entities/chat-message.entity';
import { ChatSession } from './entities/chat-session.entity';
import { DocumentEmbedding } from './entities/document-embedding.entity';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessage, ChatSession, DocumentEmbedding]),
    HttpModule.register({
      timeout: 60000,
      maxRedirects: 5,
    }),
    CoursesModule,
  ],
  controllers: [ChatbotController],
  providers: [ChatbotService, EmbeddingService, VectorStoreService, LLMService],
  exports: [ChatbotService, EmbeddingService],
})
export class ChatbotModule {}
