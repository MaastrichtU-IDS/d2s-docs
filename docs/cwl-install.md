---
id: cwl-install
title: CWL installation
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

### On MacOS & Windows

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

Install [Python 3.7](https://www.python.org/ftp/python/3.7.5/python-3.7.5-amd64.exe).

See [CWL Windows documentation](https://github.com/common-workflow-language/cwltool/blob/master/windowsdoc.md).

```shell
pip install pipx
pipx install cwlref-runner
# Add pipx apps to path
pipx ensurepath
```

> Windows documentation to run the docker containers can be found [here](/docs/guide-windows).

> Consider doing a `pip install --upgrade pip` to update your pip installation.
