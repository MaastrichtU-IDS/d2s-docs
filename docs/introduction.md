---
id: introduction
title: Introduction
---

## The Data2Services philosophy

Docker containers running with a few parameters (e.g. input file path, SPARQL endpoint, credentials, mapping file path)

- **Build** or pull the Docker images.
- **Start required services** ([Apache Drill](https://github.com/amalic/apache-drill) and [GraphDB](https://github.com/MaastrichtU-IDS/graphdb)).
- **Execute the Docker modules** you want, providing the proper parameters.

Modules can easily be integrated to most workflow engines. 

We provide workflows described with [CWL](https://www.commonwl.org/) (for Posix platforms) and [Argo](https://argoproj.github.io/argo/) (for [Kubernetes](https://kubernetes.io/) cluster).

---

## data2services-pipeline

This is a demonstrator ETL pipeline that **converts** relational databases, tabular files, and XML files **to RDF**. A generic RDF, based on the input data structure, is generated and [SPARQL](https://www.w3.org/TR/sparql11-query/) queries are **designed by the user** to map the generic RDF to a **specific model**.

* Only [Docker](https://docs.docker.com/install/) is required to run the pipeline. Checkout the [Wiki](https://github.com/MaastrichtU-IDS/data2services-pipeline/wiki/Docker-documentation) if you have issues with Docker installation.
* Following documentation **focuses on Linux & MacOS**.
* **Windows documentation** can be found [here](https://github.com/MaastrichtU-IDS/data2services-pipeline/wiki/Run-on-Windows).
* Modules are from the [Data2Services ecosystem](https://github.com/MaastrichtU-IDS/data2services-ecosystem). 
* See [data2services-transform-biolink](https://github.com/MaastrichtU-IDS/data2services-transform-biolink) to run Data2Services transformation workflows using [CWL](https://www.commonwl.org/) or [Argo](https://argoproj.github.io/argo/).

---


```sparql
INSERT {
  GRAPH <?_output> {
    ?Concept a <https://w3id.org/data2services/Concept> .
  }
} WHERE {
  SERVICE <?_service> {
    GRAPH <?_input> {
      SELECT * {
        [] a ?Concept .
      } LIMIT 10 
} } }
```