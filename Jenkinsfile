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
        git 'https://github.com/MaastrichtU-IDS/d2s-docs.git'
      }
    }
    stage('build') {
      when {
          branch 'master'
      }
      steps {
        sh 'docker build --no-cache -t umids/d2s-docs:latest .'
      }
    }
    stage('deploy') {
      when {
          branch 'master'
      }
      steps {
        parallel(
          push: {
            sh 'docker push umids/d2s-docs:latest'
          },
          deploy: {
            sh 'docker stop d2s-docs || true'
            sh 'docker rm d2s-docs || true'
            sh 'docker run -d --name d2s-docs --restart unless-stopped -e VIRTUAL_HOST=d2s.semanticscience.org -e LETSENCRYPT_HOST=d2s.semanticscience.org -e VIRTUAL_PORT=3000 umids/d2s-docs:latest'
          }
        )
      }
    }
  }
}
