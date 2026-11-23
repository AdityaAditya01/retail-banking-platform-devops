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
                sh 'node --check app-source/accounts-api/server.js'
            }
        }

        stage('CI Success') {
            steps {
                echo 'Banking API validation successful!'
            }
            }
        }
    }
}