# 🎓 E-Learning Platform - Advanced Backend API

A production-ready, feature-rich e-learning platform backend built with NestJS, PostgreSQL, and TypeScript. This project implements industry-standard practices including JWT authentication, role-based authorization, caching, rate limiting, comprehensive API documentation, and admin analytics.

## Features

### Core Functionality

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Authorization** - Student, Instructor, and Admin roles
- **Course Management** - Full CRUD with advanced search and filtering
- **Enrollment System** - Track student course enrollments
- **Progress Tracking** - Course-level and lesson-level progress monitoring
- **Review System** - 5-star rating with comments and duplicate prevention
- **Lesson Management** - Structured course content with ordering

### Advanced Features

- **Security Headers** - Helmet.js integration for HTTP security
- **Rate Limiting** - Throttling to prevent abuse (100 req/min)
- **Caching** - In-memory cache for frequently accessed data
- **API Documentation** - Interactive Swagger/OpenAPI docs
- **Admin Dashboard** - Analytics, user/course management, revenue tracking
- **Health Checks** - Database, memory, and disk monitoring
- **Database Indexes** - Optimized queries for performance
- **Pagination** - Efficient data retrieval for large datasets

## 📁 Project Structure

```
src/
├── admin/              # Admin dashboard and analytics
├── auth/               # Authentication & JWT strategy
├── common/             # Shared utilities, guards, decorators
├── config/             # Configuration files
├── courses/            # Course, Review, Lesson entities & logic
├── enrollments/        # Enrollment & LessonProgress tracking
├── health/             # Health check endpoints
├── logger/             # Winston logger service
├── users/              # User management
├── app.module.ts       # Root module
└── main.ts             # Application bootstrap
```

## 🛠️ Tech Stack

- **Framework:** NestJS 10.x
- **Language:** TypeScript 5.x
- **Database:** PostgreSQL with TypeORM
- **Authentication:** JWT + Passport
- **Validation:** class-validator & class-transformer
- **Documentation:** Swagger/OpenAPI
- **Security:** Helmet, Throttler
- **Caching:** @nestjs/cache-manager
- **Monitoring:** @nestjs/terminus

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

## ⚙️ Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd coursera-demo
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create a `.env` file in the root directory:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=coursera_demo

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRATION_TIME=24h

# Application
NODE_ENV=development
PORT=3000

# CORS
CORS_ORIGIN=*
```

4. **Create database**

```bash
node create-db.js
```

5. **Start the application**

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 📚 API Documentation

Once the server is running, access interactive API documentation at:

- **Swagger UI:** http://localhost:3000/api

### Key Endpoints

#### Authentication

```
POST   /auth/register          - Register new user
POST   /auth/login             - Login user
POST   /auth/change-password   - Change password (Protected)
```

#### Courses

```
GET    /courses                - Search & filter courses (cached)
GET    /courses/popular        - Top 10 popular courses (cached)
GET    /courses/:id            - Course details (cached)
POST   /courses                - Create course (Instructor)
POST   /courses/:id/reviews    - Add review (Protected)
POST   /courses/:id/lessons    - Add lesson (Instructor)
```

#### Enrollments

```
POST   /enrollments                              - Enroll in course
GET    /enrollments/my-courses                   - My enrolled courses
GET    /enrollments/stats                        - Enrollment statistics
POST   /enrollments/lessons/:lessonId/progress   - Track lesson progress
```

#### Admin (Admin Role Required)

```
GET    /admin/dashboard          - Dashboard statistics
GET    /admin/users              - All users (paginated)
POST   /admin/users/:id/toggle-status  - Activate/deactivate user
GET    /admin/courses            - All courses (paginated)
GET    /admin/revenue-analytics  - Monthly revenue data
GET    /admin/top-instructors    - Top instructors by course count
```

#### Health

```
GET    /health                   - Service health check
```

## 🔐 Authentication Flow

1. **Register/Login** → Receive JWT token
2. **Include token** in subsequent requests:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
3. **Role-based access** automatically enforced by guards

### User Roles

- **Student** - Enroll in courses, leave reviews, track progress
- **Instructor** - Create/manage courses and lessons
- **Admin** - Full platform management and analytics

## 🎯 Advanced Features Explained

### 1. Caching Strategy

Popular courses and course lists are cached for 5-10 minutes to reduce database load.

### 2. Rate Limiting

API endpoints are limited to 100 requests per minute per IP address to prevent abuse.

### 3. Database Indexes

Strategic indexes on:

- User email and role
- Course category, level, price, enrollmentCount, averageRating
- Improves query performance by 10-100x

### 4. Health Monitoring

`/health` endpoint checks:

- Database connectivity
- Memory usage (heap & RSS)
- Disk storage availability

### 5. Admin Analytics

- Total users, courses, enrollments
- Revenue tracking
- Recent enrollment trends
- Top instructors ranking

## 🔍 Search & Filter

The `/courses` endpoint supports advanced querying:

```bash
# Search by text
GET /courses?search=javascript

# Filter by category and level
GET /courses?category=programming&level=beginner

# Price range filter
GET /courses?minPrice=0&maxPrice=50

# Sort options
GET /courses?sort=rating           # Highest rated first
GET /courses?sort=popular          # Most enrolled
GET /courses?sort=newest           # Latest courses
GET /courses?sort=price-asc        # Cheapest first
```

## 📊 Database Schema

### Main Entities

- **User** - firstName, lastName, email, password, role, isActive, bio
- **Course** - title, description, price, level, category, thumbnail, averageRating, enrollmentCount
- **Enrollment** - user, course, progress (0-100), completed
- **Review** - user, course, rating (1-5), comment
- **Lesson** - course, title, content, order, videoUrl, duration
- **LessonProgress** - user, lesson, completed, timeSpent
- **Notification** - user, type, message, isRead

### Relationships

- User → Courses (Instructor creates courses)
- User → Enrollments (Student enrolls in courses)
- User → Reviews (Student reviews courses)
- Course → Lessons (Course has many lessons)
- Course → Reviews (Course has many reviews)

## 🚦 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Production Deployment

### Build

```bash
npm run build
```

### Environment

Set `NODE_ENV=production` and `synchronize: false` in TypeORM config.

### Recommendations

1. Use Redis for caching instead of in-memory
2. Enable database migrations (disable synchronize)
3. Set up proper logging (Winston to files/external service)
4. Use environment-specific .env files
5. Enable HTTPS
6. Set up CI/CD pipeline
7. Use process manager (PM2)

## 🔒 Security Best Practices Implemented

- ✅ Helmet.js security headers
- ✅ Rate limiting / Throttling
- ✅ JWT token authentication
- ✅ Password hashing (bcrypt)
- ✅ Input validation (class-validator)
- ✅ SQL injection prevention (TypeORM parameterized queries)
- ✅ CORS configuration
- ✅ Role-based access control

## 📈 Performance Optimizations

- Database indexing on frequently queried fields
- Caching for popular/static content
- Query optimization with QueryBuilder
- Pagination for large datasets
- Lazy loading for entity relationships

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Your Name - Advanced Web Development Project

## 🙏 Acknowledgments

- NestJS documentation and community
- TypeORM for excellent ORM features
- Swagger for API documentation

---

**Built with ❤️ using NestJS**
