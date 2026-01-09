# 🎯 SIMPLIFIED API ENDPOINTS

## Base URL: `http://localhost:3000`

---

## 🔐 **AUTHENTICATION**

| Method | Endpoint                | Description       | Auth        |
| ------ | ----------------------- | ----------------- | ----------- |
| POST   | `/auth/register`        | Register new user | ❌ Public   |
| POST   | `/auth/login`           | Login & get token | ❌ Public   |
| POST   | `/auth/change-password` | Change password   | ✅ Required |

---

## 📚 **PUBLIC COURSES** (No Login Required)

| Method | Endpoint               | Description                       |
| ------ | ---------------------- | --------------------------------- |
| GET    | `/courses`             | Browse all courses (limited info) |
| GET    | `/courses/popular`     | Get top 10 popular courses        |
| GET    | `/courses/:id`         | View course details (basic)       |
| GET    | `/courses/:id/reviews` | View course reviews               |

**Example:**

```bash
GET /courses?search=javascript&category=programming&level=beginner
GET /courses/1
GET /courses/1/reviews
```

---

## 👨‍🎓 **STUDENT ENDPOINTS** (Login Required)

### Browse & View

| Method | Endpoint                     | Description                       |
| ------ | ---------------------------- | --------------------------------- |
| GET    | `/courses/all-authenticated` | Browse all courses (full details) |
| GET    | `/courses/detailed/:id`      | View course with reviews          |

### Enrollments

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| POST   | `/enrollments`              | Enroll in a course     |
| GET    | `/enrollments/my-courses`   | My enrolled courses    |
| GET    | `/enrollments/stats`        | My learning stats      |
| PUT    | `/enrollments/:id/progress` | Update course progress |

### Access Course Content (Must be enrolled)

| Method | Endpoint                                         | Description            |
| ------ | ------------------------------------------------ | ---------------------- |
| GET    | `/courses/:courseId/lessons`                     | Get all lessons        |
| GET    | `/courses/:courseId/lessons/:lessonId`           | Get single lesson      |
| POST   | `/enrollments/lessons/:lessonId/progress`        | Mark lesson complete   |
| GET    | `/enrollments/courses/:courseId/lesson-progress` | Get my lesson progress |

### Reviews

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/courses/:id/reviews` | Add review to course |

**Example Student Flow:**

```bash
# 1. Browse courses
GET /courses/all-authenticated

# 2. Enroll
POST /enrollments
Body: { "courseId": 1 }

# 3. Access lessons
GET /courses/1/lessons
GET /courses/1/lessons/5

# 4. Track progress
POST /enrollments/lessons/5/progress
Body: { "completed": true, "timeSpent": 15 }

# 5. Review
POST /courses/1/reviews
Body: { "rating": 5, "comment": "Great!" }
```

---

## 👨‍🏫 **INSTRUCTOR ENDPOINTS** (Instructor Role Required)

### My Courses

| Method | Endpoint                         | Description       |
| ------ | -------------------------------- | ----------------- |
| GET    | `/courses/instructor/my-courses` | Get my courses    |
| POST   | `/courses`                       | Create new course |
| PUT    | `/courses/:id`                   | Update my course  |
| DELETE | `/courses/:id`                   | Delete my course  |

### My Lessons

| Method | Endpoint                                     | Description                  |
| ------ | -------------------------------------------- | ---------------------------- |
| GET    | `/courses/:courseId/lessons`                 | View lessons (my course)     |
| POST   | `/courses/:courseId/lessons`                 | Add lesson to my course      |
| DELETE | `/courses/:courseId/lessons/:lessonId`       | Delete lesson from my course |
| POST   | `/courses/:courseId/lessons/:lessonId/video` | Upload video to lesson       |

**Example Instructor Flow:**

```bash
# 1. View my courses
GET /courses/instructor/my-courses

# 2. Create course
POST /courses
Body: {
  "title": "React Basics",
  "description": "Learn React",
  "price": 99.99,
  "duration": 40
}

# 3. Add lesson
POST /courses/1/lessons
Body: {
  "title": "Lesson 1",
  "content": "Content here",
  "order": 1,
  "duration": 15
}

# 4. Upload video
POST /courses/1/lessons/5/video
Form-Data: video=[file]

