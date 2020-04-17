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

See the exhaustive lists for [Graph databases](/docs/services-graph-databases), [interfaces](/docs/services-interfaces) or [RDF utilities](/docs/services-utilities).

Start the following services using `d2s start <service_name>`

[🔗 Graph databases](/docs/services-graph-databases)

* [graphdb](/docs/services-graph-databases#graphdb)
* [virtuoso](/docs/services-graph-databases#virtuoso)
* [blazegraph](/docs/services-graph-databases#blazegraph)
* [allegroGraph](/docs/services-graph-databases#allegrograph)
* [anzoGraph](/docs/services-graph-databases#anzograph)
* [ldf-server](/docs/services-graph-databases#linked-data-fragments-server): Linked Data Fragments server, store and query compressed HDT files
* [neo4j](/docs/services-graph-databases#neo4j): property graph database

[🖥️ Interfaces](/docs/services-interfaces)

* [into-the-graph](/docs/services-interfaces#into-the-graph): SPARQL web browser
* [api](/docs/services-interfaces#d2s-api): HTTP Open API  with Swagger UI to query RDF triplestores
* [comunica](/docs/services-interfaces#comunica-widget): widget to query heterogeneous interfaces (SPARQL, HDT) using Comunica SPARQL and GraphQL
* [notebook](/docs/services-interfaces#jupyter-notebooks): JupyterLab with template Notebooks to query the triplestore.

[🗃️ Utilities](/docs/services-utilities)

* [rmlstreamer](/docs/services-utilities#rml-streamer): Apache Flink to process RML mappings
  * rmltask: dependency of the rmlstreamer, the 2 services are required to run.
* [drill](/docs/services-utilities#apache-drill): exposes tabular text files (CSV, TSV, PSV) as SQL using Apache Drill
* [postgres](/docs/services-utilities#postgres): popular OpenSource SQL database
* [limes](/docs/services-utilities#limes-interlinking): server to perform interlinking between RDF entities using various metrics
* [nanobench](/docs/services-utilities#nanobench): web UI to publish Nanopublications

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

Services can be started with a specific deployment config. This enables to define variable specific to a deployment in a complementary `docker-compose.my_deployment.yaml`, such as the virtual host URL or a different image tag.

See the [demo](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/docker-compose.demo.yaml) or [trek](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/docker-compose.trek.yaml) deployment config as examples.

Start services with a deployment config:

```shell
d2s start graphdb virtuoso drill api rmlstreamer rmltask -d trek
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


