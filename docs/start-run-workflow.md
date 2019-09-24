---
id: start-run-workflow
title: Run your first workflow
---

## Install Docker

Install [Docker](https://docs.docker.com/install/) to run the modules:

* On [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* On [MacOS](https://docs.docker.com/docker-for-mac/install/)
* On [Windows](https://docs.docker.com/docker-for-windows/install/)

---

## Install cwltool

Install [cwltool](https://github.com/common-workflow-language/cwltool#install) to get cwl-runner to run workflows of Docker modules:

* On Ubuntu

```shell
apt-get install cwltool
```

* Using `pip`

```shell
pip install cwlref-runner
```

> **TODO:** It is recommended to build the Docker images before running workflows, as the `docker pull` might crash when done through `cwl-runner`.

> Following documentation focuses on Linux & MacOS, as no workflow engine supports Windows.

---

## Clone repository

```shell
git clone --recursive https://github.com/MaastrichtU-IDS/data2services-transform-biolink.git
cd data2services-transform-biolink
```

At the moment the repository `/data/red-kg` is used by default as working directory

---

## Start services

Choose the services you want to deploy with `docker-compose`

* Triplestores: [GraphDB](https://github.com/MaastrichtU-IDS/graphdb), [Virtuoso](https://hub.docker.com/r/tenforce/virtuoso/), blazegraph
* Data access: [Apache Drill](https://github.com/amalic/apache-drill), Postgres, MariaDB

```shell
# Start Virtuoso and Apache Drill (run this for the example)
docker-compose -f data2services-cwl-workflows/docker-compose.yaml up virtuoso drill
docker-compose -f data2services-cwl-workflows/docker-compose.yaml up graphdb drill

# Start blazegraph and postgres
docker-compose -f data2services-cwl-workflows/docker-compose.yaml up blazegraph postgres
```

Stop services

```shell
docker-compose -f data2services-cwl-workflows/docker-compose.yaml down
```

> [Download GraphDB](https://ontotext.com/products/graphdb/) as *stand-alone server free version*. Put the downloaded `.zip` file in the `support/graphdb` repository, and set the right version in the `docker-compose` before running it.

> For GraphDB, if no repository exist, create the `test` repository:
>
> ```shell
> curl -X POST \
>     http://localhost:7200/rest/repositories \
>     -H 'Content-Type: multipart/form-data' \
>     -F "config=@data2services-cwl-workflows/support/graphdb-repo-config.ttl"
> ```

---

## Run workflow

Convert stitch TSV (drug-protein associations) to BioLink.

```shell
cwl-runner --outdir /data/red-kg/output data2services-cwl-workflows/workflows/workflow-csv.cwl support/example-config/config-transform-csv-stitch.yml
```

---

## Clear Virtuoso triplestore

```shell
docker exec -it data2services-cwl-workflows_virtuoso_1 isql-v -U dba -P dba exec="RDF_GLOBAL_RESET ();"
```

---

## Virtuoso bulk load

```shell
docker exec -it data2services-cwl-workflows_virtuoso_1 isql-v -U dba -P dba exec="ld_dir('/usr/local/virtuoso-opensource/var/lib/virtuoso/db/output', '*.nq', 'http://test/'); rdf_loader_run();"
```

---

## Starting manually Virtuoso

Be careful when changing the DBA_PASSWORD for `tenforce/virtuoso`. This doesn't work most of the time, so you might need to use the default `dba` password.

```shell
docker run --rm --name data2services-cwl-workflows_virtuoso_1 \
    -p 8890:8890 -p 1111:1111 \
    -e DBA_PASSWORD=my-password \
    -e SPARQL_UPDATE=true \
    -e DEFAULT_GRAPH=http://www.example.com/my-graph \
    -v /data/red-kg:/data \
    -d tenforce/virtuoso
```

