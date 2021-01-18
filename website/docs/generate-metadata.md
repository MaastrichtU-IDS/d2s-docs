---
id: generate-metadata
title: Generate metadata
---

After the RDF Knowledge Graph has been generated and loaded in a triplestore, [HCLS dataset descriptive statistics](https://www.w3.org/TR/hcls-dataset/) can be easily generated and published for the published dataset using the `d2s` library. 

## Analyze a SPARQL endpoint

Generate descriptive [HCLS metadata](https://www.w3.org/TR/hcls-dataset/) to analyze entities and the relations between them in a SPARQL endpoint:

```
d2s metadata analyze https://graphdb.dumontierlab.com/repositories/d2s-projects -o metadata.ttl
```

## Create dataset metadata description

Create complete metadata description for your dataset, you will be  asked a few questions (such as homepage, license and reference for this  dataset)

```
d2s metadata create -o dataset_metadata.ttl
```

:::caution Automate the process
Fyi: currently creating a dataset using `d2s generate dataset` uses a slightly different mechanism to generate the metadata.
:::

:::tip Automate the process

Automate the metadata generation by adding it to your GitHub Action workflow. And upload it to your triplestore.

:::