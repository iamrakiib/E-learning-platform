'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Pusher, { Channel } from 'pusher-js';

// Pusher configuration - use environment variables
const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY || '';
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap2';

interface PusherNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  timestamp: string;
}

interface UsePusherOptions {
  userId?: number;
  courseId?: number;
  enabled?: boolean;
}

export function usePusher(options: UsePusherOptions = {}) {
  const { userId, courseId, enabled = true } = options;
  const pusherRef = useRef<Pusher | null>(null);
  const channelsRef = useRef<Map<string, Channel>>(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<PusherNotification[]>([]);

  // Initialize Pusher
  useEffect(() => {
    if (!enabled || !PUSHER_KEY) {
      return;
    }

    // Enable Pusher logging in development
    if (process.env.NODE_ENV === 'development') {
      Pusher.logToConsole = true;
    }

    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      forceTLS: true,
    });

    pusher.connection.bind('connected', () => {
      setIsConnected(true);
      console.log('Pusher connected');
    });

    pusher.connection.bind('disconnected', () => {
      setIsConnected(false);
      console.log('Pusher disconnected');
    });

    pusher.connection.bind('error', (err: any) => {
      console.error('Pusher error:', err);
    });

    pusherRef.current = pusher;

    return () => {
      pusher.disconnect();
      pusherRef.current = null;
      channelsRef.current.clear();
    };
  }, [enabled]);

  // Subscribe to user channel
  useEffect(() => {
    if (!pusherRef.current || !userId) return;

    const channelName = `user-${userId}`;
    const channel = pusherRef.current.subscribe(channelName);

    channel.bind('notification', (data: PusherNotification) => {
      setNotifications((prev) => [
        { ...data, id: `${Date.now()}-${Math.random()}` },
        ...prev,
      ].slice(0, 50)); // Keep last 50 notifications
    });

    channelsRef.current.set(channelName, channel);

    return () => {
      pusherRef.current?.unsubscribe(channelName);
      channelsRef.current.delete(channelName);
    };
  }, [userId]);

  // Subscribe to course channel
  useEffect(() => {
    if (!pusherRef.current || !courseId) return;

    const channelName = `course-${courseId}`;
    const channel = pusherRef.current.subscribe(channelName);

    channel.bind('update', (data: PusherNotification) => {
      setNotifications((prev) => [
        { ...data, id: `${Date.now()}-${Math.random()}` },
        ...prev,
      ].slice(0, 50));
    });

    channelsRef.current.set(channelName, channel);

    return () => {
      pusherRef.current?.unsubscribe(channelName);
      channelsRef.current.delete(channelName);
    };
  }, [courseId]);

  // Subscribe to global channel
  useEffect(() => {
    if (!pusherRef.current) return;

    const channel = pusherRef.current.subscribe('global');

    channel.bind('announcement', (data: PusherNotification) => {
      setNotifications((prev) => [
        { ...data, id: `${Date.now()}-${Math.random()}` },
        ...prev,
      ].slice(0, 50));
    });

    channelsRef.current.set('global', channel);

    return () => {
      pusherRef.current?.unsubscribe('global');
      channelsRef.current.delete('global');
    };
  }, []);

  // Clear notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Remove single notification
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    isConnected,
    notifications,
    clearNotifications,
    removeNotification,
  };
}

export default usePusher;
