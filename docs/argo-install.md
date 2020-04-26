---
id: argo-install
title: Argo installation
sidebar_label: Argo installation
---

## Work in progress

Running services and workflows using Argo on Kubernetes/OpenShift is a work in progress and has not been integrated to the `d2s` tool 🔧

Argo can be used to perform XML conversion. Apache Drill needs to be deployed on Kubernetes to process tabular files.

---

## Install the OpenShift client

[![OpenShift](/img/openshift-logo.png)](https://www.openshift.com/)

[Download the oc client](https://www.okd.io/download.html) to connect to the [DSRI OpenShift cluster](https://app.dsri.unimaas.nl:8443/).

```shell
wget https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz

tar xvf openshift-origin-client-tools*.tar.gz
cd openshift-origin-client*/
sudo mv oc kubectl /usr/local/bin/
```

---

## Install Argo

[![Argo project](/img/argo-logo.png)](https://argoproj.github.io/argo/)

[Argo](https://argoproj.github.io/argo/) allows you to describe and run workflows on [Kubernetes](https://kubernetes.io/) clusters.

Download the [Argo client](https://github.com/argoproj/argo/blob/master/demo.md#1-download-argo) to run workflows on the cluster, from your computer.

### Install on Linux

```shell
curl -sSL -o /usr/local/bin/argo https://github.com/argoproj/argo/releases/download/v2.3.0/argo-linux-amd64
chmod +x /usr/local/bin/argo
```

### Install on MacOS

```shell
brew install argoproj/tap/argo
```

### Install on Windows

Browse [Argo releases](https://github.com/argoproj/argo/releases).

> [Download the latest release executable](https://github.com/argoproj/argo/releases/latest/download/argo-windows-amd64) for Windows.

---

## Install local Kubernetes

### Install kubectl on Ubuntu

```shell
sudo snap install microk8s --classic
sudo snap alias microk8s.kubectl kubectl
mkdir -p ~/.kube
microk8s.kubectl config view --raw > $HOME/.kube/config
```

### Install kubectl on MacOS

Included in [Docker installation](/docs/cwl-install#on-macos-windows).

> Activate it in Docker Preferences > Kubernetes.

---

### Install Dashboard UI

```shell
# Install Kubernetes UI
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta4/aio/deploy/recommended.yml
kubectl apply -f d2s-argo-workflows/roles/dashboard-adminuser.yml
kubectl apply -f d2s-argo-workflows/roles/admin-role-binding.yml
# Get the Token
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')

# Start proxy
kubectl proxy
```

> Then visit: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/.

---

### Install Argo

```shell
kubectl create ns argo
# On argo namespace
kubectl apply -n argo -f https://raw.githubusercontent.com/vemonet/argo/master/manifests/namespace-install.yml

kubectl create rolebinding default-admin --clusterrole=admin --serviceaccount=default:default

# Expose Argo UI
kubectl -n argo port-forward deployment/argo-ui 8002:8001
```

> Argo UI on http://localhost:8002.

---

### Create persistent volume

```shell
# Create volume
kubectl apply -n argo -f d2s-argo-workflows/storage/storage-mac.yml
```

> **TODO:** Not working at the moment.

---

## Uninstall

Clean uninstall before 2.2.

```shell
kubectl get cm workflow-controller-configmap -o yaml -n kube-system --export | kubectl apply -n argo -f -
kubectl delete -n kube-system cm workflow-controller-configmap
kubectl delete -n kube-system deploy workflow-controller argo-ui
kubectl delete -n kube-system sa argo argo-ui
kubectl delete -n kube-system svc argo-ui
```

[![Kubernetes](/img/Kubernetes.png)](https://kubernetes.io/)

[![MapR](/img/mapr_logo.png)](https://mapr.com/)