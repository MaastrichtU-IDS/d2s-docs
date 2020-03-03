---
id: d2s-services
title: Start services
---


Services must be running before executing CWL workflows, e.g. [Apache Drill](https://github.com/MaastrichtU-IDS/apache-drill) to process tabular files and triplestores to store data.

Choose the services you need, and deploy them with `docker-compose` 🐳

* 🔗 Triplestores: [GraphDB](/docs/d2s-ecosystem#graphdb), [Virtuoso](/docs/d2s-ecosystem#virtuoso), [Blazegraph](/docs/d2s-ecosystem#blazegraph), [AllegroGraph](/docs/d2s-ecosystem#allegrograph), [AnzoGraph](/docs/d2s-ecosystem#anzograph)
* 🗃️ Data access: [Apache Drill](/docs/d2s-ecosystem#apache-drill), [Postgres](/docs/guide-postgres)
* 🖥️ User interfaces: [into-the-graph SPARQL browser](/docs/d2s-ecosystem#into-the-graph), [YASGUI](/docs/d2s-ecosystem#yasgui), [comunica](/docs/d2s-ecosystem#comunica-widget)

> All shared in the `workspace/` folder.

## Start common services

Start the services required to run data transformation workflows:

```shell
d2s start virtuoso graphdb api browse-local-graphdb drill filebrowser
```

* Access the linked data browser for GraphDB at http://localhost:7201 🧭 
* Access GraphDB at http://localhost:7200
* Access Virtuoso at http://localhost:8890
* Access the HTTP Swagger API at http://localhost:8080
* Access the filebrowser to download RDF dumps at http://localhost:8081 📂 

## Start more services

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

You can clear the Virtuoso triplestore using this command:

```shell
docker exec -it d2s-cwl-workflows_virtuoso_1 isql-v -U dba -P dba exec="RDF_GLOBAL_RESET ();"
```

[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)


