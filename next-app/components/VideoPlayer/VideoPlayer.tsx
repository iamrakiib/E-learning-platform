'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { videoApi, VideoAsset, VideoProgress } from '@/lib/api';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  videoId?: string;
  lessonId?: number;
  src?: string;
  poster?: string;
  title?: string;
  onProgress?: (progress: VideoProgress) => void;
  onComplete?: () => void;
  autoPlay?: boolean;
}

export default function VideoPlayer({
  videoId,
  lessonId,
  src,
  poster,
  title,
  onProgress,
  onComplete,
  autoPlay = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [video, setVideo] = useState<VideoAsset | null>(null);
  const [progress, setProgress] = useState<VideoProgress | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<string>('auto');
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Load video and progress
  useEffect(() => {
    const loadVideo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let videoData: VideoAsset | null = null;

        if (videoId) {
          videoData = await videoApi.getVideo(videoId);
        } else if (lessonId) {
          videoData = await videoApi.getVideoByLesson(lessonId);
        }

        if (videoData) {
          setVideo(videoData);
          
          // Load progress
          const progressData = await videoApi.getProgress(videoData.id);
          if (progressData) {
            setProgress(progressData);
            setPlaybackSpeed(progressData.playbackSpeed || 1);
            if (progressData.preferredQuality) {
              setSelectedQuality(progressData.preferredQuality);
            }
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load video');
      } finally {
        setIsLoading(false);
      }
    };

    if (videoId || lessonId) {
      loadVideo();
    } else {
      setIsLoading(false);
    }
  }, [videoId, lessonId]);

  // Set initial time from progress
  useEffect(() => {
    if (videoRef.current && progress && !isNaN(progress.currentTime)) {
      videoRef.current.currentTime = progress.currentTime;
    }
  }, [progress, video]);

  // Hide controls after inactivity
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSpeedMenu(false);
        setShowQualityMenu(false);
      }, 3000);
    }
  }, [isPlaying]);

  // Mouse move handler
  const handleMouseMove = useCallback(() => {
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  // Save progress periodically
  const saveProgress = useCallback(async () => {
    if (!video || !videoRef.current) return;

    try {
      const newProgress = await videoApi.updateProgress(video.id, {
        currentTime: videoRef.current.currentTime,
        watchedDuration: videoRef.current.currentTime,
        playbackSpeed,
        preferredQuality: selectedQuality,
      });
      setProgress(newProgress);
      onProgress?.(newProgress);

      if (newProgress.completed && !progress?.completed) {
        onComplete?.();
      }
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  }, [video, playbackSpeed, selectedQuality, onProgress, onComplete, progress]);

  // Time update handler
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    
    // Save progress every 10 seconds
    if (Math.floor(videoRef.current.currentTime) % 10 === 0) {
      saveProgress();
    }
  }, [saveProgress]);

  // Progress bar click handler
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  }, [duration]);

  // Play/Pause toggle
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [isPlaying]);

  // Volume change
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  }, []);

  // Mute toggle
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    
    if (isMuted) {
      videoRef.current.volume = volume || 1;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  // Speed change
  const changeSpeed = useCallback((speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  }, []);

  // Format time
  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Skip forward/backward
  const skip = useCallback((seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
  }, [duration]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skip(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          skip(10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume((v) => Math.min(1, v + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume((v) => Math.max(0, v - 0.1));
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, skip, toggleMute, toggleFullscreen]);

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Save progress on unmount
  useEffect(() => {
    return () => {
      saveProgress();
    };
  }, [saveProgress]);

  // Get video source URL
  const getVideoSrc = useCallback(() => {
    if (src) return src;
    if (video?.id) {
      // Check if HLS is available
      if (video.hlsPlaylistPath) {
        return videoApi.getHLSUrl(video.id);
      }
      return videoApi.getStreamUrl(video.id, selectedQuality !== 'auto' ? selectedQuality : undefined);
    }
    return '';
  }, [src, video, selectedQuality]);

  // Get poster image
  const getPoster = useCallback(() => {
    if (poster) return poster;
    if (video?.id) {
      return videoApi.getThumbnailUrl(video.id);
    }
    return undefined;
  }, [poster, video]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading video...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <span className={styles.errorIcon}>⚠️</span>
        <p>{error}</p>
      </div>
    );
  }

  if (!video && !src) {
    return (
      <div className={styles.noVideoContainer}>
        <span className={styles.noVideoIcon}>🎬</span>
        <p>No video available</p>
      </div>
    );
  }

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div
      ref={containerRef}
      className={`${styles.videoContainer} ${isFullscreen ? styles.fullscreen : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className={styles.video}
        src={getVideoSrc()}
        poster={getPoster()}
        autoPlay={autoPlay}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={() => setDuration(videoRef.current?.duration || 0)}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onProgress={() => {
          if (videoRef.current?.buffered.length) {
            setBuffered(videoRef.current.buffered.end(0));
          }
        }}
        onEnded={() => {
          saveProgress();
          onComplete?.();
        }}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}

      {/* Play button overlay */}
      {!isPlaying && !isLoading && (
        <button className={styles.playOverlay} onClick={togglePlay}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}

      {/* Controls */}
      <div className={`${styles.controls} ${showControls ? styles.visible : ''}`}>
        {/* Progress bar */}
        <div
          ref={progressBarRef}
          className={styles.progressBar}
          onClick={handleProgressClick}
        >
          <div
            className={styles.buffered}
            style={{ width: `${(buffered / duration) * 100}%` }}
          />
          <div
            className={styles.progress}
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <div
            className={styles.progressHandle}
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        {/* Control buttons */}
        <div className={styles.controlsRow}>
          <div className={styles.leftControls}>
            {/* Play/Pause */}
            <button onClick={togglePlay} className={styles.controlButton}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Skip buttons */}
            <button onClick={() => skip(-10)} className={styles.controlButton} title="Back 10s">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
              </svg>
            </button>
            <button onClick={() => skip(10)} className={styles.controlButton} title="Forward 10s">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
              </svg>
            </button>

            {/* Volume */}
            <div className={styles.volumeControl}>
              <button onClick={toggleMute} className={styles.controlButton}>
                {isMuted || volume === 0 ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
              />
            </div>

            {/* Time */}
            <span className={styles.time}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className={styles.rightControls}>
            {/* Speed */}
            <div className={styles.menuContainer}>
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className={styles.controlButton}
              >
                {playbackSpeed}x
              </button>
              {showSpeedMenu && (
                <div className={styles.menu}>
                  {speedOptions.map((speed) => (
                    <button
                      key={speed}
                      className={`${styles.menuItem} ${playbackSpeed === speed ? styles.active : ''}`}
                      onClick={() => changeSpeed(speed)}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button onClick={toggleFullscreen} className={styles.controlButton}>
              {isFullscreen ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Title */}
      {title && showControls && (
        <div className={styles.titleOverlay}>
          <h3>{title}</h3>
        </div>
      )}
    </div>
  );
}
