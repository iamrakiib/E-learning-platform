# 🔐 User Category Module - Username-Based Users

This module implements a username-based user management system with custom validation pipes, unique constraints, and advanced search capabilities. It demonstrates NestJS best practices for validation, entity design, and TypeORM querying.

## 📋 Overview

The **UserCategory3** module showcases:

- ✅ Dedicated Entity with TypeORM decorators
- ✅ Strong validation using DTOs with class-validator pipes
- ✅ Service layer with business logic and duplicate prevention
- ✅ Controller with Swagger documentation
- ✅ Custom UUID generation via @BeforeInsert hook
- ✅ Unique username constraint with database index
- ✅ Substring search functionality using TypeORM Like operator

---

## 👥 UserCategory3 - Username-Based Users

### Schema

- **id**: UUID (automatically generated via @BeforeInsert hook)
- **username**: varchar(100), **unique**, indexed - User's unique handle
- **fullName**: varchar(150) - Full display name
- **isActive**: Boolean, default: false - Account activation status

### Database Features

- **Unique Constraint**: Username must be unique across all records
- **Index**: Database index on username for fast lookups
- **UUID Primary Key**: Automatically generated before insert
- **Pattern Validation**: Username accepts only alphanumeric characters and underscores

---

## 🔌 API Endpoints

```
POST   /user-category3                       - Create user with unique username
GET    /user-category3/search?substring=X    - Search by fullName substring
GET    /user-category3/username/:username    - Get user by username
DELETE /user-category3/username/:username    - Delete user by username
GET    /user-category3                       - Get all users
```

---

## 📝 Example Usage

### Create a User

**Request:**

```bash
POST /user-category3
Content-Type: application/json

{
  "username": "john_doe",
  "fullName": "John Doe",
  "isActive": true
}
```

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "john_doe",
  "fullName": "John Doe",
  "isActive": true
}
```

### Search Users by Name Substring

**Request:**

```bash
GET /user-category3/search?substring=John
```

**Response:**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "john_doe",
    "fullName": "John Doe",
    "isActive": true
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "username": "johnny_smith",
    "fullName": "Johnny Smith",
    "isActive": false
  }
]
```

### Get User by Username

**Request:**

```bash
GET /user-category3/username/john_doe
```

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "john_doe",
  "fullName": "John Doe",
  "isActive": true
}
```

### Delete User by Username

**Request:**

```bash
DELETE /user-category3/username/john_doe
```

**Response:**

```json
{
  "message": "User john_doe deleted successfully"
}
```

### Get All Users

**Request:**

```bash
GET /user-category3
```

**Response:**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "john_doe",
    "fullName": "John Doe",
    "isActive": true
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "username": "jane_smith",
    "fullName": "Jane Smith",
    "isActive": false
  }
]
```

---

## ✅ Validation Rules (Pipe-Based)

All DTOs use **class-validator** decorators enforced by NestJS **ValidationPipe**:

### CreateUserCategory3Dto

- **username**:
  - Required
  - Maximum 100 characters
  - Must match pattern: `/^[a-zA-Z0-9_]+$/` (alphanumeric + underscore only)
  - Example: `john_doe`, `user123`, `test_user`
- **fullName**:
  - Required
  - Maximum 150 characters
  - Example: `"John Doe"`, `"Jane Smith"`
- **isActive**:
  - Optional
  - Boolean type
  - Default: `false`

### Validation Examples

**✅ Valid Request:**

```json
{
  "username": "valid_user_123",
  "fullName": "Valid User Name"
}
```

**❌ Invalid Request (bad username pattern):**

```json
{
  "username": "invalid-user!",
  "fullName": "Test User"
}
```

**Error Response:**

```json
{
  "statusCode": 400,
  "message": ["username must contain only letters, numbers, and underscores"],
  "error": "Bad Request"
}
```

**❌ Invalid Request (username too long):**

```json
{
  "username": "this_username_is_way_too_long_and_exceeds_the_maximum_allowed_length_of_one_hundred_characters_limit",
  "fullName": "Test User"
}
```

**Error Response:**

```json
{
  "statusCode": 400,
  "message": ["username must be shorter than or equal to 100 characters"],
  "error": "Bad Request"
}
```

**❌ Duplicate Username:**

```json
{
  "username": "john_doe",
  "fullName": "Another User"
}
```

**Error Response (if `john_doe` already exists):**

```json
{
  "statusCode": 409,
  "message": "Username john_doe already exists",
  "error": "Conflict"
}
```

---

## 🔍 Advanced Features

### 1. Unique Username Enforcement

The service checks for duplicate usernames before creation:

```typescript
const existingUser = await this.userCategory3Repository.findOne({
  where: { username: createDto.username },
});

if (existingUser) {
  throw new ConflictException(`Username ${createDto.username} already exists`);
}
```

This prevents race conditions and ensures data integrity at the application level, in addition to the database constraint.

### 2. Substring Search

Uses TypeORM's `Like` operator for case-insensitive substring matching:

