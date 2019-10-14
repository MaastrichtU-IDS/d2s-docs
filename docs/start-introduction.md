---
id: start-introduction
title: Introduction
sidebar_label: Introduction
---

## The Data2Services philosophy

One task, one container, few parameters (e.g. input file path, SPARQL endpoint, credentials, mapping file path)

- **Pull** or build the Docker images.
- **Start required services** (e.g. [Apache Drill](https://github.com/amalic/apache-drill) and [GraphDB](https://github.com/MaastrichtU-IDS/graphdb)).
- **Execute the Docker modules** you want, providing the right parameters.

Modules can easily be integrated to most workflow engines. 

We support and provide examples for workflows described with [CWL](https://www.commonwl.org/) (for Linux/MacOS) and [Argo](https://argoproj.github.io/argo/) (for [Kubernetes](https://kubernetes.io/) cluster).

---

## Designed to build scalable Knowledge Graphs

Data2Services offers handy tools to **convert large amount of structured data**, such as relational databases, tabular files or XML files, **to RDF Knowledge Graphs**. 

Converting data with Data2Services relies on 3 steps:

* A **generic RDF** is automatically generated from the input data structure.
* [SPARQL](https://www.w3.org/TR/sparql11-query/) queries are designed by the user to **map** the generic RDF **to a target model**. 
* Extra modules can be added to the workflow to perform operations SPARQL doesn't natively support 
  * E.g. splitting statements, resolving the preferred URI for an entity.

The [Docker](https://docs.docker.com/install/) modules required for the transformation are run in a workflow using a workflow orchestration tool. We provide support for [Argo](https://argoproj.github.io/argo/) and [CWL](https://www.commonwl.org/) workflows. This makes the transformation easily reproducible, and enables you to run the transformation on new data without effort.

It is strongly **recommended to use a POSIX system** (Linux, MacOS) if you consider running workflows on your laptop, since most workflow orchestration tools do not support Windows. Additional documentation for Windows can be found [here](/docs/guide-windows).
