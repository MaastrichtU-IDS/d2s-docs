---
id: d2s-biothings
title: Use BioThings Studio
---

The [BioThings SDK](https://docs.biothings.io/en/latest/) is a [Python package](https://pypi.org/project/biothings/) to build and deploy annotated [Smart APIs](https://smart-api.info/) from flat data files. Multiple BioThings APIs can be built using the BioThings Hub, and exposed using BioThings Web.

> See the [BioThings API Specifications](https://biothings.io/specs/).

## Deploy BioThings Studio

[BioThings Studio](https://github.com/biothings/biothings_studio) enables to deploy a Docker container with all dependencies required to build and expose BioThings APIs. See the [BioThings Studio documentation](https://docs.biothings.io/en/latest/doc/studio.html#part-1-single-datasource).

```shell
d2s start biothings-studio
```

> Access BioThings Studio web UI at http://localhost:8880

> Access BioThings API at http://localhost:7080

Volume shared in `workspace/biothings`.

## Use the BioThings SDK

Available on [PyPi](https://pypi.org/project/biothings/). BioThings SDK provides a Python-based toolkit to build  high-performance data APIs (or web services) from a single data source  or multiple data sources. It has the particular focus on building data  APIs for biomedical-related entities, a.k.a "BioThings" (such as genes,  genetic variants, drugs, chemicals, diseases, etc).

```shell
pip install biothings
```

> Documentation about BioThings SDK can be found at http://docs.biothings.io

## Use the BioThings Explorer

BioThings APIs can then be queried by the BioThings Explorer: https://biothings.io/explorer

A SDK is also [available on PyPi](https://pypi.org/project/biothings-explorer/) to use the BioThings Explorer

```shell
pip install biothings-explorer
```

Jupyter Notebooks:

## Expose a new data source

> To be developed.