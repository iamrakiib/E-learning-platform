import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Course, CourseLevel, CourseCategory, CourseStatus } from './course.entity';
import { Review } from './review.entity';
import { Lesson } from './lesson.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
    @InjectRepository(Enrollment)
    private enrollmentsRepository: Repository<Enrollment>,
    @Inject(forwardRef(() => NotificationsService))
    private notificationsService: NotificationsService,
  ) {}

  async create(createCourseDto: CreateCourseDto, userId: number): Promise<Course> {
    // Get instructor details
    const instructor = await this.coursesRepository.manager
      .createQueryBuilder()
      .select(['u.id', 'u.firstName', 'u.lastName'])
      .from('user', 'u')
      .where('u.id = :userId', { userId })
      .getRawOne();

    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    const course = new Course();
    course.title = createCourseDto.title;
    course.description = createCourseDto.description;
    course.price = createCourseDto.price;
    course.duration = createCourseDto.duration;
    course.level = (createCourseDto.level as CourseLevel) || CourseLevel.BEGINNER;
    course.category = (createCourseDto.category as CourseCategory) || CourseCategory.OTHER;
    course.instructor = `${instructor.u_firstName} ${instructor.u_lastName}`;
    course.instructorUser = { id: userId } as any;
    course.status = CourseStatus.DRAFT;
    course.isActive = false;
    
    return this.coursesRepository.save(course);
  }

  async findAll(filters?: {
    search?: string;
    category?: string;
    level?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }, isAuthenticated: boolean = false): Promise<any[]> {
    const query = this.coursesRepository.createQueryBuilder('course');

    // Select fields based on authentication status
    if (isAuthenticated) {
      // Authenticated users see all fields
      query.select([
        'course.id',
        'course.title',
        'course.description',
        'course.instructor',
        'course.price',
        'course.duration',
        'course.level',
        'course.category',
        'course.thumbnail',
        'course.enrollmentCount',
        'course.averageRating',
        'course.createdAt',
        'course.status',
        'course.isActive',
      ]);
    } else {
      // Public users see limited fields (but include category for filtering)
      query.select([
        'course.id',
        'course.title',
        'course.description',
        'course.instructor',
        'course.price',
        'course.duration',
        'course.level',
        'course.category',
        'course.thumbnail',
        'course.averageRating',
        'course.enrollmentCount',
      ]);
    }

    // Add lesson count as a subquery
    query.addSelect(
      subQuery => subQuery
        .select('COUNT(lesson.id)', 'lessonCount')
        .from(Lesson, 'lesson')
        .where('lesson.courseId = course.id'),
      'lessonCount'
    );

    if (filters?.search) {
      query.andWhere(
        '(course.title ILIKE :search OR course.description ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    if (filters?.category) {
      query.andWhere('course.category = :category', { category: filters.category });
    }

    if (filters?.level) {
      query.andWhere('course.level = :level', { level: filters.level });
    }

    if (filters?.minPrice !== undefined) {
      query.andWhere('course.price >= :minPrice', { minPrice: filters.minPrice });
    }

    if (filters?.maxPrice !== undefined) {
      query.andWhere('course.price <= :maxPrice', { maxPrice: filters.maxPrice });
    }

    query.andWhere('course.isActive = :isActive', { isActive: true });

    switch (filters?.sort) {
      case 'price-asc':
        query.orderBy('course.price', 'ASC');
        break;
      case 'price-desc':
        query.orderBy('course.price', 'DESC');
        break;
      case 'rating':
        query.orderBy('course.averageRating', 'DESC');
        break;
      case 'popular':
        query.orderBy('course.enrollmentCount', 'DESC');
        break;
      default:
        query.orderBy('course.createdAt', 'DESC');
    }

    // Get raw results to include lessonCount
    const rawResults = await query.getRawAndEntities();
    
    // Merge lessonCount into the entities
    return rawResults.entities.map((course, index) => ({
      ...course,
      lessonCount: parseInt(rawResults.raw[index]?.lessonCount || '0', 10),
    }));
  }

  async getPopularCourses(limit = 10): Promise<any[]> {
    const query = this.coursesRepository
      .createQueryBuilder('course')
      .select([
        'course.id',
        'course.title',
        'course.description',
        'course.instructor',
        'course.price',
        'course.duration',
        'course.level',
        'course.category',
        'course.thumbnail',
        'course.averageRating',
        'course.enrollmentCount',
      ])
      .addSelect(
        subQuery => subQuery
          .select('COUNT(lesson.id)', 'lessonCount')
          .from(Lesson, 'lesson')
          .where('lesson.courseId = course.id'),
        'lessonCount'
      )
      .where('course.isActive = :isActive', { isActive: true })
      .orderBy('course.enrollmentCount', 'DESC')
      .addOrderBy('course.averageRating', 'DESC')
      .limit(limit);

    const rawResults = await query.getRawAndEntities();
    
    return rawResults.entities.map((course, index) => ({
      ...course,
      lessonCount: parseInt(rawResults.raw[index]?.lessonCount || '0', 10),
    }));
  }

  async findByInstructor(instructorId: number): Promise<Course[]> {
    return this.coursesRepository.find({
      where: { instructorUser: { id: instructorId } },
      relations: ['instructorUser'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({ 
      where: { id },
      relations: ['instructorUser']
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  // Verify instructor owns the course
  async verifyOwnership(courseId: number, userId: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({
      where: { id: courseId },
      relations: ['instructorUser'],
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
    if (course.instructorUser?.id !== userId) {
      throw new ForbiddenException('You do not own this course');
    }
    return course;
  }

  // Verify user is enrolled in the course OR owns it (instructor) OR is admin
  async verifyEnrollmentOrOwnership(courseId: number, userId: number, userRole?: string): Promise<boolean> {
    // Admin has access to all courses
    if (userRole === 'admin') {
      const course = await this.coursesRepository.findOne({ where: { id: courseId } });
      if (!course) {
        throw new NotFoundException(`Course with ID ${courseId} not found`);
      }
      return true;
    }

    const course = await this.coursesRepository.findOne({
      where: { id: courseId },
      relations: ['instructorUser'],
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // Check if user is the instructor (owner)
    if (course.instructorUser?.id === userId) {
      return true;
    }

    // Check if user is enrolled
    const enrollment = await this.enrollmentsRepository.findOne({
      where: { user: { id: userId }, course: { id: courseId } },
    });

    if (!enrollment) {
      throw new ForbiddenException('You must be enrolled in this course to access its content');
    }

    return true;
  }

  async findOneWithDetails(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({
      where: { id },
      relations: ['reviews', 'reviews.user'],
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async findOnePublic(id: number): Promise<Partial<Course>> {
    const course = await this.coursesRepository.findOne({
      where: { id },
      relations: ['lessons', 'instructorUser'],
      order: { lessons: { order: 'ASC' } },
    });
    
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    
    // Return a partial course with public fields and lessons
    const result: any = {
      id: course.id,
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      price: course.price,
      duration: course.duration,
      level: course.level,
      category: course.category,
      thumbnail: course.thumbnail,
      averageRating: course.averageRating,
      enrollmentCount: course.enrollmentCount,
      createdAt: course.createdAt,
      lessons: course.lessons?.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        content: lesson.content,
        duration: lesson.duration,
        order: lesson.order,
        videoUrl: lesson.videoUrl,
      })) || [],
    };
    
    if (course.instructorUser) {
      result.instructorUser = {
        id: course.instructorUser.id,
        firstName: course.instructorUser.firstName,
        lastName: course.instructorUser.lastName,
      };
    }
    
    return result as Partial<Course>;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto, userId: number): Promise<Course> {
    await this.verifyOwnership(id, userId);
    await this.coursesRepository.update(id, updateCourseDto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.verifyOwnership(id, userId);
    await this.coursesRepository.delete(id);
  }

  async getCourseReviews(courseId: number): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: { course: { id: courseId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async addReview(
    courseId: number,
    userId: number,
    reviewDto: { rating: number; comment: string },
  ): Promise<Review> {
    const course = await this.findOne(courseId);

    // Check if user already reviewed
    const existingReview = await this.reviewsRepository.findOne({
      where: { course: { id: courseId }, user: { id: userId } },
    });

    if (existingReview) {
      throw new BadRequestException('You have already reviewed this course');
    }

    if (reviewDto.rating < 1 || reviewDto.rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    const review = this.reviewsRepository.create({
      course: { id: courseId } as any,
      user: { id: userId } as any,
      rating: reviewDto.rating,
      comment: reviewDto.comment,
    });

    await this.reviewsRepository.save(review);

    // Update course average rating
    await this.updateCourseRating(courseId);

    // Notify instructor about new review
    if (course.instructorUser?.id) {
      // Get reviewer name
      const reviewer = await this.coursesRepository.manager
        .createQueryBuilder()
        .select(['u.firstName', 'u.lastName'])
        .from('user', 'u')
        .where('u.id = :userId', { userId })
        .getRawOne();
      
      const reviewerName = reviewer ? `${reviewer.u_firstName} ${reviewer.u_lastName}` : 'A student';
      
      await this.notificationsService.notifyNewReview(
        course.instructorUser.id,
        reviewerName,
        course.title,
        reviewDto.rating,
      );
    }

    return review;
  }

  async updateReview(
    courseId: number,
    reviewId: number,
    userId: number,
    reviewDto: { rating?: number; comment?: string },
  ): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { id: reviewId, course: { id: courseId }, user: { id: userId } },
    });

    if (!review) {
      throw new NotFoundException('Review not found or you do not own this review');
    }

    if (reviewDto.rating !== undefined) {
      if (reviewDto.rating < 1 || reviewDto.rating > 5) {
        throw new BadRequestException('Rating must be between 1 and 5');
      }
      review.rating = reviewDto.rating;
    }

    if (reviewDto.comment !== undefined) {
      review.comment = reviewDto.comment;
    }

    await this.reviewsRepository.save(review);
    await this.updateCourseRating(courseId);

    return review;
  }

  async deleteReview(courseId: number, reviewId: number, userId: number, userRole?: string): Promise<void> {
    const review = await this.reviewsRepository.findOne({
      where: { id: reviewId, course: { id: courseId } },
      relations: ['user'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    // Allow deletion if user owns the review or is admin
    if (review.user.id !== userId && userRole !== 'admin') {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    await this.reviewsRepository.delete(reviewId);
    await this.updateCourseRating(courseId);
  }

  async updateCourseRating(courseId: number): Promise<void> {
    const reviews = await this.reviewsRepository.find({
      where: { course: { id: courseId } },
    });

    if (reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await this.coursesRepository.update(courseId, {
        averageRating: Math.round(avgRating * 10) / 10,
      });
    } else {
      // No reviews, reset average rating
      await this.coursesRepository.update(courseId, {
        averageRating: 0,
      });
    }
  }

  async getCourseLessons(courseId: number, userId: number, userRole?: string): Promise<Lesson[]> {
    await this.verifyEnrollmentOrOwnership(courseId, userId, userRole);
    return this.lessonsRepository.find({
      where: { course: { id: courseId } },
      order: { order: 'ASC' },
    });
  }

  async getCourseLesson(courseId: number, lessonId: number, userId: number, userRole?: string): Promise<Lesson> {
    await this.verifyEnrollmentOrOwnership(courseId, userId, userRole);
    const lesson = await this.lessonsRepository.findOne({
      where: { id: lessonId, course: { id: courseId } },
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found in course ${courseId}`);
    }
    return lesson;
  }

  async addLesson(
    courseId: number,
    createLessonDto: CreateLessonDto,
    userId: number,
  ): Promise<Lesson> {
    await this.verifyOwnership(courseId, userId);

    const lesson = this.lessonsRepository.create({
      ...createLessonDto,
      course: { id: courseId } as any,
    });

    return this.lessonsRepository.save(lesson);
  }

  async incrementEnrollmentCount(courseId: number): Promise<void> {
    await this.coursesRepository.increment({ id: courseId }, 'enrollmentCount', 1);
  }

  async deleteLesson(courseId: number, lessonId: number, userId: number): Promise<void> {
    await this.verifyOwnership(courseId, userId);
    const lesson = await this.lessonsRepository.findOne({ 
      where: { id: lessonId, course: { id: courseId } },
      relations: ['course']
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found in course ${courseId}`);
    }
    await this.lessonsRepository.delete(lessonId);
  }

  async updateLessonVideo(courseId: number, lessonId: number, videoUrl: string, userId: number): Promise<Lesson> {
    await this.verifyOwnership(courseId, userId);
    const lesson = await this.lessonsRepository.findOne({ 
      where: { id: lessonId, course: { id: courseId } }
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found in course ${courseId}`);
    }
    lesson.videoUrl = videoUrl;
    return this.lessonsRepository.save(lesson);
  }

  // Instructor dashboard metrics
  async getInstructorDashboard(instructorId: number) {
    const courses = await this.coursesRepository.find({
      where: { instructorUser: { id: instructorId } },
      order: { createdAt: 'DESC' },
    });

    const totalCourses = courses.length;
    const activeCourses = courses.filter(c => c.isActive).length;
    const draftCourses = courses.filter(c => c.status === CourseStatus.DRAFT).length;

    // Total enrollments across instructor courses
    const totalEnrollments = await this.enrollmentsRepository
      .createQueryBuilder('enrollment')
      .leftJoin('enrollment.course', 'course')
      .leftJoin('course.instructorUser', 'instructor')
      .where('instructor.id = :instructorId', { instructorId })
      .getCount();

    // Average rating across courses with ratings
    const rated = courses.filter(c => c.averageRating && c.averageRating > 0);
    const averageRating = rated.length
      ? Math.round((rated.reduce((sum, c) => sum + (c.averageRating || 0), 0) / rated.length) * 10) / 10
      : 0;

    // Total revenue estimate (sum of price * enrollmentCount)
    const totalRevenue = courses.reduce((sum, c) => sum + ((c.price || 0) * (c.enrollmentCount || 0)), 0);

    const recentCourses = courses.slice(0, 5).map(c => ({
      id: c.id,
      title: c.title,
      enrollmentCount: c.enrollmentCount,
      averageRating: c.averageRating,
      isActive: c.isActive,
      status: c.status,
      price: c.price,
    }));

    return {
      totalCourses,
      activeCourses,
      draftCourses,
      totalEnrollments,
      averageRating,
      totalRevenue,
      recentCourses,
    };
  }

  // ============================================
  // Internal methods for chatbot/system use
  // ============================================

  /**
   * Get all lessons for a course (internal use, no auth check)
   */
  async getLessonsInternal(courseId: number): Promise<Lesson[]> {
    return this.lessonsRepository.find({
      where: { course: { id: courseId } },
      order: { order: 'ASC' },
    });
  }

  /**
   * Get a specific lesson by ID (internal use, no auth check)
   */
  async getLessonByIdInternal(courseId: number, lessonId: number): Promise<Lesson | null> {
    return this.lessonsRepository.findOne({
      where: { id: lessonId, course: { id: courseId } },
    });
  }
}