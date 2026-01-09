# Endpoint Testing Script
$BASE_URL = "http://localhost:3000"
$CONTENT_TYPE = "application/json"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  COURSERA APP ENDPOINT TESTING" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Variables to store tokens
$studentToken = ""
$instructorToken = ""
$adminToken = ""
$studentId = ""
$instructorId = ""
$adminId = ""
$courseId = ""
$enrollmentId = ""

# Function to make HTTP requests
function Invoke-APITest {
    param (
        [string]$Method,
        [string]$Endpoint,
        [hashtable]$Body = $null,
        [string]$Token = "",
        [string]$Description
    )
    
    Write-Host "`n--- $Description ---" -ForegroundColor Yellow
    Write-Host "$Method $Endpoint" -ForegroundColor Gray
    
    try {
        $headers = @{
            "Content-Type" = $CONTENT_TYPE
        }
        
        if ($Token) {
            $headers["Authorization"] = "Bearer $Token"
        }
        
        $params = @{
            Uri = "$BASE_URL$Endpoint"
            Method = $Method
            Headers = $headers
            ErrorAction = "Stop"
        }
        
        if ($Body) {
            $params["Body"] = ($Body | ConvertTo-Json -Depth 10)
            Write-Host "Body: $($params["Body"])" -ForegroundColor Gray
        }
        
        $response = Invoke-RestMethod @params
        Write-Host "SUCCESS" -ForegroundColor Green
        Write-Host ($response | ConvertTo-Json -Depth 10) -ForegroundColor White
        return $response
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "FAILED (Status: $statusCode)" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        
        if ($_.ErrorDetails.Message) {
            Write-Host $_.ErrorDetails.Message -ForegroundColor Red
        }
        return $null
    }
}

# REGISTRATION TESTS
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  1. REGISTRATION TESTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Register Student
$timestamp = Get-Date -Format "HHmmss"
$studentBody = @{
    firstName = "John"
    lastName = "Doe"
    email = "student$timestamp@test.com"
    password = "Student123!"
    role = "student"
}
$studentResponse = Invoke-APITest -Method "POST" -Endpoint "/auth/register" -Body $studentBody -Description "Register Student"
if ($studentResponse) {
    $studentToken = $studentResponse.access_token
    $studentId = $studentResponse.user.id
    Write-Host "Student Token: $studentToken" -ForegroundColor Green
}

# Register Instructor
$instructorBody = @{
    firstName = "Jane"
    lastName = "Smith"
    email = "instructor$timestamp@test.com"
    password = "Instructor123!"
    role = "instructor"
}
$instructorResponse = Invoke-APITest -Method "POST" -Endpoint "/auth/register" -Body $instructorBody -Description "Register Instructor"
if ($instructorResponse) {
    $instructorToken = $instructorResponse.access_token
    $instructorId = $instructorResponse.user.id
    Write-Host "Instructor Token: $instructorToken" -ForegroundColor Green
}

# Register Admin
$adminBody = @{
    firstName = "Admin"
    lastName = "User"
    email = "admin$timestamp@test.com"
    password = "Admin123!"
    role = "admin"
}
$adminResponse = Invoke-APITest -Method "POST" -Endpoint "/auth/register" -Body $adminBody -Description "Register Admin"
if ($adminResponse) {
    $adminToken = $adminResponse.access_token
    $adminId = $adminResponse.user.id
    Write-Host "Admin Token: $adminToken" -ForegroundColor Green
}

# LOGIN TESTS
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  2. LOGIN TESTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$loginBody = @{
    email = "student$timestamp@test.com"
    password = "Student123!"
}
Invoke-APITest -Method "POST" -Endpoint "/auth/login" -Body $loginBody -Description "Login as Student"

