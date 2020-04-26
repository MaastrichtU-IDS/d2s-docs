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

The services deployments are defined in a [docker-compose file](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/docker-compose.yml).

Start the services described below using:

```shell
d2s start <service_name>
```

### 🔗 Graph databases

See the [detailed lists of available graph databases](/docs/services-graph-databases).

* [graphdb](/docs/services-graph-databases#graphdb): commercial triplestore with a web UI and multiple repositories
* [virtuoso](/docs/services-graph-databases#virtuoso): Open Source triplestore with a faceted browser
* [blazegraph](/docs/services-graph-databases#blazegraph): Open Source lightweight triplestore 
* [fuseki](/docs/services-graph-databases#fuseki): Open Source SPARQL server built on top of Apache Jena and TDB. 
* [allegroGraph](/docs/services-graph-databases#allegrograph): commercial triplestore
* [anzoGraph](/docs/services-graph-databases#anzograph): commercial triplestore
* [ldf-server](/docs/services-graph-databases#linked-data-fragments-server): Open Source Linked Data Fragments server, store and query compressed HDT files
* [neo4j](/docs/services-graph-databases#neo4j): commercial property graph database

### 🖥️ Interfaces

See the [detailed lists of available interfaces](/docs/services-interfaces).

* [into-the-graph](/docs/services-interfaces#into-the-graph): SPARQL web browser, with YASGUI editor.
* [api](/docs/services-interfaces#d2s-api): HTTP Open API  with Swagger UI to query a RDF triplestore
* [comunica](/docs/services-interfaces#comunica-widget): widget to query heterogeneous interfaces (SPARQL, HDT) using Comunica SPARQL and GraphQL

### 🔧 Utilities

See the [detailed lists of RDF utilities](/docs/services-utilities).

* [notebook](/docs/services-interfaces#jupyter-notebooks): JupyterLab with template Notebooks to build and query the triplestore.
* [biothings-studio](/docs/services-utilities#biothings-studio): web UI to build and deploy BioThings APIs 
* [docket](/docs/services-utilities#docket): multiomics tool for dataset overview, comparison and knowledge extraction using Jupyter notebooks.
* [rmlstreamer](/docs/services-utilities#rml-streamer): Apache Flink to process RML mappings
  * rmltask: dependency of the rmlstreamer, the 2 services are required to run

* [drill](/docs/services-utilities#apache-drill): exposes tabular text files (CSV, TSV, PSV) as SQL using Apache Drill
* [postgres](/docs/services-utilities#postgres): popular Open Source SQL database
* [limes](/docs/services-utilities#limes-interlinking): server to perform interlinking between RDF entities using various metrics
* [nanobench](/docs/services-utilities#nanobench): web UI to publish Nanopublications
* [mapeathor](/docs/d2s-rml#mapeathor): converts Excel files into RML or YARRRML mappings

## Start demo 

Different solutions can used as final triplestore, here we will use [Ontotext GraphDB](/docs/services#ontotext-graphdb) as final triplestores for the Knowledge Graph. From our experience GraphDB is more stable and faster performing federated queries, additionally it offers a user-friendly administration. 

GraphDB [needs to be downloaded](https://www.ontotext.com/products/graphdb/graphdb-free/) for licensing reason, provide your address and you will receive an email with the URL to download the [GraphDB standalone zip file](https://www.ontotext.com/products/graphdb/graphdb-free/) (`graphdb-free-9.1.1-dist.zip`). 

> To **easily install GraphDB,** we recommend you to place it in your `home` folder before running `d2s init`, it is the default when the path to the GraphDB zip file is asked.

Start services required to run data transformation demonstration workflows: GraphDB triplestore, into-the-graph linked data browser, Open API and Virtuoso as temporary triplestore

```shell
d2s start demo
```

* Access the into-the-graph browser for GraphDB at http://localhost:8079
* Access the HTTP Swagger API at http://localhost:8080
* Access GraphDB at http://localhost:7200
* Access the temporary Virtuoso at http://localhost:8890

> If you use  **Blazegraph** or **Virtuoso** as final triplestore, you will need to **activate CORS request** to allow communication between the into-the-graph browser and the triplestore on your browser. An add-on can be easily installed for [Firefox](https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/) or [Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf). 

### Use a deployment config

Services can be started with a specific deployment config. This enables to define variable specific to a deployment in a complementary `docker-compose.my_deployment.yml`, such as the virtual host URL or a different image tag.

See the [demo](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/deployments/demo.yml) or [trek](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/deployments/trek.yml) deployment config as examples.

Start services with a deployment config:

```shell
d2s start graphdb virtuoso drill api rmlstreamer rmltask -d trek
```

> Feel free to define a new deployment config if your services requires different parameters than the one defined in the main [docker-compose.yml](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/docker-compose.yml)

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

### Show running workflows

You can get process information about running workflows, such as its process ID.

```shell
d2s process-running
```

### Stop running workflow

Autocomplete will show only the PID of running workflows.

```shell
d2s process-stop <workflow_pid>
```

> If autocomplete doesn't work, retrieve the PID using `d2s process-running`


