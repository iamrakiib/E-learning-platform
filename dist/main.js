/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/admin.controller.ts":
/*!***************************************!*\
  !*** ./src/admin/admin.controller.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const admin_service_1 = __webpack_require__(/*! ./admin.service */ "./src/admin/admin.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./src/auth/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ../auth/roles.guard */ "./src/auth/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! ../auth/roles.decorator */ "./src/auth/roles.decorator.ts");
const update_course_dto_1 = __webpack_require__(/*! ../courses/dto/update-course.dto */ "./src/courses/dto/update-course.dto.ts");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    getDashboard() {
        return this.adminService.getDashboardStats();
    }
    getDashboardStats() {
        return this.adminService.getDashboardStats();
    }
    getAllUsers(page, limit) {
        return this.adminService.getAllUsers(page ? +page : 1, limit ? +limit : 10);
    }
    toggleUserStatus(id) {
        return this.adminService.toggleUserStatus(+id);
    }
    deleteUser(id) {
        return this.adminService.deleteUser(+id);
    }
    getAllCourses(page, limit) {
        return this.adminService.getAllCourses(page ? +page : 1, limit ? +limit : 10);
    }
    toggleCourseStatus(id) {
        return this.adminService.toggleCourseStatus(+id);
    }
    deleteCourse(id) {
        return this.adminService.deleteCourse(+id);
    }
    getPendingCourses() {
        return this.adminService.getPendingCourses();
    }
    getPendingInstructors() {
        return this.adminService.getPendingInstructors();
    }
    getTopInstructors(limit) {
        return this.adminService.getTopInstructors(limit);
    }
    getRevenueAnalytics() {
        return this.adminService.getRevenueAnalytics();
    }
    approveCourse(id) {
        return this.adminService.approveCourse(+id);
    }
    rejectCourse(id, reason) {
        return this.adminService.rejectCourse(+id, reason);
    }
    approveInstructor(id) {
        return this.adminService.approveInstructor(+id);
    }
    rejectInstructor(id, reason) {
        return this.adminService.rejectInstructor(+id, reason);
    }
    getAllEnrollments(page, limit) {
        return this.adminService.getAllEnrollments(page ? +page : 1, limit ? +limit : 10);
    }
    refundEnrollment(id) {
        return this.adminService.refundEnrollment(+id);
    }
    updateCourse(id, updateCourseDto) {
        return this.adminService.updateCourse(+id, updateCourseDto);
    }
    getCourseLessons(id) {
        return this.adminService.getCourseLessons(+id);
    }
    getCourseLesson(courseId, lessonId) {
        return this.adminService.getCourseLesson(+courseId, +lessonId);
    }
    getLesson(id) {
        return this.adminService.getLesson(+id);
    }
    deleteCourseLesson(courseId, lessonId) {
        return this.adminService.deleteCourseLesson(+courseId, +lessonId);
    }
    deleteLesson(id) {
        return this.adminService.deleteLesson(+id);
    }
    changeUserRole(id, role) {
        return this.adminService.changeUserRole(+id, role);
    }
    getAnalytics() {
        return this.adminService.getAnalytics();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get admin dashboard statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard statistics retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin only' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('dashboard-stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get admin dashboard statistics (alias)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard statistics retrieved' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Users list retrieved' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)('users/:id/toggle-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate or deactivate a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User status toggled' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "toggleUserStatus", null);
