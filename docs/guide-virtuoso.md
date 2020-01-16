---
id: guide-virtuoso
title: Setting up Virtuoso
---

[![OpenLink Virtuoso](/img/openlink-virtuoso.png)](https://virtuoso.openlinksw.com/)

## Docker pull

[OpenLink Virtuoso](https://virtuoso.openlinksw.com/) triplestore is available on [DockerHub](https://hub.docker.com/r/tenforce/virtuoso).

```shell
docker pull tenforce/virtuoso:latest
```

## Run it

### Using convenience script

At the moment for Virtuoso we recommend using the [restart_virtuoso.sh](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/restart_virtuoso.sh) scripts (which recreate `/data/d2s-workspace/virtuoso` and copy the required `load.sh` script to the virtuoso repository).

```shell
./restart_virtuoso.sh
```

> Access at http://localhost:8890/ and SPARQL endpoint at http://localhost:8890/sparql.

> Admin login: `dba`

### Using docker-compose

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d --build --force-recreate virtuoso
  
# Then copy the load.sh file to be accessible by Virtuoso running container
cp d2s-cwl-workflows/support/virtuoso/load.sh /data/d2s-workspace/virtuoso
```

### Using Docker run

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

---

## Clear Virtuoso triplestore

```shell
docker exec -it d2s-cwl-workflows_virtuoso_1 isql-v -U dba -P dba exec="RDF_GLOBAL_RESET ();"
```

---

## Virtuoso bulk load

```shell
docker exec -it d2s-cwl-workflows_virtuoso_1 isql-v -U dba -P dba exec="ld_dir('/usr/local/virtuoso-opensource/var/lib/virtuoso/db', '*.nq', 'http://test/'); rdf_loader_run();"
```
