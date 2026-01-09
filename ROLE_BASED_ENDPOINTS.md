# Role-Based Endpoint Access Guide

## Quick Reference

| Role           | Dashboard Endpoint                  | What They Can Access                 |
| -------------- | ----------------------------------- | ------------------------------------ |
| **Admin**      | `GET /admin/dashboard`              | Everything + user/course management  |
| **Instructor** | `GET /courses/instructor/dashboard` | Own courses, enrollments, analytics  |
| **Student**    | `GET /enrollments/dashboard`        | Enrolled courses, progress tracking  |
| **Public**     | N/A                                 | Browse courses, view limited details |

---

## 🔓 PUBLIC ENDPOINTS (No Authentication Required)

| Method | Endpoint               | Description                     |
| ------ | ---------------------- | ------------------------------- |
| `POST` | `/auth/register`       | Register new user               |
| `POST` | `/auth/login`          | Login and get JWT token         |
| `GET`  | `/courses`             | Browse courses (limited fields) |
| `GET`  | `/courses/popular`     | Top 10 popular courses          |
| `GET`  | `/courses/:id`         | View course details (limited)   |
| `GET`  | `/courses/:id/reviews` | View course reviews             |
| `GET`  | `/health`              | API health check                |

---

## 🔐 AUTHENTICATED ENDPOINTS (Any Logged-in User)

**Header Required:** `Authorization: Bearer <your-jwt-token>`

| Method | Endpoint                     | Description                      |
| ------ | ---------------------------- | -------------------------------- |
| `GET`  | `/users/profile`             | Get your profile info            |
| `POST` | `/auth/change-password`      | Change your password             |
| `GET`  | `/courses/all-authenticated` | Browse courses (full details)    |
| `GET`  | `/courses/detailed/:id`      | Full course details with reviews |
| `POST` | `/courses/:id/reviews`       | Add review to a course           |

---

## 👨‍🎓 STUDENT ENDPOINTS (role: student)

**All authenticated endpoints PLUS:**

| Method | Endpoint                                         | Description                                    |
| ------ | ------------------------------------------------ | ---------------------------------------------- |
| `GET`  | `/enrollments/dashboard`                         | **Student Dashboard** - stats & recent courses |
| `POST` | `/enrollments`                                   | Enroll in a course                             |
| `GET`  | `/enrollments/my-courses`                        | List your enrolled courses                     |
| `GET`  | `/enrollments/my-enrollments`                    | Alias for my-courses                           |
| `GET`  | `/enrollments/stats`                             | Enrollment statistics                          |
| `PUT`  | `/enrollments/:id/progress`                      | Update course progress                         |
| `POST` | `/enrollments/lessons/:lessonId/progress`        | Track lesson progress                          |
| `GET`  | `/enrollments/courses/:courseId/lesson-progress` | Get lesson progress                            |
| `GET`  | `/courses/:courseId/lessons`                     | View lessons (if enrolled)                     |
| `GET`  | `/courses/:courseId/lessons/:lessonId`           | View specific lesson (if enrolled)             |

### Student Dashboard Response

```json
{
  "stats": {
    "total": 5,
    "completed": 2,
    "inProgress": 3,
    "averageProgress": 65.4
  },
  "recentCourses": [
    {
      "enrollmentId": 1,
      "courseId": 10,
      "courseTitle": "JavaScript Basics",
      "courseInstructor": "John Doe",
      "progress": 80,
      "completed": false,
      "enrolledAt": "2025-11-01T10:00:00Z"
    }
  ]
}
```

---

## 👨‍🏫 INSTRUCTOR ENDPOINTS (role: instructor)

**All authenticated endpoints PLUS:**

| Method   | Endpoint                                     | Description                        |
| -------- | -------------------------------------------- | ---------------------------------- |
| `GET`    | `/courses/instructor/dashboard`              | **Instructor Dashboard** - metrics |
| `GET`    | `/courses/instructor/my-courses`             | List your created courses          |
| `POST`   | `/courses`                                   | Create a new course                |
| `PUT`    | `/courses/:id`                               | Update your course                 |
| `DELETE` | `/courses/:id`                               | Delete your course                 |
| `POST`   | `/courses/:courseId/lessons`                 | Add lesson to your course          |
| `DELETE` | `/courses/:courseId/lessons/:lessonId`       | Delete lesson from your course     |
| `POST`   | `/courses/:courseId/lessons/:lessonId/video` | Upload video for lesson            |
| `GET`    | `/courses/:courseId/lessons`                 | View lessons (own courses)         |

### Instructor Dashboard Response

```json
{
  "totalCourses": 12,
  "activeCourses": 8,
  "draftCourses": 4,
  "totalEnrollments": 450,
  "averageRating": 4.5,
  "totalRevenue": 15750.0,
  "recentCourses": [
    {
      "id": 5,
      "title": "Advanced Node.js",
      "enrollmentCount": 120,
      "averageRating": 4.7,
      "isActive": true,
      "status": "published",
      "price": 49.99
    }
  ]
}
```

