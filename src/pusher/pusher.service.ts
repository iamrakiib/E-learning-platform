import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Pusher from 'pusher';

@Injectable()
export class PusherService implements OnModuleInit {
  private pusher: Pusher | null = null;
  private readonly logger = new Logger(PusherService.name);
  private isEnabled = false;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const appId = this.configService.get<string>('PUSHER_APP_ID');
    const key = this.configService.get<string>('PUSHER_KEY');
    const secret = this.configService.get<string>('PUSHER_SECRET');
    const cluster = this.configService.get<string>('PUSHER_CLUSTER') || 'ap2';

    // Only initialize if all required config is present
    if (appId && key && secret) {
      this.pusher = new Pusher({
        appId,
        key,
        secret,
        cluster,
        useTLS: true,
      });
      this.isEnabled = true;
      this.logger.log('Pusher initialized successfully');
    } else {
      this.logger.warn('Pusher not configured - real-time notifications disabled');
    }
  }

  /**
   * Trigger an event on a channel
   */
  async trigger(channel: string, event: string, data: any): Promise<boolean> {
    if (!this.isEnabled || !this.pusher) {
      this.logger.debug('Pusher not enabled, skipping trigger');
      return false;
    }

    try {
      await this.pusher.trigger(channel, event, data);
      this.logger.debug(`Triggered event ${event} on channel ${channel}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to trigger Pusher event: ${error}`);
      return false;
    }
  }

  /**
   * Send notification to a specific user
   */
  async notifyUser(userId: number, notification: {
    type: string;
    title: string;
    message: string;
    data?: any;
  }): Promise<boolean> {
    return this.trigger(`user-${userId}`, 'notification', {
      ...notification,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Send course update notification
   */
  async notifyCourseUpdate(courseId: number, update: {
    type: 'new-lesson' | 'course-updated' | 'new-review';
    title: string;
    message: string;
    data?: any;
  }): Promise<boolean> {
    return this.trigger(`course-${courseId}`, 'update', {
      ...update,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Broadcast to all users (for admin announcements)
   */
  async broadcast(event: string, data: any): Promise<boolean> {
    return this.trigger('global', event, {
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Send enrollment notification
   */
  async notifyEnrollment(instructorId: number, enrollment: {
    studentName: string;
    courseName: string;
    courseId: number;
  }): Promise<boolean> {
    return this.notifyUser(instructorId, {
      type: 'new-enrollment',
      title: 'New Student Enrolled!',
      message: `${enrollment.studentName} enrolled in "${enrollment.courseName}"`,
      data: enrollment,
    });
  }

  /**
   * Check if Pusher is enabled
   */
  isPusherEnabled(): boolean {
    return this.isEnabled;
  }
}
