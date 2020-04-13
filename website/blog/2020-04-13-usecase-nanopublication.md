---
title: Publish Nanopublications
author: Vincent Emonet
authorURL: https://vemonet.github.io/
---


Publish [Nanopublications](http://nanopub.org/) using [Nanobench](https://github.com/peta-pico/nanobench).

<!--truncate-->

## Install the d2s tool

See the [complete installation documentation](https://d2s.semanticscience.org/docs/d2s-installation) to install pip, [pipx](https://pipxproject.github.io/pipx/) and Docker using [Chocolatey](https://chocolatey.org/). 

Then  install the [d2s tool](https://pypi.org/project/d2s/) using pipx or pip:

```shell
pipx install d2s cwlref-runner
d2s init my-project-folder
```

> We recommend using [pipx](https://pipxproject.github.io/pipx/), but you can use `pip` or `pip3` depending on your preferences.

You will not need the GraphDB installation file for this tutorial. So you can leave it blank when asked.

## Start Nanobench

We will use the [Nanobench](https://github.com/peta-pico/nanobench) web service to publish [Nanopublications](http://nanopub.org/).

```shell
d2s start nanobench
```

> Access on http://localhost:37373

> See [official documentation for Docker](https://github.com/peta-pico/nanobench/blob/master/INSTALL-with-Docker.md).

## Complete your profile

Follow the instructions provided by the [locally deployed Nanobench web UI](http://localhost:37373/) to complete your profile, and publish your first nanopublication:

* Provide your [ORCID](https://orcid.org) identifier. If you don't have one you can create an account at https://orcid.org.

* You will then be prompted to create you `Keys for Digital Signatures`. Those keys are stored in `workspace/.nanopub/id_rsa`
* To finish, [link your ORCID account](http://localhost:37373/orcidlinking) to prove you are the rightful owner (follow the [Nanobench web UI instructions](http://localhost:37373/orcidlinking))
  * Keep the URL generated for your first nanopublication. It should starts with `http://purl.org/np/`

## Publish your first nanopublications

Follow the tutorial from the [locally deployed Nanobench web UI](http://localhost:37373/) to publish your first nanopublications to the Maastricht University Institute of Data Science and and the official Nanopub servers! 

Feel free to publish new nanopublications anytime you want 📢