const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

// Sample courses data
const sampleCourses = [
  {
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive web development course",
    category: "programming",
    level: "beginner",
    price: 49.99,
    instructor: "John Smith"
  },
  {
    title: "Advanced JavaScript Mastery",
    description: "Master modern JavaScript including ES6+, async/await, promises, and advanced patterns",
    category: "programming",
    level: "advanced",
    price: 79.99,
    instructor: "Sarah Johnson"
  },
  {
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface and user experience design with practical projects",
    category: "design",
    level: "beginner",
    price: 59.99,
    instructor: "Mike Chen"
  },
  {
    title: "Data Science with Python",
    description: "Comprehensive guide to data analysis, visualization, and machine learning with Python",
    category: "data_science",
    level: "intermediate",
    price: 89.99,
    instructor: "Dr. Emily Rodriguez"
  },
  {
    title: "Digital Marketing Strategy",
    description: "Learn how to create effective digital marketing campaigns and grow your business online",
    category: "business",
    level: "beginner",
    price: 44.99,
    instructor: "David Lee"
  },
  {
    title: "React Native Mobile Development",
    description: "Build cross-platform mobile applications using React Native and JavaScript",
    category: "programming",
    level: "intermediate",
    price: 69.99,
    instructor: "Alex Turner"
  },
  {
    title: "Graphic Design for Beginners",
    description: "Master Adobe Photoshop and Illustrator to create stunning visual designs",
    category: "design",
    level: "beginner",
    price: 54.99,
    instructor: "Lisa Anderson"
  },
  {
    title: "Business Analytics & Intelligence",
    description: "Learn to analyze business data and make data-driven decisions",
    category: "business",
    level: "intermediate",
    price: 74.99,
    instructor: "Robert Williams"
  },
  {
    title: "Machine Learning A-Z",
    description: "Complete guide to machine learning algorithms and implementations in Python",
    category: "data_science",
    level: "advanced",
    price: 99.99,
    instructor: "Dr. Maria Garcia"
  }
];

async function registerUser(email, password, name, role) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      email,
      password,
      name,
      role
    });
    console.log(`✓ Registered ${role}: ${email}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 400) {
      // User already exists, try to login
      try {
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
          email,
          password
        });
        console.log(`✓ Logged in existing ${role}: ${email}`);
        return loginResponse.data;
      } catch (loginError) {
        console.error(`✗ Failed to login ${email}:`, loginError.response?.data?.message || loginError.message);
        throw loginError;
      }
    }
    console.error(`✗ Failed to register ${email}:`, error.response?.data?.message || error.message);
    throw error;
  }
}

async function createCourse(courseData, token) {
  try {
    const response = await axios.post(`${BASE_URL}/courses`, courseData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`✓ Created course: ${courseData.title}`);
    return response.data;
  } catch (error) {
    console.error(`✗ Failed to create course "${courseData.title}":`, error.response?.data?.message || error.message);
    return null;
  }
}

async function seedDatabase() {
  console.log('\n🌱 Starting database seed...\n');
  
  try {
    // Register an instructor
    console.log('📝 Registering instructor...');
    const instructorData = await registerUser(
      'instructor@test.com',
      'password123',
      'Instructor User',
      'instructor'
    );
    const instructorToken = instructorData.access_token;
    
    console.log('\n📚 Creating sample courses...\n');
    
    let successCount = 0;
    for (const course of sampleCourses) {
      const result = await createCourse(course, instructorToken);
      if (result) successCount++;
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log(`\n✅ Seed completed! Created ${successCount}/${sampleCourses.length} courses`);
    console.log('\n📍 You can now:');
    console.log('   - Browse courses at: http://localhost:3000/courses');
    console.log('   - View API docs at: http://localhost:3001/api');
    console.log(`   - Login as instructor: instructor@test.com / password123\n`);
    
  } catch (error) {
    console.error('\n❌ Seed failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. Backend is running: npm run start:dev');
    console.log('   2. PostgreSQL database is running');
    console.log('   3. Database connection is configured correctly\n');
  }
}

seedDatabase();
