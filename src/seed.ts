import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  try {
    console.log('Starting database seeding...');

    // Create admin user
    const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
    await dataSource.query(`
      INSERT INTO "user" ("firstName", "lastName", email, password, role, "isActive", "instructorApprovalStatus")
      VALUES ('Admin', 'User', 'admin@test.com', $1, 'admin', true, 'approved')
      ON CONFLICT (email) DO UPDATE SET role = 'admin'
    `, [hashedPasswordAdmin]);
    console.log('✓ Admin user created');

    // Create instructors
    const hashedPassword = await bcrypt.hash('password123', 10);
    const instructors = [
      { firstName: 'John', lastName: 'Doe', email: 'john@instructor.com' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane@instructor.com' },
      { firstName: 'Bob', lastName: 'Johnson', email: 'bob@instructor.com' },
    ];

    const instructorIds = [];
    for (const instructor of instructors) {
      const result = await dataSource.query(`
        INSERT INTO "user" ("firstName", "lastName", email, password, role, "isActive", "instructorApprovalStatus")
        VALUES ($1, $2, $3, $4, 'instructor', true, 'approved')
        ON CONFLICT (email) DO UPDATE SET role = 'instructor'
        RETURNING id
      `, [instructor.firstName, instructor.lastName, instructor.email, hashedPassword]);
      instructorIds.push(result[0].id);
      console.log(`✓ Instructor created: ${instructor.email}`);
    }

    // Create students
    const students = [
      { firstName: 'Alice', lastName: 'Student', email: 'alice@student.com' },
      { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@student.com' },
      { firstName: 'David', lastName: 'Lee', email: 'david@student.com' },
    ];

    const studentIds = [];
    for (const student of students) {
      const result = await dataSource.query(`
        INSERT INTO "user" ("firstName", "lastName", email, password, role, "isActive")
        VALUES ($1, $2, $3, $4, 'student', true)
        ON CONFLICT (email) DO UPDATE SET role = 'student'
        RETURNING id
      `, [student.firstName, student.lastName, student.email, hashedPassword]);
      studentIds.push(result[0].id);
      console.log(`✓ Student created: ${student.email}`);
    }

    // Create courses
    const courses = [
      {
        title: 'Advanced JavaScript Programming',
        description: 'Master modern JavaScript',
        instructor: 'John Doe',
        instructorUserId: instructorIds[0],
        price: 99.99,
        duration: 40,
        level: 'intermediate',
        category: 'programming',
        status: 'approved',
      },
      {
        title: 'React Complete Guide',
        description: 'Learn React from scratch',
        instructor: 'Jane Smith',
        instructorUserId: instructorIds[1],
        price: 149.99,
        duration: 60,
        level: 'beginner',
        category: 'programming',
        status: 'approved',
      },
      {
        title: 'Node.js Backend Development',
        description: 'Build scalable APIs',
        instructor: 'John Doe',
        instructorUserId: instructorIds[0],
        price: 129.99,
        duration: 50,
        level: 'intermediate',
        category: 'programming',
        status: 'approved',
      },
      {
        title: 'Python Data Science',
        description: 'Data analysis with Python',
        instructor: 'Bob Johnson',
        instructorUserId: instructorIds[2],
        price: 199.99,
        duration: 80,
        level: 'advanced',
        category: 'data_science',
        status: 'approved',
      },
      {
        title: 'Web Design Fundamentals',
        description: 'Learn modern web design',
        instructor: 'Jane Smith',
        instructorUserId: instructorIds[1],
        price: 79.99,
        duration: 30,
        level: 'beginner',
        category: 'design',
        status: 'approved',
      },
    ];

    const courseIds = [];
    for (const course of courses) {
      const result = await dataSource.query(`
        INSERT INTO course (
          title, description, instructor, "instructorUserId", price, duration, 
          level, category, "isActive", status, "enrollmentCount", "averageRating"
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, $9, 0, 0)
        RETURNING id
      `, [
        course.title,
        course.description,
        course.instructor,
        course.instructorUserId,
        course.price,
        course.duration,
        course.level,
        course.category,
        course.status,
      ]);
      courseIds.push(result[0].id);
      console.log(`✓ Course created: ${course.title}`);
    }

    // Create enrollments (spread over last 6 months)
    const enrollments = [
      { studentId: studentIds[0], courseId: courseIds[0], monthsAgo: 1 },
      { studentId: studentIds[0], courseId: courseIds[1], monthsAgo: 2 },
      { studentId: studentIds[1], courseId: courseIds[0], monthsAgo: 1 },
      { studentId: studentIds[1], courseId: courseIds[2], monthsAgo: 3 },
      { studentId: studentIds[2], courseId: courseIds[1], monthsAgo: 2 },
      { studentId: studentIds[2], courseId: courseIds[3], monthsAgo: 1 },
      { studentId: studentIds[0], courseId: courseIds[4], monthsAgo: 4 },
      { studentId: studentIds[1], courseId: courseIds[4], monthsAgo: 3 },
    ];

    for (const enrollment of enrollments) {
      const enrolledAt = new Date();
      enrolledAt.setMonth(enrolledAt.getMonth() - enrollment.monthsAgo);
      
      await dataSource.query(`
        INSERT INTO enrollment ("userId", "courseId", "enrolledAt", progress)
        VALUES ($1, $2, $3, 0)
        ON CONFLICT DO NOTHING
      `, [enrollment.studentId, enrollment.courseId, enrolledAt]);
    }
    console.log(`✓ ${enrollments.length} enrollments created`);

    // Update enrollment counts on courses
    await dataSource.query(`
      UPDATE course c
      SET "enrollmentCount" = (
        SELECT COUNT(*) FROM enrollment e WHERE e."courseId" = c.id
      )
    `);
    console.log('✓ Enrollment counts updated');

    console.log('\n✓ Database seeding completed successfully!');
    console.log('\nTest accounts:');
    console.log('  Admin: admin@test.com / admin123');
    console.log('  Instructor: john@instructor.com / password123');
    console.log('  Student: alice@student.com / password123');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
