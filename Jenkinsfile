pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Source code checked out from Git'
            }
        }

        stage('Validate Application') {
            steps {
                sh 'test -f app-source/accounts-api/server.js'
                sh 'test -f app-source/accounts-api/package.json'
                echo 'Application files verified successfully'
            }
        }

        stage('Automated API Testing') {
            steps {
                dir('app-source/accounts-api') {
                    sh 'npm test'
                }
            }
        }
       stage('Docker Build') {
    steps {
        sh 'docker build -t retail-banking-api:latest app-source/accounts-api'
    }
}

        stage('CI Success') {
            steps {
                echo 'Banking API CI pipeline completed successfully!'
            }
        }
    }
}