__decorate([
    (0, common_1.Delete)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('courses'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all courses with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Courses list retrieved' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllCourses", null);
__decorate([
    (0, common_1.Post)('courses/:id/toggle-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate or deactivate a course' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course status toggled' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "toggleCourseStatus", null);
__decorate([
    (0, common_1.Delete)('courses/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a course' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteCourse", null);
__decorate([
    (0, common_1.Get)('courses/pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all courses pending approval' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pending courses retrieved' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getPendingCourses", null);
__decorate([
    (0, common_1.Get)('instructors/pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pending instructor applications' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pending instructors retrieved' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getPendingInstructors", null);
__decorate([
    (0, common_1.Get)('top-instructors'),
    (0, swagger_1.ApiOperation)({ summary: 'Get top instructors by course count' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Top instructors retrieved' }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getTopInstructors", null);
__decorate([
    (0, common_1.Get)('revenue-analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get monthly revenue analytics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Revenue analytics retrieved' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getRevenueAnalytics", null);
__decorate([
    (0, common_1.Post)('courses/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a pending course' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course approved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "approveCourse", null);
__decorate([
    (0, common_1.Post)('courses/:id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a pending course' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course rejected successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "rejectCourse", null);
__decorate([
    (0, common_1.Post)('instructors/:id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve instructor application' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Instructor approved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "approveInstructor", null);
__decorate([
    (0, common_1.Post)('instructors/:id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject instructor application' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Instructor rejected successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "rejectInstructor", null);
__decorate([
    (0, common_1.Get)('enrollments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all enrollments with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Enrollments list retrieved' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllEnrollments", null);
__decorate([
    (0, common_1.Delete)('enrollments/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Refund and delete enrollment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Enrollment refunded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Enrollment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "refundEnrollment", null);
__decorate([
    (0, common_1.Put)('courses/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update any course (Admin override)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_course_dto_1.UpdateCourseDto !== "undefined" && update_course_dto_1.UpdateCourseDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateCourse", null);
__decorate([
    (0, common_1.Get)('courses/:id/lessons'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lessons for any course (Admin access)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lessons retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getCourseLessons", null);
__decorate([
    (0, common_1.Get)('courses/:courseId/lessons/:lessonId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific lesson from a specific course (Admin access)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson or Course not found' }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getCourseLesson", null);
__decorate([
    (0, common_1.Get)('lessons/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get any lesson details by lesson ID only (Admin access)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getLesson", null);
__decorate([
    (0, common_1.Delete)('courses/:courseId/lessons/:lessonId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific lesson from a specific course (Admin override)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson or Course not found' }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteCourseLesson", null);
__decorate([
    (0, common_1.Delete)('lessons/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete any lesson by lesson ID only (Admin override)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteLesson", null);
__decorate([
    (0, common_1.Put)('users/:id/role'),
    (0, swagger_1.ApiOperation)({ summary: 'Change user role (student/instructor/admin)' }),
    (0, swagger_1.ApiBody)({ schema: { type: 'object', properties: { role: { type: 'string', enum: ['student', 'instructor', 'admin'] } } } }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User role updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid role' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "changeUserRole", null);
__decorate([
    (0, common_1.Get)('analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get comprehensive analytics data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Analytics data retrieved' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAnalytics", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _a : Object])
], AdminController);


/***/ }),

/***/ "./src/admin/admin.module.ts":
/*!***********************************!*\
  !*** ./src/admin/admin.module.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const admin_controller_1 = __webpack_require__(/*! ./admin.controller */ "./src/admin/admin.controller.ts");
const admin_service_1 = __webpack_require__(/*! ./admin.service */ "./src/admin/admin.service.ts");
const user_entity_1 = __webpack_require__(/*! ../users/user.entity */ "./src/users/user.entity.ts");
const course_entity_1 = __webpack_require__(/*! ../courses/course.entity */ "./src/courses/course.entity.ts");
const enrollment_entity_1 = __webpack_require__(/*! ../enrollments/enrollment.entity */ "./src/enrollments/enrollment.entity.ts");
const review_entity_1 = __webpack_require__(/*! ../courses/review.entity */ "./src/courses/review.entity.ts");
const lesson_entity_1 = __webpack_require__(/*! ../courses/lesson.entity */ "./src/courses/lesson.entity.ts");
const notifications_module_1 = __webpack_require__(/*! ../notifications/notifications.module */ "./src/notifications/notifications.module.ts");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, course_entity_1.Course, enrollment_entity_1.Enrollment, review_entity_1.Review, lesson_entity_1.Lesson]),
            notifications_module_1.NotificationsModule,
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService],
    })
], AdminModule);


/***/ }),

/***/ "./src/admin/admin.service.ts":
/*!************************************!*\
  !*** ./src/admin/admin.service.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ../users/user.entity */ "./src/users/user.entity.ts");
const course_entity_1 = __webpack_require__(/*! ../courses/course.entity */ "./src/courses/course.entity.ts");
const enrollment_entity_1 = __webpack_require__(/*! ../enrollments/enrollment.entity */ "./src/enrollments/enrollment.entity.ts");
const review_entity_1 = __webpack_require__(/*! ../courses/review.entity */ "./src/courses/review.entity.ts");
const lesson_entity_1 = __webpack_require__(/*! ../courses/lesson.entity */ "./src/courses/lesson.entity.ts");
const notifications_service_1 = __webpack_require__(/*! ../notifications/notifications.service */ "./src/notifications/notifications.service.ts");
let AdminService = class AdminService {
    constructor(userRepository, courseRepository, enrollmentRepository, reviewRepository, lessonRepository, notificationsService) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.reviewRepository = reviewRepository;
        this.lessonRepository = lessonRepository;
        this.notificationsService = notificationsService;
    }
    async getDashboardStats() {
        try {
            const [totalUsers, totalCourses, totalEnrollments, activeUsers, activeCourses,] = await Promise.all([
                this.userRepository.count(),
                this.courseRepository.count(),
                this.enrollmentRepository.count(),
                this.userRepository.count({ where: { isActive: true } }),
                this.courseRepository.count({ where: { isActive: true } }),
            ]);
            const enrollmentsWithCourses = await this.enrollmentRepository.find({
                relations: ['course'],
                select: ['id'],
            });
            const totalRevenue = enrollmentsWithCourses.reduce((sum, enrollment) => {
                return sum + (parseFloat(enrollment.course?.price?.toString() || '0') || 0);
            }, 0);
            return {
                overview: {
                    totalUsers,
                    totalCourses,
                    totalEnrollments,
                    totalRevenue: totalRevenue.toFixed(2),
                    activeUsers,
                    activeCourses,
                },
                recentEnrollments: [],
            };
        }
        catch (error) {
            console.error('Error in getDashboardStats:', error);
            throw error;
        }
    }
    async getAllUsers(page = 1, limit = 10) {
        try {
            const [users, total] = await this.userRepository.findAndCount({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    role: true,
                    isActive: true,
                    createdAt: true,
                },
                skip: (page - 1) * limit,
                take: limit,
                order: { createdAt: 'DESC' },
            });
            const usersWithName = users.map(user => ({
                ...user,
                name: user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`.trim()
                    : user.firstName || user.lastName || user.email?.split('@')[0] || 'User'
            }));
            return {
                data: usersWithName,
                meta: {
                    page,
                    limit,
                    total,
                    pageCount: Math.ceil(total / limit),
                },
            };
        }
        catch (error) {
            console.error('Error in getAllUsers:', error);
            throw error;
        }
    }
    async toggleUserStatus(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.isActive = !user.isActive;
        return this.userRepository.save(user);
    }
    async deleteUser(userId) {
        const result = await this.userRepository.delete(userId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('User not found');
        }
        return { message: 'User deleted successfully' };
    }
    async getAllCourses(page = 1, limit = 10) {
        const [courses, total] = await this.courseRepository.findAndCount({
            relations: ['instructorUser'],
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });
        return {
            data: courses,
            meta: {
                page,
                limit,
                total,
                pageCount: Math.ceil(total / limit),
            },
        };
    }
    async toggleCourseStatus(courseId) {
        const course = await this.courseRepository.findOne({ where: { id: courseId } });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        course.isActive = !course.isActive;
        return this.courseRepository.save(course);
    }
    async deleteCourse(courseId) {
        const result = await this.courseRepository.delete(courseId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Course not found');
        }
        return { message: 'Course deleted successfully' };
    }
    async getTopInstructors(limit = 10) {
        const instructors = await this.userRepository.find({
            where: { role: 'instructor' },
            select: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt'],
        });
        const instructorsWithCounts = await Promise.all(instructors.map(async (instructor) => {
            const courseCount = await this.courseRepository.count({
                where: { instructorUser: { id: instructor.id } },
            });
            return {
                ...instructor,
                courseCount,
            };
        }));
        return instructorsWithCounts
            .sort((a, b) => b.courseCount - a.courseCount)
            .slice(0, limit);
    }
    async getRevenueAnalytics() {
        const enrollments = await this.enrollmentRepository.find({
            relations: ['course'],
            order: { enrolledAt: 'DESC' },
        });
        const monthlyData = new Map();
        enrollments.forEach((enrollment) => {
            const date = new Date(enrollment.enrolledAt);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
            const existing = monthlyData.get(monthKey) || { revenue: 0, enrollments: 0 };
            existing.revenue += parseFloat(enrollment.course?.price?.toString() || '0');
            existing.enrollments += 1;
            monthlyData.set(monthKey, existing);
        });
        const result = Array.from(monthlyData.entries())
            .map(([month, data]) => ({
            month,
            revenue: Math.round(data.revenue * 100) / 100,
            enrollments: data.enrollments,
        }))
            .sort((a, b) => b.month.localeCompare(a.month))
            .slice(0, 12);
        return result;
    }
    async getPendingCourses() {
        return this.courseRepository.find({
            where: { status: course_entity_1.CourseStatus.PENDING_REVIEW },
            relations: ['instructorUser'],
            order: { createdAt: 'DESC' },
        });
    }
    async approveCourse(courseId) {
        const course = await this.courseRepository.findOne({
            where: { id: courseId },
            relations: ['instructorUser'],
        });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        course.status = course_entity_1.CourseStatus.APPROVED;
        course.isActive = true;
        course.rejectionReason = null;
        const saved = await this.courseRepository.save(course);
        if (course.instructorUser?.id) {
            await this.notificationsService.notifyCourseApproved(course.instructorUser.id, course.title);
        }
        return saved;
    }
    async rejectCourse(courseId, reason) {
        const course = await this.courseRepository.findOne({
            where: { id: courseId },
            relations: ['instructorUser'],
        });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const rejectionReason = reason || 'Course does not meet platform standards';
        course.status = course_entity_1.CourseStatus.REJECTED;
        course.isActive = false;
        course.rejectionReason = rejectionReason;
        const saved = await this.courseRepository.save(course);
        if (course.instructorUser?.id) {
            await this.notificationsService.notifyCourseRejected(course.instructorUser.id, course.title, rejectionReason);
        }
        return saved;
    }
    async getPendingInstructors() {
        return this.userRepository.find({
            where: {
                role: 'instructor',
                instructorApprovalStatus: 'pending'
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                instructorApplicationDate: true,
                createdAt: true,
            },
            order: { instructorApplicationDate: 'DESC' },
        });
    }
    async approveInstructor(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.instructorApprovalStatus = 'approved';
        user.instructorRejectionReason = null;
        return this.userRepository.save(user);
    }
    async rejectInstructor(userId, reason) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.instructorApprovalStatus = 'rejected';
        user.instructorRejectionReason = reason || 'Application does not meet requirements';
        user.role = 'student';
        return this.userRepository.save(user);
    }
    async getAllEnrollments(page = 1, limit = 10) {
        try {
            const [enrollments, total] = await this.enrollmentRepository.findAndCount({
                relations: ['user', 'course'],
                skip: (page - 1) * limit,
                take: limit,
                order: { enrolledAt: 'DESC' },
            });
            return {
                data: enrollments,
                meta: {
                    page,
                    limit,
                    total,
                    pageCount: Math.ceil(total / limit),
                },
            };
        }
        catch (error) {
            console.error('Error in getAllEnrollments:', error);
            throw error;
        }
    }
    async refundEnrollment(enrollmentId) {
        const result = await this.enrollmentRepository.delete(enrollmentId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Enrollment not found');
        }
        return { message: 'Enrollment refunded and deleted successfully' };
    }
    async updateCourse(courseId, updateData) {
        const course = await this.courseRepository.findOne({ where: { id: courseId } });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        Object.assign(course, updateData);
        return this.courseRepository.save(course);
    }
    async getCourseLessons(courseId) {
        const course = await this.courseRepository.findOne({ where: { id: courseId } });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        return this.lessonRepository.find({
            where: { course: { id: courseId } },
            order: { order: 'ASC' },
        });
    }
    async getCourseLesson(courseId, lessonId) {
        const course = await this.courseRepository.findOne({ where: { id: courseId } });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const lesson = await this.lessonRepository.findOne({
            where: { id: lessonId, course: { id: courseId } },
            relations: ['course'],
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson with ID ${lessonId} not found in course ${courseId}`);
        }
        return lesson;
    }
    async getLesson(lessonId) {
        const lesson = await this.lessonRepository.findOne({
            where: { id: lessonId },
            relations: ['course'],
        });
        if (!lesson) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        return lesson;
    }
    async deleteCourseLesson(courseId, lessonId) {
        const course = await this.courseRepository.findOne({ where: { id: courseId } });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const lesson = await this.lessonRepository.findOne({
            where: { id: lessonId, course: { id: courseId } },
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson with ID ${lessonId} not found in course ${courseId}`);
        }
        await this.lessonRepository.delete(lessonId);
        return { message: 'Lesson deleted successfully' };
    }
    async deleteLesson(lessonId) {
        const result = await this.lessonRepository.delete(lessonId);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        return { message: 'Lesson deleted successfully' };
    }
    async changeUserRole(userId, newRole) {
        const validRoles = ['student', 'instructor', 'admin'];
        if (!validRoles.includes(newRole)) {
            throw new common_1.BadRequestException(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.role = newRole;
        if (newRole === 'instructor') {
            user.instructorApprovalStatus = 'approved';
        }
        return this.userRepository.save(user);
    }
    async getAnalytics() {
        try {
            const [students, instructors, admins] = await Promise.all([
                this.userRepository.count({ where: { role: 'student' } }),
                this.userRepository.count({ where: { role: 'instructor' } }),
                this.userRepository.count({ where: { role: 'admin' } }),
            ]);
            const totalUsers = students + instructors + admins;
            const userDistribution = {
                students: { count: students, percentage: totalUsers > 0 ? Math.round((students / totalUsers) * 100) : 0 },
                instructors: { count: instructors, percentage: totalUsers > 0 ? Math.round((instructors / totalUsers) * 100) : 0 },
                admins: { count: admins, percentage: totalUsers > 0 ? Math.round((admins / totalUsers) * 100) : 0 },
            };
            const courses = await this.courseRepository.find({ select: ['category'] });
            const categoryCount = {};
            courses.forEach(course => {
                const cat = course.category || 'other';
                categoryCount[cat] = (categoryCount[cat] || 0) + 1;
            });
            const totalCourses = courses.length;
            const categoryDistribution = Object.entries(categoryCount).map(([category, count]) => ({
                category,
                count,
                percentage: totalCourses > 0 ? Math.round((count / totalCourses) * 100) : 0,
            })).sort((a, b) => b.count - a.count);
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const enrollments = await this.enrollmentRepository.find({
                where: {},
                select: ['enrolledAt'],
            });
            const weeklyData = [0, 0, 0, 0, 0, 0, 0];
            const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            enrollments.forEach(enrollment => {
                const enrollDate = new Date(enrollment.enrolledAt);
                if (enrollDate >= sevenDaysAgo) {
                    const dayIndex = enrollDate.getDay();
                    weeklyData[dayIndex]++;
                }
            });
            const today = new Date().getDay();
            const orderedWeeklyData = [];
            for (let i = 6; i >= 0; i--) {
                const dayIndex = (today - i + 7) % 7;
                orderedWeeklyData.push({
                    day: dayLabels[dayIndex],
                    count: weeklyData[dayIndex],
                });
            }
            const allEnrollments = await this.enrollmentRepository.find({
                select: ['progress'],
            });
            const completedEnrollments = allEnrollments.filter(e => e.progress === 100).length;
            const completionRate = allEnrollments.length > 0
                ? Math.round((completedEnrollments / allEnrollments.length) * 100)
                : 0;
            const reviews = await this.reviewRepository.find({ select: ['rating'] });
            const avgRating = reviews.length > 0
                ? (reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length).toFixed(1)
                : '0.0';
            return {
                userDistribution,
                categoryDistribution,
                weeklyEnrollments: orderedWeeklyData,
                completionRate,
                averageRating: parseFloat(avgRating),
                totalEnrollments: allEnrollments.length,
                completedCourses: completedEnrollments,
            };
        }
        catch (error) {
            console.error('Error in getAnalytics:', error);
            throw error;
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(2, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __param(3, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(4, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof notifications_service_1.NotificationsService !== "undefined" && notifications_service_1.NotificationsService) === "function" ? _f : Object])
], AdminService);


/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./src/auth/auth.module.ts");
const users_module_1 = __webpack_require__(/*! ./users/users.module */ "./src/users/users.module.ts");
const courses_module_1 = __webpack_require__(/*! ./courses/courses.module */ "./src/courses/courses.module.ts");
const enrollments_module_1 = __webpack_require__(/*! ./enrollments/enrollments.module */ "./src/enrollments/enrollments.module.ts");
const admin_module_1 = __webpack_require__(/*! ./admin/admin.module */ "./src/admin/admin.module.ts");
const health_module_1 = __webpack_require__(/*! ./health/health.module */ "./src/health/health.module.ts");
const notifications_module_1 = __webpack_require__(/*! ./notifications/notifications.module */ "./src/notifications/notifications.module.ts");
const chatbot_module_1 = __webpack_require__(/*! ./chatbot/chatbot.module */ "./src/chatbot/chatbot.module.ts");
const video_stream_module_1 = __webpack_require__(/*! ./video-stream/video-stream.module */ "./src/video-stream/video-stream.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 100,
                }]),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                ttl: 300000,
                max: 100,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                autoLoadEntities: true,
                synchronize: true,
                logging: process.env.NODE_ENV === 'development',
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            courses_module_1.CoursesModule,
            enrollments_module_1.EnrollmentsModule,
            admin_module_1.AdminModule,
            health_module_1.HealthModule,
            notifications_module_1.NotificationsModule,
            chatbot_module_1.ChatbotModule,
            video_stream_module_1.VideoStreamModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);


/***/ }),

/***/ "./src/auth/auth.controller.ts":
/*!*************************************!*\
  !*** ./src/auth/auth.controller.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/auth/auth.service.ts");
const login_dto_1 = __webpack_require__(/*! ./dto/login.dto */ "./src/auth/dto/login.dto.ts");
const register_dto_1 = __webpack_require__(/*! ./dto/register.dto */ "./src/auth/dto/register.dto.ts");
const users_service_1 = __webpack_require__(/*! ../users/users.service */ "./src/users/users.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ./jwt-auth.guard */ "./src/auth/jwt-auth.guard.ts");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async register(registerDto) {
        try {
            const user = await this.usersService.create(registerDto);
            const { password, ...result } = user;
            return this.authService.login(result);
        }
        catch (error) {
            console.error('Registration error details:', {
                message: error.message,
                code: error.code,
                detail: error.detail,
                stack: error.stack,
            });
            throw error;
        }
    }
    async login(loginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }
    async changePassword(req, body) {
        const user = await this.authService.validateUser(req.user.email, body.currentPassword);
        if (!user) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        await this.usersService.updatePassword(req.user.id, body.newPassword);
        return { message: 'Password updated successfully' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User successfully registered' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Login user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful, returns JWT token' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Change user password' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized or incorrect current password' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object])
], AuthController);


/***/ }),

/***/ "./src/auth/auth.module.ts":
/*!*********************************!*\
  !*** ./src/auth/auth.module.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/auth/auth.service.ts");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./src/auth/auth.controller.ts");
const jwt_strategy_1 = __webpack_require__(/*! ./jwt.strategy */ "./src/auth/jwt.strategy.ts");
const users_module_1 = __webpack_require__(/*! ../users/users.module */ "./src/users/users.module.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRATION_TIME'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),

/***/ "./src/auth/auth.service.ts":
/*!**********************************!*\
  !*** ./src/auth/auth.service.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const users_service_1 = __webpack_require__(/*! ../users/users.service */ "./src/users/users.service.ts");
const bcrypt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        const name = user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`.trim()
            : user.firstName || user.lastName || user.email?.split('@')[0] || 'User';
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, email: user.email, name, role: user.role },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ }),

/***/ "./src/auth/dto/login.dto.ts":
/*!***********************************!*\
  !*** ./src/auth/dto/login.dto.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),

/***/ "./src/auth/dto/register.dto.ts":
/*!**************************************!*\
  !*** ./src/auth/dto/register.dto.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['student', 'instructor', 'admin']),
    __metadata("design:type", String)
], RegisterDto.prototype, "role", void 0);


/***/ }),

/***/ "./src/auth/jwt-auth.guard.ts":
/*!************************************!*\
  !*** ./src/auth/jwt-auth.guard.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),

/***/ "./src/auth/jwt.strategy.ts":
/*!**********************************!*\
  !*** ./src/auth/jwt.strategy.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
        this.configService = configService;
    }
    async validate(payload) {
        return { id: payload.sub, email: payload.email, role: payload.role };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtStrategy);


/***/ }),

/***/ "./src/auth/roles.decorator.ts":
/*!*************************************!*\
  !*** ./src/auth/roles.decorator.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),

/***/ "./src/auth/roles.guard.ts":
/*!*********************************!*\
  !*** ./src/auth/roles.guard.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const roles_decorator_1 = __webpack_require__(/*! ./roles.decorator */ "./src/auth/roles.decorator.ts");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.role === role);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),

/***/ "./src/chatbot/chatbot.controller.ts":
/*!*******************************************!*\
  !*** ./src/chatbot/chatbot.controller.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatbotController = exports.OptionalJwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./src/auth/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ../common/guards/roles.guard */ "./src/common/guards/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! ../common/decorators/roles.decorator */ "./src/common/decorators/roles.decorator.ts");
const chatbot_service_1 = __webpack_require__(/*! ./chatbot.service */ "./src/chatbot/chatbot.service.ts");
const chatbot_dto_1 = __webpack_require__(/*! ./dto/chatbot.dto */ "./src/chatbot/dto/chatbot.dto.ts");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let OptionalJwtAuthGuard = class OptionalJwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(err, user) {
        return user || null;
    }
};
exports.OptionalJwtAuthGuard = OptionalJwtAuthGuard;
exports.OptionalJwtAuthGuard = OptionalJwtAuthGuard = __decorate([
    (0, common_2.Injectable)()
], OptionalJwtAuthGuard);
let ChatbotController = class ChatbotController {
    constructor(chatbotService) {
        this.chatbotService = chatbotService;
    }
    getStatus() {
        return {
            configured: this.chatbotService.isConfigured(),
            providers: this.chatbotService.getAvailableProviders(),
        };
    }
    createSession(req, clientId, dto) {
        const userId = req.user?.id || null;
        return this.chatbotService.createSession(userId, clientId, dto);
    }
    getSessions(req, clientId, courseId) {
        const userId = req.user?.id || null;
        return this.chatbotService.getUserSessions(userId, clientId, courseId ? parseInt(courseId) : undefined);
    }
    getSession(req, clientId, sessionId) {
        const userId = req.user?.id || null;
        return this.chatbotService.getSession(sessionId, userId, clientId);
    }
    deleteSession(req, clientId, sessionId) {
        const userId = req.user?.id || null;
        return this.chatbotService.deleteSession(sessionId, userId, clientId);
    }
    sendMessage(req, clientId, dto) {
        const userId = req.user?.id || null;
        return this.chatbotService.sendMessage(userId, clientId, dto);
    }
    getUserStats(req, clientId) {
        const userId = req.user?.id || null;
        return this.chatbotService.getUserStats(userId, clientId);
    }
    indexCourse(dto) {
        return this.chatbotService.indexCourse(dto.courseId, dto.chunkSize, dto.chunkOverlap);
    }
    getIndexStats() {
        return this.chatbotService.getIndexStats();
    }
};
exports.ChatbotController = ChatbotController;
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatbotController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)('sessions'),
    (0, common_1.UseGuards)(OptionalJwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-client-id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, typeof (_b = typeof chatbot_dto_1.CreateSessionDto !== "undefined" && chatbot_dto_1.CreateSessionDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], ChatbotController.prototype, "createSession", null);
__decorate([
    (0, common_1.Get)('sessions'),
    (0, common_1.UseGuards)(OptionalJwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-client-id')),
    __param(2, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ChatbotController.prototype, "getSessions", null);
__decorate([
    (0, common_1.Get)('sessions/:sessionId'),
    (0, common_1.UseGuards)(OptionalJwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-client-id')),
    __param(2, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ChatbotController.prototype, "getSession", null);
__decorate([
    (0, common_1.Delete)('sessions/:sessionId'),
    (0, common_1.UseGuards)(OptionalJwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-client-id')),
    __param(2, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ChatbotController.prototype, "deleteSession", null);
__decorate([
    (0, common_1.Post)('chat'),
    (0, common_1.UseGuards)(OptionalJwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-client-id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, typeof (_c = typeof chatbot_dto_1.SendMessageDto !== "undefined" && chatbot_dto_1.SendMessageDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], ChatbotController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.UseGuards)(OptionalJwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-client-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChatbotController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.Post)('index'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'instructor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof chatbot_dto_1.IndexCourseDto !== "undefined" && chatbot_dto_1.IndexCourseDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], ChatbotController.prototype, "indexCourse", null);
__decorate([
    (0, common_1.Get)('index/stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatbotController.prototype, "getIndexStats", null);
exports.ChatbotController = ChatbotController = __decorate([
    (0, common_1.Controller)('chatbot'),
    __metadata("design:paramtypes", [typeof (_a = typeof chatbot_service_1.ChatbotService !== "undefined" && chatbot_service_1.ChatbotService) === "function" ? _a : Object])
], ChatbotController);


/***/ }),

/***/ "./src/chatbot/chatbot.module.ts":
/*!***************************************!*\
  !*** ./src/chatbot/chatbot.module.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatbotModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const axios_1 = __webpack_require__(/*! @nestjs/axios */ "@nestjs/axios");
const chatbot_controller_1 = __webpack_require__(/*! ./chatbot.controller */ "./src/chatbot/chatbot.controller.ts");
const chatbot_service_1 = __webpack_require__(/*! ./chatbot.service */ "./src/chatbot/chatbot.service.ts");
const embedding_service_1 = __webpack_require__(/*! ./embedding.service */ "./src/chatbot/embedding.service.ts");
const vector_store_service_1 = __webpack_require__(/*! ./vector-store.service */ "./src/chatbot/vector-store.service.ts");
const llm_service_1 = __webpack_require__(/*! ./llm.service */ "./src/chatbot/llm.service.ts");
const chat_message_entity_1 = __webpack_require__(/*! ./entities/chat-message.entity */ "./src/chatbot/entities/chat-message.entity.ts");
const chat_session_entity_1 = __webpack_require__(/*! ./entities/chat-session.entity */ "./src/chatbot/entities/chat-session.entity.ts");
const document_embedding_entity_1 = __webpack_require__(/*! ./entities/document-embedding.entity */ "./src/chatbot/entities/document-embedding.entity.ts");
const courses_module_1 = __webpack_require__(/*! ../courses/courses.module */ "./src/courses/courses.module.ts");
let ChatbotModule = class ChatbotModule {
};
exports.ChatbotModule = ChatbotModule;
exports.ChatbotModule = ChatbotModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([chat_message_entity_1.ChatMessage, chat_session_entity_1.ChatSession, document_embedding_entity_1.DocumentEmbedding]),
            axios_1.HttpModule.register({
                timeout: 60000,
                maxRedirects: 5,
            }),
            courses_module_1.CoursesModule,
        ],
        controllers: [chatbot_controller_1.ChatbotController],
        providers: [chatbot_service_1.ChatbotService, embedding_service_1.EmbeddingService, vector_store_service_1.VectorStoreService, llm_service_1.LLMService],
        exports: [chatbot_service_1.ChatbotService, embedding_service_1.EmbeddingService],
    })
], ChatbotModule);


/***/ }),

/***/ "./src/chatbot/chatbot.service.ts":
/*!****************************************!*\
  !*** ./src/chatbot/chatbot.service.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChatbotService_1;
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatbotService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const chat_message_entity_1 = __webpack_require__(/*! ./entities/chat-message.entity */ "./src/chatbot/entities/chat-message.entity.ts");
const chat_session_entity_1 = __webpack_require__(/*! ./entities/chat-session.entity */ "./src/chatbot/entities/chat-session.entity.ts");
const document_embedding_entity_1 = __webpack_require__(/*! ./entities/document-embedding.entity */ "./src/chatbot/entities/document-embedding.entity.ts");
const embedding_service_1 = __webpack_require__(/*! ./embedding.service */ "./src/chatbot/embedding.service.ts");
const vector_store_service_1 = __webpack_require__(/*! ./vector-store.service */ "./src/chatbot/vector-store.service.ts");
const llm_service_1 = __webpack_require__(/*! ./llm.service */ "./src/chatbot/llm.service.ts");
const chatbot_dto_1 = __webpack_require__(/*! ./dto/chatbot.dto */ "./src/chatbot/dto/chatbot.dto.ts");
const courses_service_1 = __webpack_require__(/*! ../courses/courses.service */ "./src/courses/courses.service.ts");
let ChatbotService = ChatbotService_1 = class ChatbotService {
    constructor(messageRepository, sessionRepository, embeddingService, vectorStore, llmService, coursesService) {
        this.messageRepository = messageRepository;
        this.sessionRepository = sessionRepository;
        this.embeddingService = embeddingService;
        this.vectorStore = vectorStore;
        this.llmService = llmService;
        this.coursesService = coursesService;
        this.logger = new common_1.Logger(ChatbotService_1.name);
    }
    async createSession(userId, clientId, dto) {
        const session = this.sessionRepository.create({
            userId: userId || undefined,
            clientId: userId ? undefined : clientId,
            courseId: dto.courseId,
            title: dto.title || 'New Chat',
            context: {
                courseId: dto.courseId,
                systemPrompt: dto.systemPrompt,
            },
        });
        return this.sessionRepository.save(session);
    }
    async getUserSessions(userId, clientId, courseId) {
        const queryBuilder = this.sessionRepository
            .createQueryBuilder('session')
            .orderBy('session.updatedAt', 'DESC');
        if (userId) {
            queryBuilder.where('session.userId = :userId', { userId });
        }
        else if (clientId) {
            queryBuilder.where('session.clientId = :clientId', { clientId });
        }
        else {
            return [];
        }
        if (courseId) {
            queryBuilder.andWhere('session.courseId = :courseId', { courseId });
        }
        return queryBuilder.getMany();
    }
    async getSession(sessionId, userId, clientId) {
        let session = null;
        if (userId) {
            session = await this.sessionRepository.findOne({
                where: { id: sessionId, userId },
                relations: ['messages'],
            });
        }
        else if (clientId) {
            session = await this.sessionRepository.findOne({
                where: { id: sessionId, clientId },
                relations: ['messages'],
            });
        }
        if (!session) {
            throw new common_1.NotFoundException('Chat session not found');
        }
        session.messages = session.messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        return session;
    }
    async sendMessage(userId, clientId, dto) {
        let session;
        if (dto.sessionId) {
            session = await this.getSession(dto.sessionId, userId, clientId);
        }
        else {
            session = await this.createSession(userId, clientId, {
                courseId: dto.courseId,
                title: dto.message.slice(0, 50) + (dto.message.length > 50 ? '...' : ''),
            });
        }
        const userMessage = this.messageRepository.create({
            content: dto.message,
            role: chat_message_entity_1.MessageRole.USER,
            sessionId: session.id,
            userId: userId || undefined,
            clientId: userId ? undefined : clientId,
            metadata: {
                courseId: dto.courseId || session.courseId,
                lessonId: dto.lessonId,
            },
        });
        await this.messageRepository.save(userMessage);
        const searchResults = await this.vectorStore.search(dto.message, {
            courseId: dto.courseId || session.courseId,
            lessonId: dto.lessonId,
            limit: 5,
            minScore: 0.65,
        });
        const contextParts = searchResults.map((result, index) => `[Source ${index + 1}]: ${result.content}`);
        const context = contextParts.join('\n\n');
        let courseTitle;
        let lessonTitle;
        if (session.courseId) {
            try {
                const course = await this.coursesService.findOne(session.courseId);
                courseTitle = course.title;
                if (dto.lessonId) {
                    const lesson = await this.coursesService.getLessonByIdInternal(session.courseId, dto.lessonId);
                    lessonTitle = lesson?.title;
                }
            }
            catch (error) {
                this.logger.warn(`Could not fetch course info: ${error.message}`);
            }
        }
        const systemPrompt = this.llmService.buildRAGSystemPrompt(context || 'No specific course context available.', courseTitle, lessonTitle);
        const history = await this.messageRepository.find({
            where: { sessionId: session.id },
            order: { createdAt: 'DESC' },
            take: 10,
        });
        const llmMessages = [
            { role: 'system', content: systemPrompt },
            ...history.reverse().map((msg) => ({
                role: msg.role,
                content: msg.content,
            })),
        ];
        const llmResponse = await this.llmService.chat(llmMessages, {
            provider: dto.provider || chatbot_dto_1.LLMProvider.OPENAI,
            temperature: 0.7,
            maxTokens: 2048,
        });
        const assistantMessage = this.messageRepository.create({
            content: llmResponse.content,
            role: chat_message_entity_1.MessageRole.ASSISTANT,
            sessionId: session.id,
            userId: userId || undefined,
            clientId: userId ? undefined : clientId,
            metadata: {
                courseId: dto.courseId || session.courseId,
                lessonId: dto.lessonId,
                sources: searchResults.map((r) => r.id),
                tokens: llmResponse.tokens.total,
                model: llmResponse.model,
            },
        });
        await this.messageRepository.save(assistantMessage);
        await this.sessionRepository.update(session.id, {
            messageCount: session.messageCount + 2,
            totalTokens: session.totalTokens + llmResponse.tokens.total,
            updatedAt: new Date(),
        });
        const updatedSession = await this.sessionRepository.findOne({
            where: { id: session.id },
        });
        return {
            message: assistantMessage,
            session: updatedSession,
            sources: searchResults.map((r) => ({
                content: r.content.slice(0, 200) + '...',
                score: r.score,
                lessonId: r.lessonId,
            })),
        };
    }
    async indexCourse(courseId, chunkSize = 1000, chunkOverlap = 200) {
        const course = await this.coursesService.findOne(courseId);
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        await this.vectorStore.deleteCoursEmbeddings(courseId);
        const documents = [];
        if (course.description) {
            const descChunks = this.embeddingService.splitTextIntoChunks(course.description, chunkSize, chunkOverlap);
            descChunks.forEach((chunk, index) => {
                documents.push({
                    content: chunk,
                    documentType: document_embedding_entity_1.DocumentType.COURSE_DESCRIPTION,
                    metadata: {
                        title: course.title,
                        chunkIndex: index,
                        totalChunks: descChunks.length,
                    },
                    courseId,
                });
            });
        }
        const lessons = await this.coursesService.getLessonsInternal(courseId);
        for (const lesson of lessons) {
            if (lesson.content) {
                const lessonChunks = this.embeddingService.splitTextIntoChunks(`Lesson: ${lesson.title}\n\n${lesson.content}`, chunkSize, chunkOverlap);
                lessonChunks.forEach((chunk, index) => {
                    documents.push({
                        content: chunk,
                        documentType: document_embedding_entity_1.DocumentType.LESSON_CONTENT,
                        metadata: {
                            title: lesson.title,
                            lessonOrder: lesson.order,
                            chunkIndex: index,
                            totalChunks: lessonChunks.length,
                        },
                        courseId,
                        lessonId: lesson.id,
                    });
                });
            }
        }
        if (documents.length > 0) {
            await this.vectorStore.storeDocuments(documents);
        }
        this.logger.log(`Indexed course ${courseId}: ${documents.length} chunks from ${lessons.length + 1} sources`);
        return {
            indexed: lessons.length + 1,
            chunks: documents.length,
        };
    }
    async deleteSession(sessionId, userId, clientId) {
        let session = null;
        if (userId) {
            session = await this.sessionRepository.findOne({
                where: { id: sessionId, userId },
            });
        }
        else if (clientId) {
            session = await this.sessionRepository.findOne({
                where: { id: sessionId, clientId },
            });
        }
        if (!session) {
            throw new common_1.NotFoundException('Chat session not found');
        }
        await this.sessionRepository.remove(session);
    }
    async getUserStats(userId, clientId) {
        let sessions = [];
        if (userId) {
            sessions = await this.sessionRepository.find({
                where: { userId },
            });
        }
        else if (clientId) {
            sessions = await this.sessionRepository.find({
                where: { clientId },
            });
        }
        return {
            totalSessions: sessions.length,
            totalMessages: sessions.reduce((sum, s) => sum + s.messageCount, 0),
            totalTokens: sessions.reduce((sum, s) => sum + s.totalTokens, 0),
        };
    }
    async getIndexStats() {
        return this.vectorStore.getStats();
    }
    isConfigured() {
        return this.llmService.isConfigured();
    }
    getAvailableProviders() {
        return this.llmService.getAvailableProviders();
    }
};
exports.ChatbotService = ChatbotService;
exports.ChatbotService = ChatbotService = ChatbotService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_message_entity_1.ChatMessage)),
    __param(1, (0, typeorm_1.InjectRepository)(chat_session_entity_1.ChatSession)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof embedding_service_1.EmbeddingService !== "undefined" && embedding_service_1.EmbeddingService) === "function" ? _c : Object, typeof (_d = typeof vector_store_service_1.VectorStoreService !== "undefined" && vector_store_service_1.VectorStoreService) === "function" ? _d : Object, typeof (_e = typeof llm_service_1.LLMService !== "undefined" && llm_service_1.LLMService) === "function" ? _e : Object, typeof (_f = typeof courses_service_1.CoursesService !== "undefined" && courses_service_1.CoursesService) === "function" ? _f : Object])
], ChatbotService);


/***/ }),

/***/ "./src/chatbot/dto/chatbot.dto.ts":
/*!****************************************!*\
  !*** ./src/chatbot/dto/chatbot.dto.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IndexCourseDto = exports.CreateSessionDto = exports.SendMessageDto = exports.LLMProvider = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var LLMProvider;
(function (LLMProvider) {
    LLMProvider["OPENAI"] = "openai";
    LLMProvider["ANTHROPIC"] = "anthropic";
    LLMProvider["GOOGLE"] = "google";
})(LLMProvider || (exports.LLMProvider = LLMProvider = {}));
class SendMessageDto {
}
exports.SendMessageDto = SendMessageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(4000),
    __metadata("design:type", String)
], SendMessageDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "sessionId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SendMessageDto.prototype, "courseId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SendMessageDto.prototype, "lessonId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(LLMProvider),
    __metadata("design:type", String)
], SendMessageDto.prototype, "provider", void 0);
class CreateSessionDto {
}
exports.CreateSessionDto = CreateSessionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSessionDto.prototype, "courseId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSessionDto.prototype, "systemPrompt", void 0);
class IndexCourseDto {
}
exports.IndexCourseDto = IndexCourseDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], IndexCourseDto.prototype, "courseId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], IndexCourseDto.prototype, "chunkSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], IndexCourseDto.prototype, "chunkOverlap", void 0);


/***/ }),

/***/ "./src/chatbot/embedding.service.ts":
/*!******************************************!*\
  !*** ./src/chatbot/embedding.service.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmbeddingService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmbeddingService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const axios_1 = __webpack_require__(/*! @nestjs/axios */ "@nestjs/axios");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const crypto = __importStar(__webpack_require__(/*! crypto */ "crypto"));
let EmbeddingService = EmbeddingService_1 = class EmbeddingService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
        this.logger = new common_1.Logger(EmbeddingService_1.name);
        this.openRouterApiKey = this.configService.get('OPENROUTER_API_KEY', '');
        this.embeddingModel = this.configService.get('EMBEDDING_MODEL', 'openai/text-embedding-3-small');
        this.chunkSize = this.configService.get('CHUNK_SIZE', 800);
        this.chunkOverlap = this.configService.get('CHUNK_OVERLAP', 120);
    }
    async generateEmbedding(text) {
        if (!this.openRouterApiKey) {
            this.logger.warn('OpenRouter API key not configured, using mock embedding');
            return this.generateMockEmbedding(text);
        }
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://openrouter.ai/api/v1/embeddings', {
                input: text,
                model: this.embeddingModel,
            }, {
                headers: {
                    Authorization: `Bearer ${this.openRouterApiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:3000',
                    'X-Title': 'E-Learning Platform',
                },
            }));
            return {
                embedding: response.data.data[0].embedding,
                tokens: response.data.usage?.total_tokens || Math.ceil(text.length / 4),
            };
        }
        catch (error) {
            this.logger.error(`Failed to generate embedding: ${error.message}`);
            return this.generateMockEmbedding(text);
        }
    }
    async generateBatchEmbeddings(texts) {
        if (!this.openRouterApiKey) {
            this.logger.warn('OpenRouter API key not configured, using mock embeddings');
            return texts.map((text) => this.generateMockEmbedding(text));
        }
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://openrouter.ai/api/v1/embeddings', {
                input: texts,
                model: this.embeddingModel,
            }, {
                headers: {
                    Authorization: `Bearer ${this.openRouterApiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:3000',
                    'X-Title': 'E-Learning Platform',
                },
            }));
            return response.data.data.map((item, index) => ({
                embedding: item.embedding,
                tokens: Math.floor((response.data.usage?.total_tokens || texts.join('').length / 4) / texts.length),
            }));
        }
        catch (error) {
            this.logger.error(`Failed to generate batch embeddings: ${error.message}`);
            return texts.map((text) => this.generateMockEmbedding(text));
        }
    }
    generateMockEmbedding(text) {
        const hash = crypto.createHash('sha256').update(text).digest('hex');
        const embedding = [];
        for (let i = 0; i < 1536; i++) {
            const charIndex = i % hash.length;
            const value = parseInt(hash[charIndex], 16) / 16 - 0.5;
            embedding.push(value + Math.sin(i * 0.1) * 0.1);
        }
        const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
        const normalizedEmbedding = embedding.map((val) => val / magnitude);
        return {
            embedding: normalizedEmbedding,
            tokens: Math.ceil(text.length / 4),
        };
    }
    cosineSimilarity(embedding1, embedding2) {
        if (embedding1.length !== embedding2.length) {
            throw new Error('Embeddings must have the same dimension');
        }
        let dotProduct = 0;
        let norm1 = 0;
        let norm2 = 0;
        for (let i = 0; i < embedding1.length; i++) {
            dotProduct += embedding1[i] * embedding2[i];
            norm1 += embedding1[i] * embedding1[i];
            norm2 += embedding2[i] * embedding2[i];
        }
        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }
    generateContentHash(content) {
        return crypto.createHash('sha256').update(content).digest('hex');
    }
    splitTextIntoChunks(text, chunkSize = 1000, overlap = 200) {
        const chunks = [];
        const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
        let currentChunk = '';
        for (const sentence of sentences) {
            const trimmedSentence = sentence.trim();
            if ((currentChunk + ' ' + trimmedSentence).length > chunkSize) {
                if (currentChunk) {
                    chunks.push(currentChunk.trim());
                    const words = currentChunk.split(' ');
                    const overlapWords = Math.ceil(overlap / 5);
                    currentChunk = words.slice(-overlapWords).join(' ');
                }
            }
            currentChunk += (currentChunk ? ' ' : '') + trimmedSentence + '.';
        }
        if (currentChunk.trim()) {
            chunks.push(currentChunk.trim());
        }
        return chunks;
    }
};
exports.EmbeddingService = EmbeddingService;
exports.EmbeddingService = EmbeddingService = EmbeddingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _b : Object])
], EmbeddingService);


/***/ }),

/***/ "./src/chatbot/entities/chat-message.entity.ts":
/*!*****************************************************!*\
  !*** ./src/chatbot/entities/chat-message.entity.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatMessage = exports.MessageRole = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ../../users/user.entity */ "./src/users/user.entity.ts");
const chat_session_entity_1 = __webpack_require__(/*! ./chat-session.entity */ "./src/chatbot/entities/chat-session.entity.ts");
var MessageRole;
(function (MessageRole) {
    MessageRole["USER"] = "user";
    MessageRole["ASSISTANT"] = "assistant";
    MessageRole["SYSTEM"] = "system";
})(MessageRole || (exports.MessageRole = MessageRole = {}));
let ChatMessage = class ChatMessage {
};
exports.ChatMessage = ChatMessage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ChatMessage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ChatMessage.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MessageRole,
        default: MessageRole.USER,
    }),
    __metadata("design:type", String)
], ChatMessage.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ChatMessage.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chat_session_entity_1.ChatSession, (session) => session.messages, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sessionId' }),
    __metadata("design:type", typeof (_a = typeof chat_session_entity_1.ChatSession !== "undefined" && chat_session_entity_1.ChatSession) === "function" ? _a : Object)
], ChatMessage.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChatMessage.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], ChatMessage.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ChatMessage.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 64, nullable: true }),
    __metadata("design:type", String)
], ChatMessage.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ChatMessage.prototype, "createdAt", void 0);
exports.ChatMessage = ChatMessage = __decorate([
    (0, typeorm_1.Entity)('chat_message')
], ChatMessage);


/***/ }),

/***/ "./src/chatbot/entities/chat-session.entity.ts":
/*!*****************************************************!*\
  !*** ./src/chatbot/entities/chat-session.entity.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatSession = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ../../users/user.entity */ "./src/users/user.entity.ts");
const course_entity_1 = __webpack_require__(/*! ../../courses/course.entity */ "./src/courses/course.entity.ts");
const chat_message_entity_1 = __webpack_require__(/*! ./chat-message.entity */ "./src/chatbot/entities/chat-message.entity.ts");
let ChatSession = class ChatSession {
};
exports.ChatSession = ChatSession;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ChatSession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], ChatSession.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ChatSession.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ChatSession.prototype, "context", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], ChatSession.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ChatSession.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 64, nullable: true }),
    __metadata("design:type", String)
], ChatSession.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'courseId' }),
    __metadata("design:type", typeof (_b = typeof course_entity_1.Course !== "undefined" && course_entity_1.Course) === "function" ? _b : Object)
], ChatSession.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ChatSession.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chat_message_entity_1.ChatMessage, (message) => message.session),
    __metadata("design:type", Array)
], ChatSession.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ChatSession.prototype, "messageCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ChatSession.prototype, "totalTokens", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ChatSession.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ChatSession.prototype, "updatedAt", void 0);
exports.ChatSession = ChatSession = __decorate([
    (0, typeorm_1.Entity)('chat_session')
], ChatSession);


