import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Serve static files (videos)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  
  // Security headers
  app.use(helmet());
  
  // Global validation pipe with transformation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that don't have decorators
    forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
    transform: true, // Auto-transform payloads to DTO instances
    transformOptions: {
      enableImplicitConversion: true, // Automatically convert types
    },
  }));
  
  // CORS configuration
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  });
  
  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Coursera-like E-Learning Platform API')
    .setDescription(`
      Advanced backend API for online learning platform featuring:
      - JWT Authentication & Role-based Authorization
      - Course Management with Search, Filter, and Sorting
      - Review & Rating System
      - Progress Tracking (Course & Lesson Level)
      - Admin Dashboard with Analytics
      - Health Monitoring
    `)
    .setVersion('2.0')
    .addTag('auth', 'Authentication endpoints (Register, Login, Change Password)')
    .addTag('users', 'User management')
    .addTag('courses', 'Course management, search, reviews, and lessons')
    .addTag('enrollments', 'Enrollment and progress tracking')
    .addTag('admin', 'Admin-only endpoints (Dashboard, User/Course Management)')
    .addTag('health', 'Health check and monitoring')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token (Get from /auth/login or /auth/register)',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║   🚀  E-Learning Platform API is running!                ║
    ║                                                           ║
    ║   📍  Server:        http://localhost:${port}                ║
    ║   📚  API Docs:      http://localhost:${port}/api            ║
    ║   ❤️   Health Check:  http://localhost:${port}/health        ║
    ║                                                           ║
    ║   Features: JWT Auth | Roles | Caching | Rate Limiting   ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
  `);
}
bootstrap();