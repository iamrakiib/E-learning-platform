const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Replace with your JWT token
const JWT_TOKEN = 'YOUR_JWT_TOKEN_HERE';

const headers = {
  'Authorization': `Bearer ${JWT_TOKEN}`,
  'Content-Type': 'application/json'
};

async function createCourseWithLessons() {
  try {
    // Step 1: Create a course
    console.log('Creating course...');
    const courseData = {
      title: "Complete JavaScript Course",
      description: "Learn JavaScript from basics to advanced concepts including ES6, async/await, and modern frameworks",
      price: 49.99,
      duration: 150,
      level: "beginner",
      category: "programming"
    };

    const courseResponse = await axios.post(`${BASE_URL}/courses`, courseData, { headers });
    const courseId = courseResponse.data.id;
    console.log(`✓ Course created with ID: ${courseId}`);
    console.log();

    // Step 2: Add 4 lessons
    const lessons = [
      {
        title: "Introduction to JavaScript",
        content: "Learn the basics of JavaScript, variables, and data types",
        order: 1,
        duration: 30,
        videoUrl: "https://example.com/videos/lesson1.mp4"
      },
      {
        title: "Functions and Scope",
        content: "Understanding functions, arrow functions, and scope in JavaScript",
        order: 2,
        duration: 45,
        videoUrl: "https://example.com/videos/lesson2.mp4"
      },
      {
        title: "Objects and Arrays",
        content: "Working with objects, arrays, and array methods",
        order: 3,
        duration: 40,
        videoUrl: "https://example.com/videos/lesson3.mp4"
      },
      {
        title: "Async JavaScript",
        content: "Promises, async/await, and handling asynchronous operations",
        order: 4,
        duration: 50,
        videoUrl: "https://example.com/videos/lesson4.mp4"
      }
    ];

    console.log('Adding lessons...');
    for (const lesson of lessons) {
      const lessonResponse = await axios.post(
        `${BASE_URL}/courses/${courseId}/lessons`,
        lesson,
        { headers }
      );
      console.log(`✓ Added lesson ${lesson.order}: ${lesson.title} (ID: ${lessonResponse.data.id})`);
    }

    console.log();
    console.log('✅ Course created with 4 lessons successfully!');
    console.log(`Course ID: ${courseId}`);

  } catch (error) {
    console.error('❌ Error:', error.response?.data?.message || error.message);
  }
}

createCourseWithLessons();
