# Student Attendance Management System Using DevOps Tools

A complete, production-grade DevOps implementation for attendance management featuring automated CI/CD with Jenkins, containerization with Docker, orchestration with Kubernetes, and automated end-to-end browser testing with Selenium WebDriver.

## Features
- **Daily Attendance (7 Periods)**: Select any date, toggle Present (P) or Absent (A) for 7 periods, or use mass P/A toggles.
- **Monthly Attendance Reports**: Auto-calculates total working periods (154 periods), periods attended, periods absent, and attendance percentages.
- **Threshold & Defaulters**: Automatically flags students whose attendance falls below the 75% threshold.
- **CSV Export**: Direct export of class-wise monthly attendance reports.
- **Student Directory**: Add students with roll number, name, and department.

## DevOps Architecture
1. **Version Control**: Git & GitHub
2. **Continuous Integration**: Jenkins Declarative Pipeline (`Jenkinsfile`)
3. **Containerization**: Hardened multi-stage Alpine Dockerfile (`Dockerfile`)
4. **Local Orchestration**: Docker Compose (`docker-compose.yml`)
5. **Cluster Orchestration**: Kubernetes Deployment & NodePort Service (`k8s/`)
6. **Automated Testing**: Selenium WebDriver (Headless Chrome) covering 10 syllabus test cases.

## Quick Start

### 1. Install Dependencies & Start Server
```bash
npm install
npm start
```
Open `http://localhost:3000` in your web browser.

### 2. Run Selenium Automated Tests
```bash
npm test
```
All 10 test cases will execute headlessly in Chrome and capture screenshots into `screenshots/selenium/`.

### 3. Docker Container Build & Run
```bash
docker build -t student-attendance-app:v1.0.0 .
docker run -d -p 3000:3000 --name attendance_app student-attendance-app:v1.0.0
```

### 4. Kubernetes Deployment
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

## Generated Reports
- **Interactive Printable Report**: Open `PROJECT_REPORT.html` in any browser (Press `Ctrl+P` to save as PDF).
- **Markdown Report**: See `PROJECT_REPORT.md`.
- **All Screenshots**: Located in `screenshots/app/`, `screenshots/selenium/`, and `screenshots/devops/`.
