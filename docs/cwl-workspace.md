---
id: cwl-workspace
title: Create workspace
---

## Clone the repository

Ideally you should create a new repository from the template [d2s-transform-template](https://github.com/MaastrichtU-IDS/d2s-transform-template) repository, and use this repository as documented in the [Transform a new dataset](/docs/d2s-new-dataset) page.

> In this example I will directly use the [d2s-transform-template](https://github.com/MaastrichtU-IDS/d2s-transform-template) repository.

Clone the repository with its submodules:

```shell
git clone --recursive https://github.com/MaastrichtU-IDS/d2s-transform-template.git
cd d2s-transform-template
```

> The  provided commands to run workflows are designed to be executed from the `d2s-transform-template` directory (or the repository you created).

---

## Create workspace for workflows data

### On Linux

Required for **Linux distributions** (e.g. Ubuntu, CentOS), and make sure your user as permission to write.

```shell
mkdir -p /data/d2s-workspace
sudo chown -R ${USER}:${USER} /data/d2s-workspace
```

> You might need to provide a different group (e.g. `staff` at IDS).

### On Windows

All files should be on the local `c:` drive. And `PowerShell` need to be **run as admin**.  

```shell
mkdir -p c:/data/d2s-workspace/output/tmp-outdir
```

---

## Pull Docker images

The Docker images used by the workflow need to be pulled from [DockerHub](https://hub.docker.com/u/umids).

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml pull
```
