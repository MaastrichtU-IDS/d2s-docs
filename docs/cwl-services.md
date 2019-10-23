---
id: cwl-services
title: Start services
---

Services must be running before executing CWL workflows. E.g. [Apache Drill](https://github.com/amalic/apache-drill) and [GraphDB](https://github.com/MaastrichtU-IDS/graphdb/) to process tabular files.

Choose the services you need, and deploy them with `docker-compose`

* Triplestores: [GraphDB](https://github.com/MaastrichtU-IDS/graphdb), [Virtuoso](https://hub.docker.com/r/tenforce/virtuoso/), blazegraph
* Data access: [Apache Drill](https://github.com/amalic/apache-drill), Postgres, MariaDB

> All shared on `/data/d2s-workspace`.

## Virtuoso and Apache Drill

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d --build --force-recreate virtuoso drill
```

> Access Virtuoso on http://localhost:8890 and Drill on http://localhost:8048.

> See [Setting up Virtuoso](/docs/guide-virtuoso) documentation for more details.

## GraphDB and Apache Drill

GraphDB cannot be pulled directly, it needs to be downloaded manually:

* [Download GraphDB](https://ontotext.com/products/graphdb/) as *stand-alone server free version* (you need to register to get download URL via email).

* Put the downloaded `.zip` file in the `d2s-cwl-workflows/support/graphdb` repository
* Make sure the GraphDB version defined in the `docker-compose` is right (default is `10.0.1`)

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d --build --force-recreate graphdb drill
```

> Access GraphDB on http://localhost:7200 and Drill on http://localhost:8048.

> See [Setting up GraphDB](/docs/guide-graphdb) documentation for more details.

## Virtuoso and Postgres

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d --build --force-recreate virtuoso postgres
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

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml down
```

### Reset Virtuoso

[Convenience script](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/restart_virtuoso.sh) to make it faster and easier to reset Virtuoso Triplestore.

```shell
./restart_virtuoso.sh
```


[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)
[![Apache Drill](/img/drill-logo.png)](https://github.com/amalic/apache-drill)

