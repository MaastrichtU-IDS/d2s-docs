---
id: cwl-install
title: CWL installation
---

[![](/img/CWL_logo.png)](https://www.commonwl.org/)

The [Common Workflow Language](https://www.commonwl.org/) is used to describe workflows to transform heterogeneous structured data (CSV, TSV, RDB, XML, JSON) to the [BioLink](https://biolink.github.io/biolink-model/docs/) RDF data model. The user defines [SPARQL queries](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/mapping/pharmgkb/insert-pharmgkb.rq) to transform the generic RDF generated depending on the input data structure (AutoR2RML, xml2rdf) to the target BioLink model.

> **TO REMOVE**

## Install Docker

### On Ubuntu

Install [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) and [docker-compose](https://docs.docker.com/compose/install/).

```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
sudo usermod -aG docker ${USER}

# Install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

> `sudo groupadd docker` might be required before `usermod`

### On MacOS & Windows

An [installer](https://hub.docker.com/?overlay=onboarding) is available for [MacOS](https://docs.docker.com/docker-for-mac/install/) and [Windows](https://docs.docker.com/docker-for-windows/install/) (`docker-compose` is included).

### Fix commons issues

If Docker can't access internet when building you might want to change the DNS (to use Google's one). 

E.g.: `wget: unable to resolve host address`

* On Linux

  ```shell
  vim /etc/resolv.conf`
  	> `nameserver 8.8.8.8`
  ```

* For issues related to Docker on Windows, see the [Windows guide](docs/guide-windows) page.

> More details about running Docker on the [Docker guide](/docs/docker-guide) page.


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

> Windows documentation to run the docker containers can be found [here](/docs/guide-windows).

---

## Clone the repository

Clone the repository with its submodules

```shell
git clone --recursive https://github.com/MaastrichtU-IDS/d2s-transform-template.git
cd d2s-transform-template
```

> The  provided commands to run workflows are designed to be executed from the `d2s-transform-template` directory

---

## Create workflows directories

Required for **Linux distributions** (e.g. Ubuntu, CentOS)

```shell
sudo mkdir -p /data/d2s-workspace/output/tmp-outdir
sudo chown -R ${USER}:${USER} /data/d2s-workspace
```

> You might need to provide a different group (e.g. `staff` at IDS).

---

## Pull Docker images

The Docker images used by the workflow need to be pulled from [DockerHub](https://hub.docker.com/u/umids).

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml pull
```

---

## Install Rabix Composer GUI

![Optional](https://img.shields.io/static/v1?label=module&message=Optional&color=blue)

[Rabix Composer](https://rabix.io/) is a nice way to visualize CWL workflows.

[Download](https://github.com/rabix/composer/releases) the right installation file and run it.

> Open the `d2s-cwl-workflows` folder in Rabix Composer.

> Note that Rabix will overwrite how you originally wrote your CWL files, and add `xy` coordinates to steps.