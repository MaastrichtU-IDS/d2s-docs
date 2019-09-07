---
id: argorun
title: Run Argo workflows
---

As example we will use config files from [data2services-transform-biolink](https://github.com/MaastrichtU-IDS/data2services-transform-biolink).

## Clone the repository

```bash
git clone --recursive https://github.com/MaastrichtU-IDS/data2services-transform-biolink.git
cd data2services-transform-biolink
```

---

## Workflow to convert XML to RDF

### Steps-based workflow

```bash
argo submit data2services-argo-workflows/d2s-workflow-transform-xml.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

### DAG workflow

```bash
argo submit data2services-argo-workflows/d2s-workflow-transform-xml-dag.yaml \
  -f support/config/config-transform-xml-drugbank.yml
```

---

## Workflow to convert CSV to RDF

### Steps-based workflow

```bash
argo submit data2services-argo-workflows/d2s-workflow-transform-csv.yaml \
  -f support/config/config-transform-csv-stitch.yml
```

### DAG workflow

```bash
argo submit data2services-argo-workflows/d2s-workflow-transform-csv-dag.yaml \
  -f support/config/config-transform-csv-stitch.yml
```



*Reminder:* you need first to authenticate to the [OpenShift cluster](https://app.dsri.unimaas.nl:8443/) using `oc login` .