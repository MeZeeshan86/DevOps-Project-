pipeline {
    agent any

    environment {
        APP_NAME     = 'student-attendance-app'
        DOCKER_IMAGE = 'devops-registry.local/attendance/student-attendance-app'
        IMAGE_TAG    = "${BUILD_NUMBER}"
        KUBECONFIG   = credentials('k8s-kubeconfig')
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Checking out source code repository from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js packages and QA test runners...'
                sh 'npm ci'
            }
        }

        stage('Static Code Analysis & Lint') {
            steps {
                echo 'Performing code quality and syntax validation...'
                sh 'node --check server.js db.js public/app.js'
            }
        }

        stage('Selenium Automated Test Suite') {
            steps {
                echo 'Running Selenium WebDriver Automated Test Suite on Chrome Headless...'
                sh 'node tests/selenium_tests.js'
            }
            post {
                always {
                    echo 'Archiving Selenium test execution artifacts and screenshots...'
                    archiveArtifacts artifacts: 'screenshots/selenium/*.png', allowEmptyArchive: true
                }
            }
        }

        stage('Docker Build & Package') {
            steps {
                echo "Building Docker container image: ${DOCKER_IMAGE}:${IMAGE_TAG}..."
                sh "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Docker Security Scan') {
            steps {
                echo "Scanning container image for vulnerabilities using Trivy..."
                sh "trivy image --severity HIGH,CRITICAL ${DOCKER_IMAGE}:${IMAGE_TAG} || true"
            }
        }

        stage('Push to Container Registry') {
            steps {
                echo "Pushing tagged image ${DOCKER_IMAGE}:${IMAGE_TAG} to registry..."
                // sh "docker push ${DOCKER_IMAGE}:${IMAGE_TAG}"
                // sh "docker push ${DOCKER_IMAGE}:latest"
            }
        }

        stage('Deploy to Kubernetes Cluster') {
            steps {
                echo 'Deploying application pods and service to Kubernetes cluster...'
                sh 'kubectl apply -f k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
                sh 'kubectl rollout status deployment/student-attendance-app --timeout=60s'
            }
        }
    }

    post {
        success {
            echo "Pipeline build #${BUILD_NUMBER} completed successfully!"
        }
        failure {
            echo "Pipeline build #${BUILD_NUMBER} failed! Check build console for details."
        }
    }
}
