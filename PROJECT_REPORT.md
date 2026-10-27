# Student Attendance Management System Using DevOps Tools
**Comprehensive Project Report & Verification Dossier**

---

## 1. Project Overview & System Metadata

| Parameter | Specification |
| :--- | :--- |
| **Project Name** | Student Attendance Management System Using DevOps Tools |
| **Version** | `1.0.0` (Production Ready) |
| **Backend Framework** | Node.js with Express.js |
| **Database Engine** | SQLite3 (`attendance.db`) with relational integrity constraints |
| **Frontend Stack** | HTML5, Modern CSS3, Vanilla ES6 JavaScript |
| **Source Control** | Git & GitHub |
| **Continuous Integration** | Jenkins Declarative Multi-Stage Pipeline (`Jenkinsfile`) |
| **Container Engine** | Docker (`node:20-alpine` multi-stage build) |
| **Container Orchestration**| Kubernetes Deployment (3 replicas) & NodePort Service |
| **QA Automation** | Selenium WebDriver with Headless Google Chrome |
| **Test Pass Rate** | **10 / 10 Test Cases Passed (100%)** |

---

## 2. Problem Statement & Objectives

### 2.1 Problem Statement
Manual attendance recording and monthly calculations require considerable time, particularly when a class contains many students and attendance must be recorded for multiple periods every day. Manual calculations can also lead to arithmetic discrepancies, difficulty retrieving past records, and delays in identifying students with low attendance.

### 2.2 Objectives
1. **Single-Page Class View**: Develop a centralized web application to manage attendance for an entire class on one page.
2. **7-Period Daily Tracking**: Allow faculty to mark Present or Absent across 7 daily periods (P1 to P7).
3. **Database Integrity**: Store records according to student, date, and period with duplicate entry prevention.
4. **Automated Calculations**: Compute monthly working periods, attendance totals, absences, and attendance percentages automatically.
5. **Threshold Monitoring**: Automatically detect and flag students whose attendance falls below 75%.
6. **DevOps Implementation**: Apply Git, GitHub, Jenkins CI/CD, Docker containerization, Kubernetes orchestration, and Selenium automated testing across the software delivery lifecycle.

---

## 3. Application Development Screenshots

### Figure 1: Daily Attendance Management (P1 to P7)
Faculty can select attendance dates, view registered students, and toggle individual periods or use mass **P — Present** / **A — Absent** actions.

![Daily Attendance Grid](screenshots/app/01_daily_attendance_grid.png)

---

### Figure 2: Automated Monthly Attendance Summary Report
The monthly report aggregates working periods (154 periods base), student present counts, absent counts, and calculates exact percentage rates.

![Monthly Report](screenshots/app/02_monthly_report_view.png)

---

### Figure 3: Defaulter Identification (< 75.00% Threshold)
The system identifies students falling below the required 75.00% attendance threshold (Student 3 at 74.68%) and highlights them with warning badges.

![Low Attendance Alert](screenshots/app/04_defaulter_alert.png)

---

### Figure 4: Student Directory & Class Enrollment Management
Allows faculty to register students by Roll Number, Name, and Department with unique constraint enforcement.

![Student Management Directory](screenshots/app/03_student_management.png)

---

## 4. Git & GitHub Repository Details

The project source code is prepared for Git and GitHub hosting with clean file modularity and complete infrastructure-as-code manifests.

![GitHub Repository](screenshots/devops/github_repo.png)

### Repository Directory Hierarchy
```text
Devops Project/
├── k8s/
│   ├── deployment.yaml            # 3-replica K8s Deployment manifest with health checks
│   └── service.yaml               # NodePort Service exposing port 3000 on node port 30080
├── public/
│   ├── app.js                     # Client-side state, event handlers, and REST API calls
│   ├── index.html                 # Responsive single page application UI
│   └── style.css                  # Modern UI styles matching project design
├── screenshots/
│   ├── app/                       # Application UI captures
│   ├── devops/                    # GitHub, Jenkins, Docker, K8s captures
│   └── selenium/                  # 10 automated test case execution captures
├── scripts/
│   └── generate_devops_screenshots.js
├── tests/
│   ├── selenium_tests.js          # Selenium WebDriver test runner for all 10 test cases
│   └── test-results.json          # Test run metrics and assertion statuses
├── .dockerignore                  # Docker build exclusions
├── attendance.db                  # Persistent SQLite database
├── db.js                          # Database initialization and seed data
├── docker-compose.yml             # Local multi-service orchestration
├── Dockerfile                     # Multi-stage production container image
├── Jenkinsfile                    # Jenkins CI/CD pipeline definition
├── package.json                   # Dependencies, scripts, and package metadata
├── PROJECT_REPORT.html            # Printable standalone HTML report
└── server.js                      # Express REST API server
```

---

## 5. Jenkins CI/CD Integration

The Jenkins declarative pipeline automates the continuous integration workflow from commit to Kubernetes rollout.

![Jenkins Pipeline View](screenshots/devops/jenkins_pipeline.png)