/***/ }),

/***/ "./src/chatbot/entities/document-embedding.entity.ts":
/*!***********************************************************!*\
  !*** ./src/chatbot/entities/document-embedding.entity.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentEmbedding = exports.DocumentType = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const course_entity_1 = __webpack_require__(/*! ../../courses/course.entity */ "./src/courses/course.entity.ts");
const lesson_entity_1 = __webpack_require__(/*! ../../courses/lesson.entity */ "./src/courses/lesson.entity.ts");
var DocumentType;
(function (DocumentType) {
    DocumentType["COURSE_DESCRIPTION"] = "course_description";
    DocumentType["LESSON_CONTENT"] = "lesson_content";
    DocumentType["TRANSCRIPT"] = "transcript";
    DocumentType["PDF"] = "pdf";
    DocumentType["FAQ"] = "faq";
    DocumentType["CUSTOM"] = "custom";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
let DocumentEmbedding = class DocumentEmbedding {
};
exports.DocumentEmbedding = DocumentEmbedding;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DocumentEmbedding.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DocumentEmbedding.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DocumentEmbedding.prototype, "contentHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Array)
], DocumentEmbedding.prototype, "embedding", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DocumentType,
        default: DocumentType.LESSON_CONTENT,
    }),
    __metadata("design:type", String)
], DocumentEmbedding.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DocumentEmbedding.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'courseId' }),
    __metadata("design:type", typeof (_a = typeof course_entity_1.Course !== "undefined" && course_entity_1.Course) === "function" ? _a : Object)
], DocumentEmbedding.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], DocumentEmbedding.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'lessonId' }),
    __metadata("design:type", typeof (_b = typeof lesson_entity_1.Lesson !== "undefined" && lesson_entity_1.Lesson) === "function" ? _b : Object)
], DocumentEmbedding.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], DocumentEmbedding.prototype, "lessonId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], DocumentEmbedding.prototype, "createdAt", void 0);
exports.DocumentEmbedding = DocumentEmbedding = __decorate([
    (0, typeorm_1.Entity)('document_embedding'),
    (0, typeorm_1.Index)(['courseId', 'documentType'])
], DocumentEmbedding);


/***/ }),

/***/ "./src/chatbot/llm.service.ts":
/*!************************************!*\
  !*** ./src/chatbot/llm.service.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LLMService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LLMService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const axios_1 = __webpack_require__(/*! @nestjs/axios */ "@nestjs/axios");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const chatbot_dto_1 = __webpack_require__(/*! ./dto/chatbot.dto */ "./src/chatbot/dto/chatbot.dto.ts");
