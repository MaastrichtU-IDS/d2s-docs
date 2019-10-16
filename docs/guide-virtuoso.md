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

---

## Docker run

Be careful when changing the DBA_PASSWORD for [tenforce/virtuoso](tenforce/virtuoso). This doesn't work every time, so you might need to use the default `dba` password.

```shell
docker run --rm --name d2s-cwl-workflows_virtuoso_1 \
    -p 8890:8890 -p 1111:1111 \
    -e DBA_PASSWORD=my-password \
    -e SPARQL_UPDATE=true \
    -e DEFAULT_GRAPH=http://www.example.com/my-graph \
    -v /data/d2s-workdir:/data \
    -d tenforce/virtuoso
```

> Shared in `/data/d2s-workdir`

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
