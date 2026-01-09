import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from '../users/notification.entity';
import { User } from '../users/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  // Create a new notification
  async create(
    user: User | { id: number },
    type: NotificationType,
    title: string,
    message: string,
  ): Promise<Notification> {
    const notification = this.notificationRepository.create({
      user: user as User,
      type,
      title,
      message,
      isRead: false,
    });
    return this.notificationRepository.save(notification);
  }

  // Get all notifications for a user
  async findByUser(userId: number, page: number = 1, limit: number = 20): Promise<{
    data: Notification[];
    meta: { page: number; limit: number; total: number; unreadCount: number };
  }> {
    const [notifications, total] = await this.notificationRepository.findAndCount({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const unreadCount = await this.notificationRepository.count({
      where: { user: { id: userId }, isRead: false },
    });

    return {
      data: notifications,
      meta: { page, limit, total, unreadCount },
    };
  }

  // Get unread count for a user
  async getUnreadCount(userId: number): Promise<number> {
    return this.notificationRepository.count({
      where: { user: { id: userId }, isRead: false },
    });
  }

  // Mark a single notification as read
  async markAsRead(notificationId: number, userId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId, user: { id: userId } },
    });
    
    if (!notification) {
      return null;
    }

    notification.isRead = true;
    return this.notificationRepository.save(notification);
  }

  // Mark all notifications as read for a user
  async markAllAsRead(userId: number): Promise<{ updated: number }> {
    const result = await this.notificationRepository.update(
      { user: { id: userId }, isRead: false },
      { isRead: true },
    );
    return { updated: result.affected || 0 };
  }

  // Delete a notification
  async delete(notificationId: number, userId: number): Promise<boolean> {
    const result = await this.notificationRepository.delete({
      id: notificationId,
      user: { id: userId },
    });
    return result.affected > 0;
  }

  // ============ Helper methods for auto-notifications ============

  // Notify instructor when student enrolls
  async notifyEnrollment(instructorId: number, studentName: string, courseTitle: string) {
    return this.create(
      { id: instructorId },
      NotificationType.ENROLLMENT,
      'New Student Enrolled!',
      `${studentName} has enrolled in your course "${courseTitle}".`,
    );
  }

  // Notify instructor when course is approved
  async notifyCourseApproved(instructorId: number, courseTitle: string) {
    return this.create(
      { id: instructorId },
      NotificationType.SYSTEM,
      'Course Approved!',
      `Your course "${courseTitle}" has been approved and is now live on the platform.`,
    );
  }

  // Notify instructor when course is rejected
  async notifyCourseRejected(instructorId: number, courseTitle: string, reason: string) {
    return this.create(
      { id: instructorId },
      NotificationType.SYSTEM,
      'Course Rejected',
      `Your course "${courseTitle}" was not approved. Reason: ${reason}`,
    );
  }

  // Notify instructor when new review is posted
  async notifyNewReview(instructorId: number, studentName: string, courseTitle: string, rating: number) {
    return this.create(
      { id: instructorId },
      NotificationType.REVIEW,
      'New Course Review',
      `${studentName} left a ${rating}-star review on your course "${courseTitle}".`,
    );
  }

  // Notify student on progress milestone
  async notifyProgressMilestone(studentId: number, courseTitle: string, progress: number) {
    const milestoneMessages = {
      25: 'Great start! You\'re 25% through',
      50: 'Halfway there! You\'ve completed 50% of',
      75: 'Almost done! You\'re 75% through',
      100: 'Congratulations! You\'ve completed',
    };

    const message = milestoneMessages[progress];
    if (!message) return null;

    return this.create(
      { id: studentId },
      NotificationType.PROGRESS_MILESTONE,
      progress === 100 ? 'Course Completed!' : 'Progress Milestone',
      `${message} "${courseTitle}".`,
    );
  }

  // Notify students when course content is updated
  async notifyCourseUpdate(studentId: number, courseTitle: string, updateDescription: string) {
    return this.create(
      { id: studentId },
      NotificationType.COURSE_UPDATE,
      'Course Updated',
      `The course "${courseTitle}" has been updated: ${updateDescription}`,
    );
  }
}