let LLMService = LLMService_1 = class LLMService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
        this.logger = new common_1.Logger(LLMService_1.name);
        this.openRouterApiKey = this.configService.get('OPENROUTER_API_KEY', '');
        this.defaultModel = this.configService.get('LLM_MODEL', 'mistralai/devstral-2512:free');
        this.topK = this.configService.get('TOP_K', 3);
        this.factcheckThreshold = this.configService.get('FACTCHECK_THRESHOLD', 0.75);
    }
    async chat(messages, options = {}) {
        const model = options.model || this.defaultModel;
        const temperature = options.temperature ?? 0.7;
        const maxTokens = options.maxTokens ?? 2048;
        return this.chatOpenRouter(messages, model, temperature, maxTokens);
    }
    async chatOpenRouter(messages, model, temperature, maxTokens) {
        if (!this.openRouterApiKey) {
            this.logger.warn('OpenRouter API key not configured, using mock response');
            return this.getMockResponse(messages);
        }
        try {
            this.logger.log(`Calling OpenRouter with model: ${model}`);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://openrouter.ai/api/v1/chat/completions', {
                model,
                messages,
                temperature,
                max_tokens: maxTokens,
            }, {
                headers: {
                    Authorization: `Bearer ${this.openRouterApiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:3000',
                    'X-Title': 'E-Learning Platform Chatbot',
                },
            }));
            const data = response.data;
            return {
                content: data.choices[0].message.content,
                tokens: {
                    prompt: data.usage?.prompt_tokens || 0,
                    completion: data.usage?.completion_tokens || 0,
                    total: data.usage?.total_tokens || 0,
                },
                model: data.model || model,
                finishReason: data.choices[0].finish_reason || 'stop',
            };
        }
        catch (error) {
            this.logger.error(`OpenRouter API error: ${error.message}`);
            if (error.response?.data) {
                this.logger.error(`Response data: ${JSON.stringify(error.response.data)}`);
            }
            return this.getMockResponse(messages);
        }
    }
    getMockResponse(messages) {
        const lastMessage = messages[messages.length - 1];
        const mockResponses = [
            "I understand you're asking about course content. Let me help you with that. Based on the available materials, I can provide guidance and explanations for your learning journey.",
            "That's a great question! In the context of this course, the concept relates to the foundational principles we've been discussing. Would you like me to elaborate on any specific aspect?",
            "Based on the course materials, here's what I can tell you: This topic is covered in detail in the lessons. The key points to remember are the core concepts and their practical applications.",
            "I'm here to assist with your learning. The material you're asking about connects to several important concepts in this course. Let me break it down for you step by step.",
        ];
        return {
            content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
            tokens: {
                prompt: Math.ceil(lastMessage.content.length / 4),
                completion: 50,
                total: Math.ceil(lastMessage.content.length / 4) + 50,
            },
            model: 'mock-model',
            finishReason: 'stop',
        };
    }
    buildRAGSystemPrompt(context, courseTitle, lessonTitle) {
        return `You are an intelligent AI tutor assistant for an e-learning platform. Your role is to help students understand course materials, answer questions, and provide guidance.

${courseTitle ? `Current Course: ${courseTitle}` : ''}
${lessonTitle ? `Current Lesson: ${lessonTitle}` : ''}

CONTEXT FROM COURSE MATERIALS:
${context}

INSTRUCTIONS:
1. Use the context provided above to answer the student's question accurately
2. If the context doesn't contain enough information, acknowledge this and provide general guidance
3. Be encouraging and supportive in your responses
4. Break down complex concepts into simpler explanations
5. Provide examples when helpful
6. If the student seems confused, offer to explain differently
7. Keep responses concise but comprehensive
8. Use markdown formatting for better readability when appropriate
9. Cite specific parts of the course material when relevant

Remember: Your goal is to facilitate learning, not just provide answers. Help students understand the 'why' behind concepts.`;
    }
    isConfigured() {
        return !!this.openRouterApiKey;
    }
    getAvailableProviders() {
        if (this.openRouterApiKey) {
            return [chatbot_dto_1.LLMProvider.OPENAI, chatbot_dto_1.LLMProvider.ANTHROPIC, chatbot_dto_1.LLMProvider.GOOGLE];
        }
        return [];
    }
    getDefaultModel() {
        return this.defaultModel;
    }
};
exports.LLMService = LLMService;
exports.LLMService = LLMService = LLMService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _b : Object])
], LLMService);


/***/ }),

/***/ "./src/chatbot/vector-store.service.ts":
/*!*********************************************!*\
  !*** ./src/chatbot/vector-store.service.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var VectorStoreService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VectorStoreService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const document_embedding_entity_1 = __webpack_require__(/*! ./entities/document-embedding.entity */ "./src/chatbot/entities/document-embedding.entity.ts");
const embedding_service_1 = __webpack_require__(/*! ./embedding.service */ "./src/chatbot/embedding.service.ts");
let VectorStoreService = VectorStoreService_1 = class VectorStoreService {
    constructor(embeddingRepository, embeddingService) {
        this.embeddingRepository = embeddingRepository;
        this.embeddingService = embeddingService;
        this.logger = new common_1.Logger(VectorStoreService_1.name);
    }
    async storeDocument(content, documentType, metadata = {}, courseId, lessonId) {
        const contentHash = this.embeddingService.generateContentHash(content);
        const existing = await this.embeddingRepository.findOne({
            where: { contentHash },
        });
        if (existing) {
            this.logger.log(`Document with hash ${contentHash.slice(0, 8)} already exists`);
            return existing;
        }
        const { embedding, tokens } = await this.embeddingService.generateEmbedding(content);
        const document = this.embeddingRepository.create({
            content,
            contentHash,
            embedding,
            documentType,
            metadata: { ...metadata, tokens },
            courseId,
            lessonId,
        });
        return this.embeddingRepository.save(document);
    }
    async storeDocuments(documents) {
        const results = [];
        const batchSize = 20;
        for (let i = 0; i < documents.length; i += batchSize) {
            const batch = documents.slice(i, i + batchSize);
            const contents = batch.map((d) => d.content);
            const embeddings = await this.embeddingService.generateBatchEmbeddings(contents);
            for (let j = 0; j < batch.length; j++) {
                const doc = batch[j];
                const contentHash = this.embeddingService.generateContentHash(doc.content);
                const existing = await this.embeddingRepository.findOne({
                    where: { contentHash },
                });
                if (existing) {
                    results.push(existing);
                    continue;
                }
                const document = this.embeddingRepository.create({
                    content: doc.content,
                    contentHash,
                    embedding: embeddings[j].embedding,
                    documentType: doc.documentType,
                    metadata: { ...doc.metadata, tokens: embeddings[j].tokens },
                    courseId: doc.courseId,
                    lessonId: doc.lessonId,
                });
                results.push(await this.embeddingRepository.save(document));
            }
        }
        return results;
    }
    async search(query, options = {}) {
        const { courseId, lessonId, documentTypes, limit = 5, minScore = 0.7 } = options;
        const { embedding: queryEmbedding } = await this.embeddingService.generateEmbedding(query);
        let queryBuilder = this.embeddingRepository.createQueryBuilder('doc');
        if (courseId) {
            queryBuilder = queryBuilder.andWhere('doc.courseId = :courseId', { courseId });
        }
        if (lessonId) {
            queryBuilder = queryBuilder.andWhere('doc.lessonId = :lessonId', { lessonId });
        }
        if (documentTypes && documentTypes.length > 0) {
            queryBuilder = queryBuilder.andWhere('doc.documentType IN (:...types)', {
                types: documentTypes,
            });
        }
        const documents = await queryBuilder.getMany();
        const results = documents
            .map((doc) => ({
            id: doc.id,
            content: doc.content,
            score: this.embeddingService.cosineSimilarity(queryEmbedding, doc.embedding),
            metadata: doc.metadata,
            documentType: doc.documentType,
            courseId: doc.courseId,
            lessonId: doc.lessonId,
        }))
            .filter((result) => result.score >= minScore)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
        return results;
    }
    async deleteCoursEmbeddings(courseId) {
        await this.embeddingRepository.delete({ courseId });
        this.logger.log(`Deleted embeddings for course ${courseId}`);
    }
    async deleteLessonEmbeddings(lessonId) {
        await this.embeddingRepository.delete({ lessonId });
        this.logger.log(`Deleted embeddings for lesson ${lessonId}`);
    }
    async getStats() {
        const totalDocuments = await this.embeddingRepository.count();
        const typeStats = await this.embeddingRepository
            .createQueryBuilder('doc')
            .select('doc.documentType', 'type')
            .addSelect('COUNT(*)', 'count')
            .groupBy('doc.documentType')
            .getRawMany();
        const courseStats = await this.embeddingRepository
            .createQueryBuilder('doc')
            .select('doc.courseId', 'courseId')
            .addSelect('COUNT(*)', 'count')
            .where('doc.courseId IS NOT NULL')
            .groupBy('doc.courseId')
            .getRawMany();
        const documentsByType = {};
        typeStats.forEach((stat) => {
            documentsByType[stat.type] = parseInt(stat.count);
        });
        return {
            totalDocuments,
            documentsByType: documentsByType,
            documentsByCourse: courseStats.map((stat) => ({
                courseId: stat.courseId,
                count: parseInt(stat.count),
            })),
        };
    }
};
exports.VectorStoreService = VectorStoreService;
exports.VectorStoreService = VectorStoreService = VectorStoreService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_embedding_entity_1.DocumentEmbedding)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof embedding_service_1.EmbeddingService !== "undefined" && embedding_service_1.EmbeddingService) === "function" ? _b : Object])
], VectorStoreService);


/***/ }),

/***/ "./src/common/decorators/roles.decorator.ts":
/*!**************************************************!*\
  !*** ./src/common/decorators/roles.decorator.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const Roles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.Roles = Roles;


/***/ }),

/***/ "./src/common/guards/roles.guard.ts":
/*!******************************************!*\
  !*** ./src/common/guards/roles.guard.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.get('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user)
            return false;
        const userRoles = [];
        if (Array.isArray(user.roles)) {
            userRoles.push(...user.roles);
        }
        if (typeof user.role === 'string') {
            userRoles.push(user.role);
        }
        return requiredRoles.some((role) => userRoles.includes(role));
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),

/***/ "./src/courses/course.entity.ts":
/*!**************************************!*\
  !*** ./src/courses/course.entity.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Course = exports.CourseStatus = exports.CourseCategory = exports.CourseLevel = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const review_entity_1 = __webpack_require__(/*! ./review.entity */ "./src/courses/review.entity.ts");
const lesson_entity_1 = __webpack_require__(/*! ./lesson.entity */ "./src/courses/lesson.entity.ts");
const user_entity_1 = __webpack_require__(/*! ../users/user.entity */ "./src/users/user.entity.ts");
var CourseLevel;
(function (CourseLevel) {
    CourseLevel["BEGINNER"] = "beginner";
    CourseLevel["INTERMEDIATE"] = "intermediate";
    CourseLevel["ADVANCED"] = "advanced";
})(CourseLevel || (exports.CourseLevel = CourseLevel = {}));
var CourseCategory;
(function (CourseCategory) {
    CourseCategory["PROGRAMMING"] = "programming";
    CourseCategory["DESIGN"] = "design";
    CourseCategory["BUSINESS"] = "business";
    CourseCategory["MARKETING"] = "marketing";
    CourseCategory["DATA_SCIENCE"] = "data_science";
    CourseCategory["OTHER"] = "other";
})(CourseCategory || (exports.CourseCategory = CourseCategory = {}));
var CourseStatus;
(function (CourseStatus) {
    CourseStatus["DRAFT"] = "draft";
    CourseStatus["PENDING_REVIEW"] = "pending_review";
    CourseStatus["APPROVED"] = "approved";
    CourseStatus["REJECTED"] = "rejected";
})(CourseStatus || (exports.CourseStatus = CourseStatus = {}));
let Course = class Course {
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "instructor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Course.prototype, "instructorUser", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CourseLevel, default: CourseLevel.BEGINNER }),
    __metadata("design:type", String)
], Course.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CourseCategory, default: CourseCategory.OTHER }),
    __metadata("design:type", String)
], Course.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Course.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CourseStatus, default: CourseStatus.DRAFT }),
    __metadata("design:type", String)
], Course.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "enrollmentCount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 2, scale: 1, default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "averageRating", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, review => review.course),
    __metadata("design:type", Array)
], Course.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.Lesson, lesson => lesson.course),
    __metadata("design:type", Array)
], Course.prototype, "lessons", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Course.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Course.prototype, "updatedAt", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['category', 'level']),
    (0, typeorm_1.Index)(['price']),
    (0, typeorm_1.Index)(['enrollmentCount']),
    (0, typeorm_1.Index)(['averageRating']),
    (0, typeorm_1.Index)(['createdAt']),
    (0, typeorm_1.Index)(['title']),
    (0, typeorm_1.Index)(['status'])
], Course);


/***/ }),

/***/ "./src/courses/courses.controller.ts":
/*!*******************************************!*\
  !*** ./src/courses/courses.controller.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoursesController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const multer_1 = __webpack_require__(/*! multer */ "multer");
const path_1 = __webpack_require__(/*! path */ "path");
const courses_service_1 = __webpack_require__(/*! ./courses.service */ "./src/courses/courses.service.ts");
const create_course_dto_1 = __webpack_require__(/*! ./dto/create-course.dto */ "./src/courses/dto/create-course.dto.ts");
const update_course_dto_1 = __webpack_require__(/*! ./dto/update-course.dto */ "./src/courses/dto/update-course.dto.ts");
const create_lesson_dto_1 = __webpack_require__(/*! ./dto/create-lesson.dto */ "./src/courses/dto/create-lesson.dto.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./src/auth/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ../auth/roles.guard */ "./src/auth/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! ../auth/roles.decorator */ "./src/auth/roles.decorator.ts");
let CoursesController = class CoursesController {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    create(createCourseDto, req) {
        return this.coursesService.create(createCourseDto, req.user.id);
    }
    findAll(search, category, level, minPrice, maxPrice, sort) {
        return this.coursesService.findAll({
            search,
            category,
            level,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
            sort,
        }, false);
    }
    getPopular() {
        return this.coursesService.getPopularCourses();
    }
    getMyCourses(req) {
        return this.coursesService.findByInstructor(req.user.id);
    }
    getInstructorDashboard(req) {
        return this.coursesService.getInstructorDashboard(req.user.id);
    }
    findAllAuthenticated(search, category, level, minPrice, maxPrice, sort) {
        return this.coursesService.findAll({
            search,
            category,
            level,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
            sort,
        }, true);
    }
    findOneFull(id) {
        return this.coursesService.findOneWithDetails(+id);
    }
    findOne(id) {
        return this.coursesService.findOnePublic(+id);
    }
    getReviews(id) {
        return this.coursesService.getCourseReviews(+id);
    }
    addReview(id, reviewDto, req) {
        return this.coursesService.addReview(+id, req.user.id, reviewDto);
    }
    updateReview(id, reviewId, reviewDto, req) {
        return this.coursesService.updateReview(+id, +reviewId, req.user.id, reviewDto);
    }
    deleteReview(id, reviewId, req) {
        return this.coursesService.deleteReview(+id, +reviewId, req.user.id, req.user.role);
    }
    update(id, updateCourseDto, req) {
        return this.coursesService.update(+id, updateCourseDto, req.user.id);
    }
    remove(id, req) {
        return this.coursesService.remove(+id, req.user.id);
    }
    getLessons(id, req) {
        return this.coursesService.getCourseLessons(+id, req.user.id, req.user.role);
    }
    getLesson(courseId, lessonId, req) {
        return this.coursesService.getCourseLesson(+courseId, +lessonId, req.user.id, req.user.role);
    }
    addLesson(id, createLessonDto, req) {
        return this.coursesService.addLesson(+id, createLessonDto, req.user.id);
    }
    deleteLesson(courseId, lessonId, req) {
        return this.coursesService.deleteLesson(+courseId, +lessonId, req.user.id);
    }
    async uploadVideo(courseId, lessonId, file, req) {
        if (!file) {
            throw new Error('No file uploaded. Make sure to use form-data with key "video"');
        }
        const videoUrl = `http://localhost:3000/uploads/videos/${file.filename}`;
        await this.coursesService.updateLessonVideo(+courseId, +lessonId, videoUrl, req.user.id);
        return {
            message: 'Video uploaded successfully',
            courseId: +courseId,
            lessonId: +lessonId,
            videoUrl,
            filename: file.filename,
            size: file.size,
        };
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new course (Instructor only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Course created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Instructor role required' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_course_dto_1.CreateCourseDto !== "undefined" && create_course_dto_1.CreateCourseDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Search and filter courses (Public access, limited fields)' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Search in title and description' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Filter by category' }),
    (0, swagger_1.ApiQuery)({ name: 'level', required: false, description: 'Filter by level (beginner/intermediate/advanced)' }),
    (0, swagger_1.ApiQuery)({ name: 'minPrice', required: false, description: 'Minimum price filter' }),
    (0, swagger_1.ApiQuery)({ name: 'maxPrice', required: false, description: 'Maximum price filter' }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, description: 'Sort by: price-asc, price-desc, rating, popular, newest' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Courses retrieved successfully' }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('level')),
    __param(3, (0, common_1.Query)('minPrice')),
    __param(4, (0, common_1.Query)('maxPrice')),
    __param(5, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('popular'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, cache_manager_1.CacheTTL)(600),
    (0, swagger_1.ApiOperation)({ summary: 'Get popular courses (Top 10 by enrollments and rating)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Popular courses retrieved' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getPopular", null);
__decorate([
    (0, common_1.Get)('instructor/my-courses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get instructor own courses' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Courses retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Instructor role required' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getMyCourses", null);
__decorate([
    (0, common_1.Get)('instructor/dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get instructor dashboard metrics (courses, enrollments, ratings, revenue)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard metrics retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Instructor role required' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getInstructorDashboard", null);
__decorate([
    (0, common_1.Get)('all-authenticated'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all courses with full details (Authenticated users)' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'level', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'minPrice', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'maxPrice', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Full course details retrieved' }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('level')),
    __param(3, (0, common_1.Query)('minPrice')),
    __param(4, (0, common_1.Query)('maxPrice')),
    __param(5, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findAllAuthenticated", null);
__decorate([
    (0, common_1.Get)('detailed/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get full course details with reviews (Authenticated users)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Full course details retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findOneFull", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get course details (Public, limited fields)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course details retrieved (limited)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Course not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/reviews'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reviews for a course' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reviews retrieved' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getReviews", null);
__decorate([
    (0, common_1.Post)(':id/reviews'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a review to a course' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Review added successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Already reviewed or invalid rating' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "addReview", null);
__decorate([
    (0, common_1.Put)(':id/reviews/:reviewId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update your review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found or not yours' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('reviewId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "updateReview", null);
__decorate([
    (0, common_1.Delete)(':id/reviews/:reviewId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a review (own review or admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Not authorized to delete this review' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('reviewId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "deleteReview", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a course (Instructor only - must own the course)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Not your course' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_course_dto_1.UpdateCourseDto !== "undefined" && update_course_dto_1.UpdateCourseDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a course (Instructor only - must own the course)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Not your course' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':courseId/lessons'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lessons for a course (Must be enrolled, own the course, or be admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lessons retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Not enrolled in this course' }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getLessons", null);
__decorate([
    (0, common_1.Get)(':courseId/lessons/:lessonId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific lesson from a course (Must be enrolled, own the course, or be admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Not enrolled in this course' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson not found' }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('lessonId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getLesson", null);
__decorate([
    (0, common_1.Post)(':courseId/lessons'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a lesson to a course (Instructor only - must own the course)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Lesson added successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Not your course' }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof create_lesson_dto_1.CreateLessonDto !== "undefined" && create_lesson_dto_1.CreateLessonDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "addLesson", null);
__decorate([
    (0, common_1.Delete)(':courseId/lessons/:lessonId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a lesson from a course (Instructor only - must own the course)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Not your course' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lesson not found' }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('lessonId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "deleteLesson", null);
__decorate([
    (0, common_1.Post)(':courseId/lessons/:lessonId/video'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('video', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/videos',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `video-${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            const allowedMimes = [
                'video/mp4',
                'video/avi',
                'video/mov',
                'video/quicktime',
                'video/x-msvideo',
                'video/x-matroska',
                'video/webm',
                'video/mpeg',
                'video/x-ms-wmv',
            ];
            if (allowedMimes.includes(file.mimetype) || file.mimetype.startsWith('video/')) {
                cb(null, true);
            }
            else {
                cb(new Error(`Invalid file type: ${file.mimetype}. Only video files are allowed!`), false);
            }
        },
        limits: {
            fileSize: 100 * 1024 * 1024,
        },
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a video file for a specific lesson (Instructor only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Video uploaded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid file type' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Not your course' }),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('lessonId')),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_f = typeof Express !== "undefined" && (_e = Express.Multer) !== void 0 && _e.File) === "function" ? _f : Object, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "uploadVideo", null);
exports.CoursesController = CoursesController = __decorate([
    (0, swagger_1.ApiTags)('courses'),
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [typeof (_a = typeof courses_service_1.CoursesService !== "undefined" && courses_service_1.CoursesService) === "function" ? _a : Object])
], CoursesController);


/***/ }),

/***/ "./src/courses/courses.module.ts":
/*!***************************************!*\
  !*** ./src/courses/courses.module.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoursesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const courses_controller_1 = __webpack_require__(/*! ./courses.controller */ "./src/courses/courses.controller.ts");
const courses_service_1 = __webpack_require__(/*! ./courses.service */ "./src/courses/courses.service.ts");
const course_entity_1 = __webpack_require__(/*! ./course.entity */ "./src/courses/course.entity.ts");
const review_entity_1 = __webpack_require__(/*! ./review.entity */ "./src/courses/review.entity.ts");
const lesson_entity_1 = __webpack_require__(/*! ./lesson.entity */ "./src/courses/lesson.entity.ts");
const enrollment_entity_1 = __webpack_require__(/*! ../enrollments/enrollment.entity */ "./src/enrollments/enrollment.entity.ts");
const notifications_module_1 = __webpack_require__(/*! ../notifications/notifications.module */ "./src/notifications/notifications.module.ts");
let CoursesModule = class CoursesModule {
};
exports.CoursesModule = CoursesModule;
exports.CoursesModule = CoursesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([course_entity_1.Course, review_entity_1.Review, lesson_entity_1.Lesson, enrollment_entity_1.Enrollment]),
            (0, common_1.forwardRef)(() => notifications_module_1.NotificationsModule),
        ],
        controllers: [courses_controller_1.CoursesController],
        providers: [courses_service_1.CoursesService],
        exports: [courses_service_1.CoursesService],
    })
], CoursesModule);


/***/ }),

/***/ "./src/courses/courses.service.ts":
/*!****************************************!*\
  !*** ./src/courses/courses.service.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoursesService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const course_entity_1 = __webpack_require__(/*! ./course.entity */ "./src/courses/course.entity.ts");
const review_entity_1 = __webpack_require__(/*! ./review.entity */ "./src/courses/review.entity.ts");
const lesson_entity_1 = __webpack_require__(/*! ./lesson.entity */ "./src/courses/lesson.entity.ts");
const enrollment_entity_1 = __webpack_require__(/*! ../enrollments/enrollment.entity */ "./src/enrollments/enrollment.entity.ts");
const notifications_service_1 = __webpack_require__(/*! ../notifications/notifications.service */ "./src/notifications/notifications.service.ts");
let CoursesService = class CoursesService {
    constructor(coursesRepository, reviewsRepository, lessonsRepository, enrollmentsRepository, notificationsService) {
        this.coursesRepository = coursesRepository;
        this.reviewsRepository = reviewsRepository;
        this.lessonsRepository = lessonsRepository;
        this.enrollmentsRepository = enrollmentsRepository;
        this.notificationsService = notificationsService;
    }
    async create(createCourseDto, userId) {
        const instructor = await this.coursesRepository.manager
            .createQueryBuilder()
            .select(['u.id', 'u.firstName', 'u.lastName'])
            .from('user', 'u')
            .where('u.id = :userId', { userId })
            .getRawOne();
        if (!instructor) {
            throw new common_1.NotFoundException('Instructor not found');
        }
        const course = new course_entity_1.Course();
        course.title = createCourseDto.title;
        course.description = createCourseDto.description;
        course.price = createCourseDto.price;
        course.duration = createCourseDto.duration;
        course.level = createCourseDto.level || course_entity_1.CourseLevel.BEGINNER;
        course.category = createCourseDto.category || course_entity_1.CourseCategory.OTHER;
        course.instructor = `${instructor.u_firstName} ${instructor.u_lastName}`;
        course.instructorUser = { id: userId };
        course.status = course_entity_1.CourseStatus.DRAFT;
        course.isActive = false;
        return this.coursesRepository.save(course);
    }
    async findAll(filters, isAuthenticated = false) {
        const query = this.coursesRepository.createQueryBuilder('course');
        if (isAuthenticated) {
            query.select([
                'course.id',
                'course.title',
                'course.description',
                'course.instructor',
                'course.price',
                'course.duration',
                'course.level',
                'course.category',
                'course.thumbnail',
                'course.enrollmentCount',
                'course.averageRating',
                'course.createdAt',
                'course.status',
                'course.isActive',
            ]);
        }
        else {
            query.select([
                'course.id',
                'course.title',
                'course.description',
                'course.instructor',
                'course.price',
                'course.duration',
                'course.level',
                'course.category',
                'course.thumbnail',
                'course.averageRating',
                'course.enrollmentCount',
            ]);
        }
        query.addSelect(subQuery => subQuery
            .select('COUNT(lesson.id)', 'lessonCount')
            .from(lesson_entity_1.Lesson, 'lesson')
            .where('lesson.courseId = course.id'), 'lessonCount');
        if (filters?.search) {
            query.andWhere('(course.title ILIKE :search OR course.description ILIKE :search)', { search: `%${filters.search}%` });
        }
        if (filters?.category) {
            query.andWhere('course.category = :category', { category: filters.category });
        }
        if (filters?.level) {
            query.andWhere('course.level = :level', { level: filters.level });
        }
        if (filters?.minPrice !== undefined) {
            query.andWhere('course.price >= :minPrice', { minPrice: filters.minPrice });
        }
        if (filters?.maxPrice !== undefined) {
            query.andWhere('course.price <= :maxPrice', { maxPrice: filters.maxPrice });
        }
        query.andWhere('course.isActive = :isActive', { isActive: true });
        switch (filters?.sort) {
            case 'price-asc':
                query.orderBy('course.price', 'ASC');
                break;
            case 'price-desc':
                query.orderBy('course.price', 'DESC');
                break;
            case 'rating':
                query.orderBy('course.averageRating', 'DESC');
                break;
            case 'popular':
                query.orderBy('course.enrollmentCount', 'DESC');
                break;
            default:
                query.orderBy('course.createdAt', 'DESC');
        }
        const rawResults = await query.getRawAndEntities();
        return rawResults.entities.map((course, index) => ({
            ...course,
            lessonCount: parseInt(rawResults.raw[index]?.lessonCount || '0', 10),
        }));
    }
    async getPopularCourses(limit = 10) {
        const query = this.coursesRepository
            .createQueryBuilder('course')
            .select([
            'course.id',
            'course.title',
            'course.description',
            'course.instructor',
            'course.price',
            'course.duration',
            'course.level',
            'course.category',
            'course.thumbnail',
            'course.averageRating',
            'course.enrollmentCount',
        ])
            .addSelect(subQuery => subQuery
            .select('COUNT(lesson.id)', 'lessonCount')
            .from(lesson_entity_1.Lesson, 'lesson')
            .where('lesson.courseId = course.id'), 'lessonCount')
            .where('course.isActive = :isActive', { isActive: true })
            .orderBy('course.enrollmentCount', 'DESC')
            .addOrderBy('course.averageRating', 'DESC')
            .limit(limit);
        const rawResults = await query.getRawAndEntities();
        return rawResults.entities.map((course, index) => ({
            ...course,
            lessonCount: parseInt(rawResults.raw[index]?.lessonCount || '0', 10),
        }));
    }
    async findByInstructor(instructorId) {
        return this.coursesRepository.find({
            where: { instructorUser: { id: instructorId } },
            relations: ['instructorUser'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const course = await this.coursesRepository.findOne({
            where: { id },
            relations: ['instructorUser']
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
        }
        return course;
    }
    async verifyOwnership(courseId, userId) {
        const course = await this.coursesRepository.findOne({
            where: { id: courseId },
            relations: ['instructorUser'],
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
        }
        if (course.instructorUser?.id !== userId) {
            throw new common_1.ForbiddenException('You do not own this course');
        }
        return course;
    }
    async verifyEnrollmentOrOwnership(courseId, userId, userRole) {
        if (userRole === 'admin') {
            const course = await this.coursesRepository.findOne({ where: { id: courseId } });
            if (!course) {
                throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
            }
            return true;
        }
        const course = await this.coursesRepository.findOne({
            where: { id: courseId },
            relations: ['instructorUser'],
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
        }
        if (course.instructorUser?.id === userId) {
            return true;
        }
        const enrollment = await this.enrollmentsRepository.findOne({
            where: { user: { id: userId }, course: { id: courseId } },
        });
        if (!enrollment) {
            throw new common_1.ForbiddenException('You must be enrolled in this course to access its content');
        }
        return true;
    }
    async findOneWithDetails(id) {
        const course = await this.coursesRepository.findOne({
            where: { id },
            relations: ['reviews', 'reviews.user'],
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
        }
        return course;
    }
    async findOnePublic(id) {
        const course = await this.coursesRepository.findOne({
            where: { id },
            relations: ['lessons', 'instructorUser'],
            order: { lessons: { order: 'ASC' } },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
        }
        const result = {
            id: course.id,
            title: course.title,
            description: course.description,
            instructor: course.instructor,
            price: course.price,
            duration: course.duration,
            level: course.level,
            category: course.category,
            thumbnail: course.thumbnail,
            averageRating: course.averageRating,
            enrollmentCount: course.enrollmentCount,
            createdAt: course.createdAt,
            lessons: course.lessons?.map(lesson => ({
                id: lesson.id,
                title: lesson.title,
                content: lesson.content,
                duration: lesson.duration,
                order: lesson.order,
                videoUrl: lesson.videoUrl,
            })) || [],
        };
        if (course.instructorUser) {
            result.instructorUser = {
                id: course.instructorUser.id,
                firstName: course.instructorUser.firstName,
                lastName: course.instructorUser.lastName,
            };
        }
        return result;
    }
    async update(id, updateCourseDto, userId) {
        await this.verifyOwnership(id, userId);
        await this.coursesRepository.update(id, updateCourseDto);
        return this.findOne(id);
    }
    async remove(id, userId) {
        await this.verifyOwnership(id, userId);
        await this.coursesRepository.delete(id);
    }
    async getCourseReviews(courseId) {
        return this.reviewsRepository.find({
            where: { course: { id: courseId } },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }
    async addReview(courseId, userId, reviewDto) {
        const course = await this.findOne(courseId);
        const existingReview = await this.reviewsRepository.findOne({
            where: { course: { id: courseId }, user: { id: userId } },
        });
        if (existingReview) {
            throw new common_1.BadRequestException('You have already reviewed this course');
        }
        if (reviewDto.rating < 1 || reviewDto.rating > 5) {
            throw new common_1.BadRequestException('Rating must be between 1 and 5');
        }
        const review = this.reviewsRepository.create({
            course: { id: courseId },
            user: { id: userId },
            rating: reviewDto.rating,
            comment: reviewDto.comment,
        });
        await this.reviewsRepository.save(review);
        await this.updateCourseRating(courseId);
        if (course.instructorUser?.id) {
            const reviewer = await this.coursesRepository.manager
                .createQueryBuilder()
                .select(['u.firstName', 'u.lastName'])
                .from('user', 'u')
                .where('u.id = :userId', { userId })
                .getRawOne();
            const reviewerName = reviewer ? `${reviewer.u_firstName} ${reviewer.u_lastName}` : 'A student';
            await this.notificationsService.notifyNewReview(course.instructorUser.id, reviewerName, course.title, reviewDto.rating);
        }
        return review;
    }
    async updateReview(courseId, reviewId, userId, reviewDto) {
        const review = await this.reviewsRepository.findOne({
            where: { id: reviewId, course: { id: courseId }, user: { id: userId } },
        });
        if (!review) {
            throw new common_1.NotFoundException('Review not found or you do not own this review');
        }
        if (reviewDto.rating !== undefined) {
            if (reviewDto.rating < 1 || reviewDto.rating > 5) {
                throw new common_1.BadRequestException('Rating must be between 1 and 5');
            }
            review.rating = reviewDto.rating;
        }
        if (reviewDto.comment !== undefined) {
            review.comment = reviewDto.comment;
        }
        await this.reviewsRepository.save(review);
        await this.updateCourseRating(courseId);
        return review;
    }
    async deleteReview(courseId, reviewId, userId, userRole) {
        const review = await this.reviewsRepository.findOne({
            where: { id: reviewId, course: { id: courseId } },
            relations: ['user'],
        });
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        if (review.user.id !== userId && userRole !== 'admin') {
            throw new common_1.ForbiddenException('You can only delete your own reviews');
        }
        await this.reviewsRepository.delete(reviewId);
        await this.updateCourseRating(courseId);
    }
    async updateCourseRating(courseId) {
        const reviews = await this.reviewsRepository.find({
            where: { course: { id: courseId } },
        });
        if (reviews.length > 0) {
            const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
            await this.coursesRepository.update(courseId, {
                averageRating: Math.round(avgRating * 10) / 10,
            });
        }
        else {
            await this.coursesRepository.update(courseId, {
                averageRating: 0,
            });
        }
    }
    async getCourseLessons(courseId, userId, userRole) {
        await this.verifyEnrollmentOrOwnership(courseId, userId, userRole);
        return this.lessonsRepository.find({
            where: { course: { id: courseId } },
            order: { order: 'ASC' },
        });
    }
    async getCourseLesson(courseId, lessonId, userId, userRole) {
        await this.verifyEnrollmentOrOwnership(courseId, userId, userRole);
        const lesson = await this.lessonsRepository.findOne({
            where: { id: lessonId, course: { id: courseId } },
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson with ID ${lessonId} not found in course ${courseId}`);
        }
        return lesson;
    }
    async addLesson(courseId, createLessonDto, userId) {
        await this.verifyOwnership(courseId, userId);
        const lesson = this.lessonsRepository.create({
            ...createLessonDto,
            course: { id: courseId },
        });
        return this.lessonsRepository.save(lesson);
    }
    async incrementEnrollmentCount(courseId) {
        await this.coursesRepository.increment({ id: courseId }, 'enrollmentCount', 1);
    }
    async deleteLesson(courseId, lessonId, userId) {
        await this.verifyOwnership(courseId, userId);
        const lesson = await this.lessonsRepository.findOne({
            where: { id: lessonId, course: { id: courseId } },
            relations: ['course']
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson with ID ${lessonId} not found in course ${courseId}`);
        }
        await this.lessonsRepository.delete(lessonId);
    }
    async updateLessonVideo(courseId, lessonId, videoUrl, userId) {
        await this.verifyOwnership(courseId, userId);
        const lesson = await this.lessonsRepository.findOne({
            where: { id: lessonId, course: { id: courseId } }
        });
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson with ID ${lessonId} not found in course ${courseId}`);
        }
        lesson.videoUrl = videoUrl;
        return this.lessonsRepository.save(lesson);
    }
    async getInstructorDashboard(instructorId) {
        const courses = await this.coursesRepository.find({
            where: { instructorUser: { id: instructorId } },
            order: { createdAt: 'DESC' },
        });
        const totalCourses = courses.length;
        const activeCourses = courses.filter(c => c.isActive).length;
        const draftCourses = courses.filter(c => c.status === course_entity_1.CourseStatus.DRAFT).length;
        const totalEnrollments = await this.enrollmentsRepository
            .createQueryBuilder('enrollment')
            .leftJoin('enrollment.course', 'course')
            .leftJoin('course.instructorUser', 'instructor')
            .where('instructor.id = :instructorId', { instructorId })
            .getCount();
        const rated = courses.filter(c => c.averageRating && c.averageRating > 0);
        const averageRating = rated.length
            ? Math.round((rated.reduce((sum, c) => sum + (c.averageRating || 0), 0) / rated.length) * 10) / 10
            : 0;
        const totalRevenue = courses.reduce((sum, c) => sum + ((c.price || 0) * (c.enrollmentCount || 0)), 0);
        const recentCourses = courses.slice(0, 5).map(c => ({
            id: c.id,
            title: c.title,
            enrollmentCount: c.enrollmentCount,
            averageRating: c.averageRating,
            isActive: c.isActive,
            status: c.status,
            price: c.price,
        }));
        return {
            totalCourses,
            activeCourses,
            draftCourses,
            totalEnrollments,
            averageRating,
            totalRevenue,
            recentCourses,
        };
    }
    async getLessonsInternal(courseId) {
        return this.lessonsRepository.find({
            where: { course: { id: courseId } },
            order: { order: 'ASC' },
        });
    }
    async getLessonByIdInternal(courseId, lessonId) {
        return this.lessonsRepository.findOne({
            where: { id: lessonId, course: { id: courseId } },
        });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(1, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(2, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(3, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => notifications_service_1.NotificationsService))),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof notifications_service_1.NotificationsService !== "undefined" && notifications_service_1.NotificationsService) === "function" ? _e : Object])
], CoursesService);


/***/ }),

/***/ "./src/courses/dto/create-course.dto.ts":
/*!**********************************************!*\
  !*** ./src/courses/dto/create-course.dto.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCourseDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateCourseDto {
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "level", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "category", void 0);


/***/ }),

/***/ "./src/courses/dto/create-lesson.dto.ts":
/*!**********************************************!*\
  !*** ./src/courses/dto/create-lesson.dto.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLessonDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateLessonDto {
}
exports.CreateLessonDto = CreateLessonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lesson title',
        example: 'Introduction to JavaScript Variables',
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lesson content (text, markdown, or HTML)',
        example: 'In this lesson, we will learn about variables in JavaScript...',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lesson order/sequence number',
        example: 1,
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Video URL (if video has been uploaded)',
        example: 'http://localhost:3000/uploads/videos/video-123.mp4',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "videoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Lesson duration in minutes',
        example: 15,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "duration", void 0);


/***/ }),

/***/ "./src/courses/dto/update-course.dto.ts":
/*!**********************************************!*\
  !*** ./src/courses/dto/update-course.dto.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCourseDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const course_entity_1 = __webpack_require__(/*! ../course.entity */ "./src/courses/course.entity.ts");
class UpdateCourseDto {
}
exports.UpdateCourseDto = UpdateCourseDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "instructor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateCourseDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateCourseDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(course_entity_1.CourseLevel),
    __metadata("design:type", typeof (_a = typeof course_entity_1.CourseLevel !== "undefined" && course_entity_1.CourseLevel) === "function" ? _a : Object)
], UpdateCourseDto.prototype, "level", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(course_entity_1.CourseCategory),
    __metadata("design:type", typeof (_b = typeof course_entity_1.CourseCategory !== "undefined" && course_entity_1.CourseCategory) === "function" ? _b : Object)
], UpdateCourseDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(course_entity_1.CourseStatus),
    __metadata("design:type", typeof (_c = typeof course_entity_1.CourseStatus !== "undefined" && course_entity_1.CourseStatus) === "function" ? _c : Object)
], UpdateCourseDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCourseDto.prototype, "isActive", void 0);


/***/ }),

/***/ "./src/courses/lesson.entity.ts":
/*!**************************************!*\
  !*** ./src/courses/lesson.entity.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Lesson = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const course_entity_1 = __webpack_require__(/*! ../courses/course.entity */ "./src/courses/course.entity.ts");
let Lesson = class Lesson {
};
exports.Lesson = Lesson;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, course => course.lessons),
    __metadata("design:type", typeof (_a = typeof course_entity_1.Course !== "undefined" && course_entity_1.Course) === "function" ? _a : Object)
], Lesson.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Lesson.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Lesson.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Lesson.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Lesson.prototype, "createdAt", void 0);
exports.Lesson = Lesson = __decorate([
    (0, typeorm_1.Entity)()
], Lesson);


/***/ }),

/***/ "./src/courses/review.entity.ts":
/*!**************************************!*\
  !*** ./src/courses/review.entity.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Review = exports.ReviewRating = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ../users/user.entity */ "./src/users/user.entity.ts");
const course_entity_1 = __webpack_require__(/*! ../courses/course.entity */ "./src/courses/course.entity.ts");
var ReviewRating;
(function (ReviewRating) {
    ReviewRating[ReviewRating["ONE"] = 1] = "ONE";
    ReviewRating[ReviewRating["TWO"] = 2] = "TWO";
    ReviewRating[ReviewRating["THREE"] = 3] = "THREE";
    ReviewRating[ReviewRating["FOUR"] = 4] = "FOUR";
    ReviewRating[ReviewRating["FIVE"] = 5] = "FIVE";
})(ReviewRating || (exports.ReviewRating = ReviewRating = {}));
let Review = class Review {
};
exports.Review = Review;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Review.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Review.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, course => course.reviews),
    __metadata("design:type", typeof (_b = typeof course_entity_1.Course !== "undefined" && course_entity_1.Course) === "function" ? _b : Object)
], Review.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ReviewRating }),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Review.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Review.prototype, "createdAt", void 0);
exports.Review = Review = __decorate([
    (0, typeorm_1.Entity)()
], Review);


/***/ }),

/***/ "./src/enrollments/dto/create-enrollment.dto.ts":
/*!******************************************************!*\
  !*** ./src/enrollments/dto/create-enrollment.dto.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateEnrollmentDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateEnrollmentDto {
}
exports.CreateEnrollmentDto = CreateEnrollmentDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateEnrollmentDto.prototype, "courseId", void 0);


/***/ }),

/***/ "./src/enrollments/enrollment.entity.ts":
/*!**********************************************!*\
  !*** ./src/enrollments/enrollment.entity.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Enrollment = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ../users/user.entity */ "./src/users/user.entity.ts");
const course_entity_1 = __webpack_require__(/*! ../courses/course.entity */ "./src/courses/course.entity.ts");
let Enrollment = class Enrollment {
};
exports.Enrollment = Enrollment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Enrollment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Enrollment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course),
    __metadata("design:type", typeof (_b = typeof course_entity_1.Course !== "undefined" && course_entity_1.Course) === "function" ? _b : Object)
], Enrollment.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Enrollment.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Enrollment.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Enrollment.prototype, "enrolledAt", void 0);
exports.Enrollment = Enrollment = __decorate([
    (0, typeorm_1.Entity)()
], Enrollment);


/***/ }),

/***/ "./src/enrollments/enrollments.controller.ts":
/*!***************************************************!*\
  !*** ./src/enrollments/enrollments.controller.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnrollmentsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const enrollments_service_1 = __webpack_require__(/*! ./enrollments.service */ "./src/enrollments/enrollments.service.ts");
const create_enrollment_dto_1 = __webpack_require__(/*! ./dto/create-enrollment.dto */ "./src/enrollments/dto/create-enrollment.dto.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./src/auth/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ../auth/roles.guard */ "./src/auth/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! ../auth/roles.decorator */ "./src/auth/roles.decorator.ts");
let EnrollmentsController = class EnrollmentsController {
    constructor(enrollmentsService) {
        this.enrollmentsService = enrollmentsService;
    }
    getStudentDashboard(req) {
        return this.enrollmentsService.getStudentDashboard(req.user.id);
    }
    enroll(req, createEnrollmentDto) {
        return this.enrollmentsService.enroll(req.user.id, createEnrollmentDto.courseId);
    }
    findMyEnrollments(req) {
        return this.enrollmentsService.findByUser(req.user.id);
    }
    getStats(req) {
        return this.enrollmentsService.getEnrollmentStats(req.user.id);
    }
    updateProgress(id, progress, req) {
        return this.enrollmentsService.updateProgress(+id, progress, req.user.id);
    }
    updateLessonProgress(req, lessonId, progressData) {
        return this.enrollmentsService.updateLessonProgress(req.user.id, +lessonId, progressData);
    }
    getLessonProgress(req, courseId) {
        return this.enrollmentsService.getLessonProgress(req.user.id, +courseId);
    }
};
exports.EnrollmentsController = EnrollmentsController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('student'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student dashboard (enrollment stats and recent courses)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Student role required' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "getStudentDashboard", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Enroll in a course' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Enrolled successfully' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof create_enrollment_dto_1.CreateEnrollmentDto !== "undefined" && create_enrollment_dto_1.CreateEnrollmentDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "enroll", null);
__decorate([
    (0, common_1.Get)('my-courses'),
    (0, swagger_1.ApiOperation)({ summary: 'Get enrolled courses' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Courses retrieved' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "findMyEnrollments", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get enrollment statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stats retrieved' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Put)(':id/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Update enrollment progress' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Progress updated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Not your enrollment' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Enrollment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('progress')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Post)('lessons/:lessonId/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Update lesson progress' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson progress updated' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Lesson progress created' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('lessonId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "updateLessonProgress", null);
__decorate([
    (0, common_1.Get)('courses/:courseId/lesson-progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lesson progress for a course' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson progress retrieved' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "getLessonProgress", null);
exports.EnrollmentsController = EnrollmentsController = __decorate([
    (0, swagger_1.ApiTags)('enrollments'),
    (0, common_1.Controller)('enrollments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof enrollments_service_1.EnrollmentsService !== "undefined" && enrollments_service_1.EnrollmentsService) === "function" ? _a : Object])
], EnrollmentsController);


/***/ }),

/***/ "./src/enrollments/enrollments.module.ts":
/*!***********************************************!*\
  !*** ./src/enrollments/enrollments.module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnrollmentsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const enrollments_controller_1 = __webpack_require__(/*! ./enrollments.controller */ "./src/enrollments/enrollments.controller.ts");
const enrollments_service_1 = __webpack_require__(/*! ./enrollments.service */ "./src/enrollments/enrollments.service.ts");
const enrollment_entity_1 = __webpack_require__(/*! ./enrollment.entity */ "./src/enrollments/enrollment.entity.ts");
const lesson_progress_entity_1 = __webpack_require__(/*! ./lesson-progress.entity */ "./src/enrollments/lesson-progress.entity.ts");
const courses_module_1 = __webpack_require__(/*! ../courses/courses.module */ "./src/courses/courses.module.ts");
const users_module_1 = __webpack_require__(/*! ../users/users.module */ "./src/users/users.module.ts");
const notifications_module_1 = __webpack_require__(/*! ../notifications/notifications.module */ "./src/notifications/notifications.module.ts");
let EnrollmentsModule = class EnrollmentsModule {
};
exports.EnrollmentsModule = EnrollmentsModule;
exports.EnrollmentsModule = EnrollmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([enrollment_entity_1.Enrollment, lesson_progress_entity_1.LessonProgress]),
            courses_module_1.CoursesModule,
            users_module_1.UsersModule,
            notifications_module_1.NotificationsModule,
        ],
        controllers: [enrollments_controller_1.EnrollmentsController],
        providers: [enrollments_service_1.EnrollmentsService],
    })
], EnrollmentsModule);


/***/ }),

/***/ "./src/enrollments/enrollments.service.ts":
/*!************************************************!*\
  !*** ./src/enrollments/enrollments.service.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnrollmentsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const enrollment_entity_1 = __webpack_require__(/*! ./enrollment.entity */ "./src/enrollments/enrollment.entity.ts");
const lesson_progress_entity_1 = __webpack_require__(/*! ./lesson-progress.entity */ "./src/enrollments/lesson-progress.entity.ts");
const users_service_1 = __webpack_require__(/*! ../users/users.service */ "./src/users/users.service.ts");
const courses_service_1 = __webpack_require__(/*! ../courses/courses.service */ "./src/courses/courses.service.ts");
const notifications_service_1 = __webpack_require__(/*! ../notifications/notifications.service */ "./src/notifications/notifications.service.ts");
let EnrollmentsService = class EnrollmentsService {
    constructor(enrollmentsRepository, lessonProgressRepository, usersService, coursesService, notificationsService) {
        this.enrollmentsRepository = enrollmentsRepository;
        this.lessonProgressRepository = lessonProgressRepository;
        this.usersService = usersService;
        this.coursesService = coursesService;
        this.notificationsService = notificationsService;
    }
    async enroll(userId, courseId) {
        const user = await this.usersService.findById(userId);
        const course = await this.coursesService.findOne(courseId);
        if (!user || !course) {
            throw new common_1.NotFoundException('User or Course not found');
        }
        if (user.role === 'admin') {
            throw new common_1.ForbiddenException('Administrators cannot enroll in courses');
        }
        if (course.instructorUser?.id === userId) {
            throw new common_1.ForbiddenException('Instructors cannot enroll in their own courses');
        }
        const existing = await this.enrollmentsRepository.findOne({
            where: { user: { id: userId }, course: { id: courseId } },
        });
        if (existing) {
            throw new common_1.BadRequestException('Already enrolled in this course');
        }
        const enrollment = this.enrollmentsRepository.create({
            user,
            course,
        });
        const saved = await this.enrollmentsRepository.save(enrollment);
        await this.coursesService.incrementEnrollmentCount(courseId);
        if (course.instructorUser?.id) {
            const studentName = `${user.firstName} ${user.lastName}`;
            await this.notificationsService.notifyEnrollment(course.instructorUser.id, studentName, course.title);
        }
        return saved;
    }
    async findByUser(userId) {
        return this.enrollmentsRepository.find({
            where: { user: { id: userId } },
            relations: ['course', 'course.lessons'],
            order: { enrolledAt: 'DESC' },
        });
    }
    async getEnrollmentStats(userId) {
        const enrollments = await this.findByUser(userId);
        const total = enrollments.length;
        const completed = enrollments.filter(e => e.completed).length;
        const inProgress = total - completed;
        const avgProgress = total > 0
            ? enrollments.reduce((sum, e) => sum + e.progress, 0) / total
            : 0;
        return {
            total,
            completed,
            inProgress,
            averageProgress: Math.round(avgProgress * 10) / 10,
        };
    }
    async updateProgress(id, progress, userId) {
        if (progress < 0 || progress > 100) {
            throw new common_1.BadRequestException('Progress must be between 0 and 100');
        }
        const enrollment = await this.enrollmentsRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!enrollment) {
            throw new common_1.NotFoundException('Enrollment not found');
        }
        if (enrollment.user?.id !== userId) {
            throw new common_1.ForbiddenException('You can only update your own enrollment progress');
        }
        const oldProgress = enrollment.progress;
        enrollment.progress = progress;
        if (progress === 100 && !enrollment.completed) {
            enrollment.completed = true;
        }
        const saved = await this.enrollmentsRepository.save(enrollment);
        const milestones = [25, 50, 75, 100];
        for (const milestone of milestones) {
            if (oldProgress < milestone && progress >= milestone) {
                const enrollmentWithCourse = await this.enrollmentsRepository.findOne({
                    where: { id },
                    relations: ['course'],
                });
                if (enrollmentWithCourse?.course) {
                    await this.notificationsService.notifyProgressMilestone(userId, enrollmentWithCourse.course.title, milestone);
                }
                break;
            }
        }
        return saved;
    }
    async updateLessonProgress(userId, lessonId, data) {
        let lessonProgress = await this.lessonProgressRepository.findOne({
            where: { user: { id: userId }, lesson: { id: lessonId } },
        });
        if (!lessonProgress) {
            lessonProgress = this.lessonProgressRepository.create({
                user: { id: userId },
                lesson: { id: lessonId },
            });
        }
        lessonProgress.completed = data.completed;
        lessonProgress.timeSpent = data.timeSpent;
        return this.lessonProgressRepository.save(lessonProgress);
    }
    async getLessonProgress(userId, courseId) {
        return this.lessonProgressRepository
            .createQueryBuilder('lp')
            .leftJoinAndSelect('lp.lesson', 'lesson')
            .where('lp.user.id = :userId', { userId })
            .andWhere('lesson.course.id = :courseId', { courseId })
            .getMany();
    }
    async getStudentDashboard(userId) {
        const stats = await this.getEnrollmentStats(userId);
        const recentEnrollments = await this.enrollmentsRepository.find({
            where: { user: { id: userId } },
            relations: ['course'],
            order: { enrolledAt: 'DESC' },
            take: 5,
        });
        const courses = recentEnrollments.map(e => ({
            enrollmentId: e.id,
            courseId: e.course?.id,
            courseTitle: e.course?.title,
            courseInstructor: e.course?.instructor,
            progress: e.progress,
            completed: e.completed,
            enrolledAt: e.enrolledAt,
        }));
        return {
            stats,
            recentCourses: courses,
        };
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __param(1, (0, typeorm_1.InjectRepository)(lesson_progress_entity_1.LessonProgress)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _c : Object, typeof (_d = typeof courses_service_1.CoursesService !== "undefined" && courses_service_1.CoursesService) === "function" ? _d : Object, typeof (_e = typeof notifications_service_1.NotificationsService !== "undefined" && notifications_service_1.NotificationsService) === "function" ? _e : Object])
], EnrollmentsService);


/***/ }),

/***/ "./src/enrollments/lesson-progress.entity.ts":
/*!***************************************************!*\
  !*** ./src/enrollments/lesson-progress.entity.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LessonProgress = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ../users/user.entity */ "./src/users/user.entity.ts");
const lesson_entity_1 = __webpack_require__(/*! ../courses/lesson.entity */ "./src/courses/lesson.entity.ts");
let LessonProgress = class LessonProgress {
};
exports.LessonProgress = LessonProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LessonProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], LessonProgress.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson),
    __metadata("design:type", typeof (_b = typeof lesson_entity_1.Lesson !== "undefined" && lesson_entity_1.Lesson) === "function" ? _b : Object)
], LessonProgress.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LessonProgress.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], LessonProgress.prototype, "timeSpent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], LessonProgress.prototype, "lastAccessedAt", void 0);
exports.LessonProgress = LessonProgress = __decorate([
    (0, typeorm_1.Entity)()
], LessonProgress);


/***/ }),

/***/ "./src/health/health.controller.ts":
/*!*****************************************!*\
  !*** ./src/health/health.controller.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const terminus_1 = __webpack_require__(/*! @nestjs/terminus */ "@nestjs/terminus");
let HealthController = class HealthController {
    constructor(health, db, memory) {
        this.health = health;
        this.db = db;
        this.memory = memory;
    }
    check() {
        return this.health.check([
            () => this.db.pingCheck('database'),
            () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
        ]);
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    (0, swagger_1.ApiOperation)({ summary: 'Health check endpoint' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service is healthy' }),
    (0, swagger_1.ApiResponse)({ status: 503, description: 'Service is unhealthy' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('health'),
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [typeof (_a = typeof terminus_1.HealthCheckService !== "undefined" && terminus_1.HealthCheckService) === "function" ? _a : Object, typeof (_b = typeof terminus_1.TypeOrmHealthIndicator !== "undefined" && terminus_1.TypeOrmHealthIndicator) === "function" ? _b : Object, typeof (_c = typeof terminus_1.MemoryHealthIndicator !== "undefined" && terminus_1.MemoryHealthIndicator) === "function" ? _c : Object])
], HealthController);


/***/ }),

/***/ "./src/health/health.module.ts":
/*!*************************************!*\
  !*** ./src/health/health.module.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const terminus_1 = __webpack_require__(/*! @nestjs/terminus */ "@nestjs/terminus");
const health_controller_1 = __webpack_require__(/*! ./health.controller */ "./src/health/health.controller.ts");
let HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule;
exports.HealthModule = HealthModule = __decorate([
    (0, common_1.Module)({
        imports: [terminus_1.TerminusModule],
        controllers: [health_controller_1.HealthController],
    })
], HealthModule);


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const helmet_1 = __importDefault(__webpack_require__(/*! helmet */ "helmet"));
const path_1 = __webpack_require__(/*! path */ "path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.enableCors({
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
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
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token (Get from /auth/login or /auth/register)',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
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


/***/ }),

/***/ "./src/notifications/notifications.controller.ts":
/*!*******************************************************!*\
  !*** ./src/notifications/notifications.controller.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const notifications_service_1 = __webpack_require__(/*! ./notifications.service */ "./src/notifications/notifications.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./src/auth/jwt-auth.guard.ts");
let NotificationsController = class NotificationsController {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async getMyNotifications(req, page = '1', limit = '20') {
        return this.notificationsService.findByUser(req.user.id, parseInt(page, 10), parseInt(limit, 10));
    }
    async getUnreadCount(req) {
        const count = await this.notificationsService.getUnreadCount(req.user.id);
        return { unreadCount: count };
    }
    async markAsRead(id, req) {
        const notification = await this.notificationsService.markAsRead(id, req.user.id);
        if (!notification) {
            throw new common_1.NotFoundException('Notification not found');
        }
        return notification;
    }
    async markAllAsRead(req) {
        return this.notificationsService.markAllAsRead(req.user.id);
    }
    async deleteNotification(id, req) {
        const deleted = await this.notificationsService.delete(id, req.user.id);
        if (!deleted) {
            throw new common_1.NotFoundException('Notification not found');
        }
        return { message: 'Notification deleted successfully' };
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all notifications for current user' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns paginated notifications with unread count' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getMyNotifications", null);
__decorate([
    (0, common_1.Get)('unread-count'),
    (0, swagger_1.ApiOperation)({ summary: 'Get unread notification count' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns unread notification count' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Put)(':id/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a notification as read' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification marked as read' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notification not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Put)('read-all'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark all notifications as read' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All notifications marked as read' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAllAsRead", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a notification' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notification not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "deleteNotification", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, swagger_1.ApiTags)('notifications'),
    (0, common_1.Controller)('notifications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof notifications_service_1.NotificationsService !== "undefined" && notifications_service_1.NotificationsService) === "function" ? _a : Object])
], NotificationsController);


/***/ }),

/***/ "./src/notifications/notifications.module.ts":
/*!***************************************************!*\
  !*** ./src/notifications/notifications.module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const notifications_service_1 = __webpack_require__(/*! ./notifications.service */ "./src/notifications/notifications.service.ts");
const notifications_controller_1 = __webpack_require__(/*! ./notifications.controller */ "./src/notifications/notifications.controller.ts");
const notification_entity_1 = __webpack_require__(/*! ../users/notification.entity */ "./src/users/notification.entity.ts");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([notification_entity_1.Notification]),
        ],
        controllers: [notifications_controller_1.NotificationsController],
        providers: [notifications_service_1.NotificationsService],
        exports: [notifications_service_1.NotificationsService],
    })
], NotificationsModule);


/***/ }),

/***/ "./src/notifications/notifications.service.ts":
/*!****************************************************!*\
  !*** ./src/notifications/notifications.service.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const notification_entity_1 = __webpack_require__(/*! ../users/notification.entity */ "./src/users/notification.entity.ts");
let NotificationsService = class NotificationsService {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async create(user, type, title, message) {
        const notification = this.notificationRepository.create({
            user: user,
            type,
            title,
            message,
            isRead: false,
        });
        return this.notificationRepository.save(notification);
    }
    async findByUser(userId, page = 1, limit = 20) {
        const [notifications, total] = await this.notificationRepository.findAndCount({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        const unreadCount = await this.notificationRepository.count({
            where: { user: { id: userId }, isRead: false },
        });
        return {
            data: notifications,
            meta: { page, limit, total, unreadCount },
        };
    }
    async getUnreadCount(userId) {
        return this.notificationRepository.count({
            where: { user: { id: userId }, isRead: false },
        });
    }
    async markAsRead(notificationId, userId) {
        const notification = await this.notificationRepository.findOne({
            where: { id: notificationId, user: { id: userId } },
        });
        if (!notification) {
            return null;
        }
        notification.isRead = true;
        return this.notificationRepository.save(notification);
    }
    async markAllAsRead(userId) {
        const result = await this.notificationRepository.update({ user: { id: userId }, isRead: false }, { isRead: true });
        return { updated: result.affected || 0 };
    }
    async delete(notificationId, userId) {
        const result = await this.notificationRepository.delete({
            id: notificationId,
            user: { id: userId },
        });
        return result.affected > 0;
    }
    async notifyEnrollment(instructorId, studentName, courseTitle) {
        return this.create({ id: instructorId }, notification_entity_1.NotificationType.ENROLLMENT, 'New Student Enrolled!', `${studentName} has enrolled in your course "${courseTitle}".`);
    }
    async notifyCourseApproved(instructorId, courseTitle) {
        return this.create({ id: instructorId }, notification_entity_1.NotificationType.SYSTEM, 'Course Approved!', `Your course "${courseTitle}" has been approved and is now live on the platform.`);
    }
    async notifyCourseRejected(instructorId, courseTitle, reason) {
        return this.create({ id: instructorId }, notification_entity_1.NotificationType.SYSTEM, 'Course Rejected', `Your course "${courseTitle}" was not approved. Reason: ${reason}`);
    }
    async notifyNewReview(instructorId, studentName, courseTitle, rating) {
        return this.create({ id: instructorId }, notification_entity_1.NotificationType.REVIEW, 'New Course Review', `${studentName} left a ${rating}-star review on your course "${courseTitle}".`);
    }
    async notifyProgressMilestone(studentId, courseTitle, progress) {
        const milestoneMessages = {
            25: 'Great start! You\'re 25% through',
            50: 'Halfway there! You\'ve completed 50% of',
            75: 'Almost done! You\'re 75% through',
            100: 'Congratulations! You\'ve completed',
        };
        const message = milestoneMessages[progress];
        if (!message)
            return null;
        return this.create({ id: studentId }, notification_entity_1.NotificationType.PROGRESS_MILESTONE, progress === 100 ? 'Course Completed!' : 'Progress Milestone', `${message} "${courseTitle}".`);
    }
    async notifyCourseUpdate(studentId, courseTitle, updateDescription) {
        return this.create({ id: studentId }, notification_entity_1.NotificationType.COURSE_UPDATE, 'Course Updated', `The course "${courseTitle}" has been updated: ${updateDescription}`);
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], NotificationsService);


/***/ }),

/***/ "./src/users/dto/create-user.dto.ts":
/*!******************************************!*\
  !*** ./src/users/dto/create-user.dto.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['student', 'instructor', 'admin']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);


/***/ }),

/***/ "./src/users/notification.entity.ts":
/*!******************************************!*\
  !*** ./src/users/notification.entity.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Notification = exports.NotificationType = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ../users/user.entity */ "./src/users/user.entity.ts");
var NotificationType;
(function (NotificationType) {
    NotificationType["ENROLLMENT"] = "enrollment";
    NotificationType["COURSE_UPDATE"] = "course_update";
    NotificationType["PROGRESS_MILESTONE"] = "progress_milestone";
    NotificationType["REVIEW"] = "review";
    NotificationType["SYSTEM"] = "system";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
let Notification = class Notification {
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Notification.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: NotificationType }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Notification.prototype, "createdAt", void 0);
exports.Notification = Notification = __decorate([
    (0, typeorm_1.Entity)()
], Notification);


/***/ }),

/***/ "./src/users/user.entity.ts":
/*!**********************************!*\
  !*** ./src/users/user.entity.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'student' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'approved' }),
    __metadata("design:type", String)
], User.prototype, "instructorApprovalStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "instructorRejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "instructorApplicationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['role'])
], User);


/***/ }),

/***/ "./src/users/users.controller.ts":
/*!***************************************!*\
  !*** ./src/users/users.controller.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./src/users/users.service.ts");
const create_user_dto_1 = __webpack_require__(/*! ./dto/create-user.dto */ "./src/users/dto/create-user.dto.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./src/auth/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ../auth/roles.guard */ "./src/auth/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! ../auth/roles.decorator */ "./src/auth/roles.decorator.ts");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        const user = await this.usersService.create(createUserDto);
        const { password, ...result } = user;
        return result;
    }
    async findAll() {
        return this.usersService.findAll();
    }
    async getProfile(req) {
        return this.usersService.getProfile(req.user.id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user (Public)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Users retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin role required' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user profile (Any authenticated user)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),

/***/ "./src/users/users.module.ts":
/*!***********************************!*\
  !*** ./src/users/users.module.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const users_controller_1 = __webpack_require__(/*! ./users.controller */ "./src/users/users.controller.ts");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./src/users/users.service.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/users/user.entity.ts");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),

/***/ "./src/users/users.service.ts":
/*!************************************!*\
  !*** ./src/users/users.service.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/users/user.entity.ts");
const bcrypt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.usersRepository.save(user);
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async findById(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
    async updatePassword(id, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.usersRepository.update(id, { password: hashedPassword });
    }
    async update(id, updateData) {
        await this.usersRepository.update(id, updateData);
        return this.findById(id);
    }
    async findAll() {
        return this.usersRepository.find({
            select: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt'],
        });
    }
    async getProfile(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user)
            return null;
        const { password, ...profile } = user;
        const name = user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`.trim()
            : user.firstName || user.lastName || user.email?.split('@')[0] || 'User';
        return { ...profile, name };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UsersService);


/***/ }),

/***/ "./src/video-stream/dto/video-stream.dto.ts":
/*!**************************************************!*\
  !*** ./src/video-stream/dto/video-stream.dto.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranscodeOptionsDto = exports.UpdateProgressDto = exports.UploadVideoDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UploadVideoDto {
}
exports.UploadVideoDto = UploadVideoDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UploadVideoDto.prototype, "lessonId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadVideoDto.prototype, "title", void 0);
class UpdateProgressDto {
}
exports.UpdateProgressDto = UpdateProgressDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateProgressDto.prototype, "currentTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateProgressDto.prototype, "watchedDuration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProgressDto.prototype, "completed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.25),
    (0, class_validator_1.Max)(2),
    __metadata("design:type", Number)
], UpdateProgressDto.prototype, "playbackSpeed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProgressDto.prototype, "preferredQuality", void 0);
class TranscodeOptionsDto {
}
exports.TranscodeOptionsDto = TranscodeOptionsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TranscodeOptionsDto.prototype, "generateHls", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TranscodeOptionsDto.prototype, "generateThumbnails", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], TranscodeOptionsDto.prototype, "qualities", void 0);


/***/ }),

/***/ "./src/video-stream/entities/video-asset.entity.ts":
/*!*********************************************************!*\
  !*** ./src/video-stream/entities/video-asset.entity.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoAsset = exports.VideoQuality = exports.VideoStatus = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const lesson_entity_1 = __webpack_require__(/*! ../../courses/lesson.entity */ "./src/courses/lesson.entity.ts");
var VideoStatus;
(function (VideoStatus) {
    VideoStatus["PENDING"] = "pending";
    VideoStatus["PROCESSING"] = "processing";
    VideoStatus["READY"] = "ready";
    VideoStatus["FAILED"] = "failed";
})(VideoStatus || (exports.VideoStatus = VideoStatus = {}));
var VideoQuality;
(function (VideoQuality) {
    VideoQuality["ORIGINAL"] = "original";
    VideoQuality["HD_1080P"] = "1080p";
    VideoQuality["HD_720P"] = "720p";
    VideoQuality["SD_480P"] = "480p";
    VideoQuality["SD_360P"] = "360p";
})(VideoQuality || (exports.VideoQuality = VideoQuality = {}));
let VideoAsset = class VideoAsset {
};
exports.VideoAsset = VideoAsset;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VideoAsset.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], VideoAsset.prototype, "originalFilename", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], VideoAsset.prototype, "storagePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], VideoAsset.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], VideoAsset.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], VideoAsset.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], VideoAsset.prototype, "width", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], VideoAsset.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: VideoStatus,
        default: VideoStatus.PENDING,
    }),
    __metadata("design:type", String)
], VideoAsset.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], VideoAsset.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], VideoAsset.prototype, "hlsPlaylistPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object)
], VideoAsset.prototype, "hlsVariants", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], VideoAsset.prototype, "thumbnailPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", typeof (_b = typeof Array !== "undefined" && Array) === "function" ? _b : Object)
], VideoAsset.prototype, "thumbnails", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], VideoAsset.prototype, "cdnUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], VideoAsset.prototype, "cdnHlsUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], VideoAsset.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'lessonId' }),
    __metadata("design:type", typeof (_c = typeof lesson_entity_1.Lesson !== "undefined" && lesson_entity_1.Lesson) === "function" ? _c : Object)
], VideoAsset.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], VideoAsset.prototype, "lessonId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], VideoAsset.prototype, "viewCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], VideoAsset.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], VideoAsset.prototype, "updatedAt", void 0);
exports.VideoAsset = VideoAsset = __decorate([
    (0, typeorm_1.Entity)('video_asset'),
    (0, typeorm_1.Index)(['lessonId', 'status'])
], VideoAsset);


/***/ }),

/***/ "./src/video-stream/entities/video-progress.entity.ts":
/*!************************************************************!*\
  !*** ./src/video-stream/entities/video-progress.entity.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoProgress = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ../../users/user.entity */ "./src/users/user.entity.ts");
const video_asset_entity_1 = __webpack_require__(/*! ./video-asset.entity */ "./src/video-stream/entities/video-asset.entity.ts");
let VideoProgress = class VideoProgress {
};
exports.VideoProgress = VideoProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], VideoProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], VideoProgress.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], VideoProgress.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => video_asset_entity_1.VideoAsset, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'videoId' }),
    __metadata("design:type", typeof (_b = typeof video_asset_entity_1.VideoAsset !== "undefined" && video_asset_entity_1.VideoAsset) === "function" ? _b : Object)
], VideoProgress.prototype, "video", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VideoProgress.prototype, "videoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], VideoProgress.prototype, "currentTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], VideoProgress.prototype, "watchedDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], VideoProgress.prototype, "progressPercent", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], VideoProgress.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", typeof (_c = typeof Array !== "undefined" && Array) === "function" ? _c : Object)
], VideoProgress.prototype, "watchHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 1 }),
    __metadata("design:type", Number)
], VideoProgress.prototype, "playbackSpeed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], VideoProgress.prototype, "preferredQuality", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], VideoProgress.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], VideoProgress.prototype, "updatedAt", void 0);
exports.VideoProgress = VideoProgress = __decorate([
    (0, typeorm_1.Entity)('video_progress'),
    (0, typeorm_1.Index)(['userId', 'videoId']),
    (0, typeorm_1.Unique)(['userId', 'videoId'])
], VideoProgress);


