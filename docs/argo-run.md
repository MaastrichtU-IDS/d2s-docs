---
id: argo-run
title: Run Argo workflows
---

[![Argo project](/img/argo-logo.png)](https://argoproj.github.io/argo)

We will use [examples](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/datasets/drugbank) from the [**d2s-transform-template**](https://github.com/MaastrichtU-IDS/d2s-transform-template) project.

## Clone the repository

```shell
git clone --recursive https://github.com/MaastrichtU-IDS/d2s-transform-template.git
cd d2s-transform-template
```

---

## Start Virtuoso pod

```shell
kubectl run dh-vos7 --image=openlink/virtuoso-opensource-7 --port=8890
kubectl expose deployment dh-vos7 --port=8890 --target-port=8890  --name=dh-vos7
# --type=LoadBalancer

kubectl describe services dh-vos

kubectl delete deployments.apps dh-vos7
```

> **TODO:** expose it

---

## Workflow to convert XML to RDF

### Steps-based workflow

```shell
argo submit d2s-argo-workflows/workflows/d2s-workflow-xml.yaml -f datasets/drugbank/config-argo-xml-drugbank.yml
```

> *Reminder:* you need first to authenticate to the [OpenShift cluster](https://app.dsri.unimaas.nl:8443/) using `oc login` .

### DAG workflow

```shell
argo submit d2s-argo-workflows/workflows/d2s-workflow-transform-xml-dag.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

---

## Workflow to convert CSV to RDF

### Steps-based workflow

```shell
argo submit d2s-argo-workflows/workflows/d2s-workflow-transform-csv.yaml \
  -f support/config/config-transform-csv-stitch.yml
```

### DAG workflow

```shell
argo submit d2s-argo-workflows/workflows/d2s-workflow-transform-csv-dag.yaml \
  -f support/config/config-transform-csv-stitch.yml
```

