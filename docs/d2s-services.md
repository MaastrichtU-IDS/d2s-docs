---
id: d2s-services
title: Start services
---


Run services such as triplestores, to store your RDF knowledge graph, interfaces or web UI to access the triplestore data:

* 🔗 Triplestores: [Ontotext GraphDB](/docs/services-triplestores#graphdb), [Virtuoso](/docs/services-triplestores#virtuoso), [Blazegraph](/docs/services-triplestores#blazegraph), [AllegroGraph](/docs/services-triplestores#allegrograph), [AnzoGraph](/docs/services-triplestores#anzograph)
* 🗃️ Data access: [Apache Drill](/docs/services-rdf-utilities#apache-drill), [Postgres](/docs/guide-postgres), [Linked Data Fragments server](/docs/services-triplestores#linked-data-fragments-server)
* 🖥️ User interfaces: [into-the-graph SPARQL browser](/docs/services-webui#into-the-graph), [YASGUI](/docs/services-webui#yasgui), [comunica](/docs/services-webui#comunica-widget), [RESTful-like HTTP OpenAPI](/docs/services-interfaces#d2s-api)

> Volumes of all containers started by `d2s` are shared in the `workspace/` folder.

> `d2s` uses `docker-compose` to run the different servives 🐳

## Start services

### Start common services

Start the services required to run data transformation workflows:

```shell
d2s start virtuoso graphdb api browse-local-graphdb drill filebrowser
```

* Access the linked data browser for GraphDB at http://localhost:7201
* Access GraphDB at http://localhost:7200
* Access Virtuoso at http://localhost:8890
* Access the HTTP Swagger API at http://localhost:8080
* Access the filebrowser to download RDF dumps at http://localhost:8081 📂 

> You might face issues when processing large CSV or TSV file, see [this documentation](https://d2s.semanticscience.org/docs/guide-preprocessing#split-big-files) to deal with big files.

### Start more services

```shell
d2s start postgres blazegraph anzograph allegrograph comunica browse-local-virtuoso
```

* Access the linked data browser for Virtuoso at http://localhost:8891
* Access the linked data browser for Blazegraph at http://localhost:8083
* Access Blazegraph at http://localhost:8082
* Access AllegroGraph at http://localhost:10035
* Access AnzoGraph at http://localhost:8086
* Access Comunica at http://localhost:8084

> See [Postgres guide](/docs/guide-postgres) page for more details.

> You need to **activate CORS request** to allow communication between the linked data browser and the **Virtuoso triplestore** on your browser. An add-on can be easily installed for [Firefox](https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/) or [Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf). 

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


