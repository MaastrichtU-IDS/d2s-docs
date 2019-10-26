---
id: argo-run
title: Run Argo workflows
---

[![BioLink model](/img/biolink-logo.png)](https://github.com/MaastrichtU-IDS/d2s-transform-template)

We will use [examples](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/support/config) from the [**d2s-transform-template**](https://github.com/MaastrichtU-IDS/d2s-transform-template) project.

## Clone the repository

```shell
git clone --recursive https://github.com/MaastrichtU-IDS/d2s-transform-template.git
cd d2s-transform-template
```

---

## Workflow to convert XML to RDF

### Steps-based workflow

```shell
argo submit d2s-argo-workflows/d2s-workflow-xml.yaml -f datasets/drugbank/config-argo-xml-drugbank.yml
```

> *Reminder:* you need first to authenticate to the [OpenShift cluster](https://app.dsri.unimaas.nl:8443/) using `oc login` .

### DAG workflow

```shell
argo submit d2s-argo-workflows/d2s-workflow-transform-xml-dag.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

---

## Workflow to convert CSV to RDF

### Steps-based workflow

```shell
argo submit d2s-argo-workflows/d2s-workflow-transform-csv.yaml \
  -f support/config/config-transform-csv-stitch.yml
```

### DAG workflow

```shell
argo submit d2s-argo-workflows/d2s-workflow-transform-csv-dag.yaml \
  -f support/config/config-transform-csv-stitch.yml
```

![Argo project](/img/argo-logo.png)