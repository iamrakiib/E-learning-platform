import { z } from 'zod';

// Login validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

// Register validation schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must be less than 32 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
  role: z.enum(['student', 'instructor']),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Course creation schema
export const createCourseSchema = z.object({
  title: z
    .string()
    .min(1, 'Course title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  category: z
    .string()
    .min(1, 'Category is required'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  price: z
    .number()
    .min(0, 'Price cannot be negative')
    .optional(),
});

// Review schema
export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, 'Please select a rating')
    .max(5, 'Rating cannot exceed 5'),
  comment: z
    .string()
    .min(1, 'Review comment is required')
    .min(10, 'Comment must be at least 10 characters')
    .max(500, 'Comment must be less than 500 characters'),
});

// Profile update schema
export const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  currentPassword: z
    .string()
    .optional(),
  newPassword: z
    .string()
    .min(6, 'New password must be at least 6 characters')
    .optional()
    .or(z.literal('')),
}).refine(
  (data) => {
    if (data.newPassword && !data.currentPassword) {
      return false;
    }
    return true;
  },
  {
    message: 'Current password is required to set a new password',
    path: ['currentPassword'],
  }
);

// Types exported from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreateCourseFormData = z.infer<typeof createCourseSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
