---
id: d2s-installation
title: Installation
---

## Install the d2s client

Install the [d2s client](https://pypi.org/project/d2s) and [cwlref-runner](https://pypi.org/project/cwlref-runner/) with [pipx](https://pipxproject.github.io/pipx/) on Linux and MacOS:

```shell
pipx install d2s cwlref-runner
```

> We recommend to use [pipx](https://pipxproject.github.io/pipx/) if you just want to execute `d2s`. You can also install with [pip](https://pypi.org/project/pip/) or pip3 depending on your preferences.

Requirements:

* [Python 3.6](https://d2s.semanticscience.org/docs/d2s-installation#install-pip)
* [Docker-compose](https://docs.docker.com/compose/install/)
* Git (download [Git for Windows](https://git-scm.com/download/win))
* The [OpenShift CLI](https://maastrichtu-ids.github.io/dsri-documentation/docs/openshift-install) (`oc` command) is required if you want to use experimental features to run services and workflows on OpenShift

See those [instructions to install d2s on Windows](/docs/d2s-installation#install-pipx-on-windows) using Chocolatey and pipx. Some features support on Windows is still a work in progress, such as CWL workflows (see the [official CWL Windows documentation](https://github.com/common-workflow-language/cwltool/blob/master/windowsdoc.md) to make it work).

> See [below](/docs/d2s-installation#install-pipx) for more instructions about [pipx](https://pipxproject.github.io/pipx/) and docker installation.

### Enable autocompletion

![Optional](https://img.shields.io/static/v1?label=module&message=Optional&color=blue)

Enabling commandline autocompletion in the terminal provides a better experience using the `d2s` client. 

* **ZSH**: add the import autocomplete line to the `~/.zshrc` file.

```bash
echo 'eval "$(_D2S_COMPLETE=source_zsh d2s)"' >> ~/.zshrc
```

> Set your terminal to use [ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH) by default:
>
> ```shell
> chsh -s /bin/zsh
> ```

> A [oh-my-zsh](https://ohmyz.sh/) theme can be easily chosen for a personalized experience. See the [zsh-theme-biradate](https://github.com/vemonet/zsh-theme-biradate) to easily install a simple theme and configure your terminal in a few minutes.

* **Bash**: add the import autocomplete line to the `~/.bashrc` file.

```bash
echo 'eval "$(_D2S_COMPLETE=source d2s)"' >> ~/.bashrc
```

> **Bash autocompletion needs to be tested.**

### Windows support

Support of the [d2s tool](https://pypi.org/project/d2s/) on Windows is a work in progress.

* Most workflow orchestrators do not support Windows, as workflows are based on Linux containers, see CWL workflows and [Nextflow](https://www.nextflow.io/).
* Windows can run [Docker](https://www.docker.com/), but not natively like [Linux](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop#0), making it more prone to errors.

> You still can try running [CWL](https://www.commonwl.org/) workflows with [cwltool](https://github.com/common-workflow-language/cwltool/blob/master/windowsdoc.md). But it is not tested on Windows.

We recommend to use the Windows [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell) terminal (which is easier to use than the basic terminal).

### Try the client

```shell
d2s
```

> You need to open a new terminal for the autocomplete to be activated.

> Use `Tab` after a `d2s` command in the terminal to see all the available options (it will adapt to the command and dynamically retrieve your datasets and workflows!).

---

## Install pipx

If you just want to run `d2s` we recommend you to use [pipx](https://pipxproject.github.io/pipx/) as it install the tool in an isolated environment. It can be compared to `apt`, `brew` or `npx`.

> Consider doing a `pip install --upgrade pip` to update your pip installation.

> Instructions use `pip3` to make sure `pipx` is installed with Python3, but feel free to use your own `pip` installation.

### Install pipx on Ubuntu

```shell
# Install pip if necessary
wget https://bootstrap.pypa.io/get-pip.py
sudo python3 get-pip.py
# Install pipx
pip3 install --user pipx
```

### Install pipx on MacOS

```shell
# Install python3 and pip3
brew install python3
pip3 install pipx
# Add pipx apps to path
pipx ensurepath
```

### Install pipx on CentOS

```shell
# Install python3 and pip3
sudo yum install python36
sudo yum install python36-devel
sudo easy_install-3.6 pip
pip3 install --user pipx
pipx ensurepath
```

### Install pipx on Windows

We will use the [Chocolatey package manager](https://chocolatey.org/) for Windows on the [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell?view=powershell-7). To install Chocolatey:

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

Open the PowerShell **as administrator** and use [Chocolatey](https://chocolatey.org/) to install Python 3.8 and pip:

```shell
choco install python pip
```

> A **reboot** of your system is required to complete the installation.

> Pip does not need to be run as administrator (only `choco install`)

We recommend using [pipx](https://pipxproject.github.io/pipx/) if you are not developing on the [d2s Python CLI](https://pypi.org/project/d2s/):

``````shell
pip install pipx
pipx ensurepath
``````


### Upgrade d2s version

Upgrade [d2s](https://pypi.org/project/d2s/) to the latest release:

```shell
pipx upgrade d2s
```

### Uninstall

```shell
pipx uninstall d2s cwlref-runner
```

If you face issues where `d2s` or `cwl-runner` is already installed, try to make sure it is properly uninstall from `pip`:

```shell
sudo pip uninstall d2s cwlref-runner cwltool
sudo pip3 uninstall d2s cwlref-runner cwltool
```

If you are facing issue with `No module name pip found`, it might be due to pip and pipx version issues. Be careful when installing `pip` and `pipx` as you want it to properly use `python3.6`. Those commands will help you uninstalling  `pipx` properly: 

```shell
rm -rf ~/.local/pipx
pip uninstall pipx
pip3 uninstall pipx
python3.6 -m pip uninstall pipx
python3.6 -m pip3 uninstall pipx
```

---

## Install Docker

### On Ubuntu

Install [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) and [docker-compose](https://docs.docker.com/compose/install/).

```shell
sudo apt update
sudo apt install docker.io
sudo systemctl enable --now docker

sudo usermod -aG docker ${USER}

# Install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

> `sudo groupadd docker` could be required before `usermod` if the group has not been created.

### On MacOS

An [installer](https://hub.docker.com/?overlay=onboarding) is available for [MacOS](https://docs.docker.com/docker-for-mac/install/) (`docker-compose` is included).

### On Windows

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

#### Activate Virtualization

Virtualization and Hyper-V must be [**activated**](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization). Check in the `Task Manager `, in tab `Performance` if *Virtualization* is `enabled`. 

Check the [documentation to enable it](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization).

* Docker-desktop installation will propose to install virtualization automatically after the Docker installation, if they are not installed.
* Note that Docker Hyper-V is not available for Windows 10 Home edition (you will need Pro or Enterprise edition)
* You might need to access the BIOS to enable VT-x virtualization

* Share drive

By default `docker-desktop` and `docker-toolbox` are sharing your `C:/Users` volume. Docker will only be able to access folders and files in the `Shared Drives`. So make sure you execute `d2s init` somewhere in your users directories. 

> On `docker-desktop` you can change it in Docker config > `Settings` > `Shared Drives` > **Share Drive C**

> On `docker-toolbox` you need to change the settings of the Virtual Box

### Fix known issues

* **DNS issue**: Docker build can't access the internet. E.g.: getting `wget: unable to resolve host address`

  * If Docker can't access internet when building you might want to change the DNS (to use Google's one). 

  * On Linux:

    ```shell
    nano /etc/resolv.conf
    	> nameserver 8.8.8.8
    ```

  * On Windows: go to `Docker Settings` > `Network` > `DNS Server` > `Fixed: 8.8.8.8`

* **Firewall issue on Windows**: it is common to face a firewall when Docker tries to connect to the internet
  * This could be due to local services: try deactivate your firewall and/or antivirus 
  * If you are running it on your office network you might face issues related to the office network firewall. Try at home and contact your IT department if needed.

> For more details on how to run Docker see the [Docker guide](/docs/guide-docker).

---

## Download the GraphDB distribution

[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)

For licensing reason the GraphDB free edition distribution needs to be [downloaded manually 📥](https://ontotext.com/products/graphdb/ )

* Go to https://ontotext.com/products/graphdb/ and provide informations to get an email with the link to download GraphDB

* Download GraphDB as stand-alone server free version `8.10.1` (zip)

* The `d2s` client will ask you to provide the path to the GraphDB distribution `.zip` file when initializing the workspace.

  * By default the `d2s` client takes the file from your home directory (e.g. `/home/my-user`)

    ```shell
    # Copy the GraphDB distribution file to your home folder
    cp graphdb-free-8.10.1-dist.zip ~/
    ```

---

## Install Rabix Benten for VSCode

![Optional](https://img.shields.io/static/v1?label=module&message=Optional&color=blue)

[Rabix Benten](https://github.com/rabix/benten) is a plugin for completion, error and warning messages for  CWL files in Visual Studio Code.

Install the package using `pipx`:

```shell
pipx install benten --python python3.7
```

And add `CWL (Rabix/Benten)` extension to Visual Studio Code.

## Install Rabix Composer GUI

![Optional](https://img.shields.io/static/v1?label=module&message=Optional&color=blue)

[Rabix Composer](https://rabix.io/) is a nice way to visualize CWL workflows.

[Download](https://github.com/rabix/composer/releases) the right installation file and run it.

> Open the `d2s-cwl-workflows` folder in Rabix Composer.

> Note that Rabix will overwrite how you originally wrote your CWL files, and add `xy` coordinates to steps.

## Try Apache Airflow

[Apache Airflow](https://airflow.apache.org/) allow to run and monitor workflows. It requires to install the `cwl-airflow` package to add CWL compatibility.

[Install Apache Airflow](https://airflow.apache.org/docs/stable/start.html) and the [cwl-airflow](https://cwl-airflow.readthedocs.io/en/latest/readme/run_demo.html) pip package to get started.

```shell
pip install apache-airflow
pip install cwl-airflow --find-links https://michael-kotliar.github.io/cwl-airflow-wheels/
airflow init
cwl-airflow init
```

> `cwl-airflow init` fails: `FileNotFoundError:[Errno 2]No such file or directory:'airflow'`

Start Airflow:

```shell
airflow webserver -p 8080
airflow scheduler
```

Submit a workflow:

```shell
cwl-airflow submit d2s-cwl-workflows/workflows/csv-virtuoso.cwl datasets/cohd/config.yml

# Run demo
cwl-airflow demo --auto
```

> To be tested.

## Try Toil

[Toil](https://toil.readthedocs.io/en/latest/running/cwl.html) is a Python workflow manager which allows to run CWL workflows.

[Install Toil](https://toil.readthedocs.io/en/latest/gettingStarted/quickStart.html#running-a-basic-cwl-workflow) for CWL:

```shell
pipx install toil
```

Run a workflow

```shell
toil-cwl-runner --workdir workspace/output/tmp --outdir workspace/output d2s-cwl-workflows/workflows/csv-virtuoso.cwl datasets/cohd/config.yml
```

> To be tested.