```typescript
return this.userCategory3Repository.find({
  where: {
    fullName: Like(`%${substring}%`),
  },
});
```

**Use cases:**

- Search for "John" → finds "John Doe", "Johnny Smith", "Sarah Johnson"
- Search for "smith" → finds "John Smith", "Jane Smith"

### 3. UUID Auto-Generation

Entity uses `@BeforeInsert` lifecycle hook:

```typescript
@BeforeInsert()
generateId() {
  this.id = uuidv4();
}
```

This ensures every user gets a unique, globally identifiable UUID without relying on database auto-increment.

---

## 🔐 Error Handling

All endpoints have comprehensive error handling:

| Status Code | Error       | Description                                                        |
| ----------- | ----------- | ------------------------------------------------------------------ |
| **400**     | Bad Request | Validation errors (invalid username pattern, missing fields, etc.) |
| **404**     | Not Found   | User with specified username/id doesn't exist                      |
| **409**     | Conflict    | Username already taken (unique constraint violation)               |

---

## 🎯 How This Fits the Main Project

### Main User Entity (`src/users/user.entity.ts`)

- Used for authentication (JWT login)
- Role-based access (student, instructor, admin)
- Course enrollments, reviews, progress tracking
- **Purpose**: Core platform users

### UserCategory3 Module (`src/user-category3/`)

- Demonstrates advanced validation and pipe usage
- Shows unique constraint handling
- Implements search functionality
- **Purpose**: Showcase module demonstrating NestJS + TypeORM + Validation best practices

**Relationship**: UserCategory3 is **independent** from the main User entity. It serves as a demonstration module to showcase:

- Pipe-based validation techniques
- Custom entity design patterns
- Advanced querying strategies
- Error handling approaches

---

## 🚀 Testing via Swagger

1. Start the server:

   ```bash
   npm run start:dev
   ```

2. Open Swagger UI:

   ```
   http://localhost:3000/api
   ```

3. Find the **user-category3** tag in the API documentation

4. Try these test scenarios:

   **Scenario 1: Create a valid user**
   - Click `POST /user-category3`
   - Use request body:
     ```json
     {
       "username": "test_user",
       "fullName": "Test User",
       "isActive": true
     }
     ```
   - Expected: 201 Created

   **Scenario 2: Try duplicate username**
   - Create the same user again
   - Expected: 409 Conflict

   **Scenario 3: Invalid username pattern**
   - Use username: `"invalid-user-name!"`
   - Expected: 400 Bad Request with validation error

   **Scenario 4: Search users**
   - Use `GET /user-category3/search?substring=Test`
   - Expected: List of users with "Test" in their name

   **Scenario 5: Get by username**
   - Use `GET /user-category3/username/test_user`
   - Expected: User details

---

## 📊 Database Table

TypeORM will auto-create this table structure:

**Table: `user_category3`**

| Column   | Type         | Constraints   |
| -------- | ------------ | ------------- |
| id       | varchar(36)  | PRIMARY KEY   |
| username | varchar(100) | UNIQUE, INDEX |
| fullName | varchar(150) | NOT NULL      |
| isActive | boolean      | DEFAULT false |

**Indexes:**

- Primary key on `id`
- Unique index on `username`

---

## 🎓 Key Learning Points

This module demonstrates:

1. **Validation Pipes**: Using `@IsString()`, `@MaxLength()`, `@Matches()`, `@IsBoolean()`, `@IsOptional()` decorators
2. **Unique Constraints**: Both at database level and application level (service layer check)
3. **Custom ID Generation**: Using `@BeforeInsert` hook with UUID
4. **Query Operators**: TypeORM's `Like()` for substring search
5. **Error Handling**: Proper HTTP status codes and error messages
6. **REST API Design**: RESTful endpoint structure
7. **Swagger Documentation**: Using `@ApiTags`, `@ApiOperation`, `@ApiParam`, `@ApiQuery` decorators

---

## 📦 Module Structure

```
src/user-category3/
├── dto/
│   └── create-user-category3.dto.ts    # Validation DTO with pipes
├── user-category3.controller.ts         # REST endpoints
├── user-category3.entity.ts             # TypeORM entity
├── user-category3.module.ts             # Module registration
└── user-category3.service.ts            # Business logic
```

**Total Files**: 5  
**Total Endpoints**: 5  
**Lines of Code**: ~250

---

## 💡 Viva/Presentation Tips

When explaining this module:

1. **Start with the problem**: "How do we validate user input and ensure unique usernames?"
2. **Show the DTO**: Point out the decorators and explain pipe-based validation
3. **Demo in Swagger**:
   - Create a user successfully
   - Try to create duplicate → show 409 error
   - Try invalid username → show 400 validation error
   - Search by substring
4. **Explain the entity**: UUID generation, unique constraint, index
5. **Show the service**: Duplicate check logic, search implementation
6. **Connect to main project**: "While the main User entity handles auth and roles, this module demonstrates advanced validation patterns"

---

**Built with ❤️ using NestJS + TypeORM + class-validator**
