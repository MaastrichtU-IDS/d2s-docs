---
id: d2s-services
title: Start services
---


Services must be running before executing CWL workflows. E.g. [Apache Drill](https://github.com/amalic/apache-drill) and [GraphDB](https://github.com/MaastrichtU-IDS/graphdb/) to process tabular files.

Choose the services you need, and deploy them with `docker-compose`

* Triplestores: [GraphDB](https://github.com/MaastrichtU-IDS/graphdb), [Virtuoso](https://hub.docker.com/r/tenforce/virtuoso/), [blazegraph](https://hub.docker.com/r/lyrasis/blazegraph/dockerfile)
* Data access: [Apache Drill](https://github.com/amalic/apache-drill), [Postgres](https://hub.docker.com/_/postgres)
* User interfaces: [into-the-graph RDF browser](https://github.com/MaastrichtU-IDS/into-the-graph), [yasgui](https://hub.docker.com/r/erikap/yasgui), [comunica](https://github.com/comunica/jQuery-Widget.js)

> All shared on `workspace/`

## Start common services

Start the services required to run data transformation workflows

```shell
d2s start virtuoso graphdb browse-local-virtuoso browse-local-graphdb drill
```

* Access the linked data browser for Virtuoso at http://localhost:8891

* Access Virtuoso at http://localhost:8890
* Access the  linked data browser for GraphDB at http://localhost:7201
* Access GraphDB at http://localhost:7200

> You need to **activate CORS request** to allow communication between the linked data browser and the triplestores on your browser. An addon can be easily installed for [Firefox](https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/) or [Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf). 

## Start more services

```shell
d2s start postgres blazegraph comunica
```

* Access the  linked data browser for Blazegraph at http://localhost:8083
* Access Blazegraph at http://localhost:8082
* Access Blazegraph at http://localhost:8084

> See [Postgres guide](/docs/guide-postgres) page for more details.

## Manage services

### Show running services

```shell
d2s services
```

### Stop all services

```shell
d2s stop --all
```

### Stop single services

```shell
d2s stop browse-local-virtuoso browse-local-graphdb
```

### Clear Virtuoso triplestore

You can clear the Virtuoso triplestore using this command:

```shell
docker exec -it d2s-cwl-workflows_virtuoso_1 isql-v -U dba -P dba exec="RDF_GLOBAL_RESET ();"
```

[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)


