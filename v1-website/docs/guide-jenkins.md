---
id: guide-jenkins
title: Experimental Jenkins workflows
---

[![](/img/jenkins.png)](https://jenkins.io/)

**Proof of concept**: execute data2services modules by deploying [Jenkins pipelines](https://jenkins.io/).

> Not supported anymore.

## Start Jenkins

```shell
docker run -it --name jenkins-container \
  -p 3333:8080  \
  -v /data/jenkins:/data \
  -v /var/run/docker.sock:/var/run/docker.sock \
  deepakunni3/ncats-jenkins 
```

> Access at [http://localhost:3333](http://localhost:3333)

> Check `GitHub plugin` to install it

> Jenkins Home directory in `/var/jenkins_home`

## Design a pipeline

You can find a [simple pipeline](https://github.com/NCATS-Tangerine/ncats-kg-release-pipeline/tree/red-kg-validation) executing Docker containers to validate a knowledge graph.

Here an example of a simple pipeline to build a Docker image and execute a SPARQL query using this image.

```groovy
pipeline {
  agent any
  parameters {
    string(name: 'GraphUri', defaultValue: 'https://w3id.org/data2services/graph/biolink/date', description: 'URI of the Graph to validate')
    string(name: 'SparqlRepositoryUri', defaultValue: 'https://graphdb.dumontierlab.com/repositories/public/statements', description: 'URI of the repository used to insert the computed statistics')
    string(name: 'TriplestoreUsername', defaultValue: 'import_user', description: 'Username for the triplestore')
    string(name: 'TriplestorePassword', defaultValue: 'changeme', description: 'Password for the triplestore')
  }
  stages {
    stage('Build and install') {
      steps {
        sh "git clone --recursive https://github.com/MaastrichtU-IDS/d2s-transform-repository.git"
        sh 'docker pull umids/d2s-sparql-operations'
      }
    }
    stage('Compute and insert statistics') {
      steps {
        sh "docker run -t --rm --volumes-from jenkins-container umids/d2s-sparql-operations -rq '$WORKSPACE/d2s-transform-repository/sparql/compute-statistics' -url '${params.SparqlRepositoryUri}' -un ${params.TriplestoreUsername} -pw ${params.TriplestorePassword} --var-input:${params.GraphUri}"
      }
    }
  }
  post {
    always {
      //archiveArtifacts artifacts: 'results/*', onlyIfSuccessful: true // archive contents in results folder
      deleteDir()
      cleanWs()
    }
  }
}
```
