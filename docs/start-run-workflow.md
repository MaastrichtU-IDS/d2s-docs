---
id: start-run-workflow
title: Quick start
---

Quickly get on board by running your first CWL workflows to convert biomedical data to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

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

> [Download GraphDB](https://ontotext.com/products/graphdb/) as *stand-alone server free version*. Put the downloaded `.zip` file in the `support/graphdb` repository, and set the right version in the `docker-compose` before running it.

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

* `--outdir`: final dir where the final ouput of the workflow is copied.
* `--tmp-outdir-prefix`: dir for output files (tmp) of each step 
* `--tmpdir-prefix`: dir used to pass inputs
* `-basedir /data/basedir/`: to find out

`outdir` and `tmp-outdir` output files in `/data/red-kg`

`tmpdir` output files in `/tmp/red-kg`

### Convert XML to BioLink

Convert [DrugBank](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/tree/master/datasets/drugbank) (drug associations) to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

```bash
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

```bash
cwl-runner --custom-net d2s-cwl-workflows_d2s-network \
  --outdir /data/red-kg/output \
  --tmp-outdir-prefix=/data/red-kg/tmp/ \
  --tmpdir-prefix=/tmp/red-kg/ \
  d2s-cwl-workflows/workflows/workflow-csv-split.cwl \
  datasets/eggnog/config-transform-split-eggnog.yml
```

> Output goes to `/data/red-kg/output`