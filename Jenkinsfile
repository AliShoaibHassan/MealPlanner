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
        
        stage('Setup Environment') {
            steps {
                // Setup Node.js
                sh 'nvm install ${NODE_VERSION}'
                sh 'nvm use ${NODE_VERSION}'
                
                // Setup Python
                sh 'python3 -m venv venv'
                sh '. venv/bin/activate'
                sh 'pip install -r requirements.txt'
                
                // Install Chrome (headless mode)
                sh '''
                wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
                echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list
                apt-get update
                apt-get install -y google-chrome-stable
                '''
            }
        }
        
        stage('Start Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'nohup npm start &'
                    sh 'sleep 10' // Wait for backend to start
                }
            }
        }
        
        stage('Start Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'nohup npm run dev &'
                    sh 'sleep 10' // Wait for frontend to start
                }
            }
        }
        
        stage('Run Selenium Tests') {
            steps {
                sh '. venv/bin/activate && python tests/run_tests.py'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'reports/*.html,screenshots/*.png', allowEmptyArchive: true
                }
            }
        }
    }
    
    post {
        always {
            // Clean up processes
            sh 'pkill -f "npm start" || true'
            sh 'pkill -f "npm run dev" || true'
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Tests failed! Check the reports for details.'
        }
    }
} 