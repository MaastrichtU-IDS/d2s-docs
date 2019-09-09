---
id: guide-windows
title: Windows guide
---

[![](/data2services/img/windows-logo.png)](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0) 

We **do not recommend** to run Data2Services on Windows.

* Most workflow orchestrators **do not support Windows**, as workflows are based on Linux containers.
* Windows can run [Docker](https://www.docker.com/), but not natively like [Linux](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0), making it much  more prone to errors.

> You still can try running [CWL](https://www.commonwl.org/) workflows with [cwltool](https://github.com/common-workflow-language/cwltool/blob/master/windowsdoc.md).

We recommend to use `Git Bash` to clone the repository, and the Windows `PowerShell` terminal (which is easier to use than the basic terminal).

Windows scripts are in the `resources/windows_scripts` folder and designed to be run from this directory. We recommend running the Docker commands directly as the scripts might be outdated. Feel free to report it in the issues if you meet problems.

```powershell
cd resources/windows_scripts
```

## Install Docker

See [official documentation](https://docs.docker.com/docker-for-windows/install/).

> You will need to create an account on [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-windows).

### Activate Virtualization

Virtualization and Hyper-V must be [**activated**](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization).
* Docker will propose to install virtualization automatically after the Docker installation, if they are not installed.
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

### Run Apache Drill

```powershell
docker run -dit --rm -p 8047:8047 -p 31010:31010 --name drill -v c:/data:/data:ro apache-drill
```

> Create "*test*" repository by accessing http://localhost:7200/repository

## Docker run on Windows

Be careful when running docker commands obtained from [Linux](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0) documentation, you will need to make sure the **folder paths point to the right path** within Windows `c:` drive (`c:/data` by default).

Make commands one line (remove newlines and `\` as the PowerShell doesn't handle them).

[![](/data2services/img/linux-logo.png)](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0) 