---
id: d2s-introduction
title: Introduction
sidebar_label: Introduction
---

This documentation explains how to build and deploy [RDF](https://www.w3.org/RDF/) Knowledge Graphs using the [d2s](https://pypi.org/project/d2s/) command line tool. [d2s](https://pypi.org/project/d2s/) is a command line interface that helps you define download scripts, metadata, and mappings to integrate multiple datasets into a RDF Knowledge Graph complying with a defined data model. This documentation is intended for people who are familiar with [Docker](https://www.docker.com/) and running simple commands in a terminal. It is also preferable to be familiar with the [SPARQL](https://www.w3.org/TR/sparql11-query/) query language.

Integrating and querying heterogeneous data sources has never been effortless, the [d2s](https://pypi.org/project/d2s/) CLI and this documentation aims to provide a framework and comprehensive documentation to build a RDF Knowledge Graph out of structured data and deploy various interfaces and services to access the integrated data.

<img src="/img/d2s-architecture.png" alt="Data2Services infrastructure" style="max-width: 100%; max-height: 100%;" />

We provide [d2s-transform-template](https://github.com/MaastrichtU-IDS/d2s-transform-template/), a GitHub template repository with example mappings and workflows to start building your RDF Knowledge Graph from structured data. 

Feel free to use directly the `d2s-transform-template` repository or create a new GitHub repository [from the template](https://github.com/MaastrichtU-IDS/d2s-transform-template/) to start your own project.

> See [this presentation](/resources/2020-03-16-data2services-ncats_translator_presentation.pdf) for more details about the Data2Services project.

## Build a RDF Knowledge Graph

We use [CWL workflows](https://www.commonwl.org/) to orchestrate the execution of multiple steps (Docker containers) to integrate heterogeneous structured data sources in a RDF Knowledge Graph.

Data2Services offers pre-defined workflows to convert large amount of structured data, such as relational databases, tabular files or XML files, to RDF Knowledge Graphs. Converting data with Data2Services relies on 3 steps:

* A **generic RDF** is automatically **generated** from the input data structure.
* [SPARQL](https://www.w3.org/TR/sparql11-query/) queries are designed by the user to **map** the generic RDF **to a target model**. 
* Extra modules can be added to the workflow to perform operations SPARQL doesn't natively support 
  * E.g. splitting statements, resolving the preferred URI for an entity.

It is strongly **recommended to use a POSIX system** (Linux, MacOS) if you consider running workflows on your laptop, since most workflow orchestration tools do not support Windows. Additional documentation for Windows can be found [here](/docs/install-windows).

## Deploy services

Once your data has been integrated in a RDF Knowledge Graph you might want to deploy interfaces to access your data or use a difference triplestore.

Data2Services aims to provide an exhaustive documentation to run and deploy RDF-related services and tools using Docker. The `d2s` CLI uses `docker-compose` to start various services

🔗 Graph databases: [Ontotext GraphDB](/docs/services-graph-databases#graphdb), [Virtuoso](/docs/services-graph-databases#virtuoso), [Blazegraph](/docs/services-graph-databases#blazegraph), [AllegroGraph](/docs/services-graph-databases#allegrograph), [AnzoGraph](/docs/services-graph-databases#anzograph), [Linked Data Fragments server](/docs/services-graph-databases#linked-data-fragments-server), [Neo4j](/docs/services-graph-databases#neo4j)

🖥️ Interfaces: [into-the-graph](/docs/services-webui#into-the-graph) SPARQL browser, [HTTP OpenAPI](/docs/services-interfaces#d2s-api) to query RDF triplestores, [YASGUI](/docs/services-webui#yasgui) SPARQL query editor, [Comunica widget](/docs/services-webui#comunica-widget)

🗃️ Utilities: [Apache Drill](/docs/services-utilities#apache-drill), [Postgres](/docs/guide-postgres)

---

## Project folder structure

The [d2s client](https://pypi.org/manage/project/d2s/releases/) use the following directory structure, which can be found in the example project [d2s-transform-template](https://github.com/MaastrichtU-IDS/d2s-transform-template) (here with the `drugbank` dataset):

```bash
root-directory
├── .d2sconfig						# The project config file
├── LICENSE
├── README.md
├── d2s-core (submodule)	# docker-compose, CWL, Argo workflows files
├── datasets		# Folders of the different dataset integrated in the KG 
│   └── drugbank		# Folder for files to convert DrugBank
│       ├── config.yml			# The workflow config file
│       ├── download
│       │   └── download.sh		# Script to download input files
│       ├── mapping				# SPARQL mapping queries to build the KG 
│       │   ├── drugbank-drugbank_id.rq
│       │   └── drugbank-snp_effects.rq
│       └── metadata			# SPARQL queries to insert metadata about the dataset 
│           ├── metadata-drugbank-summary.rq
│           ├── metadata-drugbank-1.rq
│           └── metadata-drugbank-2.rq
└── workspace		# Contains all files required to run the KG and services
    ├── input		# Downloaded file to process
    ├── output		# Every file generated by the workflow
    ├── logs		# Logs of workflows run 
    ├── dumps		# HDT and RDF file dumps of the different graphs (datasets)
    ├── import      # Import folder for GraphDB (or other triplestores)
    ├── graphdb     # Folders used by the triplestores
    ├── virtuoso
    ├── tmp-virtuoso
    └── blazegraph
```

---

## Source code repositories

The Data2Services project uses multiples Git repositories:

* [d2s-cli](https://github.com/MaastrichtU-IDS/d2s-cli): A Command Line Interface to orchestrate the integration of heterogenous  data and the deployment of services consuming the integrated data (Python).
  * It will clone and use a [d2s-transform-template](https://github.com/MaastrichtU-IDS/d2s-transform-template) repository to store your project services and workflows settings.
* [d2s-transform-template](https://github.com/MaastrichtU-IDS/d2s-transform-template): template to create a Data2Services project folder, with example mappings to a few datasets, it include [d2s-core](https://github.com/MaastrichtU-IDS/d2s-core) as submodule.
  * [d2s-core](https://github.com/MaastrichtU-IDS/d2s-core) (imported as submodule in [d2s-transform-template](https://github.com/MaastrichtU-IDS/d2s-transform-template)): CWL workflows to transform structured data to a target RDF model.
* [d2s-documentation](https://github.com/MaastrichtU-IDS/d2s-documentation): source code of this documentation.
