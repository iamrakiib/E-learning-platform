import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new course (Instructor only)' })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Instructor role required' })
  create(@Body() createCourseDto: CreateCourseDto, @Req() req: any) {
    return this.coursesService.create(createCourseDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Search and filter courses (Public access, limited fields)' })
  @ApiQuery({ name: 'search', required: false, description: 'Search in title and description' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category' })
  @ApiQuery({ name: 'level', required: false, description: 'Filter by level (beginner/intermediate/advanced)' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Minimum price filter' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Maximum price filter' })
  @ApiQuery({ name: 'sort', required: false, description: 'Sort by: price-asc, price-desc, rating, popular, newest' })
  @ApiResponse({ status: 200, description: 'Courses retrieved successfully' })
  findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('level') level?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('sort') sort?: string,
  ) {
    return this.coursesService.findAll({
      search,
      category,
      level,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sort,
    }, false);
  }

  @Get('popular')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(600) // Cache for 10 minutes
  @ApiOperation({ summary: 'Get popular courses (Top 10 by enrollments and rating)' })
  @ApiResponse({ status: 200, description: 'Popular courses retrieved' })
  getPopular() {
    return this.coursesService.getPopularCourses();
  }

  @Get('instructor/my-courses')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get instructor own courses' })
  @ApiResponse({ status: 200, description: 'Courses retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - Instructor role required' })
  getMyCourses(@Req() req: any) {
    return this.coursesService.findByInstructor(req.user.id);
  }

  @Get('instructor/dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get instructor dashboard metrics (courses, enrollments, ratings, revenue)' })
  @ApiResponse({ status: 200, description: 'Dashboard metrics retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - Instructor role required' })
  getInstructorDashboard(@Req() req: any) {
    return this.coursesService.getInstructorDashboard(req.user.id);
  }

  @Get('all-authenticated')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all courses with full details (Authenticated users)' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'level', required: false })
  @ApiQuery({ name: 'minPrice', required: false })
  @ApiQuery({ name: 'maxPrice', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiResponse({ status: 200, description: 'Full course details retrieved' })
  findAllAuthenticated(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('level') level?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('sort') sort?: string,
  ) {
    return this.coursesService.findAll({
      search,
      category,
      level,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sort,
    }, true);
  }

  @Get('detailed/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get full course details with reviews (Authenticated users)' })
  @ApiResponse({ status: 200, description: 'Full course details retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  findOneFull(@Param('id') id: string) {
    return this.coursesService.findOneWithDetails(+id);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get course details (Public, limited fields)' })
  @ApiResponse({ status: 200, description: 'Course details retrieved (limited)' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOnePublic(+id);
  }

  @Get(':id/reviews')
  @ApiOperation({ summary: 'Get all reviews for a course' })
  @ApiResponse({ status: 200, description: 'Reviews retrieved' })
  getReviews(@Param('id') id: string) {
    return this.coursesService.getCourseReviews(+id);
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Add a review to a course' })
  @ApiResponse({ status: 201, description: 'Review added successfully' })
  @ApiResponse({ status: 400, description: 'Already reviewed or invalid rating' })
  addReview(
    @Param('id') id: string,
    @Body() reviewDto: { rating: number; comment: string },
    @Req() req: any,
  ) {
    return this.coursesService.addReview(+id, req.user.id, reviewDto);
  }

  @Put(':id/reviews/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update your review' })
  @ApiResponse({ status: 200, description: 'Review updated successfully' })
  @ApiResponse({ status: 404, description: 'Review not found or not yours' })
  updateReview(
    @Param('id') id: string,
    @Param('reviewId') reviewId: string,
    @Body() reviewDto: { rating?: number; comment?: string },
    @Req() req: any,
  ) {
    return this.coursesService.updateReview(+id, +reviewId, req.user.id, reviewDto);
  }

  @Delete(':id/reviews/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a review (own review or admin)' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @ApiResponse({ status: 403, description: 'Not authorized to delete this review' })
  deleteReview(
    @Param('id') id: string,
    @Param('reviewId') reviewId: string,
    @Req() req: any,
  ) {
    return this.coursesService.deleteReview(+id, +reviewId, req.user.id, req.user.role);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a course (Instructor only - must own the course)' })
  @ApiResponse({ status: 200, description: 'Course updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not your course' })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @Req() req: any) {
    return this.coursesService.update(+id, updateCourseDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a course (Instructor only - must own the course)' })
  @ApiResponse({ status: 200, description: 'Course deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not your course' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.coursesService.remove(+id, req.user.id);
  }

  @Get(':courseId/lessons')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all lessons for a course (Must be enrolled, own the course, or be admin)' })
  @ApiResponse({ status: 200, description: 'Lessons retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not enrolled in this course' })
  getLessons(@Param('courseId') id: string, @Req() req: any) {
    return this.coursesService.getCourseLessons(+id, req.user.id, req.user.role);
  }

  @Get(':courseId/lessons/:lessonId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get a specific lesson from a course (Must be enrolled, own the course, or be admin)' })
  @ApiResponse({ status: 200, description: 'Lesson retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not enrolled in this course' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  getLesson(@Param('courseId') courseId: string, @Param('lessonId') lessonId: string, @Req() req: any) {
    return this.coursesService.getCourseLesson(+courseId, +lessonId, req.user.id, req.user.role);
  }

  @Post(':courseId/lessons')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Add a lesson to a course (Instructor only - must own the course)' })
  @ApiResponse({ status: 201, description: 'Lesson added successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not your course' })
  addLesson(
    @Param('courseId') id: string,
    @Body() createLessonDto: CreateLessonDto,
    @Req() req: any,
  ) {
    return this.coursesService.addLesson(+id, createLessonDto, req.user.id);
  }

  @Delete(':courseId/lessons/:lessonId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a lesson from a course (Instructor only - must own the course)' })
  @ApiResponse({ status: 200, description: 'Lesson deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not your course' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  deleteLesson(@Param('courseId') courseId: string, @Param('lessonId') lessonId: string, @Req() req: any) {
    return this.coursesService.deleteLesson(+courseId, +lessonId, req.user.id);
  }

  @Post(':courseId/lessons/:lessonId/video')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @ApiBearerAuth('JWT-auth')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `video-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimes = [
          'video/mp4',
          'video/avi',
          'video/mov',
          'video/quicktime',
          'video/x-msvideo',
          'video/x-matroska',
          'video/webm',
          'video/mpeg',
          'video/x-ms-wmv',
        ];
        if (allowedMimes.includes(file.mimetype) || file.mimetype.startsWith('video/')) {
          cb(null, true);
        } else {
          cb(new Error(`Invalid file type: ${file.mimetype}. Only video files are allowed!`), false);
        }
      },
      limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a video file for a specific lesson (Instructor only)' })
  @ApiResponse({ status: 201, description: 'Video uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file type' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not your course' })
  async uploadVideo(@Param('courseId') courseId: string, @Param('lessonId') lessonId: string, @UploadedFile() file: Express.Multer.File, @Req() req: any) {
    if (!file) {
      throw new Error('No file uploaded. Make sure to use form-data with key "video"');
    }
    const videoUrl = `http://localhost:3000/uploads/videos/${file.filename}`;
    
    await this.coursesService.updateLessonVideo(+courseId, +lessonId, videoUrl, req.user.id);
    
    return {
      message: 'Video uploaded successfully',
      courseId: +courseId,
      lessonId: +lessonId,
      videoUrl,
      filename: file.filename,
      size: file.size,
    };
  }
}