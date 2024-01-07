pipeline {
    agent any
    environment {
        PROJECT_ID = 'sodium-burner-410514'
        CLUSTER_NAME = 'autopilot-cluster-1'
        LOCATION = 'us-east4'
        CREDENTIALS_ID = 'GKE-Admin'
        
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage("Build image") {
            steps {
                script {
                    myapp = docker.build("pxavier12/space-launcher:latest")
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'pxavier12') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }        
        stage('Deploy to GKE') {
            steps{
                sh "sed -i 's/space-launcher:latest/space-launcher:latest/g' space-launcher.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'space-launcher.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }
    }    
}
        