import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '37887fgDG@',
  database: 'coursera_demo',
  synchronize: false,
  logging: true,
});

async function updateUserRoles() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    // Update admin user
    await AppDataSource.query(
      `UPDATE "user" SET role = 'admin' WHERE email = 'admin@test.com'`
    );
    console.log('✓ Updated admin@test.com to admin role');

    // Update instructor user
    await AppDataSource.query(
      `UPDATE "user" SET role = 'instructor' WHERE email = 'instructor@test.com'`
    );
    console.log('✓ Updated instructor@test.com to instructor role');

    // Verify the changes
    const users = await AppDataSource.query(
      `SELECT id, "firstName", "lastName", email, role FROM "user" WHERE email IN ('admin@test.com', 'instructor@test.com')`
    );
    console.log('\nUpdated users:');
    console.table(users);

    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error:', error);
  }
}

updateUserRoles();
