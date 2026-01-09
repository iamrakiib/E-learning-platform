import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { LessonProgress } from './lesson-progress.entity';
import { UsersService } from '../users/users.service';
import { CoursesService } from '../courses/courses.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentsRepository: Repository<Enrollment>,
    @InjectRepository(LessonProgress)
    private lessonProgressRepository: Repository<LessonProgress>,
    private usersService: UsersService,
    private coursesService: CoursesService,
    private notificationsService: NotificationsService,
  ) {}

  async enroll(userId: number, courseId: number): Promise<Enrollment> {
    const user = await this.usersService.findById(userId);
    const course = await this.coursesService.findOne(courseId);
    
    if (!user || !course) {
      throw new NotFoundException('User or Course not found');
    }

    // Only students can enroll in courses
    if (user.role === 'admin') {
      throw new ForbiddenException('Administrators cannot enroll in courses');
    }

    // Instructors cannot enroll in their own courses
    if (course.instructorUser?.id === userId) {
      throw new ForbiddenException('Instructors cannot enroll in their own courses');
    }

    // Check if already enrolled
    const existing = await this.enrollmentsRepository.findOne({
      where: { user: { id: userId }, course: { id: courseId } },
    });

    if (existing) {
      throw new BadRequestException('Already enrolled in this course');
    }

    const enrollment = this.enrollmentsRepository.create({
      user,
      course,
    });

    const saved = await this.enrollmentsRepository.save(enrollment);

    // Increment course enrollment count
    await this.coursesService.incrementEnrollmentCount(courseId);

    // Notify instructor about new enrollment
    if (course.instructorUser?.id) {
      const studentName = `${user.firstName} ${user.lastName}`;
      await this.notificationsService.notifyEnrollment(
        course.instructorUser.id,
        studentName,
        course.title,
      );
    }

    return saved;
  }

  async findByUser(userId: number): Promise<Enrollment[]> {
    return this.enrollmentsRepository.find({
      where: { user: { id: userId } },
      relations: ['course', 'course.lessons'],
      order: { enrolledAt: 'DESC' },
    });
  }

  async getEnrollmentStats(userId: number) {
    const enrollments = await this.findByUser(userId);
    const total = enrollments.length;
    const completed = enrollments.filter(e => e.completed).length;
    const inProgress = total - completed;
    const avgProgress = total > 0
      ? enrollments.reduce((sum, e) => sum + e.progress, 0) / total
      : 0;

    return {
      total,
      completed,
      inProgress,
      averageProgress: Math.round(avgProgress * 10) / 10,
    };
  }

  async updateProgress(id: number, progress: number, userId: number): Promise<Enrollment> {
    if (progress < 0 || progress > 100) {
      throw new BadRequestException('Progress must be between 0 and 100');
    }

    const enrollment = await this.enrollmentsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    // Check if user owns this enrollment
    if (enrollment.user?.id !== userId) {
      throw new ForbiddenException('You can only update your own enrollment progress');
    }

    const oldProgress = enrollment.progress;
    enrollment.progress = progress;
    if (progress === 100 && !enrollment.completed) {
      enrollment.completed = true;
    }

    const saved = await this.enrollmentsRepository.save(enrollment);

    // Check for progress milestones and notify
    const milestones = [25, 50, 75, 100];
    for (const milestone of milestones) {
      if (oldProgress < milestone && progress >= milestone) {
        const enrollmentWithCourse = await this.enrollmentsRepository.findOne({
          where: { id },
          relations: ['course'],
        });
        if (enrollmentWithCourse?.course) {
          await this.notificationsService.notifyProgressMilestone(
            userId,
            enrollmentWithCourse.course.title,
            milestone,
          );
        }
        break; // Only one milestone notification at a time
      }
    }

    return saved;
  }

  async updateLessonProgress(
    userId: number,
    lessonId: number,
    data: { completed: boolean; timeSpent: number },
  ): Promise<LessonProgress> {
    let lessonProgress = await this.lessonProgressRepository.findOne({
      where: { user: { id: userId }, lesson: { id: lessonId } },
    });

    if (!lessonProgress) {
      lessonProgress = this.lessonProgressRepository.create({
        user: { id: userId } as any,
        lesson: { id: lessonId } as any,
      });
    }

    lessonProgress.completed = data.completed;
    lessonProgress.timeSpent = data.timeSpent;

    return this.lessonProgressRepository.save(lessonProgress);
  }

  async getLessonProgress(userId: number, courseId: number): Promise<LessonProgress[]> {
    return this.lessonProgressRepository
      .createQueryBuilder('lp')
      .leftJoinAndSelect('lp.lesson', 'lesson')
      .where('lp.user.id = :userId', { userId })
      .andWhere('lesson.course.id = :courseId', { courseId })
      .getMany();
  }

  // Student dashboard with stats and recent enrollments
  async getStudentDashboard(userId: number) {
    const stats = await this.getEnrollmentStats(userId);
    const recentEnrollments = await this.enrollmentsRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
      order: { enrolledAt: 'DESC' },
      take: 5,
    });

    const courses = recentEnrollments.map(e => ({
      enrollmentId: e.id,
      courseId: e.course?.id,
      courseTitle: e.course?.title,
      courseInstructor: e.course?.instructor,
      progress: e.progress,
      completed: e.completed,
      enrolledAt: e.enrolledAt,
    }));

    return {
      stats,
      recentCourses: courses,
    };
  }
}