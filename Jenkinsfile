pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        PYTHON_VERSION = '3.9'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Docker') {
            steps {
                // Ensure Docker and Docker Compose are installed
                sh '''
                    if ! command -v docker &> /dev/null; then
                        echo "Docker not found, installing..."
                        curl -fsSL https://get.docker.com -o get-docker.sh
                        sh get-docker.sh
                    else
                        echo "Docker already installed"
                    fi
                    
                    if ! command -v docker-compose &> /dev/null; then
                        echo "Docker Compose not found, installing..."
                        curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                        chmod +x /usr/local/bin/docker-compose
                    else
                        echo "Docker Compose already installed"
                    fi
                '''
            }
        }
        
        stage('Build Docker Images') {
            steps {
                // Build the Docker images
                sh 'docker-compose build'
            }
        }
        
        stage('Run Application') {
            steps {
                // Start the backend and frontend services
                sh 'docker-compose up -d frontend backend'
                
                // Wait for services to be ready
                sh 'sleep 20'
            }
        }
        
        stage('Run Selenium Tests') {
            steps {
                // Run the test container
                sh 'docker-compose up --abort-on-container-exit test'
            }
            post {
                always {
                    // Archive test reports and screenshots
                    archiveArtifacts artifacts: 'reports/*.html,screenshots/*.png', allowEmptyArchive: true
                }
            }
        }
    }
    
    post {
        always {
            // Clean up Docker containers
            sh 'docker-compose down --volumes --remove-orphans'
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Tests failed! Check the reports for details.'
        }
    }
} 