'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { chatbotApi, ChatSession, ChatMessage, ChatResponse } from '@/lib/api';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Chatbot.module.css';

interface ChatbotProps {
  courseId?: number;
  lessonId?: number;
  courseName?: string;
  lessonName?: string;
}

export default function Chatbot({ courseId, lessonId, courseName, lessonName }: ChatbotProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSessions, setShowSessions] = useState(false);
  const [configured, setConfigured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Check chatbot status
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await chatbotApi.getStatus();
        setConfigured(status.configured);
      } catch (err) {
        console.error('Failed to check chatbot status:', err);
      }
    };
    
    // Check status on mount (no user required - chatbot is public)
    checkStatus();
  }, []);

  // Load sessions
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const sessionList = await chatbotApi.getSessions(courseId);
        setSessions(sessionList);
      } catch (err) {
        console.error('Failed to load sessions:', err);
      }
    };

    // Load sessions when chatbot is open (no user required - uses clientId for anonymous)
    if (isOpen) {
      loadSessions();
    }
  }, [isOpen, courseId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load session messages
  const loadSession = useCallback(async (sessionId: string) => {
    try {
      setIsLoading(true);
      const session = await chatbotApi.getSession(sessionId);
      setActiveSession(session);
      setMessages(session.messages || []);
      setShowSessions(false);
    } catch (err) {
      setError('Failed to load chat session');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create new session
  const createNewSession = useCallback(async () => {
    setActiveSession(null);
    setMessages([]);
    setShowSessions(false);
  }, []);

  // Send message
  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);

    // Optimistically add user message
    const tempUserMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      content: userMessage,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMessage]);

    try {
      setIsLoading(true);
      const response = await chatbotApi.sendMessage({
        message: userMessage,
        sessionId: activeSession?.id,
        courseId,
        lessonId,
      });

      console.log('Chatbot response:', response);
      console.log('Response message:', response.message);

      // Update session
      if (response.session) {
        setActiveSession(response.session);
      }
      
      // Add the assistant's response message to the messages list
      if (response.message) {
        setMessages((prev) => {
          const filtered = prev.filter((m) => !m.id.startsWith('temp-'));
          // Add the user message and assistant response
          const newMessages = [
            ...filtered,
            { id: `user-${Date.now()}`, content: userMessage, role: 'user' as const, createdAt: new Date().toISOString() },
            response.message,
          ];
          console.log('Updated messages:', newMessages);
          return newMessages;
        });
      } else {
        console.error('No message in response:', response);
        // Still update with user message at least
        setMessages((prev) => {
          const filtered = prev.filter((m) => !m.id.startsWith('temp-'));
          return [
            ...filtered,
            { id: `user-${Date.now()}`, content: userMessage, role: 'user' as const, createdAt: new Date().toISOString() },
          ];
        });
      }

      // Reload sessions list
      const sessionList = await chatbotApi.getSessions(courseId);
      setSessions(sessionList);

    } catch (err: any) {
      console.error('Chatbot error:', err);
      setError(err.message || 'Failed to send message');
      // Remove temp message on error
      setMessages((prev) => prev.filter((m) => !m.id.startsWith('temp-')));
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, activeSession, courseId, lessonId]);

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Delete session
  const deleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await chatbotApi.deleteSession(sessionId);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (activeSession?.id === sessionId) {
        setActiveSession(null);
        setMessages([]);
      }
    } catch (err) {
      setError('Failed to delete session');
    }
  };

  // Chatbot is now public - available for all users

  return (
    <div className={styles.chatbotContainer}>
      {/* Toggle Button */}
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        title="AI Assistant"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`${styles.chatWindow} ${isMinimized ? styles.minimized : ''}`}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <h3>🤖 AI Assistant</h3>
              {courseName && <span className={styles.contextBadge}>{courseName}</span>}
            </div>
            <div className={styles.headerActions}>
              <button onClick={() => setShowSessions(!showSessions)} title="Chat History">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button onClick={createNewSession} title="New Chat">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <button onClick={() => setIsMinimized(!isMinimized)} title={isMinimized ? 'Expand' : 'Minimize'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {isMinimized ? (
                    <polyline points="15 3 21 3 21 9" />
                  ) : (
                    <line x1="5" y1="12" x2="19" y2="12" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Sessions Panel */}
              {showSessions && (
                <div className={styles.sessionsPanel}>
                  <h4>Chat History</h4>
                  {sessions.length === 0 ? (
                    <p className={styles.noSessions}>No previous chats</p>
                  ) : (
                    <ul>
                      {sessions.map((session) => (
                        <li
                          key={session.id}
                          className={activeSession?.id === session.id ? styles.active : ''}
                          onClick={() => loadSession(session.id)}
                        >
                          <span className={styles.sessionTitle}>{session.title}</span>
                          <span className={styles.sessionDate}>
                            {new Date(session.updatedAt).toLocaleDateString()}
                          </span>
                          <button
                            className={styles.deleteSession}
                            onClick={(e) => deleteSession(session.id, e)}
                            title="Delete"
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Messages */}
              <div className={styles.messagesContainer}>
                {messages.length === 0 ? (
                  <div className={styles.welcomeMessage}>
                    <div className={styles.welcomeIcon}>🤖</div>
                    <h4>Hello! I'm your AI Learning Assistant</h4>
                    <p>
                      {courseId
                        ? `Ask me anything about "${courseName || 'this course'}"!`
                        : 'Ask me anything about your courses!'}
                    </p>
                    <div className={styles.suggestions}>
                      <button onClick={() => setInput('Can you explain the main concepts?')}>
                        Explain main concepts
                      </button>
                      <button onClick={() => setInput('Give me a summary of this lesson')}>
                        Summarize this lesson
                      </button>
                      <button onClick={() => setInput('What should I focus on?')}>
                        What to focus on
                      </button>
                    </div>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`${styles.message} ${styles[msg.role]}`}
                    >
                      <div className={styles.messageContent}>
                        {msg.role === 'assistant' && (
                          <span className={styles.botIcon}>🤖</span>
                        )}
                        <div className={styles.messageText}>
                          {msg.content.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      </div>
                      {msg.metadata?.model && (
                        <span className={styles.messageModel}>{msg.metadata.model}</span>
                      )}
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className={`${styles.message} ${styles.assistant}`}>
                    <div className={styles.messageContent}>
                      <span className={styles.botIcon}>🤖</span>
                      <div className={styles.typingIndicator}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className={styles.errorMessage}>
                    <span>⚠️ {error}</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className={styles.inputContainer}>
                {!configured && (
                  <div className={styles.unconfiguredWarning}>
                    ⚠️ AI is running in demo mode. Configure API keys for full functionality.
                  </div>
                )}
                <div className={styles.inputWrapper}>
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    rows={1}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className={styles.sendButton}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
