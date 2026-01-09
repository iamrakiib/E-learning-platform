import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ChatbotService } from './chatbot.service';
import { SendMessageDto, CreateSessionDto, IndexCourseDto } from './dto/chatbot.dto';

// Optional Auth Guard - allows both authenticated and anonymous users
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    // Don't throw error if no user, just return null
    return user || null;
  }
}

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  /**
   * Get chatbot configuration status (Public)
   */
  @Get('status')
  getStatus() {
    return {
      configured: this.chatbotService.isConfigured(),
      providers: this.chatbotService.getAvailableProviders(),
    };
  }

  /**
   * Create a new chat session (Public - uses clientId for anonymous users)
   */
  @Post('sessions')
  @UseGuards(OptionalJwtAuthGuard)
  createSession(
    @Request() req,
    @Headers('x-client-id') clientId: string,
    @Body() dto: CreateSessionDto,
  ) {
    const userId = req.user?.id || null;
    return this.chatbotService.createSession(userId, clientId, dto);
  }

  /**
   * Get chat sessions (Public - filtered by clientId for anonymous users)
   */
  @Get('sessions')
  @UseGuards(OptionalJwtAuthGuard)
  getSessions(
    @Request() req,
    @Headers('x-client-id') clientId: string,
    @Query('courseId') courseId?: string,
  ) {
    const userId = req.user?.id || null;
    return this.chatbotService.getUserSessions(
      userId,
      clientId,
      courseId ? parseInt(courseId) : undefined,
    );
  }

  /**
   * Get a specific chat session with messages (Public - validated by clientId)
   */
  @Get('sessions/:sessionId')
  @UseGuards(OptionalJwtAuthGuard)
  getSession(
    @Request() req,
    @Headers('x-client-id') clientId: string,
    @Param('sessionId') sessionId: string,
  ) {
    const userId = req.user?.id || null;
    return this.chatbotService.getSession(sessionId, userId, clientId);
  }

  /**
   * Delete a chat session (Public - validated by clientId)
   */
  @Delete('sessions/:sessionId')
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSession(
    @Request() req,
    @Headers('x-client-id') clientId: string,
    @Param('sessionId') sessionId: string,
  ) {
    const userId = req.user?.id || null;
    return this.chatbotService.deleteSession(sessionId, userId, clientId);
  }

  /**
   * Send a message and get AI response (Public - uses clientId for anonymous)
   */
  @Post('chat')
  @UseGuards(OptionalJwtAuthGuard)
  sendMessage(
    @Request() req,
    @Headers('x-client-id') clientId: string,
    @Body() dto: SendMessageDto,
  ) {
    const userId = req.user?.id || null;
    return this.chatbotService.sendMessage(userId, clientId, dto);
  }

  /**
   * Get user's chatbot usage stats (Public)
   */
  @Get('stats')
  @UseGuards(OptionalJwtAuthGuard)
  getUserStats(@Request() req, @Headers('x-client-id') clientId: string) {
    const userId = req.user?.id || null;
    return this.chatbotService.getUserStats(userId, clientId);
  }

  /**
   * Index a course for RAG (Admin/Instructor only - requires auth)
   */
  @Post('index')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'instructor')
  indexCourse(@Body() dto: IndexCourseDto) {
    return this.chatbotService.indexCourse(
      dto.courseId,
      dto.chunkSize,
      dto.chunkOverlap,
    );
  }

  /**
   * Get index stats (Admin only - requires auth)
   */
  @Get('index/stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  getIndexStats() {
    return this.chatbotService.getIndexStats();
  }
}