---

## 👑 ADMIN ENDPOINTS (role: admin)

**All endpoints above PLUS complete administrative access:**

### Dashboard & Analytics

| Method | Endpoint                   | Description                               |
| ------ | -------------------------- | ----------------------------------------- |
| `GET`  | `/admin/dashboard`         | **Admin Dashboard** - full platform stats |
| `GET`  | `/admin/dashboard-stats`   | Alias for dashboard                       |
| `GET`  | `/admin/top-instructors`   | Top instructors by course count           |
| `GET`  | `/admin/revenue-analytics` | Monthly revenue breakdown                 |

### User Management

| Method   | Endpoint                         | Description                    |
| -------- | -------------------------------- | ------------------------------ |
| `GET`    | `/users`                         | List all users (paginated)     |
| `GET`    | `/admin/users`                   | List all users with pagination |
| `POST`   | `/admin/users/:id/toggle-status` | Activate/deactivate user       |
| `DELETE` | `/admin/users/:id`               | Delete a user                  |
| `PUT`    | `/admin/users/:id/role`          | Change user role               |

### Course Management

| Method   | Endpoint                           | Description                  |
| -------- | ---------------------------------- | ---------------------------- |
| `GET`    | `/admin/courses`                   | List all courses (paginated) |
| `PUT`    | `/admin/courses/:id`               | Update any course            |
| `POST`   | `/admin/courses/:id/toggle-status` | Activate/deactivate course   |
| `DELETE` | `/admin/courses/:id`               | Delete any course            |
| `GET`    | `/admin/courses/pending`           | Courses awaiting approval    |
| `POST`   | `/admin/courses/:id/approve`       | Approve course               |
| `POST`   | `/admin/courses/:id/reject`        | Reject course                |

### Lesson Management

| Method   | Endpoint                                     | Description                |
| -------- | -------------------------------------------- | -------------------------- |
| `GET`    | `/admin/courses/:id/lessons`                 | Get lessons for any course |
| `GET`    | `/admin/courses/:courseId/lessons/:lessonId` | Get specific lesson        |
| `GET`    | `/admin/lessons/:id`                         | Get any lesson by ID       |
| `DELETE` | `/admin/courses/:courseId/lessons/:lessonId` | Delete any lesson          |
| `DELETE` | `/admin/lessons/:id`                         | Delete any lesson by ID    |

### Instructor Management

| Method | Endpoint                         | Description                     |
| ------ | -------------------------------- | ------------------------------- |
| `GET`  | `/admin/instructors/pending`     | Pending instructor applications |
| `POST` | `/admin/instructors/:id/approve` | Approve instructor              |
| `POST` | `/admin/instructors/:id/reject`  | Reject instructor               |

### Enrollment Management

| Method   | Endpoint                 | Description              |
| -------- | ------------------------ | ------------------------ |
| `GET`    | `/admin/enrollments`     | List all enrollments     |
| `DELETE` | `/admin/enrollments/:id` | Refund/delete enrollment |

---

## 🔑 Authentication Flow

### 1. Register

```bash
POST /auth/register
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student"  # student | instructor
}
```

### 2. Login

```bash
POST /auth/login
{
  "email": "user@example.com",
  "password": "securePassword123"
}

# Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Use Token

```bash
# Add to all protected requests:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ⚠️ Common Error Responses

| Status | Meaning                                       |
| ------ | --------------------------------------------- |
| `401`  | Missing or invalid JWT token                  |
| `403`  | Valid token but insufficient role permissions |
| `404`  | Resource not found                            |
| `400`  | Bad request / validation error                |

---

## 📋 Role Hierarchy

```
Admin (can do everything)
  └── Instructor (can manage own courses + student actions)
        └── Student (can enroll + track progress)
              └── Public (browse only)
```

---

## 🚀 Quick Test Commands

```bash
# 1. Register as student
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"test123","firstName":"Test","lastName":"Student","role":"student"}'

# 2. Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"test123"}'

# 3. Get student dashboard (use token from login response)
curl http://localhost:3000/enrollments/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# 4. Get instructor dashboard (as instructor)
curl http://localhost:3000/courses/instructor/dashboard \
  -H "Authorization: Bearer INSTRUCTOR_TOKEN"

# 5. Get admin dashboard (as admin)
curl http://localhost:3000/admin/dashboard \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 💡 Tips

1. **Swagger UI**: Visit `http://localhost:3000/api` for interactive API docs
2. **Authorize in Swagger**: Click "Authorize" button and paste your JWT token
3. **Creating Admin**: Use database directly or add a temporary route to promote a user to admin
4. **Token Expiry**: Tokens expire - re-login if you get 401 errors
