import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Course, CourseStatus } from '../courses/course.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import { Review } from '../courses/review.entity';
import { Lesson } from '../courses/lesson.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    private notificationsService: NotificationsService,
  ) {}

  async getDashboardStats() {
    try {
      const [
        totalUsers,
        totalCourses,
        totalEnrollments,
        activeUsers,
        activeCourses,
      ] = await Promise.all([
        this.userRepository.count(),
        this.courseRepository.count(),
        this.enrollmentRepository.count(),
        this.userRepository.count({ where: { isActive: true } }),
        this.courseRepository.count({ where: { isActive: true } }),
      ]);

      // Calculate total revenue from all enrollments
      const enrollmentsWithCourses = await this.enrollmentRepository.find({
        relations: ['course'],
        select: ['id'],
      });
      
      const totalRevenue = enrollmentsWithCourses.reduce((sum, enrollment) => {
        return sum + (parseFloat(enrollment.course?.price?.toString() || '0') || 0);
      }, 0);

      return {
        overview: {
          totalUsers,
          totalCourses,
          totalEnrollments,
          totalRevenue: totalRevenue.toFixed(2),
          activeUsers,
          activeCourses,
        },
        recentEnrollments: [],
      };
    } catch (error) {
      console.error('Error in getDashboardStats:', error);
      throw error;
    }
  }

  async getAllUsers(page: number = 1, limit: number = 10) {
    try {
      const [users, total] = await this.userRepository.findAndCount({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'DESC' },
      });

      // Add computed name field for frontend
      const usersWithName = users.map(user => ({
        ...user,
        name: user.firstName && user.lastName 
          ? `${user.firstName} ${user.lastName}`.trim()
          : user.firstName || user.lastName || user.email?.split('@')[0] || 'User'
      }));

      return {
        data: usersWithName,
        meta: {
          page,
          limit,
          total,
          pageCount: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      throw error;
    }
  }

  async toggleUserStatus(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isActive = !user.isActive;
    return this.userRepository.save(user);
  }

  async deleteUser(userId: number) {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async getAllCourses(page: number = 1, limit: number = 10) {
    const [courses, total] = await this.courseRepository.findAndCount({
      relations: ['instructorUser'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: courses,
      meta: {
        page,
        limit,
        total,
        pageCount: Math.ceil(total / limit),
      },
    };
  }

  async toggleCourseStatus(courseId: number) {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    course.isActive = !course.isActive;
    return this.courseRepository.save(course);
  }

  async deleteCourse(courseId: number) {
    const result = await this.courseRepository.delete(courseId);
    if (result.affected === 0) {
      throw new NotFoundException('Course not found');
    }
    return { message: 'Course deleted successfully' };
  }

  async getTopInstructors(limit: number = 10) {
    // Get all instructors first
    const instructors = await this.userRepository.find({
      where: { role: 'instructor' },
      select: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt'],
    });

    // Get course counts for each instructor
    const instructorsWithCounts = await Promise.all(
      instructors.map(async (instructor) => {
        const courseCount = await this.courseRepository.count({
          where: { instructorUser: { id: instructor.id } },
        });
        return {
          ...instructor,
          courseCount,
        };
      })
    );

    // Sort by course count and limit
    return instructorsWithCounts
      .sort((a, b) => b.courseCount - a.courseCount)
      .slice(0, limit);
  }

  async getRevenueAnalytics() {
    // Get all enrollments with their courses
    const enrollments = await this.enrollmentRepository.find({
      relations: ['course'],
      order: { enrolledAt: 'DESC' },
    });

    // Group by month
    const monthlyData = new Map<string, { revenue: number; enrollments: number }>();

    enrollments.forEach((enrollment) => {
      const date = new Date(enrollment.enrolledAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
      
      const existing = monthlyData.get(monthKey) || { revenue: 0, enrollments: 0 };
      existing.revenue += parseFloat(enrollment.course?.price?.toString() || '0');
      existing.enrollments += 1;
      monthlyData.set(monthKey, existing);
    });

    // Convert to array and sort
    const result = Array.from(monthlyData.entries())
      .map(([month, data]) => ({
        month,
        revenue: Math.round(data.revenue * 100) / 100,
        enrollments: data.enrollments,
      }))
      .sort((a, b) => b.month.localeCompare(a.month))
      .slice(0, 12);

    return result;
  }

  // Course Approval Methods
  async getPendingCourses() {
    return this.courseRepository.find({
      where: { status: CourseStatus.PENDING_REVIEW },
      relations: ['instructorUser'],
      order: { createdAt: 'DESC' },
    });
  }

  async approveCourse(courseId: number) {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['instructorUser'],
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    course.status = CourseStatus.APPROVED;
    course.isActive = true;
    course.rejectionReason = null;
    const saved = await this.courseRepository.save(course);

    // Notify instructor about approval
    if (course.instructorUser?.id) {
      await this.notificationsService.notifyCourseApproved(
        course.instructorUser.id,
        course.title,
      );
    }

    return saved;
  }

  async rejectCourse(courseId: number, reason?: string) {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['instructorUser'],
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    const rejectionReason = reason || 'Course does not meet platform standards';
    course.status = CourseStatus.REJECTED;
    course.isActive = false;
    course.rejectionReason = rejectionReason;
    const saved = await this.courseRepository.save(course);

    // Notify instructor about rejection
    if (course.instructorUser?.id) {
      await this.notificationsService.notifyCourseRejected(
        course.instructorUser.id,
        course.title,
        rejectionReason,
      );
    }

    return saved;
  }

  // Instructor Approval Methods
  async getPendingInstructors() {
    return this.userRepository.find({
      where: { 
        role: 'instructor',
        instructorApprovalStatus: 'pending'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        instructorApplicationDate: true,
        createdAt: true,
      },
      order: { instructorApplicationDate: 'DESC' },
    });
  }

  async approveInstructor(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.instructorApprovalStatus = 'approved';
    user.instructorRejectionReason = null;
    return this.userRepository.save(user);
  }

  async rejectInstructor(userId: number, reason?: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.instructorApprovalStatus = 'rejected';
    user.instructorRejectionReason = reason || 'Application does not meet requirements';
    user.role = 'student'; // Revert to student
    return this.userRepository.save(user);
  }

  // Enrollment Management Methods
  async getAllEnrollments(page: number = 1, limit: number = 10) {
    try {
      const [enrollments, total] = await this.enrollmentRepository.findAndCount({
        relations: ['user', 'course'],
        skip: (page - 1) * limit,
        take: limit,
        order: { enrolledAt: 'DESC' },
      });

      return {
        data: enrollments,
        meta: {
          page,
          limit,
          total,
          pageCount: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Error in getAllEnrollments:', error);
      throw error;
    }
  }

  async refundEnrollment(enrollmentId: number) {
    const result = await this.enrollmentRepository.delete(enrollmentId);
    if (result.affected === 0) {
      throw new NotFoundException('Enrollment not found');
    }
    return { message: 'Enrollment refunded and deleted successfully' };
  }

  // Update ANY course (Admin privilege)
  async updateCourse(courseId: number, updateData: Partial<Course>) {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    Object.assign(course, updateData);
    return this.courseRepository.save(course);
  }

  // Get all lessons for a course (Admin privilege)
  async getCourseLessons(courseId: number) {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.lessonRepository.find({
      where: { course: { id: courseId } },
      order: { order: 'ASC' },
    });
  }

  // Get a specific lesson from a specific course (Admin privilege)
  async getCourseLesson(courseId: number, lessonId: number) {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId, course: { id: courseId } },
      relations: ['course'],
    });
    
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found in course ${courseId}`);
    }
    
    return lesson;
  }

  // Get a specific lesson by ID only (Admin privilege)
  async getLesson(lessonId: number) {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      relations: ['course'],
    });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  // Delete a specific lesson from a specific course (Admin privilege)
  async deleteCourseLesson(courseId: number, lessonId: number) {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId, course: { id: courseId } },
    });
    
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found in course ${courseId}`);
    }
    
    await this.lessonRepository.delete(lessonId);
    return { message: 'Lesson deleted successfully' };
  }

  // Delete ANY lesson by ID only (Admin privilege)
  async deleteLesson(lessonId: number) {
    const result = await this.lessonRepository.delete(lessonId);
    if (result.affected === 0) {
      throw new NotFoundException('Lesson not found');
    }
    return { message: 'Lesson deleted successfully' };
  }

  // Change user role (Admin privilege)
  async changeUserRole(userId: number, newRole: string) {
    const validRoles = ['student', 'instructor', 'admin'];
    if (!validRoles.includes(newRole)) {
      throw new BadRequestException(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = newRole;
    if (newRole === 'instructor') {
      user.instructorApprovalStatus = 'approved';
    }
    return this.userRepository.save(user);
  }

  // Analytics Methods
  async getAnalytics() {
    try {
      // User Distribution by Role
      const [students, instructors, admins] = await Promise.all([
        this.userRepository.count({ where: { role: 'student' } }),
        this.userRepository.count({ where: { role: 'instructor' } }),
        this.userRepository.count({ where: { role: 'admin' } }),
      ]);
      const totalUsers = students + instructors + admins;

      const userDistribution = {
        students: { count: students, percentage: totalUsers > 0 ? Math.round((students / totalUsers) * 100) : 0 },
        instructors: { count: instructors, percentage: totalUsers > 0 ? Math.round((instructors / totalUsers) * 100) : 0 },
        admins: { count: admins, percentage: totalUsers > 0 ? Math.round((admins / totalUsers) * 100) : 0 },
      };

      // Course Categories Distribution
      const courses = await this.courseRepository.find({ select: ['category'] });
      const categoryCount: Record<string, number> = {};
      courses.forEach(course => {
        const cat = course.category || 'other';
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });
      
      const totalCourses = courses.length;
      const categoryDistribution = Object.entries(categoryCount).map(([category, count]) => ({
        category,
        count,
        percentage: totalCourses > 0 ? Math.round((count / totalCourses) * 100) : 0,
      })).sort((a, b) => b.count - a.count);

      // Weekly Enrollment Growth (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const enrollments = await this.enrollmentRepository.find({
        where: {},
        select: ['enrolledAt'],
      });

      const weeklyData: number[] = [0, 0, 0, 0, 0, 0, 0];
      const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      enrollments.forEach(enrollment => {
        const enrollDate = new Date(enrollment.enrolledAt);
        if (enrollDate >= sevenDaysAgo) {
          const dayIndex = enrollDate.getDay();
          weeklyData[dayIndex]++;
        }
      });

      // Reorder to start from today and go back
      const today = new Date().getDay();
      const orderedWeeklyData: { day: string; count: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const dayIndex = (today - i + 7) % 7;
        orderedWeeklyData.push({
          day: dayLabels[dayIndex],
          count: weeklyData[dayIndex],
        });
      }

      // Course Completion Rate
      const allEnrollments = await this.enrollmentRepository.find({
        select: ['progress'],
      });
      const completedEnrollments = allEnrollments.filter(e => e.progress === 100).length;
      const completionRate = allEnrollments.length > 0 
        ? Math.round((completedEnrollments / allEnrollments.length) * 100) 
        : 0;

      // Average Course Rating
      const reviews = await this.reviewRepository.find({ select: ['rating'] });
      const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length).toFixed(1)
        : '0.0';

      return {
        userDistribution,
        categoryDistribution,
        weeklyEnrollments: orderedWeeklyData,
        completionRate,
        averageRating: parseFloat(avgRating),
        totalEnrollments: allEnrollments.length,
        completedCourses: completedEnrollments,
      };
    } catch (error) {
      console.error('Error in getAnalytics:', error);
      throw error;
    }
  }
}