# ADMIN TESTS
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  3. ADMIN TESTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Invoke-APITest -Method "GET" -Endpoint "/users" -Token $adminToken -Description "Get All Users (Admin)"
Invoke-APITest -Method "GET" -Endpoint "/admin/dashboard-stats" -Token $adminToken -Description "Get Dashboard Stats"
Invoke-APITest -Method "GET" -Endpoint "/admin/users" -Token $adminToken -Description "Get All Users via Admin Endpoint"
Invoke-APITest -Method "GET" -Endpoint "/admin/instructors/pending" -Token $adminToken -Description "Get Pending Instructors"

if ($instructorId) {
    Invoke-APITest -Method "POST" -Endpoint "/admin/instructors/$instructorId/approve" -Token $adminToken -Description "Approve Instructor"
}

# INSTRUCTOR TESTS
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  4. INSTRUCTOR TESTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$courseBody = @{
    title = "Introduction to Web Development"
    description = "Learn HTML, CSS, JavaScript and more"
    price = 49.99
    duration = 40
    level = "beginner"
    category = "programming"
}
$courseResponse = Invoke-APITest -Method "POST" -Endpoint "/courses" -Body $courseBody -Token $instructorToken -Description "Create Course (Instructor)"
if ($courseResponse) {
    $courseId = $courseResponse.id
    Write-Host "Course ID: $courseId" -ForegroundColor Green
}

Invoke-APITest -Method "GET" -Endpoint "/courses/instructor/my-courses" -Token $instructorToken -Description "Get My Courses (Instructor)"

# COURSE APPROVAL WORKFLOW
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  5. COURSE APPROVAL WORKFLOW" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Invoke-APITest -Method "GET" -Endpoint "/admin/courses/pending" -Token $adminToken -Description "Get Pending Courses (Admin)"

if ($courseId) {
    Invoke-APITest -Method "POST" -Endpoint "/admin/courses/$courseId/approve" -Token $adminToken -Description "Approve Course (Admin)"
}

# STUDENT TESTS
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  6. STUDENT TESTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Invoke-APITest -Method "GET" -Endpoint "/courses" -Token $studentToken -Description "Get All Approved Courses"

if ($courseId) {
    $enrollBody = @{
        courseId = $courseId
    }
    $enrollResponse = Invoke-APITest -Method "POST" -Endpoint "/enrollments" -Body $enrollBody -Token $studentToken -Description "Enroll in Course (Student)"
    if ($enrollResponse) {
        $enrollmentId = $enrollResponse.id
        Write-Host "Enrollment ID: $enrollmentId" -ForegroundColor Green
    }
}

Invoke-APITest -Method "GET" -Endpoint "/enrollments/my-enrollments" -Token $studentToken -Description "Get My Enrollments (Student)"

if ($courseId) {
    $reviewBody = @{
        rating = 5
        comment = "Excellent course! Learned a lot."
    }
    Invoke-APITest -Method "POST" -Endpoint "/courses/$courseId/reviews" -Body $reviewBody -Token $studentToken -Description "Submit Review (Student)"
}

if ($courseId) {
    Invoke-APITest -Method "GET" -Endpoint "/courses/$courseId/reviews" -Token $studentToken -Description "Get Course Reviews"
}

# ENROLLMENT MANAGEMENT
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  7. ENROLLMENT MANAGEMENT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Invoke-APITest -Method "GET" -Endpoint "/admin/enrollments" -Token $adminToken -Description "Get All Enrollments (Admin)"

# ACCESS CONTROL TESTS
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  8. ACCESS CONTROL TESTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Invoke-APITest -Method "GET" -Endpoint "/admin/users" -Token $studentToken -Description "Student Access Admin Endpoint (Should FAIL)"
Invoke-APITest -Method "GET" -Endpoint "/admin/users" -Token $instructorToken -Description "Instructor Access Admin Endpoint (Should FAIL)"
Invoke-APITest -Method "GET" -Endpoint "/users" -Token $studentToken -Description "Student Get All Users (Should FAIL)"

# SUMMARY
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TESTING COMPLETED" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nTokens saved:" -ForegroundColor Green
Write-Host "Student: $studentToken" -ForegroundColor White
Write-Host "Instructor: $instructorToken" -ForegroundColor White
Write-Host "Admin: $adminToken" -ForegroundColor White
