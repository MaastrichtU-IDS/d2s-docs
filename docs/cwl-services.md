---
id: cwl-services
title: Start services
---

Services must be running before executing CWL workflows. E.g. [Apache Drill](https://github.com/amalic/apache-drill) and [GraphDB](https://github.com/MaastrichtU-IDS/graphdb/) to process tabular files.

Choose the services you need, and deploy them with `docker-compose`

* Triplestores: [GraphDB](https://github.com/MaastrichtU-IDS/graphdb), [Virtuoso](https://hub.docker.com/r/tenforce/virtuoso/), [blazegraph](https://hub.docker.com/r/lyrasis/blazegraph/dockerfile)
* Data access: [Apache Drill](https://github.com/amalic/apache-drill), [Postgres](https://hub.docker.com/_/postgres)
* User interfaces: [into-the-graph RDF browser](https://github.com/MaastrichtU-IDS/into-the-graph), [yasgui](https://hub.docker.com/r/erikap/yasgui), [comunica](https://github.com/comunica/jQuery-Widget.js)

> All shared on `/data/d2s-workspace`

## Run the d2s environment

We provide a simple [Shell script](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/restart_d2s_services.sh) to start most services required to run the workflows: Apache Drill, Virtuoso as temporary triplestore, a browser for Virtuoso and a GraphDB triplestore, a browser for Virtuoso, usually used as final store.

```shell
./restart_d2s_services.sh
```

> The shell will ask for a password at the end: `sudo` is used to change ownership of workspace (`chown /data/d2s-workspace`). 

> This script is mainly required for Virtuoso: to create `/data/d2s-workspace/virtuoso`, copy the required [load.sh script](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/support/virtuoso/load.sh) to the Virtuoso repository and set ownerships.

* Access the linked data browser for Virtuoso at http://localhost:8891
* Access Virtuoso at http://localhost:8890
* Access the  linked data browser for GraphDB at http://localhost:7201
* Access GraphDB at http://localhost:7200

> You need to **activate CORS request** to allow communication between those services on your browser. An addon can be easily installed for [Firefox](https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/) or [Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf). 

## Run with docker-compose

You can use `docker-compose` to start other services. Note that Virtuoso needs to be started using the [restart_d2s_services.sh bash script](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/restart_d2s_services.sh) as it creates the required directories and makes sure the files permissions are properly set.

Use the command from your repository, in our case `d2s-transform-template`

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up \
  -d --build --force-recreate \
  postgres drill virtuoso graphdb blazegraph \
  browse-local-virtuoso browse-local-graphdb browse-local-blazegraph
```

> Remove the services you are not interested in.

* Access the  linked data browser for Blazegraph at http://localhost:8083
* Access Blazegraph at http://localhost:8082

### Virtuoso and Apache Drill

At the moment for Virtuoso we recommend using the [restart_d2s_services.sh script](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/restart_d2s_services.sh) scripts (which recreate `/data/d2s-workspace/virtuoso` and copy the required [load.sh script](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/support/virtuoso/load.sh) to the Virtuoso repository).

Or start it using the `docker-compose` command:

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d \
  --build --force-recreate virtuoso drill
  
# Then copy the load.sh file to be accessible by Virtuoso running container
cp d2s-cwl-workflows/support/virtuoso/load.sh /data/d2s-workspace/virtuoso
```

> Access Virtuoso on http://localhost:8890 and Drill on http://localhost:8048.

> Virtuoso folder in `/data/d2s-workspace/virtuoso/`.

> See [Setting up Virtuoso](/docs/guide-virtuoso) documentation for more details.

### GraphDB and Apache Drill

GraphDB cannot be pulled directly, it needs to be downloaded manually:

* [Download GraphDB](https://ontotext.com/products/graphdb/) as *stand-alone server free version* (you need to register to get download URL via email).

* Put the downloaded `.zip` file in the `d2s-cwl-workflows/support/graphdb` repository
* Make sure the GraphDB version defined in the `docker-compose` is right (default is `10.0.1`)

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d \
  --build --force-recreate graphdb drill
```

> Access GraphDB on http://localhost:7200 and Drill on http://localhost:8048.

> See [Setting up GraphDB](/docs/guide-graphdb) documentation for more details.

### Blazegraph and Postgres

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d \
  --build --force-recreate blazegraph postgres
```

> See [Postgres guide](/docs/guide-postgres) page for more details.

## Manage services

### Show running services

```shell
docker ps
```

### Stop all services

From `d2s-transform-template`

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml down
```

### Stop single service

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml stop graphdb
```

[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)

