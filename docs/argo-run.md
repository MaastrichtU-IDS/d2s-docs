---
id: argo-run
title: Run Argo workflows
---

[![BioLink model](/data2services/img/biolink-logo.png)](https://github.com/MaastrichtU-IDS/data2services-transform-biolink)

We will use [examples](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/tree/master/support/config) from the [**data2services-transform-biolink**](https://github.com/MaastrichtU-IDS/data2services-transform-biolink) project.

## Clone the repository

```shell
git clone --recursive https://github.com/MaastrichtU-IDS/data2services-transform-biolink.git
cd data2services-transform-biolink
```

---

## Workflow to convert XML to RDF

### Steps-based workflow

```shell
argo submit data2services-argo-workflows/d2s-workflow-transform-xml.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

> *Reminder:* you need first to authenticate to the [OpenShift cluster](https://app.dsri.unimaas.nl:8443/) using `oc login` .

### DAG workflow

```shell
argo submit data2services-argo-workflows/d2s-workflow-transform-xml-dag.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

---

## Workflow to convert CSV to RDF

### Steps-based workflow

```shell
argo submit data2services-argo-workflows/d2s-workflow-transform-csv.yaml \
  -f support/config/config-transform-csv-stitch.yml
```

### DAG workflow

```shell
argo submit data2services-argo-workflows/d2s-workflow-transform-csv-dag.yaml \
  -f support/config/config-transform-csv-stitch.yml
```

![Argo project](/data2services/img/argo-logo.png)