---
id: guide-virtuoso
title: Setting up Virtuoso
---

[![OpenLink Virtuoso](/img/openlink-virtuoso.png)](https://virtuoso.openlinksw.com/)

[OpenLink Virtuoso](https://virtuoso.openlinksw.com/) triplestore is available on [DockerHub](https://hub.docker.com/r/tenforce/virtuoso).

## Run it

### Using the client

The [load.sh](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/support/virtuoso/load.sh) script needs to be copied to the virtuoso repository for bulk load to work, this is done by `d2s init`).

```shell
d2s start virtuoso
  
# Then copy the load.sh file to be accessible by Virtuoso running container
cp d2s-cwl-workflows/support/virtuoso/load.sh workspace/virtuoso
```

> Access at http://localhost:8890/ and SPARQL endpoint at http://localhost:8890/sparql.

> Admin login: `dba`

### Using docker run

Be careful when changing the DBA_PASSWORD for [tenforce/virtuoso](tenforce/virtuoso). This doesn't work every time, so you might need to use the default `dba` password.

```shell
docker run --rm --name d2s-cwl-workflows_virtuoso_1 \
	--network d2s-cwl-workflows_network \
    -p 8890:8890 -p 1111:1111 \
    -e DBA_PASSWORD=dba \
    -e SPARQL_UPDATE=true \
    -e DEFAULT_GRAPH=https://w3id.org/d2s/graph \
    -v /data/d2s-workspace:/data \
    -d tenforce/virtuoso
```

> Shared in `/data/d2s-workspace`

> Navigate to http://localhost:8890/

## Clear Virtuoso triplestore

```shell
docker exec -it d2s-cwl-workflows_virtuoso_1 isql-v -U dba -P dba exec="RDF_GLOBAL_RESET ();"
```

## Virtuoso bulk load

```shell
docker exec -it d2s-cwl-workflows_virtuoso_1 isql-v -U dba -P dba exec="ld_dir('/usr/local/virtuoso-opensource/var/lib/virtuoso/db', '*.nq', 'http://test/'); rdf_loader_run();"
```

## Configuration

CORS can be enabled following [this tutorial](http://vos.openlinksw.com/owiki/wiki/VOS/VirtTipsAndTricksCORsEnableSPARQLURLs).