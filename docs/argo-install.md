---
id: argo-install
title: Argo installation
sidebar_label: Argo installation
---

<a href="#backers" alt="sponsors on Open Collective"><img src="https://opencollective.com/Docusaurus/backers/badge.svg" /></a>



## Install the OpenShift client

[![OpenShift](/data2services/img/ophenshift-logo.png)](https://www.openshift.com/)

[Download the oc client](https://www.okd.io/download.html) to connect to the [DSRI OpenShift cluster](https://app.dsri.unimaas.nl:8443/).

```bash
wget https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz

tar xvf openshift-origin-client-tools*.tar.gz
cd openshift-origin-client*/
sudo mv oc kubectl /usr/local/bin/
```

---

## Install Argo

[![Argo project](/data2services/img/argo-logo.png)](https://argoproj.github.io/argo/)

[Argo](https://argoproj.github.io/argo/) allows you to describe and run workflows on [Kubernetes](https://kubernetes.io/) clusters.

Download the [Argo client](https://github.com/argoproj/argo/blob/master/demo.md#1-download-argo) to run workflows on the cluster, from your computer.

### Install on Linux

```bash
curl -sSL -o /usr/local/bin/argo https://github.com/argoproj/argo/releases/download/v2.3.0/argo-linux-amd64
chmod +x /usr/local/bin/argo
```

### Install on MacOS

```bash
brew install argoproj/tap/argo
```

### Install on Windows

Browse [Argo releases](https://github.com/argoproj/argo/releases).

> [Download the latest release executable](https://github.com/argoproj/argo/releases/latest/download/argo-windows-amd64) for Windows.

  <!-- MapR            |  Kubernetes 
:-------------------------:|:-------------------------:
[![MapR](/data2services/img/mapr_logo.png)](https://mapr.com/) | [![Kubernetes](/data2services/img/Kubernetes.png)](https://kubernetes.io/) -->

<p align="center">
  <a href="#backers" alt="sponsors on Open Collective"><img src="https://opencollective.com/Docusaurus/backers/badge.svg" /></a>
  <a href="#sponsors" alt="Sponsors on Open Collective"><img src="https://opencollective.com/Docusaurus/sponsors/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/docusaurus"><img src="https://img.shields.io/npm/v/docusaurus.svg?style=flat" alt="npm version"></a>
  <a href="https://circleci.com/gh/facebook/docusaurus"><img src="https://img.shields.io/circleci/build/github/facebook/docusaurus.svg" alt="CircleCI status"></a>
  <a href="https://discord.gg/docusaurus"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg" alt="Chat"></a>
  <a href="https://github.com/prettier/prettier"><img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg"></a>
  <a href="https://github.com/facebook/jest"><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="Tested with Jest"></a>
  <a href="https://app.netlify.com/sites/docusaurus-preview/deploys"><img src="https://api.netlify.com/api/v1/badges/57ebb454-c937-4c1d-a228-d9dccb494f49/deploy-status" alt="Netlify Status"></a>
</p>

[![Kubernetes](/data2services/img/Kubernetes.png)](https://kubernetes.io/)

[![MapR](/data2services/img/mapr_logo.png)](https://mapr.com/)