/***/ }),

/***/ "./src/video-stream/transcoding.service.ts":
/*!*************************************************!*\
  !*** ./src/video-stream/transcoding.service.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TranscodingService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranscodingService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const video_asset_entity_1 = __webpack_require__(/*! ./entities/video-asset.entity */ "./src/video-stream/entities/video-asset.entity.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const path_1 = __webpack_require__(/*! path */ "path");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const util_1 = __webpack_require__(/*! util */ "util");
const child_process_2 = __webpack_require__(/*! child_process */ "child_process");
const execAsync = (0, util_1.promisify)(child_process_2.exec);
let TranscodingService = TranscodingService_1 = class TranscodingService {
    constructor(configService, videoRepository) {
        this.configService = configService;
        this.videoRepository = videoRepository;
        this.logger = new common_1.Logger(TranscodingService_1.name);
        this.qualityPresets = {
            [video_asset_entity_1.VideoQuality.HD_1080P]: {
                resolution: '1920x1080',
                bitrate: '5000k',
                audioBitrate: '192k',
                bandwidth: 5500000,
            },
            [video_asset_entity_1.VideoQuality.HD_720P]: {
                resolution: '1280x720',
                bitrate: '2800k',
                audioBitrate: '128k',
                bandwidth: 3000000,
            },
            [video_asset_entity_1.VideoQuality.SD_480P]: {
                resolution: '854x480',
                bitrate: '1400k',
                audioBitrate: '128k',
                bandwidth: 1600000,
            },
            [video_asset_entity_1.VideoQuality.SD_360P]: {
                resolution: '640x360',
                bitrate: '800k',
                audioBitrate: '96k',
                bandwidth: 900000,
            },
        };
        this.ffmpegPath = this.configService.get('FFMPEG_PATH', 'ffmpeg');
        this.ffprobePath = this.configService.get('FFPROBE_PATH', 'ffprobe');
        this.outputDir = (0, path_1.join)(process.cwd(), 'uploads', 'videos', 'hls');
        this.ensureDirectories();
    }
    ensureDirectories() {
        const dirs = [
            (0, path_1.join)(process.cwd(), 'uploads', 'videos', 'raw'),
            (0, path_1.join)(process.cwd(), 'uploads', 'videos', 'hls'),
            (0, path_1.join)(process.cwd(), 'uploads', 'videos', 'thumbnails'),
        ];
        dirs.forEach((dir) => {
            if (!(0, fs_1.existsSync)(dir)) {
                (0, fs_1.mkdirSync)(dir, { recursive: true });
            }
        });
    }
    async getVideoMetadata(inputPath) {
        try {
            const { stdout } = await execAsync(`"${this.ffprobePath}" -v quiet -print_format json -show_format -show_streams "${inputPath}"`);
            return JSON.parse(stdout);
        }
        catch (error) {
            this.logger.error(`Failed to get video metadata: ${error.message}`);
            throw error;
        }
    }
    async transcodeToHLS(videoAsset, qualities = [
        video_asset_entity_1.VideoQuality.HD_1080P,
        video_asset_entity_1.VideoQuality.HD_720P,
        video_asset_entity_1.VideoQuality.SD_480P,
    ]) {
        const inputPath = videoAsset.storagePath;
        const videoId = videoAsset.id;
        const hlsDir = (0, path_1.join)(this.outputDir, videoId);
        if (!(0, fs_1.existsSync)(hlsDir)) {
            (0, fs_1.mkdirSync)(hlsDir, { recursive: true });
        }
        videoAsset.status = video_asset_entity_1.VideoStatus.PROCESSING;
        await this.videoRepository.save(videoAsset);
        try {
            const metadata = await this.getVideoMetadata(inputPath);
            const videoStream = metadata.streams.find((s) => s.codec_type === 'video');
            const audioStream = metadata.streams.find((s) => s.codec_type === 'audio');
            const duration = parseFloat(metadata.format.duration);
            const sourceWidth = videoStream?.width || 1920;
            const sourceHeight = videoStream?.height || 1080;
            const applicableQualities = qualities.filter((q) => {
                const preset = this.qualityPresets[q];
                if (!preset)
                    return false;
                const [w, h] = preset.resolution.split('x').map(Number);
                return h <= sourceHeight;
            });
            if (applicableQualities.length === 0) {
                applicableQualities.push(video_asset_entity_1.VideoQuality.SD_480P);
            }
            const hlsVariants = [];
            const startTime = Date.now();
            for (const quality of applicableQualities) {
                const preset = this.qualityPresets[quality];
                const outputPath = (0, path_1.join)(hlsDir, `${quality}.m3u8`);
                const segmentPath = (0, path_1.join)(hlsDir, `${quality}_%03d.ts`);
                await this.runFFmpeg([
                    '-i', inputPath,
                    '-vf', `scale=${preset.resolution}:force_original_aspect_ratio=decrease,pad=${preset.resolution}:(ow-iw)/2:(oh-ih)/2`,
                    '-c:v', 'libx264',
                    '-preset', 'medium',
                    '-crf', '23',
                    '-b:v', preset.bitrate,
                    '-maxrate', preset.bitrate,
                    '-bufsize', `${parseInt(preset.bitrate) * 2}k`,
                    '-c:a', 'aac',
                    '-b:a', preset.audioBitrate,
                    '-hls_time', '10',
                    '-hls_list_size', '0',
                    '-hls_segment_filename', segmentPath,
                    '-f', 'hls',
                    outputPath,
                ]);
                hlsVariants.push({
                    quality,
                    path: outputPath,
                    bandwidth: preset.bandwidth,
                    resolution: preset.resolution,
                });
                this.logger.log(`Transcoded ${quality} for video ${videoId}`);
            }
            const masterPlaylistPath = (0, path_1.join)(hlsDir, 'master.m3u8');
            const masterPlaylist = this.generateMasterPlaylist(hlsVariants, videoId);
            (__webpack_require__(/*! fs */ "fs").writeFileSync)(masterPlaylistPath, masterPlaylist);
            const thumbnails = await this.generateThumbnails(inputPath, videoId, duration);
            const processingTime = (Date.now() - startTime) / 1000;
            return {
                hlsPlaylistPath: masterPlaylistPath,
                hlsVariants,
                thumbnails,
                thumbnailPath: thumbnails[0]?.path || '',
                duration: Math.round(duration),
                width: sourceWidth,
                height: sourceHeight,
                metadata: {
                    codec: videoStream?.codec_name,
                    bitrate: parseInt(metadata.format.bit_rate) / 1000,
                    framerate: eval(videoStream?.r_frame_rate) || 30,
                    audioCodec: audioStream?.codec_name,
                    audioBitrate: audioStream ? parseInt(audioStream.bit_rate) / 1000 : undefined,
                    processingTime,
                },
            };
        }
        catch (error) {
            videoAsset.status = video_asset_entity_1.VideoStatus.FAILED;
            videoAsset.errorMessage = error.message;
            await this.videoRepository.save(videoAsset);
            throw error;
        }
    }
    generateMasterPlaylist(variants, videoId) {
        let playlist = '#EXTM3U\n#EXT-X-VERSION:3\n';
        for (const variant of variants) {
            playlist += `#EXT-X-STREAM-INF:BANDWIDTH=${variant.bandwidth},RESOLUTION=${variant.resolution}\n`;
            playlist += `${variant.quality}.m3u8\n`;
        }
        return playlist;
    }
    async generateThumbnails(inputPath, videoId, duration) {
        const thumbnailDir = (0, path_1.join)(process.cwd(), 'uploads', 'videos', 'thumbnails', videoId);
        if (!(0, fs_1.existsSync)(thumbnailDir)) {
            (0, fs_1.mkdirSync)(thumbnailDir, { recursive: true });
        }
        const thumbnails = [];
        const times = [0, Math.floor(duration / 4), Math.floor(duration / 2), Math.floor(duration * 3 / 4)];
        for (const time of times) {
            const outputPath = (0, path_1.join)(thumbnailDir, `thumb_${time}.jpg`);
            try {
                await this.runFFmpeg([
                    '-ss', time.toString(),
                    '-i', inputPath,
                    '-vframes', '1',
                    '-q:v', '2',
                    '-vf', 'scale=320:-1',
                    outputPath,
                ]);
                thumbnails.push({ time, path: outputPath });
            }
            catch (error) {
                this.logger.warn(`Failed to generate thumbnail at ${time}s: ${error.message}`);
            }
        }
        return thumbnails;
    }
    runFFmpeg(args) {
        return new Promise((resolve, reject) => {
            const process = (0, child_process_1.spawn)(this.ffmpegPath, args);
            let stderr = '';
            process.stderr.on('data', (data) => {
                stderr += data.toString();
            });
            process.on('close', (code) => {
                if (code === 0) {
                    resolve();
                }
                else {
                    reject(new Error(`FFmpeg exited with code ${code}: ${stderr}`));
                }
            });
            process.on('error', (error) => {
                reject(error);
            });
        });
    }
    async isFFmpegAvailable() {
        try {
            await execAsync(`"${this.ffmpegPath}" -version`);
            return true;
        }
        catch {
            return false;
        }
    }
    async cleanupFiles(videoId) {
        const hlsDir = (0, path_1.join)(this.outputDir, videoId);
        const thumbnailDir = (0, path_1.join)(process.cwd(), 'uploads', 'videos', 'thumbnails', videoId);
        try {
            if ((0, fs_1.existsSync)(hlsDir)) {
                const files = (0, fs_1.readdirSync)(hlsDir);
                files.forEach((file) => (0, fs_1.unlinkSync)((0, path_1.join)(hlsDir, file)));
                (__webpack_require__(/*! fs */ "fs").rmdirSync)(hlsDir);
            }
            if ((0, fs_1.existsSync)(thumbnailDir)) {
                const files = (0, fs_1.readdirSync)(thumbnailDir);
                files.forEach((file) => (0, fs_1.unlinkSync)((0, path_1.join)(thumbnailDir, file)));
                (__webpack_require__(/*! fs */ "fs").rmdirSync)(thumbnailDir);
            }
        }
        catch (error) {
            this.logger.error(`Failed to cleanup files for ${videoId}: ${error.message}`);
        }
    }
};
exports.TranscodingService = TranscodingService;
exports.TranscodingService = TranscodingService = TranscodingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(video_asset_entity_1.VideoAsset)),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], TranscodingService);


