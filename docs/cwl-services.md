---
id: cwl-services
title: Start services
---

[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)
[![Apache Drill](/img/drill-logo.png)](https://github.com/amalic/apache-drill)

## Build

[Apache Drill](https://github.com/amalic/apache-drill) and [GraphDB](https://github.com/MaastrichtU-IDS/graphdb/) services must be running before executing CWL workflows.

```shell
docker pull vemonet/apache-drill
```

> See [Setting up GraphDB](/docs/guide-graphdb) documentation to build GraphDB free version.

```shell
docker build -t graphdb --build-arg version=8.11.0 .
```

## Run 

Start Apache Drill sharing volume with this repository.

```shell
docker run -dit --rm -v /data/d2s-transform-biolink:/data:ro -p 8047:8047 -p 31010:31010 --name drill vemonet/apache-drill
```

> Here shared locally at `/data/d2s-transform-biolink`

> Navigate to http://localhost:8047


```shell
docker run -d --rm --name graphdb -p 7200:7200 -v /data/graphdb:/opt/graphdb/home -v /data/graphdb-import:/root/graphdb-import graphdb
```

> Here shared locally at `/data/graphdb` and `/data/graphdb-import`

> Navigate to http://localhost:9000