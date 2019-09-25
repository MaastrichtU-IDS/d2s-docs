---
id: cwl-services
title: Start services
---

[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)
[![Apache Drill](/img/drill-logo.png)](https://github.com/amalic/apache-drill)



Services must be running before executing CWL workflows. E.g. [Apache Drill](https://github.com/amalic/apache-drill) and [GraphDB](https://github.com/MaastrichtU-IDS/graphdb/) to process tabular files.



## Build

[GraphDB](https://github.com/MaastrichtU-IDS/graphdb/) triplestore `.zip` file needs to be downloaded manually at https://ontotext.com/products/graphdb/ and placed in [/d2s-cwl-workflows/support/graphdb](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/tree/master/support).

> See [Setting up GraphDB](/docs/guide-graphdb) documentation to build GraphDB free version.

```shell
docker build -t graphdb --build-arg version=8.11.0 .
```



## Start services

Choose the services you want to deploy with `docker-compose`

* Triplestores: [GraphDB](https://github.com/MaastrichtU-IDS/graphdb), [Virtuoso](https://hub.docker.com/r/tenforce/virtuoso/), blazegraph
* Data access: [Apache Drill](https://github.com/amalic/apache-drill), Postgres, MariaDB

```shell
# Start GraphDB and Apache Drill (run this for the example)
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up graphdb drill

# Start Virtuoso and Apache Drill
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up virtuoso drill

# Start blazegraph and postgres
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up blazegraph postgres
```

> All shared on `/data/red-kg`

>  Navigate to http://localhost:9000 for GraphDB

Stop services

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml down
```

> [Download GraphDB](https://ontotext.com/products/graphdb/) as *stand-alone server free version*. Put the downloaded `.zip` file in the `support/graphdb` repository, and set the right version in the `docker-compose` before running it.

> For GraphDB, if no repository exist, create the `test` repository:
>
> ```shell
> curl -X POST \
>  http://localhost:7200/rest/repositories \
>  -H 'Content-Type: multipart/form-data' \
>  -F "config=@d2s-cwl-workflows/support/graphdb-repo-config.ttl"
> ```