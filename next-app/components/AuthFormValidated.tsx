'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema, registerSchema, LoginFormData, RegisterFormData } from '@/lib/validations';
import styles from './AuthFormValidated.module.css';

export type AuthMode = 'login' | 'register';

type AuthFormProps = {
  mode: AuthMode;
};

const copy: Record<AuthMode, { title: string; cta: string; subtitle: string; helper: string; helperHref: string }> = {
  login: {
    title: 'Welcome Back!',
    subtitle: 'Sign in to continue your learning journey',
    cta: 'Sign In',
    helper: "Don't have an account?",
    helperHref: '/register',
  },
  register: {
    title: 'Create Account',
    subtitle: 'Join thousands of learners worldwide',
    cta: 'Create Account',
    helper: 'Already have an account?',
    helperHref: '/login',
  },
};

export default function AuthFormValidated({ mode }: AuthFormProps) {
  const { title, cta, subtitle, helper, helperHref } = copy[mode];
  const { login, register: registerUser } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Use appropriate schema based on mode
  const schema = mode === 'login' ? loginSchema : registerSchema;
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange', // Validate on change for real-time feedback
    defaultValues: mode === 'login' 
      ? { email: '', password: '' }
      : { name: '', email: '', password: '', confirmPassword: '', role: 'student' as const },
  });

  const password = watch('password');

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    setServerError('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const loginData = data as LoginFormData;
        await login(loginData.email, loginData.password);
      } else {
        const registerData = data as RegisterFormData;
        await registerUser(registerData.email, registerData.password, registerData.name, registerData.role);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setServerError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator for registration
  const getPasswordStrength = (pass: string): { label: string; color: string; width: string } => {
    if (!pass) return { label: '', color: '', width: '0%' };
    
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;

    if (strength <= 2) return { label: 'Weak', color: '#ef4444', width: '33%' };
    if (strength <= 4) return { label: 'Medium', color: '#f59e0b', width: '66%' };
    return { label: 'Strong', color: '#10b981', width: '100%' };
  };

  const passwordStrength = mode === 'register' ? getPasswordStrength(password || '') : null;

  return (
    <div className={styles.formCard}>
      <div className={styles.formHeader}>
        <span className={styles.badge}>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <AnimatePresence mode="wait">
        {serverError && (
          <motion.div
            className={styles.errorAlert}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span className={styles.errorIcon}>!</span>
            {serverError}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {mode === 'register' && (
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>N</span>
              <input
                {...register('name' as keyof (LoginFormData | RegisterFormData))}
                id="name"
                type="text"
                placeholder="John Doe"
                className={`${styles.input} ${(errors as any).name ? styles.inputError : ''}`}
              />
              {(touchedFields as any).name && !(errors as any).name && (
                <span className={styles.validIcon}>✓</span>
              )}
            </div>
            {(errors as any).name && (
              <motion.span
                className={styles.errorMessage}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {(errors as any).name?.message}
              </motion.span>
            )}
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>@</span>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            />
            {touchedFields.email && !errors.email && (
              <span className={styles.validIcon}>✓</span>
            )}
          </div>
          {errors.email && (
            <motion.span
              className={styles.errorMessage}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.email.message}
            </motion.span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>*</span>
            <input
              {...register('password')}
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <motion.span
              className={styles.errorMessage}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.password.message}
            </motion.span>
          )}
          {mode === 'register' && password && (
            <div className={styles.passwordStrength}>
              <div className={styles.strengthBar}>
                <div
                  className={styles.strengthFill}
                  style={{
                    width: passwordStrength?.width,
                    backgroundColor: passwordStrength?.color,
                  }}
                />
              </div>
              <span style={{ color: passwordStrength?.color }}>
                {passwordStrength?.label}
              </span>
            </div>
          )}
        </div>

        {mode === 'register' && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>*</span>
                <input
                  {...register('confirmPassword' as keyof (LoginFormData | RegisterFormData))}
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`${styles.input} ${(errors as any).confirmPassword ? styles.inputError : ''}`}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {(errors as any).confirmPassword && (
                <motion.span
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {(errors as any).confirmPassword?.message}
                </motion.span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role" className={styles.label}>
                I want to
              </label>
              <div className={styles.roleSelector}>
                <label className={styles.roleOption}>
                  <input
                    {...register('role' as keyof (LoginFormData | RegisterFormData))}
                    type="radio"
                    value="student"
                    defaultChecked
                  />
                  <span className={styles.roleCard}>
                    <span className={styles.roleIcon}>S</span>
                    <span className={styles.roleTitle}>Learn</span>
                    <span className={styles.roleDesc}>Enroll in courses</span>
                  </span>
                </label>
                <label className={styles.roleOption}>
                  <input
                    {...register('role' as keyof (LoginFormData | RegisterFormData))}
                    type="radio"
                    value="instructor"
                  />
                  <span className={styles.roleCard}>
                    <span className={styles.roleIcon}>T</span>
                    <span className={styles.roleTitle}>Teach</span>
                    <span className={styles.roleDesc}>Create courses</span>
                  </span>
                </label>
              </div>
            </div>
          </>
        )}

        <motion.button
          type="submit"
          className={styles.submitBtn}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <span className={styles.spinner}></span>
              Processing...
            </>
          ) : (
            <>
              {cta}
              <span className={styles.arrow}>→</span>
            </>
          )}
        </motion.button>
      </form>

      <p className={styles.switchText}>
        {helper}{' '}
        <Link href={helperHref as any} className={styles.switchLink}>
          {mode === 'login' ? 'Create account' : 'Sign in'}
        </Link>
      </p>

      {mode === 'login' && (
        <Link href={"/forgot-password" as any} className={styles.forgotLink}>
          Forgot your password?
        </Link>
      )}
    </div>
  );
}
