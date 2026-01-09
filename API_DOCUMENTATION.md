# 📚 E-Learning Platform - Complete API Documentation

**Base URL:** `http://localhost:3000`

---

## 🔐 Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Register

```http
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "access_token": "jwt_token_here",
  "user": { "id": 1, "email": "john@example.com", "role": "student" }
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "access_token": "jwt_token_here",
  "user": { "id": 1, "email": "john@example.com", "role": "student" }
}
```

### Change Password

```http
POST /auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}

Response: {
  "message": "Password updated successfully"
}
```

---

## 🌐 Public Endpoints (No Authentication Required)

### Get All Courses (Limited Fields)

```http
GET /courses?search=javascript&category=programming&level=beginner&minPrice=0&maxPrice=100&sort=popular

Response: [
  {
    "id": 1,
    "title": "JavaScript Basics",
    "description": "Learn JavaScript from scratch",
    "instructor": "John Instructor",
    "price": 49.99,
    "duration": 30,
    "level": "beginner",
    "thumbnail": "url",
    "enrollmentCount": 150,
    "averageRating": 4.5
  }
]
```

**Query Parameters:**

- `search` - Search in title/description
- `category` - programming, design, business, marketing, data_science, other
- `level` - beginner, intermediate, advanced
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sort` - price-asc, price-desc, rating, popular, newest

### Get Popular Courses

```http
GET /courses/popular

Response: [
  {
    "id": 1,
    "title": "Most Popular Course",
    "description": "...",
    "instructor": "Top Instructor",
    "price": 99.99,
    "duration": 50,
    "level": "intermediate",
    "thumbnail": "url",
    "averageRating": 4.8,
    "enrollmentCount": 500
  }
]
```

_Cached for 10 minutes_

### Get Course Details (Limited Fields)

```http
GET /courses/:id

Response: {
  "id": 1,
  "title": "JavaScript Basics",
  "description": "Complete description",
  "instructor": "John Instructor",
  "price": 49.99,
  "duration": 30,
  "level": "beginner",
  "thumbnail": "url",
  "averageRating": 4.5
}
```

### Get Course Reviews

```http
GET /courses/:id/reviews

Response: [
  {
    "id": 1,
    "rating": 5,
    "comment": "Excellent course!",
    "user": {
      "id": 2,
      "firstName": "Alice",
      "lastName": "Student"
    },
    "createdAt": "2024-01-15T10:00:00Z"
  }
]
```

---

## 👤 Student Endpoints (Requires: Authentication)

### Get All Courses (Full Details)

```http
GET /courses/all-authenticated
Authorization: Bearer <token>

Response: [
  {
    "id": 1,
    "title": "JavaScript Basics",
    "description": "...",
    "instructor": "John Instructor",
    "price": 49.99,
    "duration": 30,
    "level": "beginner",
    "category": "programming",
    "thumbnail": "url",
    "enrollmentCount": 150,
    "averageRating": 4.5,
    "createdAt": "2024-01-01T00:00:00Z",
    "status": "approved",
    "isActive": true
  }
]
```

### Get Full Course Details with Reviews

```http
GET /courses/detailed/:id
Authorization: Bearer <token>

Response: {
  "id": 1,
  "title": "JavaScript Basics",
  "description": "...",
  "reviews": [
    {
      "id": 1,
      "rating": 5,
      "comment": "Great!",
      "user": { "firstName": "Alice" }
    }
  ]
}
```

### Add Course Review

```http
POST /courses/:id/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent course!"
}

