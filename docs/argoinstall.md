---
id: argoinstall
title: Argo installation
sidebar_label: Argo installation
---

## Install the OpenShift client

The [oc client](https://www.okd.io/download.html) is required to connect to the OpenShift cluster

```shell
wget https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz

tar xvf openshift-origin-client-tools*.tar.gz
cd openshift-origin-client*/
sudo mv oc kubectl /usr/local/bin/
```

## Install [Argo](https://argoproj.github.io/argo/)

The [Argo client](https://github.com/argoproj/argo/blob/master/demo.md#1-download-argo) allows to run workflows on the cluster.