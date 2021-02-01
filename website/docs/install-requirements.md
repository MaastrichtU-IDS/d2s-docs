---
id: install-requirements
title: Install requirements
---

This page provides help to install requirements for `d2s`:

* Pip to install python packages
* Docker to run services

## Install pipx

If you just want to run `d2s` we recommend you to use [pipx](https://pipxproject.github.io/pipx/) as it install the tool in an isolated environment. It can be compared to `apt`, `brew` or `npx`.

> Consider doing a `pip install --upgrade pip` to update your pip installation.

> Instructions use `pip3` to make sure `pipx` is installed with Python3, but feel free to use your own `pip` installation.

### Install pipx on Ubuntu

```shell
# Install Python3.6 and pip if necessary
sudo apt-get install python3 python3-venv python3-dev python3-distutils
wget https://bootstrap.pypa.io/get-pip.py
sudo python3 get-pip.py
# Install pipx
pip3 install --user pipx
```

### Install pipx on MacOS

Install `python3` and `pip3` if not installed.

```shell
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
pip3 upgrade d2s
```

### Uninstall

```shell
pip3 uninstall d2s
```

If you face issues where `d2s` or `cwl-runner` is already installed, try to make sure it is properly uninstall from `pip`:

```shell
sudo pip uninstall d2s
sudo pip3 uninstall d2s
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

Use the [Docker installer for MacOS](https://download.docker.com/mac/beta/Docker.dmg) (`.dmg` file) to install Docker and `docker-compose`.

> If you have a [DockerHub account](https://hub.docker.com/?overlay=onboarding) you can use the [DockerHub installer](https://hub.docker.com/?overlay=onboarding) instead.

You can change Docker settings by clicking on the Docker icon 🐳 in the top bar, then click **Preferences...**

The volumes `/Users` and `/tmp` should be shared by default. It is recommended to create the `d2s` project folder in a subfolder of `/Users`.

### On Windows

Install the [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/) (now also available for Windows Home)

**Activate Virtualization**: Virtualization and Hyper-V might need to be [activated](https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization). Check in the `Task Manager `, in tab `Performance` if *Virtualization* is `enabled`. 

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

:::tip Check the Docker guide

For more details on how to run Docker see the [Docker guide](/docs/guide-docker).

:::