# 5. Update course
PUT /courses/1
Body: { "price": 79.99 }
```

---

## 👑 **ADMIN ENDPOINTS** (Admin Role Required)

### Dashboard & Stats

| Method | Endpoint                   | Description                |
| ------ | -------------------------- | -------------------------- |
| GET    | `/admin/dashboard`         | Dashboard overview         |
| GET    | `/admin/top-instructors`   | Top instructors by courses |
| GET    | `/admin/revenue-analytics` | Monthly revenue data       |

### User Management

| Method | Endpoint                         | Description              |
| ------ | -------------------------------- | ------------------------ |
| GET    | `/admin/users`                   | List all users           |
| POST   | `/admin/users/:id/toggle-status` | Activate/deactivate user |
| DELETE | `/admin/users/:id`               | Delete user              |
| PUT    | `/admin/users/:id/role`          | Change user role         |

### Course Management

| Method | Endpoint                           | Description         |
| ------ | ---------------------------------- | ------------------- |
| GET    | `/admin/courses`                   | List all courses    |
| PUT    | `/admin/courses/:id`               | Update any course   |
| POST   | `/admin/courses/:id/toggle-status` | Activate/deactivate |
| DELETE | `/admin/courses/:id`               | Delete any course   |

### Course Approval

| Method | Endpoint                     | Description     |
| ------ | ---------------------------- | --------------- |
| GET    | `/admin/courses/pending`     | Pending courses |
| POST   | `/admin/courses/:id/approve` | Approve course  |
| POST   | `/admin/courses/:id/reject`  | Reject course   |

### Instructor Approval

| Method | Endpoint                         | Description         |
| ------ | -------------------------------- | ------------------- |
| GET    | `/admin/instructors/pending`     | Pending instructors |
| POST   | `/admin/instructors/:id/approve` | Approve instructor  |
| POST   | `/admin/instructors/:id/reject`  | Reject instructor   |

### Lesson Management

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| GET    | `/admin/courses/:id/lessons` | View course lessons |
| GET    | `/admin/lessons/:id`         | View any lesson     |
| DELETE | `/admin/lessons/:id`         | Delete any lesson   |

### Enrollment Management

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | `/admin/enrollments`     | List all enrollments |
| DELETE | `/admin/enrollments/:id` | Refund enrollment    |

---

## 🎯 **QUICK REFERENCE BY ROLE**

### Public (No Auth)

```
✅ Browse courses (limited)
✅ View popular courses
✅ View course details (basic)
✅ View reviews
```

### Student (Auth Required)

```
✅ Everything Public has
✅ Enroll in courses
✅ View full course details
✅ Access lessons (enrolled courses)
✅ Track progress
✅ Add reviews
```

### Instructor (Instructor Role)

```
✅ Everything Student has
✅ Create courses
✅ Manage own courses
✅ Add/delete lessons
✅ Upload videos
```

### Admin (Admin Role)

```
✅ Everything
✅ Manage all users
✅ Manage all courses
✅ Approve/reject courses
✅ Approve/reject instructors
✅ View analytics
✅ Manage enrollments
```

---

## 📝 **COMMON PATTERNS**

### Query Parameters (Browse Courses)

```
?search=javascript
&category=programming
&level=beginner
&minPrice=0
&maxPrice=100
&sort=popular
```

### Pagination

```
?page=1&limit=10
```

### Authentication Header

```
Authorization: Bearer <your_jwt_token>
```

---

## ⚡ **MOST USED ENDPOINTS**

### For Students:

1. `GET /courses` - Browse
2. `POST /enrollments` - Enroll
3. `GET /courses/:courseId/lessons` - Study
4. `POST /enrollments/lessons/:lessonId/progress` - Track

### For Instructors:

1. `GET /courses/instructor/my-courses` - My courses
2. `POST /courses` - Create
3. `POST /courses/:courseId/lessons` - Add lesson
4. `POST /courses/:courseId/lessons/:lessonId/video` - Upload video

### For Admins:

1. `GET /admin/dashboard` - Overview
2. `GET /admin/courses/pending` - Approve courses
3. `PUT /admin/users/:id/role` - Change roles
4. `GET /admin/top-instructors` - Analytics

---

## 🔧 **ENDPOINT SIMPLIFICATION SUMMARY**

**OLD (Confusing):**

- `/courses/my-courses` (ambiguous)
- `/courses/my-courses/:id` (confusing with instructor)
- `/courses/my-courses/:id/lessons` (too long)

**NEW (Clear):**

- `/courses/instructor/my-courses` (clear: instructor's courses)
- `/courses/all-authenticated` (clear: browse as logged-in user)
- `/courses/detailed/:id` (clear: full details)
- `/courses/:courseId/lessons` (simple: course lessons)

---

_Last Updated: November 27, 2025_
