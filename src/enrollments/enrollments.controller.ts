import { Controller, Post, Body, Get, Put, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('enrollments')
@Controller('enrollments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class EnrollmentsController {
  constructor(private enrollmentsService: EnrollmentsService) {}

  @Get('dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @ApiOperation({ summary: 'Get student dashboard (enrollment stats and recent courses)' })
  @ApiResponse({ status: 200, description: 'Dashboard retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - Student role required' })
  getStudentDashboard(@Req() req: any) {
    return this.enrollmentsService.getStudentDashboard(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Enroll in a course' })
  @ApiResponse({ status: 201, description: 'Enrolled successfully' })
  enroll(@Req() req: any, @Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.enroll(req.user.id, createEnrollmentDto.courseId);
  }

  @Get('my-courses')
  @ApiOperation({ summary: 'Get enrolled courses' })
  @ApiResponse({ status: 200, description: 'Courses retrieved' })
  findMyEnrollments(@Req() req: any) {
    return this.enrollmentsService.findByUser(req.user.id);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get enrollment statistics' })
  @ApiResponse({ status: 200, description: 'Stats retrieved' })
  getStats(@Req() req: any) {
    return this.enrollmentsService.getEnrollmentStats(req.user.id);
  }

  @Put(':id/progress')
  @ApiOperation({ summary: 'Update enrollment progress' })
  @ApiResponse({ status: 200, description: 'Progress updated' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not your enrollment' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  updateProgress(
    @Param('id') id: string,
    @Body('progress') progress: number,
    @Req() req: any,
  ) {
    return this.enrollmentsService.updateProgress(+id, progress, req.user.id);
  }

  @Post('lessons/:lessonId/progress')
  @ApiOperation({ summary: 'Update lesson progress' })
  @ApiResponse({ status: 200, description: 'Lesson progress updated' })
  @ApiResponse({ status: 201, description: 'Lesson progress created' })
  updateLessonProgress(
    @Req() req: any,
    @Param('lessonId') lessonId: string,
    @Body() progressData: { completed: boolean; timeSpent: number },
  ) {
    return this.enrollmentsService.updateLessonProgress(
      req.user.id,
      +lessonId,
      progressData,
    );
  }

  @Get('courses/:courseId/lesson-progress')
  @ApiOperation({ summary: 'Get lesson progress for a course' })
  @ApiResponse({ status: 200, description: 'Lesson progress retrieved' })
  getLessonProgress(@Req() req: any, @Param('courseId') courseId: string) {
    return this.enrollmentsService.getLessonProgress(req.user.id, +courseId);
  }
}