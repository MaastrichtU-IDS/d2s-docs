---
id: install-windows
title: Install d2s on Windows
---

[![](/img/windows-logo.png)](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0) 

Support of the d2s  tool on Windows is a work in progress.

* Most workflow orchestrators do not support Windows, as workflows are based on Linux containers, see CWL workflows and [Nextflow](https://www.nextflow.io/).
* Windows can run [Docker](https://www.docker.com/), but not natively like [Linux](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0), making it much  more prone to errors.

> You still can try running [CWL](https://www.commonwl.org/) workflows with [cwltool](https://github.com/common-workflow-language/cwltool/blob/master/windowsdoc.md). But it is not tested on Windows.

We recommend to use the Windows [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell) terminal (which is easier to use than the basic terminal).

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

### Install pip and pipx

Using [Chocolatey](https://chocolatey.org/) to install Python 3.8 and pip:

```shell
choco install python pip
```

> A **reboot** of your system is required to complete the installation.

We recommend using [pipx](https://pipxproject.github.io/pipx/) if you are not developing on [d2s](https://pypi.org/project/d2s/):

``````shell
pip install pipx
pipx ensurepath
``````

### Install d2s

Use `pipx` to install the [latest d2s release](https://pypi.org/project/d2s/) from pypi. You don't need to use an administrative shell anymore, a normal PowerShell should work.

```shell
pipx install d2s cwlref-runner
# Or use pip
pip install d2s cwlref-runner
```

### Initialize a project and continue

Initialize your first project:

```shell
d2s init my-project-folder-name
```

And [continue the tutorial](/docs/d2s-workspace) to setup your Knowledge Graph.

---

## Install Docker

We use [Chocolatey](https://chocolatey.org/) to install [Docker](https://docs.docker.com/install/).

Use [docker-desktop](https://hub.docker.com/editions/community/docker-ce-desktop-windows) for an easier installation if you have Windows Pro or Enterprise and a [DockerHub account](https://hub.docker.com/editions/community/docker-ce-desktop-windows):

```shell
choco install docker-desktop
```

If you have Windows home or don't want to create a DockerHub account, use [docker-toolbox](https://chocolatey.org/packages/docker-toolbox):

```shell
choco install docker-toolbox -ia /COMPONENTS="kitematic,virtualbox,dockercompose" -ia /TASKS="desktopicon,modifypath,upgradevm"
```

Open  the `Docker Quickstart Terminal `to start Docker.

> Additional components that might be needed to install (VM and GUI):
>
> ````shell
> choco install virtualbox docker-kitematic
> ````

### Activate Virtualization

Virtualization and Hyper-V must be [**activated**](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization). Check in the `Task Manager `, in tab `Performance` if *Virtualization* is `enabled`. 

Check the [documentation to enable it](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization).

* Docker-desktop installation will propose to install virtualization automatically after the Docker installation, if they are not installed.
* Note that Docker Hyper-V is not available for Windows 10 Home edition (you will need Pro or Enterprise edition)
* You might need to access the BIOS to enable VT-x virtualization

### Share drive

By default `docker-desktop` and `docker-toolbox` are sharing your `C:/Users` volume. Docker will only be able to access folders and files in the `Shared Drives`. So make sure you execute `d2s init` somewhere in your users directories. 

> On `docker-desktop` you can change it in Docker config > `Settings` > `Shared Drives` > **Share Drive C**

> On `docker-toolbox` you need to chqnge the settings of the Virtual Box

### Known issues

* Firewall issues: it is common to face a firewall when Docker tries to connect to the internet
  * This could be due to local services: try deactivate your firewall and/or antivirus 
  * If you are running it on your office network you might face issues related to the office network firewall. Try at home and contact your IT department if needed.

* DNS issue: Docker build can't access the internet

If Docker can't access internet when building, you might want to change the DNS (to use Google's one). 

E.g.: when getting `wget: unable to resolve host address`

> Go to `Docker Settings` > `Network` > `DNS Server` > `Fixed: 8.8.8.8`

---

## Install cwltool

> **To be tested**.

Install [Python 3.7](https://www.python.org/ftp/python/3.7.5/python-3.7.5-amd64.exe).

See [CWL Windows documentation](https://github.com/common-workflow-language/cwltool/blob/master/windowsdoc.md).

```shell
pip install pipx
pipx install cwlref-runner
# Add pipx apps to path
pipx ensurepath
```

> Windows documentation to run the docker containers can be found [here](/docs/install-windows).

> Consider doing a `pip install --upgrade pip` to update your pip installation
