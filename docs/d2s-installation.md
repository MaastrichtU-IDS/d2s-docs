---
id: d2s-installation
title: Installation
---

## Install the d2s client

Install the [d2s client](https://pypi.org/project/d2s) and [cwlref-runner](https://pypi.org/project/cwlref-runner/) with `pip`

```bash
pip install d2s cwlref-runner
```

> Use [pip](https://pypi.org/project/pip/), pip3 or [pipx](https://pipxproject.github.io/pipx/) depending on your preferences.

Requirements:

* docker-compose
* git
* curl
* pip (we recommed using [pipx](https://pipxproject.github.io/pipx/))

> See [below](/docs/d2s-installation#install-pip) for more instructions about pip and docker installation.

### Enable autocompletion

Enabling commandline autocompletion in the terminal is crucial to have the best experience using the `d2s` client. 

* **Bash**: add the import autocomplete line to `.bashrc`
```bash
echo 'eval "$(_D2S_COMPLETE=source d2s)"' >> ~/.bashrc
```

> `nano ~/.bashrc` if issues with the import 

* **ZSH**: add the import autocomplete line to `.zshrc`
```bash
echo 'eval "$(_D2S_COMPLETE=source_zsh d2s)"' >> ~/.zshrc
```

> `nano ~/.zshrc` if issues with the import 

### Try the client

```bash
d2s
```

> You need to open a new terminal for the autocomplete to be activated.

> Use `Tab` after a `d2s` command in the terminal to see all the available options (it will adapt to the command and dynamically retrieve your datasets and workflows!).

---

## Download the GraphDB distribution

[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)

For licensing reason the GraphDB free edition distribution needs to be downloaded manually.

* Go to https://ontotext.com/products/graphdb/ and provide informations to get an email with the link to download GraphDB

* Download GraphDB as stand-alone server free version `8.10.1` (zip)

* The `d2s` client will ask you to provide the path to the GraphDB distribution `.zip` file when initializing the workspace.

  * By default the `d2s` client takes the file from your home directory (e.g. `/home/my-user`)

    ```bash
    # Copy the GraphDB distribution file to your home folder
    cp graphdb-free-8.10.1-dist.zip ~/
    ```

---

## Install pip

### Install pip on Ubuntu

```shell
wget https://bootstrap.pypa.io/get-pip.py
sudo python3 get-pip.py
pip3 install --user pipx
```

### Install pip on MacOS

Using `pip` and `pipx`.

```shell
# Install python3 and pip3
brew install python3
pip3 install pipx
# Add pipx apps to path
pipx ensurepath
```

### Install pip on CentOS

Using `pip` and `pipx`.

```shell
# Install python3 and pip3
sudo yum install python36
sudo yum install python36-devel
sudo easy_install-3.6 pip
pip3 install --user pipx
```

### Install pip on Windows

Install [Python 3.7](https://www.python.org/ftp/python/3.7.5/python-3.7.5-amd64.exe). See [CWL Windows documentation](https://github.com/common-workflow-language/cwltool/blob/master/windowsdoc.md).

```shell
pip install pipx
pipx install cwlref-runner
# Add pipx apps to path
pipx ensurepath
```

> Windows documentation to run the docker containers can be found [here](/docs/guide-windows).

> Consider doing a `pip install --upgrade pip` to update your pip installation.

---

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

### On MacOS and Windows

An [installer](https://hub.docker.com/?overlay=onboarding) is available for [MacOS](https://docs.docker.com/docker-for-mac/install/) and [Windows](https://docs.docker.com/docker-for-windows/install/) (`docker-compose` is included).

> On Windows you might need to run the `Docker Toolbox` to setup Docker.

### Fix commons issues

If Docker can't access internet when building you might want to change the DNS (to use Google's one). 

E.g.: `wget: unable to resolve host address`

On Linux:

```shell
vim /etc/resolv.conf
	> nameserver 8.8.8.8
```

> For issues related to Docker on Windows, see the [Windows guide](/docs/guide-windows) page.

> For more details on how to run Docker see the [Docker guide](/docs/guide-docker).



---

## Install Rabix Benten for VSCode

![Optional](https://img.shields.io/static/v1?label=module&message=Optional&color=blue)

[Rabix Benten](https://github.com/rabix/benten) is a plugin for help and completion to edit CWL files in Visual Studio Code.

```shell
pipx install --spec git+https://github.com/rabix/benten.git benten
```

> Add `CWL (Rabix/Benten)` extension to Visual Studio Code.

## Install Rabix Composer GUI

![Optional](https://img.shields.io/static/v1?label=module&message=Optional&color=blue)

[Rabix Composer](https://rabix.io/) is a nice way to visualize CWL workflows.

[Download](https://github.com/rabix/composer/releases) the right installation file and run it.

> Open the `d2s-cwl-workflows` folder in Rabix Composer.

> Note that Rabix will overwrite how you originally wrote your CWL files, and add `xy` coordinates to steps.

## Try Apache Airflow

[Apache Airflow](https://airflow.apache.org/) allow to run CWL workflows.

[Install Apache Airflow](https://airflow.apache.org/docs/stable/start.html) and the [cwl-airflow](https://cwl-airflow.readthedocs.io/en/latest/readme/run_demo.html) pip package to get started.

> **TODO**