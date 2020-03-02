---
id: d2s-installation
title: Installation
---

## Install the d2s client

Install the [d2s client](https://pypi.org/project/d2s) and [cwlref-runner](https://pypi.org/project/cwlref-runner/) with [pipx](https://pipxproject.github.io/pipx/):

```shell
pipx install d2s cwlref-runner
```

> We recommend to use [pipx](https://pipxproject.github.io/pipx/) if you just want to execute `d2s`. You can also install with [pip](https://pypi.org/project/pip/) or pip3 depending on your preferences.

Requirements:

* [Python 3.6](https://d2s.semanticscience.org/docs/d2s-installation#install-pip)
* [docker-compose](https://docs.docker.com/compose/install/)
* git, curl, time (bash)

> See [below](/docs/d2s-installation#install-pipx) for more instructions about [pipx](https://pipxproject.github.io/pipx/) and docker installation.

### Enable autocompletion

Enabling commandline autocompletion in the terminal is crucial to have the best experience using the `d2s` client. 

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

> **To be tested.**

### Try the client

```shell
d2s
```

> You need to open a new terminal for the autocomplete to be activated.

> Use `Tab` after a `d2s` command in the terminal to see all the available options (it will adapt to the command and dynamically retrieve your datasets and workflows!).

---

## Download the GraphDB distribution

[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)

For licensing reason the GraphDB free edition distribution needs to be downloaded manually 📥

* Go to https://ontotext.com/products/graphdb/ and provide informations to get an email with the link to download GraphDB

* Download GraphDB as stand-alone server free version `8.10.1` (zip)

* The `d2s` client will ask you to provide the path to the GraphDB distribution `.zip` file when initializing the workspace.

  * By default the `d2s` client takes the file from your home directory (e.g. `/home/my-user`)

    ```shell
    # Copy the GraphDB distribution file to your home folder
    cp graphdb-free-8.10.1-dist.zip ~/
    ```

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

We do not recommend running `d2s` on Windows, nevertheless if you want to try: install [Python 3.7](https://www.python.org/ftp/python/3.7.5/python-3.7.5-amd64.exe) and see [CWL Windows documentation](https://github.com/common-workflow-language/cwltool/blob/master/windowsdoc.md). More details in the [Windows guide page](/docs/guide-windows).

```shell
pip install pipx
pipx install cwlref-runner
pipx ensurepath
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

### Upgrade d2s version

Upgrade [d2s](https://pypi.org/project/d2s/) to the latest release:

```shell
pipx install --upgrade d2s
```

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
nano /etc/resolv.conf
	> nameserver 8.8.8.8
```

> For issues related to Docker on Windows, see the [Windows guide](/docs/guide-windows) page.

> For more details on how to run Docker see the [Docker guide](/docs/guide-docker).

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
cwl-airflow submit $workflow $params

# Run demo
cwl-airflow demo --auto
```