---
id: guide-windows
title: Windows guide
---

[![](/img/windows-logo.png)](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0) 

We do not recommend to run Data2Services on Windows.

* Most workflow orchestrators do not support Windows, as workflows are based on Linux containers, see CWL workflows and [Nextflow](https://www.nextflow.io/).
* Windows can run [Docker](https://www.docker.com/), but not natively like [Linux](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0), making it much  more prone to errors.

> You still can try running [CWL](https://www.commonwl.org/) workflows with [cwltool](https://github.com/common-workflow-language/cwltool/blob/master/windowsdoc.md). But cwltool developers don't test it on Windows.

We recommend to use [git](https://git-scm.com/downloads) to clone the repository, and the Windows `PowerShell` terminal (which is easier to use than the basic terminal).

## Install d2s

### Install Chocolatey

We will use the [Chocolatey package manager](https://chocolatey.org/) for Windows on the [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell?view=powershell-7).

* Open the PowerShell **as administrator** to install Chocolatey and its packages.
* Check and fix system restrictions:

```shell
Get-ExecutionPolicy
# If returns Restricted:  
Set-ExecutionPolicy Bypass -Scope Process
# or Set-ExecutionPolicy AllSigned
```

* Install Chocolatey on PowerShell:

```shell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

> See the [official Chocolatey documentation](https://chocolatey.org/docs/installation#install-with-powershellexe).

> Chocolatey can also be installed using a non-administrative shell. See [the documentation](https://chocolatey.org/docs/installation#non-administrative-install).

### Install pip

Using Chocolatey to install Python 3.8 and pip:

```shell
choco install python pip
```

> A **reboot** of your system is required to complete the installation.

### Install d2s

Use `pip` to install the [latest d2s release](https://pypi.org/project/d2s/) from pypi. You don't need to use an administrative shell anymore, a normal PowerShell should work.

```shell
pip install d2s
```

### Initialize a project

Initialize your first project:

```shell
d2s init my-project-folder-name
```

---

## Install Docker

See [official documentation](https://docs.docker.com/docker-for-windows/install/).

> You will need to create an account on [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-windows) to use the Docker Desktop installation.

### Use Chocolatey

Use docker-desktop for an easier installation if you have Windows Pro or Enterprise and a DockerHub account:

```shell
choco install docker-desktop
```

If you have Windows home or don't want to create a DockerHub account, use [docker-toolbox](https://chocolatey.org/packages/docker-toolbox):

```shell
choco install docker-toolbox -ia /COMPONENTS="kitematic,virtualbox,dockercompose" -ia /TASKS="desktopicon,modifypath,upgradevm"
```

Open  the `Docker Quickstart Terminal `to start Docker.

If the previous instructions did not work, try:

``````shell
choco install docker-kitematic virtualbox
``````

### Activate Virtualization

Virtualization and Hyper-V must be [**activated**](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization). Check in the `Task Manager `, in tab `Performance` if *Virtualization* is `enabled`. Or else:

* Docker-desktop installation will propose to install virtualization automatically after the Docker installation, if they are not installed.
* Note that Docker Hyper-V is not available for Windows 10 Home edition (you will need Pro or Enterprise edition)
* You might need to access the BIOS to enable VT-x virtualization

### Share drive

Docker will only be able to access folders and files in the `Shared Drives`.

> Go to Docker config > `Settings` > `Shared Drives` > **Share Drive C**

### Firewall issues

Firewall detected issue: common, see with your IT department or deactivate your firewall

### Docker build can't access internet

If Docker can't access internet when building you might want to change the DNS (to use Google's one). 

E.g.: `wget: unable to resolve host address`

> Go to `Docker Settings` > `Network` > `DNS Server` > `Fixed: 8.8.8.8`

---

## Install cwltool

Install [Python 3.7](https://www.python.org/ftp/python/3.7.5/python-3.7.5-amd64.exe).

See [CWL Windows documentation](https://github.com/common-workflow-language/cwltool/blob/master/windowsdoc.md).

```shell
pip install pipx
pipx install cwlref-runner
# Add pipx apps to path
pipx ensurepath
```

> Windows documentation to run the docker containers can be found [here](/docs/guide-windows).

> Consider doing a `pip install --upgrade pip` to update your pip installation

## Clone

Open the `Git Bash` application to download the directory with git. And execute the following commands to download the code required to run the pipeline:

```powershell
# Fix a bug on Windows (newline causing Apache Drill to fail)
git config --global core.autocrlf false

git clone --recursive https://github.com/MaastrichtU-IDS/data2services-pipeline.git
```

> Run `git config --global core.autocrlf false` before cloning if you get the error `Standard_init_linux.go:175 exec user process caused no such file`

## Build

Each Docker image can be pulled or built independently.

### Download GraphDB triplestore

For the GraphDB triplestore, you **need to download** [GraphDB standalone zip](https://www.ontotext.com/products/graphdb/)

> Register to get an email with download URL: request the `Free version`

> `Download as standalone server`: a zip file

Put GraphDB `.zip` file in the `graphdb` github repository (let it zipped).

> You can pull GraphDB directly from [DockerHub](https://hub.docker.com/r/ontotext/graphdb/) if you have a license for the `standard` or `enterprise` edition

### Build the images

```powershell
cd resources/windows_scripts
./build.bat
```

## Run Drill and GraphDB services

In a production environment it is considered that both **Apache Drill** and **GraphDB** services are present. Use `docker` to start them. Other RDF stores should also work, but have not been tested yet.

### Run GraphDB

> Create `c:/data/graphdb` and `c:/data/graphdb-import` folders

```powershell
docker run -d --rm --name graphdb -p 7200:7200 -v c:/data/graphdb:/opt/graphdb/home -v c:/data/graphdb-import:/root/graphdb-import graphdb
```

> Try using relative paths?
>
> ```shell
> docker run -d --rm --name graphdb -p 7200:7200 -v $(pwd)/workspace/graphdb:/opt/graphdb/home -v $(pwd)/workspace/import:/root/graphdb-import graphdb
> ```

### Run Apache Drill

```powershell
docker run -dit --rm -p 8047:8047 -p 31011:31010 --name drill -v c:/data:/data:ro apache-drill
```

> Create "*test*" repository by accessing http://localhost:7200/repository

## Docker run on Windows

Be careful when running docker commands obtained from [Linux](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0) documentation, you will need to make sure the **shared volumes point to the right drive** within Windows `c:` drive (`c:/data` by default).

Example to run [xml2rdf](https://github.com/MaastrichtU-IDS/xml2rdf) on Windows.

```powershell
docker run --rm -it -v c:/data/d2s-workspace:/data umids/xml2rdf:latest -i "/data/my-file.xml" -o "/data/output.nq" -g 'http://w3id.org/d2s/xml2rdf/graph'
```

> Make commands one line, remove newlines and `\` as the PowerShell doesn't handle them.

[![](/img/linux-logo.png)](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0) 