---
id: cwl-services
title: Start services
---

[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)
[![Apache Drill](/img/drill-logo.png)](https://github.com/amalic/apache-drill)



Services must be running before executing CWL workflows. E.g. [Apache Drill](https://github.com/amalic/apache-drill) and [GraphDB](https://github.com/MaastrichtU-IDS/graphdb/) to process tabular files.



## Build

* [Download GraphDB](https://ontotext.com/products/graphdb/) as *stand-alone server free version* (the download URL will be sent in a email). 

* Put the downloaded `.zip` file in the [d2s-cwl-workflows/support/graphdb](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/tree/master/support) repository

* Set the right version in the `docker-compose` before running it.

> See [Setting up GraphDB](/docs/guide-graphdb) documentation for more details.

---

## Start services

Choose the services you want to deploy with `docker-compose`

* Triplestores: [GraphDB](https://github.com/MaastrichtU-IDS/graphdb), [Virtuoso](https://hub.docker.com/r/tenforce/virtuoso/), blazegraph
* Data access: [Apache Drill](https://github.com/amalic/apache-drill), Postgres, MariaDB

```shell
# On your local system you should first create the workflows working directory
mkdir -p /data/red-kg

# Start GraphDB and Apache Drill (run this for the example)
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d --build --force-recreate graphdb drill

# Start Virtuoso and Apache Drill
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d --build --force-recreate virtuoso drill

# Start blazegraph and postgres
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d --build --force-recreate blazegraph postgres
```

> All shared on `/data/red-kg`

>  Navigate to http://localhost:9000 for GraphDB

Stop services

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml down
```

Check running services

```shell
docker ps
```