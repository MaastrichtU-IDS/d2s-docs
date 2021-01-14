---
id: d2s-interfaces
title: Deploy interfaces
---

Once the RDF Knowledge Graph has been built, the RDF data can be converted to new formats (HDT, Cypher) and services can be deployed to expose the data through new interfaces (HTTP API, LDF, neo4j Cypher).

------

## HTTP Open API

Use [d2s-api](/docs/services-interfaces#d2s-api) to deploy a HTTP OpenAPI 3.0 RESTfull API with a Swagger UI. This API implements the [Reasoner API specifications](https://github.com/NCATS-Tangerine/NCATS-ReasonerStdAPI/tree/master/API) and calls to explore the Knowledge Graph classes and entities.

```shell
d2s start api
```

## Linked Data Fragments

[Linked Data Fragments](http://linkeddatafragments.org/in-depth/)

* Use [rdf2hdt](/docs/services-utilities#rdf2hdt) to convert RDF to [HDT](http://www.rdfhdt.org/) (*Header, Dictionary, Triples* is a binary serialization format for RDF  that keeps big datasets compressed while maintaining search and browse operations without prior decompression.)
* Expose the HDT files using a [LDF server](/docs/services-graph-databases#linked-data-fragments-server)
* Deploy the [Comunica Widget](/docs/services-interfaces#comunica-widget) to query the LDF server

```shell
d2s start ldf-server comunica
```

---

## Neo4J

The RDF Knowledge Graph data can be converted to a [neo4j](/docs/services-graph-databases#neo4j) property graph by mapping the RDF to Cypher queries using [Rothamsted/rdf2neo](https://github.com/Rothamsted/rdf2neo).

```shell
d2s start neo4j
```

---

## Jupyter notebooks

Deploy a Jupyter notebook over your RDF knowledge graph to easily start querying it through the HTTP OpenAPI or SPARQL endpoint using Python or R.

The proposed deployment comes with example queries to start with, and various libraries for data science and RDF pre-installed.

```shell
d2s start notebook
```

> Access on http://localhost:8888