/***/ }),

/***/ "./src/video-stream/video-stream.controller.ts":
/*!*****************************************************!*\
  !*** ./src/video-stream/video-stream.controller.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoStreamController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const express_1 = __webpack_require__(/*! express */ "express");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./src/auth/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ../common/guards/roles.guard */ "./src/common/guards/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! ../common/decorators/roles.decorator */ "./src/common/decorators/roles.decorator.ts");
const video_stream_service_1 = __webpack_require__(/*! ./video-stream.service */ "./src/video-stream/video-stream.service.ts");
const video_stream_dto_1 = __webpack_require__(/*! ./dto/video-stream.dto */ "./src/video-stream/dto/video-stream.dto.ts");
let VideoStreamController = class VideoStreamController {
    constructor(videoStreamService) {
        this.videoStreamService = videoStreamService;
    }
    getStatus() {
        return this.videoStreamService.getStreamingStatus();
    }
    async uploadVideo(file, dto) {
        if (!file) {
            throw new common_1.BadRequestException('No video file provided');
        }
        return this.videoStreamService.uploadVideo(file, dto.lessonId ? parseInt(dto.lessonId) : undefined, dto.title);
    }
    getVideo(id) {
        return this.videoStreamService.getVideo(id);
    }
    getVideoByLesson(lessonId) {
        return this.videoStreamService.getVideoByLesson(parseInt(lessonId));
    }
    async streamVideo(id, range, quality, res) {
        return this.videoStreamService.streamVideo(id, res, range, quality);
    }
    async streamHLS(id, filename, res) {
        return this.videoStreamService.streamHLS(id, filename, res);
    }
    async getThumbnail(id, index = '0', res) {
        return this.videoStreamService.getThumbnail(id, parseInt(index), res);
    }
    updateProgress(req, id, dto) {
        return this.videoStreamService.updateProgress(req.user.id, id, dto);
    }
    getProgress(req, id) {
        return this.videoStreamService.getProgress(req.user.id, id);
    }
    processVideo(id) {
        return this.videoStreamService.processVideo(id);
    }
    deleteVideo(id) {
        return this.videoStreamService.deleteVideo(id);
    }
};
exports.VideoStreamController = VideoStreamController;
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VideoStreamController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'instructor'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('video')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object, typeof (_d = typeof video_stream_dto_1.UploadVideoDto !== "undefined" && video_stream_dto_1.UploadVideoDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], VideoStreamController.prototype, "uploadVideo", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideoStreamController.prototype, "getVideo", null);
__decorate([
    (0, common_1.Get)('lesson/:lessonId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideoStreamController.prototype, "getVideoByLesson", null);
__decorate([
    (0, common_1.Get)(':id/stream'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('range')),
    __param(2, (0, common_1.Query)('quality')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], VideoStreamController.prototype, "streamVideo", null);
__decorate([
    (0, common_1.Get)(':id/hls/:filename'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('filename')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], VideoStreamController.prototype, "streamHLS", null);
__decorate([
    (0, common_1.Get)(':id/thumbnail/:index?'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('index')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], VideoStreamController.prototype, "getThumbnail", null);
__decorate([
    (0, common_1.Put)(':id/progress'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, typeof (_h = typeof video_stream_dto_1.UpdateProgressDto !== "undefined" && video_stream_dto_1.UpdateProgressDto) === "function" ? _h : Object]),
    __metadata("design:returntype", void 0)
], VideoStreamController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Get)(':id/progress'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], VideoStreamController.prototype, "getProgress", null);
__decorate([
    (0, common_1.Post)(':id/process'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideoStreamController.prototype, "processVideo", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideoStreamController.prototype, "deleteVideo", null);
exports.VideoStreamController = VideoStreamController = __decorate([
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [typeof (_a = typeof video_stream_service_1.VideoStreamService !== "undefined" && video_stream_service_1.VideoStreamService) === "function" ? _a : Object])
], VideoStreamController);


/***/ }),

/***/ "./src/video-stream/video-stream.module.ts":
/*!*************************************************!*\
  !*** ./src/video-stream/video-stream.module.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoStreamModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const video_stream_controller_1 = __webpack_require__(/*! ./video-stream.controller */ "./src/video-stream/video-stream.controller.ts");
const video_stream_service_1 = __webpack_require__(/*! ./video-stream.service */ "./src/video-stream/video-stream.service.ts");
const transcoding_service_1 = __webpack_require__(/*! ./transcoding.service */ "./src/video-stream/transcoding.service.ts");
const video_asset_entity_1 = __webpack_require__(/*! ./entities/video-asset.entity */ "./src/video-stream/entities/video-asset.entity.ts");
const video_progress_entity_1 = __webpack_require__(/*! ./entities/video-progress.entity */ "./src/video-stream/entities/video-progress.entity.ts");
const multer_1 = __webpack_require__(/*! multer */ "multer");
const path_1 = __webpack_require__(/*! path */ "path");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
let VideoStreamModule = class VideoStreamModule {
};
exports.VideoStreamModule = VideoStreamModule;
exports.VideoStreamModule = VideoStreamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([video_asset_entity_1.VideoAsset, video_progress_entity_1.VideoProgress]),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: (req, file, cb) => {
                        cb(null, (0, path_1.join)(process.cwd(), 'uploads', 'videos', 'raw'));
                    },
                    filename: (req, file, cb) => {
                        const uniqueId = (0, uuid_1.v4)();
                        const ext = (0, path_1.extname)(file.originalname);
                        cb(null, `${uniqueId}${ext}`);
                    },
                }),
                fileFilter: (req, file, cb) => {
                    const allowedMimes = [
                        'video/mp4',
                        'video/webm',
                        'video/quicktime',
                        'video/x-msvideo',
                        'video/x-matroska',
                    ];
                    if (allowedMimes.includes(file.mimetype)) {
                        cb(null, true);
                    }
                    else {
                        cb(new Error('Invalid video format'), false);
                    }
                },
                limits: {
                    fileSize: 5 * 1024 * 1024 * 1024,
                },
            }),
        ],
        controllers: [video_stream_controller_1.VideoStreamController],
        providers: [video_stream_service_1.VideoStreamService, transcoding_service_1.TranscodingService],
        exports: [video_stream_service_1.VideoStreamService],
    })
], VideoStreamModule);


