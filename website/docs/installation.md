---
id: installation
title: Installation
---

## Install the d2s client

Install the [d2s client](https://pypi.org/project/d2s) with [pip](https://pypi.org/project/pip/) on Linux, MacOS and Windows:

```shell
pip3 install git+https://github.com/MaastrichtU-IDS/d2s-cli.git@develop
```

:::tip Use your favorite pip tool

We recommend to use [pipx](https://pipxproject.github.io/pipx/) if you just want to execute `d2s`. You can also install with [pip](https://pypi.org/project/pip/) or pip3 depending on your system preferences.

:::

Requirements (see below for installation instructions):

* [Python 3.6+](https://d2s.semanticscience.org/docs/d2s-installation#install-pip) and pip
* [Docker-compose](https://docs.docker.com/compose/install/)
* Git (download [Git for Windows](https://git-scm.com/download/win))

:::note Additional documentation 

See the [**Install requirements** page](/docs/install-requirements) for additional documentation to install requirements.

:::

## Enable autocompletion

![Optional](https://img.shields.io/static/v1?label=module&message=Optional&color=blue)

Enabling commandline autocompletion in the terminal provides a better experience using the `d2s` client. 

**ZSH**: add the import autocomplete line to the `~/.zshrc` file. Then restart the terminal.

```bash
echo 'eval "$(_D2S_COMPLETE=source_zsh d2s)"' >> ~/.zshrc
```

:::info Use ZSH by default

Set your terminal to use [ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH) by default:

```shell
chsh -s /bin/zsh
```

:::

:::tip Custom theme

An [oh-my-zsh](https://ohmyz.sh/) theme can be easily chosen for a personalized experience. See the [zsh-theme-biradate](https://github.com/vemonet/zsh-theme-biradate) to easily install a simple theme and configure your terminal in a few minutes.

:::

:::note To be tested

**Bash**: add the import autocomplete line to the `~/.bashrc` file.

```bash
echo 'eval "$(_D2S_COMPLETE=source d2s)"' >> ~/.bashrc
```

:::

## Try the client

```shell
d2s
```

:::tip Autocomplete

Use `Tab` after a `d2s` command in the terminal to see all the available options (it will adapt to the command and dynamically retrieve your datasets and workflows!).

:::

## Initialize a project folder

`d2s` can be used to create datasets mappings in any project folder.

But we also provide a command to help you getting started by generating all required files in your project folder (readme, license. gitignore, etc).

This command will initialize the current folder with all necessary files to start converting datasets:

```bash
d2s init
```

:::info Use Git

We automatically initialize this repository with `git init`. We recommend you to keep track of changes with `git` and publish this repository to a remove repository. 

:::

