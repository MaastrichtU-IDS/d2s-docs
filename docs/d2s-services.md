---
id: d2s-services
title: Start services
---

Run services such as triplestores, to store your RDF knowledge graph, interfaces or web UI to access the triplestore data. A specific deployment config can be passed using the `-d` flag.

```shell
d2s start <service_name> -d <optional_deployment_config>
```

> Volumes of all containers started by `d2s` are shared in the `workspace/` folder.

> `d2s` uses `docker-compose` to run the different services 🐳

In this documentation we will use a set of services to build the knowledge graph and access it using various interfaces.

## List of services

See more exhaustive lists for [Graph databases](/docs/services-graph-databases), [interfaces](/docs/services-interfaces) or [RDF utilities](/docs/services-rdf-utilities).

🔗 Graph databases

* [Ontotext GraphDB](/docs/services-graph-databases#graphdb)
* [Virtuoso](/docs/services-graph-databases#virtuoso)
* [Blazegraph](/docs/services-graph-databases#blazegraph)
* [AllegroGraph](/docs/services-graph-databases#allegrograph)
* [AnzoGraph](/docs/services-graph-databases#anzograph)
* [Linked Data Fragments server](/docs/services-graph-databases#linked-data-fragments-server)
* [Neo4j](/docs/services-graph-databases#neo4j)

🖥️ Interfaces

* [into-the-graph](/docs/services-webui#into-the-graph) SPARQL browser
* [RESTful-like HTTP OpenAPI](/docs/services-interfaces#d2s-api) to query RDF triplestores
* [YASGUI](/docs/services-webui#yasgui)
* [Comunica widget](/docs/services-webui#comunica-widget)

🗃️ Utilities

* [Apache Drill](/docs/services-rdf-utilities#apache-drill)
* [Postgres](/docs/guide-postgres)

## Start demo 

Start services required to run data transformation demonstration workflows: Blazegraph triplestore, into-the-graph browser, Open API and Virtuoso as temporary triplestore

```shell
d2s start demo
```

* Access the into-the-graph browser for Blazegraph at http://localhost:8079
* Access the HTTP Swagger API at http://localhost:8080
* Access Blazegraph at http://localhost:8082
* Access the temporary Virtuoso at http://localhost:8890

> You need to **activate CORS request** to allow communication between the into-the-graph browser and the **Blazegraph** or **Virtuoso triplestore** on your browser. An add-on can be easily installed for [Firefox](https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/) or [Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf). 

## Manage services

### Show running services

```shell
d2s services
```

### Stop all services

```shell
d2s stop --all
```

### Stop specific services

```shell
d2s stop browse-local-virtuoso browse-local-graphdb
```

### Clear Virtuoso triplestore

You can easily clear the Virtuoso triplestore using this command:

```shell
docker exec -it d2s-cwl-workflows_virtuoso_1 isql-v -U dba -P dba exec="RDF_GLOBAL_RESET ();"
```

[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)