/***/ }),

/***/ "./src/video-stream/video-stream.service.ts":
/*!**************************************************!*\
  !*** ./src/video-stream/video-stream.service.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var VideoStreamService_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoStreamService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const video_asset_entity_1 = __webpack_require__(/*! ./entities/video-asset.entity */ "./src/video-stream/entities/video-asset.entity.ts");
const video_progress_entity_1 = __webpack_require__(/*! ./entities/video-progress.entity */ "./src/video-stream/entities/video-progress.entity.ts");
const transcoding_service_1 = __webpack_require__(/*! ./transcoding.service */ "./src/video-stream/transcoding.service.ts");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const path_1 = __webpack_require__(/*! path */ "path");
let VideoStreamService = VideoStreamService_1 = class VideoStreamService {
    constructor(videoRepository, progressRepository, transcodingService, configService) {
        this.videoRepository = videoRepository;
        this.progressRepository = progressRepository;
        this.transcodingService = transcodingService;
        this.configService = configService;
        this.logger = new common_1.Logger(VideoStreamService_1.name);
        this.cdnBaseUrl = this.configService.get('CDN_BASE_URL', '');
        this.streamingEnabled = this.configService.get('VIDEO_STREAMING_ENABLED', true);
    }
    async uploadVideo(file, lessonId, title) {
        const videoAsset = this.videoRepository.create({
            originalFilename: file.originalname,
            storagePath: file.path,
            fileSize: file.size,
            mimeType: file.mimetype,
            lessonId,
            status: video_asset_entity_1.VideoStatus.PENDING,
        });
        const savedAsset = await this.videoRepository.save(videoAsset);
        this.processVideo(savedAsset.id).catch((error) => {
            this.logger.error(`Background processing failed: ${error.message}`);
        });
        return savedAsset;
    }
    async processVideo(videoId) {
        const video = await this.videoRepository.findOne({
            where: { id: videoId },
        });
        if (!video) {
            throw new common_1.NotFoundException('Video not found');
        }
        const ffmpegAvailable = await this.transcodingService.isFFmpegAvailable();
        if (!ffmpegAvailable) {
            this.logger.warn('FFmpeg not available, skipping transcoding');
            video.status = video_asset_entity_1.VideoStatus.READY;
            video.hlsPlaylistPath = video.storagePath;
            return this.videoRepository.save(video);
        }
        try {
            const result = await this.transcodingService.transcodeToHLS(video);
            video.status = video_asset_entity_1.VideoStatus.READY;
            video.hlsPlaylistPath = result.hlsPlaylistPath;
            video.hlsVariants = result.hlsVariants;
            video.thumbnailPath = result.thumbnailPath;
            video.thumbnails = result.thumbnails;
            video.duration = result.duration;
            video.width = result.width;
            video.height = result.height;
            video.metadata = result.metadata;
            if (this.cdnBaseUrl) {
                video.cdnUrl = `${this.cdnBaseUrl}/videos/${video.id}/stream`;
                video.cdnHlsUrl = `${this.cdnBaseUrl}/videos/${video.id}/hls/master.m3u8`;
            }
            return this.videoRepository.save(video);
        }
        catch (error) {
            video.status = video_asset_entity_1.VideoStatus.FAILED;
            video.errorMessage = error.message;
            await this.videoRepository.save(video);
            throw error;
        }
    }
    async getVideo(videoId) {
        const video = await this.videoRepository.findOne({
            where: { id: videoId },
        });
        if (!video) {
            throw new common_1.NotFoundException('Video not found');
        }
        return video;
    }
    async getVideoByLesson(lessonId) {
        return this.videoRepository.findOne({
            where: { lessonId, status: video_asset_entity_1.VideoStatus.READY },
        });
    }
    async streamVideo(videoId, res, range, quality) {
        const video = await this.getVideo(videoId);
        if (video.status !== video_asset_entity_1.VideoStatus.READY) {
            throw new common_1.BadRequestException('Video is not ready for streaming');
        }
        let filePath;
        if (quality && video.hlsVariants) {
            const variant = video.hlsVariants.find((v) => v.quality === quality);
            if (variant) {
                filePath = variant.path;
            }
            else {
                filePath = video.storagePath;
            }
        }
        else {
            filePath = video.storagePath;
        }
        if (!(0, fs_1.existsSync)(filePath)) {
            throw new common_1.NotFoundException('Video file not found');
        }
        const stat = (0, fs_1.statSync)(filePath);
        const fileSize = stat.size;
        await this.videoRepository.increment({ id: videoId }, 'viewCount', 1);
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;
            const stream = (0, fs_1.createReadStream)(filePath, { start, end });
            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': video.mimeType,
                'Cache-Control': 'public, max-age=31536000',
            });
            stream.pipe(res);
        }
        else {
            res.writeHead(200, {
                'Content-Length': fileSize,
                'Content-Type': video.mimeType,
                'Accept-Ranges': 'bytes',
                'Cache-Control': 'public, max-age=31536000',
            });
            (0, fs_1.createReadStream)(filePath).pipe(res);
        }
    }
    async streamHLS(videoId, filename, res) {
        const video = await this.getVideo(videoId);
        if (video.status !== video_asset_entity_1.VideoStatus.READY) {
            throw new common_1.BadRequestException('Video is not ready for streaming');
        }
        const hlsDir = (0, path_1.join)(process.cwd(), 'uploads', 'videos', 'hls', videoId);
        const filePath = (0, path_1.join)(hlsDir, filename);
        if (!(0, fs_1.existsSync)(filePath)) {
            throw new common_1.NotFoundException('HLS file not found');
        }
        const stat = (0, fs_1.statSync)(filePath);
        const contentType = filename.endsWith('.m3u8')
            ? 'application/vnd.apple.mpegurl'
            : 'video/MP2T';
        res.writeHead(200, {
            'Content-Length': stat.size,
            'Content-Type': contentType,
            'Cache-Control': filename.endsWith('.m3u8')
                ? 'no-cache'
                : 'public, max-age=31536000',
            'Access-Control-Allow-Origin': '*',
        });
        (0, fs_1.createReadStream)(filePath).pipe(res);
    }
    async getThumbnail(videoId, index, res) {
        const video = await this.getVideo(videoId);
        if (!video.thumbnails || video.thumbnails.length === 0) {
            throw new common_1.NotFoundException('No thumbnails available');
        }
        const thumbnail = video.thumbnails[index] || video.thumbnails[0];
        if (!(0, fs_1.existsSync)(thumbnail.path)) {
            throw new common_1.NotFoundException('Thumbnail file not found');
        }
        const stat = (0, fs_1.statSync)(thumbnail.path);
        res.writeHead(200, {
            'Content-Length': stat.size,
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=31536000',
        });
        (0, fs_1.createReadStream)(thumbnail.path).pipe(res);
    }
    async updateProgress(userId, videoId, dto) {
        const video = await this.getVideo(videoId);
        let progress = await this.progressRepository.findOne({
            where: { userId, videoId },
        });
        if (!progress) {
            progress = this.progressRepository.create({
                userId,
                videoId,
            });
        }
        progress.currentTime = dto.currentTime;
        if (dto.watchedDuration !== undefined) {
            progress.watchedDuration = dto.watchedDuration;
        }
        if (video.duration && video.duration > 0) {
            progress.progressPercent = Math.min(100, (dto.currentTime / video.duration) * 100);
        }
        if (progress.progressPercent >= 90 || dto.completed) {
            progress.completed = true;
        }
        if (dto.playbackSpeed !== undefined) {
            progress.playbackSpeed = dto.playbackSpeed;
        }
        if (dto.preferredQuality !== undefined) {
            progress.preferredQuality = dto.preferredQuality;
        }
        if (!progress.watchHistory) {
            progress.watchHistory = [];
        }
        progress.watchHistory.push({
            timestamp: new Date(),
            from: progress.currentTime,
            to: dto.currentTime,
        });
        if (progress.watchHistory.length > 100) {
            progress.watchHistory = progress.watchHistory.slice(-100);
        }
        return this.progressRepository.save(progress);
    }
    async getProgress(userId, videoId) {
        return this.progressRepository.findOne({
            where: { userId, videoId },
        });
    }
    async getCourseProgress(userId, courseId) {
        return this.progressRepository
            .createQueryBuilder('progress')
            .innerJoin('progress.video', 'video')
            .innerJoin('video.lesson', 'lesson')
            .innerJoin('lesson.course', 'course')
            .where('progress.userId = :userId', { userId })
            .andWhere('course.id = :courseId', { courseId })
            .getMany();
    }
    async deleteVideo(videoId) {
        const video = await this.getVideo(videoId);
        await this.transcodingService.cleanupFiles(videoId);
        if ((0, fs_1.existsSync)(video.storagePath)) {
            (__webpack_require__(/*! fs */ "fs").unlinkSync)(video.storagePath);
        }
        await this.videoRepository.remove(video);
    }
    async getStreamingStatus() {
        const ffmpegAvailable = await this.transcodingService.isFFmpegAvailable();
        const [totalVideos, readyVideos, processingVideos] = await Promise.all([
            this.videoRepository.count(),
            this.videoRepository.count({ where: { status: video_asset_entity_1.VideoStatus.READY } }),
            this.videoRepository.count({ where: { status: video_asset_entity_1.VideoStatus.PROCESSING } }),
        ]);
        return {
            enabled: this.streamingEnabled,
            ffmpegAvailable,
            cdnConfigured: !!this.cdnBaseUrl,
            totalVideos,
            readyVideos,
            processingVideos,
        };
    }
};
exports.VideoStreamService = VideoStreamService;
exports.VideoStreamService = VideoStreamService = VideoStreamService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_asset_entity_1.VideoAsset)),
    __param(1, (0, typeorm_1.InjectRepository)(video_progress_entity_1.VideoProgress)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof transcoding_service_1.TranscodingService !== "undefined" && transcoding_service_1.TranscodingService) === "function" ? _c : Object, typeof (_d = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _d : Object])
], VideoStreamService);


/***/ }),

/***/ "@nestjs/axios":
/*!********************************!*\
  !*** external "@nestjs/axios" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),

/***/ "@nestjs/cache-manager":
/*!****************************************!*\
  !*** external "@nestjs/cache-manager" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/cache-manager");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/terminus":
/*!***********************************!*\
  !*** external "@nestjs/terminus" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/terminus");

/***/ }),

/***/ "@nestjs/throttler":
/*!************************************!*\
  !*** external "@nestjs/throttler" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;