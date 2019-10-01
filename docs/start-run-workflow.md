---
id: start-run-workflow
title: Quick start
---

Quickly get on board by running your first CWL workflows to convert biomedical data to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

## Install Docker

Install [Docker](https://docs.docker.com/install/) to run the modules:

* See [our documentation](/docs/guide-docker#on-ubuntu) to install Docker on [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/) with [docker-compose](https://docs.docker.com/compose/install/).
* [Installer available](https://hub.docker.com/?overlay=onboarding) for MacOS and Windows.

---

## Install cwltool

Install [cwltool](https://github.com/common-workflow-language/cwltool#install) to get cwl-runner to run workflows of Docker modules:

* On Ubuntu

```shell
sudo apt install cwltool
```

* Using `pip`

```shell
pip install cwlref-runner
```

> Following documentation focuses on Linux & MacOS, as no workflow engine supports Windows (see [Windows documentation](https://github.com/MaastrichtU-IDS/data2services-pipeline/wiki/Run-on-Windows)).

---

## Clone repository

```shell
git clone --recursive https://github.com/MaastrichtU-IDS/d2s-transform-biolink.git
cd d2s-transform-biolink
```

> The  provided commands to run workflows are designed to be executed from the `d2s-transform-biolink` directory

## Pull modules

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml pull
```

---

## Start services

Choose the services you want to deploy with `docker-compose`

* Triplestores: [GraphDB](https://github.com/MaastrichtU-IDS/graphdb), [Virtuoso](https://hub.docker.com/r/tenforce/virtuoso/), blazegraph
* Data access: [Apache Drill](https://github.com/amalic/apache-drill), Postgres, MariaDB

> [Download GraphDB](https://ontotext.com/products/graphdb/) as *stand-alone server free version*. Put the downloaded `.zip` file in the `support/graphdb` repository, and set the right version in the `docker-compose` before running it.

```shell
# On your local system you should first create the workflows working directory
mkdir -p /data/red-kg

# Start GraphDB and Apache Drill (run this for the example)
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d --build --force-recreate graphdb drill

# Start Virtuoso and Postgres
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d --build --force-recreate virtuoso postgres
```

> See [more documentation](/docs/cwl-services) to start services.

Check running services

```shell
docker ps
```

Stop services

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml down
```

---

## Run workflows

> `outdir` (final output) and `tmp-outdir` (each step output) share volumes in `/data/red-kg`

> `tmpdir` output files in `/tmp/red-kg`

### Convert XML to BioLink

Convert [DrugBank](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/tree/master/datasets/drugbank) (drug associations) to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

```shell
cwl-runner --custom-net d2s-cwl-workflows_d2s-network \
  --outdir /data/red-kg/output \
  --tmp-outdir-prefix=/data/red-kg/tmp/ \
  --tmpdir-prefix=/tmp/red-kg/ \
  d2s-cwl-workflows/workflows/workflow-xml.cwl \
  datasets/drugbank/config-transform-xml-drugbank.yml
```

> Output goes to `/data/red-kg/output`

### Convert TSV to BioLink

Convert [stitch](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/tree/master/datasets/stitch) (drug-protein associations) to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

```shell
cwl-runner --custom-net d2s-cwl-workflows_d2s-network \
  --outdir /data/red-kg/output \
  --tmp-outdir-prefix=/data/red-kg/tmp/ \
  --tmpdir-prefix=/tmp/red-kg/ \
  d2s-cwl-workflows/workflows/workflow-csv.cwl \
  datasets/stitch/config-transform-csv-stitch.yml
```

> Output goes to `/data/red-kg/output`

### Convert TSV with split to BioLink

Convert the [EggNOG](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/tree/master/datasets/drugbank) dataset to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

```shell
cwl-runner --custom-net d2s-cwl-workflows_d2s-network \
  --outdir /data/red-kg/output \
  --tmp-outdir-prefix=/data/red-kg/tmp/ \
  --tmpdir-prefix=/tmp/red-kg/ \
  d2s-cwl-workflows/workflows/workflow-csv-split.cwl \
  datasets/eggnog/config-transform-split-eggnog.yml
```

> Output goes to `/data/red-kg/output`