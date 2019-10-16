---
id: start-run-workflow
title: Quick start
---

Quickly get on board by running your first CWL workflows to convert biomedical data to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

## Install Docker

Install [Docker](https://docs.docker.com/install/) to run the modules:

* See [our documentation](/docs/guide-docker#on-ubuntu) to install [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) on Ubuntu with [docker-compose](https://docs.docker.com/compose/install/).
* [Installer available](https://hub.docker.com/?overlay=onboarding) for MacOS and Windows (requires to login to Docker Hub).

> MacOS users open Docker config > `File Sharing` and make sure the `/tmp` and `/data` directories are shared.

---

## Install cwl-runner

Install [cwltool](https://github.com/common-workflow-language/cwltool#install) or `cwlref-runner` to get `cwl-runner` to run workflows of Docker modules.

### On Ubuntu

```shell
sudo apt install cwltool
```

### On MacOS

Using `pip` and `pipx`.

```shell
# Install python3 and pip3
brew install python3
pip3 install pipx
pipx install cwlref-runner
# Add pipx apps to path
pipx ensurepath
```

### On CentOS

Using `pip` and `pipx`.

```shell
# Install python3 and pip3
sudo yum install python36
sudo yum install python36-devel
sudo easy_install-3.6 pip
pip3 install --user pipx
pipx install cwlref-runner
```

### On Windows

Following documentation focuses on Linux & MacOS, as no workflow engine supports Windows.

> Windows documentation to run the docker containers can be found [here](https://github.com/MaastrichtU-IDS/data2services-pipeline/wiki/Run-on-Windows).

---

## Clone repository

```shell
git clone --recursive https://github.com/MaastrichtU-IDS/d2s-transform-biolink.git
cd d2s-transform-biolink
```

> The  provided commands to run workflows are designed to be executed from the `d2s-transform-biolink` directory

---

## Pull modules

To run services and workflows, Docker images need to be pulled. Use `docker-compose` to do so.

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml pull
```

---

## Create workflows directories

Required for **Linux distributions** (e.g. Ubuntu, CentOS)

```shell
sudo mkdir -p /data/d2s-workspace/output/tmp-outdir
sudo chown -R ${USER}:${USER} /data/d2s-workspace
```

> You might need to provide a different group (e.g. `staff` at IDS).

---

## Start services

Choose the services you need, and deploy them with `docker-compose`

* Triplestores: [GraphDB](https://github.com/MaastrichtU-IDS/graphdb), [Virtuoso](https://hub.docker.com/r/tenforce/virtuoso/), blazegraph
* Data access: [Apache Drill](https://github.com/amalic/apache-drill), Postgres, MariaDB

### Virtuoso and Apache Drill

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d --build --force-recreate virtuoso drill
```

> See [more documentation](/docs/cwl-services) to start services.

### GraphDB and Apache Drill

GraphDB cannot be pulled directly, it needs to be downloaded manually:

* [Download GraphDB](https://ontotext.com/products/graphdb/) as *stand-alone server free version* (you need to register to get download URL via email).

* Put the downloaded `.zip` file in the `d2s-cwl-workflows/support/graphdb` repository
* Make sure the GraphDB version defined in the `docker-compose` is right (default is `10.0.1`)

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml up -d --build --force-recreate graphdb drill
```

> Access Graphdb on http://localhost:7200 and Drill on http://localhost:8048.

### Show running services

```shell
docker ps
```

### Stop services

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml down
```

---

## Run workflows

* `outdir` (final output) and `tmp-outdir` (each step output) share volumes in `/data/d2s-workspace`.
* `tmpdir` output files in `/tmp/d2s-workspace`.

### Convert XML to BioLink

Convert [DrugBank](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/tree/master/datasets/drugbank) (drug associations) to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

```shell
cwl-runner --custom-net d2s-cwl-workflows_network \
  --outdir /data/d2s-workspace/output \
  --tmp-outdir-prefix=/data/d2s-workspace/output/tmp-outdir/ \
  --tmpdir-prefix=/data/d2s-workspace/output/tmp-outdir/tmp- \
  d2s-cwl-workflows/workflows/workflow-xml.cwl \
  datasets/drugbank/config-transform-xml-drugbank.yml
```

> Output goes to `/data/d2s-workspace/output`

---

### Convert TSV to BioLink

Convert [stitch](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/tree/master/datasets/stitch) (drug-protein associations) to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

```shell
cwl-runner --custom-net d2s-cwl-workflows_network \
  --outdir /data/d2s-workspace/output \
  --tmp-outdir-prefix=/data/d2s-workspace/output/tmp-outdir/ \
  --tmpdir-prefix=/data/d2s-workspace/output/tmp-outdir/tmp- \
  d2s-cwl-workflows/workflows/workflow-csv.cwl \
  datasets/stitch/config-transform-csv-stitch.yml
```

> Output goes to `/data/d2s-workspace/output`

---

### Convert TSV with split to BioLink

Convert the [EggNOG](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/tree/master/datasets/drugbank) dataset to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

```shell
cwl-runner --custom-net d2s-cwl-workflows_network \
  --outdir /data/d2s-workspace/output \
  --tmp-outdir-prefix=/data/d2s-workspace/output/tmp-outdir/ \
  --tmpdir-prefix=/data/d2s-workspace/output/tmp-outdir/tmp- \
  d2s-cwl-workflows/workflows/workflow-csv-split.cwl \
  datasets/eggnog/config-transform-split-eggnog.yml
```

> Output goes to `/data/d2s-workspace/output`