Response: {
  "id": 10,
  "rating": 5,
  "comment": "Excellent course!",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### Enroll in Course

```http
POST /enrollments
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": 1
}

Response: {
  "id": 5,
  "progress": 0,
  "completed": false,
  "enrolledAt": "2024-01-15T10:00:00Z",
  "course": { "id": 1, "title": "JavaScript Basics" }
}
```

### Get My Enrollments

```http
GET /enrollments/my-courses
Authorization: Bearer <token>

Response: [
  {
    "id": 5,
    "progress": 45,
    "completed": false,
    "enrolledAt": "2024-01-15T10:00:00Z",
    "course": {
      "id": 1,
      "title": "JavaScript Basics",
      "instructor": "John Instructor"
    }
  }
]
```

### Get Enrollment Stats

```http
GET /enrollments/stats
Authorization: Bearer <token>

Response: {
  "totalEnrollments": 5,
  "completedCourses": 2,
  "inProgressCourses": 3,
  "totalHoursSpent": 150
}
```

### Get Course Lessons (Must be enrolled)

```http
GET /courses/:courseId/lessons
Authorization: Bearer <token>

Response: [
  {
    "id": 1,
    "title": "Introduction",
    "content": "Welcome to the course...",
    "order": 1,
    "videoUrl": "http://localhost:3000/uploads/videos/video-123.mp4",
    "duration": 15,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Get Specific Lesson (Must be enrolled)

```http
GET /courses/:courseId/lessons/:lessonId
Authorization: Bearer <token>

Response: {
  "id": 1,
  "title": "Introduction",
  "content": "Full lesson content here...",
  "order": 1,
  "videoUrl": "http://localhost:3000/uploads/videos/video-123.mp4",
  "duration": 15
}
```

### Update Lesson Progress

```http
POST /enrollments/lessons/:lessonId/progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "completed": true,
  "timeSpent": 15
}

Response: {
  "id": 10,
  "completed": true,
  "timeSpent": 15,
  "lastAccessedAt": "2024-01-15T10:00:00Z"
}
```

### Update Overall Course Progress

```http
PUT /enrollments/:enrollmentId/progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "progress": 75
}

Response: {
  "id": 5,
  "progress": 75,
  "completed": false
}
```

### Get Lesson Progress for a Course

```http
GET /enrollments/courses/:courseId/lesson-progress
Authorization: Bearer <token>

Response: [
  {
    "id": 1,
    "completed": true,
    "timeSpent": 15,
    "lesson": {
      "id": 1,
      "title": "Introduction"
    }
  }
]
```

---

## 👨‍🏫 Instructor Endpoints (Requires: Role = 'instructor')

### Create New Course

```http
POST /courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Advanced React Patterns",
  "description": "Learn advanced React patterns and best practices",
  "price": 149.99,
  "duration": 60,
  "level": "advanced",
  "category": "programming"
}

