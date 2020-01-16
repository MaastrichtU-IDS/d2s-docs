---
id: cwl-services
title: Start services
---

Services must be running before executing CWL workflows. E.g. [Apache Drill](https://github.com/amalic/apache-drill) and [GraphDB](https://github.com/MaastrichtU-IDS/graphdb/) to process tabular files.

Choose the services you need, and deploy them with `docker-compose`

* Triplestores: [GraphDB](https://github.com/MaastrichtU-IDS/graphdb), [Virtuoso](https://hub.docker.com/r/tenforce/virtuoso/), blazegraph
* Data access: [Apache Drill](https://github.com/amalic/apache-drill), Postgres, MariaDB

> All shared on `/data/d2s-workspace`.

## Run with docker-compose

Use the command from your repository, in your case `d2s-transform-template`

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up \
  -d --build --force-recreate \
  virtuoso graphdb blazegraph drill postgres
```

> Remove the services you are not interested in.

### Virtuoso and Apache Drill

At the moment for Virtuoso we recommend using the [restart_virtuoso.sh](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/restart_virtuoso.sh) scripts (which recreate `/data/d2s-workspace/virtuoso` and copy the required [load.sh script](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/support/virtuoso/load.sh) to the Virtuoso repository).

```shell
./restart_virtuoso.sh
```

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

> **TODO:** expose ports?

> See [Postgres guide](/docs/guide-postgres) page for more details.

---

## Manage services

### Show running services

```shell
docker ps
```

### Stop services

From `d2s-transform-template`

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml down
```


[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)
[![Apache Drill](/img/drill-logo.png)](https://github.com/amalic/apache-drill)

