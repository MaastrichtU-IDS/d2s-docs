pipeline {
  agent any
  stages {
    stage('checkout') {
      steps {
        git 'https://github.com/MaastrichtU-IDS/d2s-documentation.git'
      }
    }
    stage('build') {
      steps {
        sh 'docker build -t umids/d2s-documentation:latest .'
      }
    }
    stage('remove') {
      steps {
        sh 'docker stop d2s-documentation || true'
      }
    }
    stage('deploy') {
      steps {
        sh 'docker run -d --rm --name d2s-documentation -e VIRTUAL_HOST=d2s.137.120.31.102.nip.io -e LETSENCRYPT_HOST=d2s.137.120.31.102.nip.io -e VIRTUAL_PORT=3000 umids/d2s-documentation:latest'
      }
    }
  }
}