Response: {
  "id": 10,
  "title": "Advanced React Patterns",
  "instructor": "John Instructor",
  "status": "draft",
  "isActive": false,
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### Get My Courses (Instructor's own courses)

```http
GET /courses/instructor/my-courses
Authorization: Bearer <token>

Response: [
  {
    "id": 10,
    "title": "Advanced React Patterns",
    "description": "...",
    "price": 149.99,
    "enrollmentCount": 25,
    "averageRating": 4.7,
    "status": "approved",
    "isActive": true
  }
]
```

### Update My Course

```http
PUT /courses/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Course Title",
  "price": 129.99,
  "description": "Updated description"
}

Response: {
  "id": 10,
  "title": "Updated Course Title",
  "price": 129.99
}
```

_Note: Can only update your own courses_

### Delete My Course

```http
DELETE /courses/:id
Authorization: Bearer <token>

Response: {
  "message": "Course deleted successfully"
}
```

_Note: Can only delete your own courses_

### Add Lesson to Course

```http
POST /courses/:courseId/lessons
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Introduction to React Hooks",
  "content": "In this lesson we will cover...",
  "order": 1,
  "duration": 20
}

Response: {
  "id": 50,
  "title": "Introduction to React Hooks",
  "content": "...",
  "order": 1,
  "duration": 20,
  "createdAt": "2024-01-15T10:00:00Z"
}
```

_Note: Can only add lessons to your own courses_

### Delete Lesson from Course

```http
DELETE /courses/:courseId/lessons/:lessonId
Authorization: Bearer <token>

Response: {
  "message": "Lesson deleted successfully"
}
```

_Note: Can only delete lessons from your own courses_

### Upload Video for Lesson

```http
POST /courses/:courseId/lessons/:lessonId/video
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- video: [video file] (Max 100MB)

Response: {
  "message": "Video uploaded successfully",
  "courseId": 10,
  "lessonId": 50,
  "videoUrl": "http://localhost:3000/uploads/videos/video-1234567890.mp4",
  "filename": "video-1234567890.mp4",
  "size": 52428800
}
```

_Accepted formats: mp4, avi, mov, webm, mkv, mpeg, wmv_
_Note: Can only upload to lessons in your own courses_

---

## 👑 Admin Endpoints (Requires: Role = 'admin')

### Dashboard Statistics

```http
GET /admin/dashboard
Authorization: Bearer <token>

Response: {
  "overview": {
    "totalUsers": 150,
    "totalCourses": 45,
    "totalEnrollments": 320,
    "totalRevenue": "15750.50",
    "activeUsers": 142,
    "activeCourses": 40
  }
}
```

### Get All Users

```http
GET /admin/users?page=1&limit=10
Authorization: Bearer <token>

Response: {
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "student",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "pageCount": 15
  }
}
```

### Toggle User Status

```http
POST /admin/users/:id/toggle-status
Authorization: Bearer <token>

Response: {
  "id": 5,
  "isActive": false
}
```

### Delete User

```http
DELETE /admin/users/:id
Authorization: Bearer <token>

Response: {
  "message": "User deleted successfully"
}
```

### Change User Role

```http
PUT /admin/users/:id/role
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "instructor"
}

Response: {
  "id": 5,
  "role": "instructor",
  "instructorApprovalStatus": "approved"
}
```

_Valid roles: student, instructor, admin_

### Get All Courses

```http
GET /admin/courses?page=1&limit=10
Authorization: Bearer <token>

Response: {
  "data": [
    {
      "id": 1,
      "title": "JavaScript Basics",
      "status": "approved",
      "enrollmentCount": 150,
      "instructorUser": {
        "firstName": "John",
        "lastName": "Instructor"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pageCount": 5
  }
}
```

### Update Any Course

```http
PUT /admin/courses/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved",
  "isActive": true,
  "price": 99.99
}

Response: {
  "id": 10,
  "status": "approved",
  "isActive": true
}
```

### Toggle Course Status

```http
POST /admin/courses/:id/toggle-status
Authorization: Bearer <token>

Response: {
  "id": 10,
  "isActive": false
}
```

### Delete Any Course

```http
DELETE /admin/courses/:id
Authorization: Bearer <token>

Response: {
  "message": "Course deleted successfully"
}
```

### Get Pending Courses (Awaiting Approval)

```http
GET /admin/courses/pending
Authorization: Bearer <token>

Response: [
  {
    "id": 15,
    "title": "New Course",
    "status": "pending_review",
    "instructorUser": {
      "firstName": "Jane",
      "lastName": "Instructor"
    },
    "createdAt": "2024-01-15T10:00:00Z"
  }
]
```

### Approve Course

```http
POST /admin/courses/:id/approve
Authorization: Bearer <token>

Response: {
  "id": 15,
  "status": "approved",
  "isActive": true,
  "rejectionReason": null
}
```

### Reject Course

```http
POST /admin/courses/:id/reject?reason=Content does not meet quality standards
Authorization: Bearer <token>

Response: {
  "id": 15,
  "status": "rejected",
  "isActive": false,
  "rejectionReason": "Content does not meet quality standards"
}
```

### Get Course Lessons

```http
GET /admin/courses/:id/lessons
Authorization: Bearer <token>

Response: [
  {
    "id": 1,
    "title": "Introduction",
    "order": 1,
    "duration": 15,
    "videoUrl": "..."
  }
]
```

### Get Specific Lesson (with course context)

```http
GET /admin/courses/:courseId/lessons/:lessonId
Authorization: Bearer <token>

Response: {
  "id": 1,
  "title": "Introduction",
  "content": "...",
  "order": 1,
  "course": {
    "id": 10,
    "title": "Course Name"
  }
}
```

### Get Lesson by ID (direct access)

```http
GET /admin/lessons/:id
Authorization: Bearer <token>

Response: {
  "id": 1,
  "title": "Introduction",
  "content": "...",
  "course": {
    "id": 10,
    "title": "Course Name"
  }
}
```

### Delete Lesson (with course context)

```http
DELETE /admin/courses/:courseId/lessons/:lessonId
Authorization: Bearer <token>

Response: {
  "message": "Lesson deleted successfully"
}
```

### Delete Lesson by ID (direct)

```http
DELETE /admin/lessons/:id
Authorization: Bearer <token>

Response: {
  "message": "Lesson deleted successfully"
}
```

### Get Pending Instructor Applications

```http
GET /admin/instructors/pending
Authorization: Bearer <token>

Response: [
  {
    "id": 20,
    "firstName": "Bob",
    "lastName": "Teacher",
    "email": "bob@instructor.com",
    "instructorApplicationDate": "2024-01-15T10:00:00Z"
  }
]
```

### Approve Instructor

```http
POST /admin/instructors/:id/approve
Authorization: Bearer <token>

Response: {
  "id": 20,
  "instructorApprovalStatus": "approved",
  "instructorRejectionReason": null
}
```

### Reject Instructor

```http
POST /admin/instructors/:id/reject?reason=Insufficient qualifications
Authorization: Bearer <token>

Response: {
  "id": 20,
  "role": "student",
  "instructorApprovalStatus": "rejected",
  "instructorRejectionReason": "Insufficient qualifications"
}
```

### Get All Enrollments

```http
GET /admin/enrollments?page=1&limit=10
Authorization: Bearer <token>

Response: {
  "data": [
    {
      "id": 1,
      "progress": 75,
      "enrolledAt": "2024-01-01T00:00:00Z",
      "user": {
        "firstName": "Alice",
        "email": "alice@example.com"
      },
      "course": {
        "title": "JavaScript Basics"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 320,
    "pageCount": 32
  }
}
```

### Refund/Delete Enrollment

```http
DELETE /admin/enrollments/:id
Authorization: Bearer <token>

Response: {
  "message": "Enrollment refunded and deleted successfully"
}
```

### Get Top Instructors

```http
GET /admin/top-instructors?limit=10
Authorization: Bearer <token>

Response: [
  {
    "id": 5,
    "firstName": "John",
    "lastName": "Instructor",
    "email": "john@instructor.com",
    "courseCount": 15,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Get Revenue Analytics

```http
GET /admin/revenue-analytics
Authorization: Bearer <token>

Response: [
  {
    "month": "2024-01-01",
    "revenue": 5250.50,
    "enrollments": 45
  },
  {
    "month": "2023-12-01",
    "revenue": 4800.25,
    "enrollments": 38
  }
]
```

_Returns last 12 months of data_

---

## 📊 Query Parameters Reference

### Course Filters

- **search**: Text search in title/description
- **category**: programming | design | business | marketing | data_science | other
- **level**: beginner | intermediate | advanced
- **minPrice**: Number (minimum price)
- **maxPrice**: Number (maximum price)
- **sort**: price-asc | price-desc | rating | popular | newest

### Pagination

- **page**: Page number (default: 1)
- **limit**: Items per page (default: 10)

---

## 🔒 Role-Based Access Summary

| Role           | Can Do                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------- |
| **Public**     | View courses (limited), search, view reviews                                                 |
| **Student**    | All public + enroll, view full details, add reviews, track progress, access enrolled lessons |
| **Instructor** | All student + create courses, manage own courses, add/delete lessons, upload videos          |
| **Admin**      | Everything + manage users, approve courses/instructors, view analytics, access all content   |

---

## ⚠️ Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 403 Forbidden

```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Course with ID 999 not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error

```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## 🚀 Quick Start Testing

### 1. Register & Login

```bash
# Register as student
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"test123"}'

# Get token from response
TOKEN="<your_token_here>"
```

### 2. Browse Courses

```bash
# View public courses
curl http://localhost:3000/courses

# View popular courses
curl http://localhost:3000/courses/popular
```

### 3. Enroll in Course

```bash
curl -X POST http://localhost:3000/enrollments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"courseId":1}'
```

### 4. Access Lessons

```bash
curl http://localhost:3000/courses/1/lessons \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- File uploads use `multipart/form-data`
- JWT tokens expire after configured time (check server settings)
- Prices are in decimal format (e.g., 99.99)
- Video uploads are limited to 100MB
- Popular courses endpoint is cached for 10 minutes
- Analytics data is aggregated monthly

---

## 🔗 Additional Resources

- **Swagger UI**: http://localhost:3000/api (if configured)
- **Health Check**: http://localhost:3000/health
- **Upload Directory**: ./uploads/videos

---

_Last Updated: November 27, 2025_
