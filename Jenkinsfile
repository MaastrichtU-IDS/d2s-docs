pipeline {
  agent any
  options {
    skipDefaultCheckout true
  }
  stages {
    stage('checkout') {
      when {
          branch 'master'
      }
      steps {
        git 'https://github.com/MaastrichtU-IDS/d2s-documentation.git'
      }
    }
    stage('build') {
      when {
          branch 'master'
      }
      steps {
        sh 'docker build -t umids/d2s-documentation:latest .'
      }
    }
    stage('remove') {
      when {
          branch 'master'
      }
      steps {
        sh 'docker stop d2s-documentation || true'
      }
    }
    stage('deploy') {
      when {
          branch 'master'
      }
      steps {
        sh 'docker run -d --rm --name d2s-documentation -e VIRTUAL_HOST=d2s.semanticscience.org -e LETSENCRYPT_HOST=d2s.semanticscience.org -e VIRTUAL_PORT=3000 umids/d2s-documentation:latest'
      }
    }
  }
}