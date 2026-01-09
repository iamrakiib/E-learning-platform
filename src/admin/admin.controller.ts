import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UpdateCourseDto } from '../courses/dto/update-course.dto';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth('JWT-auth')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get admin dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Dashboard statistics retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin only' })
  getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get('dashboard-stats')
  @ApiOperation({ summary: 'Get admin dashboard statistics (alias)' })
  @ApiResponse({ status: 200, description: 'Dashboard statistics retrieved' })
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Users list retrieved' })
  getAllUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.adminService.getAllUsers(page ? +page : 1, limit ? +limit : 10);
  }

  @Post('users/:id/toggle-status')
  @ApiOperation({ summary: 'Activate or deactivate a user' })
  @ApiResponse({ status: 200, description: 'User status toggled' })
  @ApiResponse({ status: 404, description: 'User not found' })
  toggleUserStatus(@Param('id') id: string) {
    return this.adminService.toggleUserStatus(+id);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(+id);
  }

  @Get('courses')
  @ApiOperation({ summary: 'Get all courses with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Courses list retrieved' })
  getAllCourses(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.adminService.getAllCourses(page ? +page : 1, limit ? +limit : 10);
  }

  @Post('courses/:id/toggle-status')
  @ApiOperation({ summary: 'Activate or deactivate a course' })
  @ApiResponse({ status: 200, description: 'Course status toggled' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  toggleCourseStatus(@Param('id') id: string) {
    return this.adminService.toggleCourseStatus(+id);
  }

  @Delete('courses/:id')
  @ApiOperation({ summary: 'Delete a course' })
  @ApiResponse({ status: 200, description: 'Course deleted successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  deleteCourse(@Param('id') id: string) {
    return this.adminService.deleteCourse(+id);
  }

  @Get('courses/pending')
  @ApiOperation({ summary: 'Get all courses pending approval' })
  @ApiResponse({ status: 200, description: 'Pending courses retrieved' })
  getPendingCourses() {
    return this.adminService.getPendingCourses();
  }

  @Get('instructors/pending')
  @ApiOperation({ summary: 'Get all pending instructor applications' })
  @ApiResponse({ status: 200, description: 'Pending instructors retrieved' })
  getPendingInstructors() {
    return this.adminService.getPendingInstructors();
  }

  @Get('top-instructors')
  @ApiOperation({ summary: 'Get top instructors by course count' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Top instructors retrieved' })
  getTopInstructors(@Query('limit') limit?: number) {
    return this.adminService.getTopInstructors(limit);
  }

  @Get('revenue-analytics')
  @ApiOperation({ summary: 'Get monthly revenue analytics' })
  @ApiResponse({ status: 200, description: 'Revenue analytics retrieved' })
  getRevenueAnalytics() {
    return this.adminService.getRevenueAnalytics();
  }

  @Post('courses/:id/approve')
  @ApiOperation({ summary: 'Approve a pending course' })
  @ApiResponse({ status: 200, description: 'Course approved successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  approveCourse(@Param('id') id: string) {
    return this.adminService.approveCourse(+id);
  }

  @Post('courses/:id/reject')
  @ApiOperation({ summary: 'Reject a pending course' })
  @ApiResponse({ status: 200, description: 'Course rejected successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  rejectCourse(@Param('id') id: string, @Query('reason') reason?: string) {
    return this.adminService.rejectCourse(+id, reason);
  }

  @Post('instructors/:id/approve')
  @ApiOperation({ summary: 'Approve instructor application' })
  @ApiResponse({ status: 200, description: 'Instructor approved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  approveInstructor(@Param('id') id: string) {
    return this.adminService.approveInstructor(+id);
  }

  @Post('instructors/:id/reject')
  @ApiOperation({ summary: 'Reject instructor application' })
  @ApiResponse({ status: 200, description: 'Instructor rejected successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  rejectInstructor(@Param('id') id: string, @Query('reason') reason?: string) {
    return this.adminService.rejectInstructor(+id, reason);
  }

  @Get('enrollments')
  @ApiOperation({ summary: 'Get all enrollments with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Enrollments list retrieved' })
  getAllEnrollments(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.adminService.getAllEnrollments(page ? +page : 1, limit ? +limit : 10);
  }

  @Delete('enrollments/:id')
  @ApiOperation({ summary: 'Refund and delete enrollment' })
  @ApiResponse({ status: 200, description: 'Enrollment refunded successfully' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  refundEnrollment(@Param('id') id: string) {
    return this.adminService.refundEnrollment(+id);
  }

  // ============ COURSE MANAGEMENT ============

  @Put('courses/:id')
  @ApiOperation({ summary: 'Update any course (Admin override)' })
  @ApiResponse({ status: 200, description: 'Course updated successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  updateCourse(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.adminService.updateCourse(+id, updateCourseDto);
  }

  @Get('courses/:id/lessons')
  @ApiOperation({ summary: 'Get all lessons for any course (Admin access)' })
  @ApiResponse({ status: 200, description: 'Lessons retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  getCourseLessons(@Param('id') id: string) {
    return this.adminService.getCourseLessons(+id);
  }

  @Get('courses/:courseId/lessons/:lessonId')
  @ApiOperation({ summary: 'Get a specific lesson from a specific course (Admin access)' })
  @ApiResponse({ status: 200, description: 'Lesson retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Lesson or Course not found' })
  getCourseLesson(@Param('courseId') courseId: string, @Param('lessonId') lessonId: string) {
    return this.adminService.getCourseLesson(+courseId, +lessonId);
  }

  @Get('lessons/:id')
  @ApiOperation({ summary: 'Get any lesson details by lesson ID only (Admin access)' })
  @ApiResponse({ status: 200, description: 'Lesson retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  getLesson(@Param('id') id: string) {
    return this.adminService.getLesson(+id);
  }

  @Delete('courses/:courseId/lessons/:lessonId')
  @ApiOperation({ summary: 'Delete a specific lesson from a specific course (Admin override)' })
  @ApiResponse({ status: 200, description: 'Lesson deleted successfully' })
  @ApiResponse({ status: 404, description: 'Lesson or Course not found' })
  deleteCourseLesson(@Param('courseId') courseId: string, @Param('lessonId') lessonId: string) {
    return this.adminService.deleteCourseLesson(+courseId, +lessonId);
  }

  @Delete('lessons/:id')
  @ApiOperation({ summary: 'Delete any lesson by lesson ID only (Admin override)' })
  @ApiResponse({ status: 200, description: 'Lesson deleted successfully' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  deleteLesson(@Param('id') id: string) {
    return this.adminService.deleteLesson(+id);
  }

  // ============ USER ROLE MANAGEMENT ============

  @Put('users/:id/role')
  @ApiOperation({ summary: 'Change user role (student/instructor/admin)' })
  @ApiBody({ schema: { type: 'object', properties: { role: { type: 'string', enum: ['student', 'instructor', 'admin'] } } } })
  @ApiResponse({ status: 200, description: 'User role updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid role' })
  @ApiResponse({ status: 404, description: 'User not found' })
  changeUserRole(@Param('id') id: string, @Body('role') role: string) {
    return this.adminService.changeUserRole(+id, role);
  }

  // ============ ANALYTICS ============

  @Get('analytics')
  @ApiOperation({ summary: 'Get comprehensive analytics data' })
  @ApiResponse({ status: 200, description: 'Analytics data retrieved' })
  getAnalytics() {
    return this.adminService.getAnalytics();
  }
}