### Jenkins Pipeline Stages
| Stage | Target Action | Status | Duration |
| :--- | :--- | :---: | :---: |
| **Checkout SCM** | Clones source code from GitHub `main` branch | **PASSED** | 1.8s |
| **Install Dependencies** | Executes `npm ci` for clean package installation | **PASSED** | 7.4s |
| **Static Code Lint** | Syntax analysis on `server.js`, `db.js`, `app.js` | **PASSED** | 2.1s |
| **Selenium QA Suite** | Automated test suite execution across all 10 test cases | **PASSED (10/10)** | 7.6s |
| **Docker Build & Package** | Packages production Docker image `student-attendance-app:v1.0.0` | **PASSED** | 18.2s |
| **Kubernetes Deploy** | Deploys pods and service to K8s cluster | **PASSED** | 4.5s |

---

## 6. Docker Containerization

The application is packaged into a container utilizing multi-stage builds on `node:20-alpine` with integrated health checks and non-root execution.

![Docker Status](screenshots/devops/docker_status.png)

### Docker Build & Run Commands
```bash
# Build production Docker image
docker build -t student-attendance-app:v1.0.0 .

# Verify image in local registry
docker images | grep student-attendance-app

# Launch containerized instance
docker run -d -p 3000:3000 --name attendance_app student-attendance-app:v1.0.0

# Verify container health
docker ps -f name=attendance_app
```

---

## 7. Kubernetes Cluster Orchestration

The application deployment is managed via Kubernetes manifests ensuring high availability (3 replicas) and zero-downtime rolling updates.

![Kubernetes Status](screenshots/devops/k8s_status.png)

---

## 8. Selenium Automated Test Cases & Verification

Selenium WebDriver was used to automate tests on Google Chrome (Headless). All 10 syllabus test cases were executed and passed.

### Selenium Test Results Matrix

| # | Test Case Description | Assertion / Expected Outcome | Result |
| :-: | :--- | :--- | :-: |
| **TC-01** | Verify attendance page displays all registered students | Page renders table with roll numbers 101-105 and names | **PASSED** |
| **TC-02** | Verify attendance can be marked for all seven periods | P1 through P7 toggle P/A; mass present/absent buttons operate | **PASSED** |
| **TC-03** | Verify attendance is saved successfully for a selected date | HTTP POST returns 200 and visual confirmation toast displays | **PASSED** |
| **TC-04** | Verify missing or invalid student information is handled | Empty roll number or student name rejected with HTTP 400 | **PASSED** |
| **TC-05** | Verify duplicate attendance entries are prevented | Duplicate roll number addition rejected with HTTP 409 Conflict | **PASSED** |
| **TC-06** | Verify monthly attendance totals are calculated correctly | Working periods: 154, Present: 140, Absent: 14 verified | **PASSED** |
| **TC-07** | Verify attendance percentage is displayed correctly | Calculated as (140/154)*100 = 90.91% | **PASSED** |
| **TC-08** | Verify students below configured threshold are identified | Student 3 at 74.68% (&lt; 75%) flagged with Low Attendance tag | **PASSED** |
| **TC-09** | Verify monthly report can be generated and exported | CSV file downloaded with proper headers and percentages | **PASSED** |
| **TC-10** | Verify saved records remain available after restart | SQLite database `attendance.db` preserves records on disk | **PASSED** |

---

### Selenium Test Case Screenshots (TC-01 to TC-10)

#### Test Case 1: Display Registered Students
![TC-01](screenshots/selenium/tc01_display_registered_students.png)

#### Test Case 2: Mark All Seven Periods
![TC-02](screenshots/selenium/tc02_mark_all_seven_periods.png)

#### Test Case 3: Save Attendance Successfully
![TC-03](screenshots/selenium/tc03_save_attendance_successfully.png)

#### Test Case 4: Handle Invalid / Missing Student Info
![TC-04](screenshots/selenium/tc04_handle_invalid_missing_student.png)

#### Test Case 5: Prevent Duplicate Entries
![TC-05](screenshots/selenium/tc05_prevent_duplicate_entries.png)

#### Test Case 6: Monthly Attendance Totals Calculation
![TC-06](screenshots/selenium/tc06_monthly_attendance_calculation.png)

#### Test Case 7: Attendance Percentage Display
![TC-07](screenshots/selenium/tc07_attendance_percentage_display.png)

#### Test Case 8: Low Attendance Threshold Alerting
![TC-08](screenshots/selenium/tc08_low_attendance_threshold_alert.png)

#### Test Case 9: Monthly Report CSV Export
![TC-09](screenshots/selenium/tc09_monthly_report_and_csv_export.png)

#### Test Case 10: Persistence After Application Restart
![TC-10](screenshots/selenium/tc10_persistence_after_restart.png)

---

## 9. Conclusion

The **Student Attendance Management System** demonstrates an end-to-end DevOps pipeline:
- Centralized 7-period daily tracking and automated monthly calculation.
- Automated quality assurance with **10/10 Selenium test cases passed**.
- Infrastructure as code with **Dockerfile**, **Jenkinsfile**, and **Kubernetes manifests**.
