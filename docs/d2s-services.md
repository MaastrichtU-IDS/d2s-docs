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

* [Into-the-graph](/docs/services-webui#into-the-graph) SPARQL browser
* [HTTP OpenAPI](/docs/services-interfaces#d2s-api): HTTP API with Swagger UI to query RDF triplestores
* [YASGUI](/docs/services-webui#yasgui): SPARQL query editor
* [Comunica widget](/docs/services-webui#comunica-widget): query heterogeneous interfaces (SPARQL, HDT) using Comunica SPARQL and GraphQL

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

### Use a deployment config

Services can be started with a specific deployment config. This enables to define variable specific to a deployment in a complementary `docker-compose.my_deployment.yaml`, such as the virtual host URL or a different image tag.

See the [demo](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/docker-compose.demo.yaml) or [trek](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/docker-compose.trek.yaml) deployment config as examples.

Start services with a deployment config:

```shell
d2s start graphdb virtuoso drill api -d trek
```

> Feel free to define a new deployment config if your services requires different parameters than the one defined in the main [docker-compose.yaml](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/docker-compose.yaml)

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
d2s stop virtuoso api
```

### Clear Virtuoso triplestore

You can easily clear the Virtuoso triplestore using this command:

```shell
docker exec -it d2s-cwl-workflows_virtuoso_1 isql-v -U dba -P dba exec="RDF_GLOBAL_RESET ();"
```

[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)


