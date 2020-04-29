---
id: d2s-biothings
title: Use BioThings Studio
---

[![BioThings Explorer](/img/biothings-explorer-logo.png)](https://biothings.io/explorer/)

The [BioThings SDK](https://docs.biothings.io/en/latest/) is a [Python package](https://pypi.org/project/biothings/) to build and deploy annotated [Smart APIs](https://smart-api.info/) from flat data files. Multiple BioThings APIs can be built using the BioThings Hub, and exposed using BioThings Web.

BioThings APIs can then be queries by the [BioThings Explorer](https://biothings.io/explorer/). See the [BioThings API Specifications](https://biothings.io/specs/).

## Deploy BioThings Studio

[BioThings Studio](https://github.com/biothings/biothings_studio) enables to deploy a Docker container with all dependencies required to build and expose BioThings APIs. See the [BioThings Studio documentation](https://docs.biothings.io/en/latest/doc/studio.html#part-1-single-datasource).

```shell
d2s start biothings-studio
```

> Access BioThings Studio web UI at http://localhost:8880

> Access BioThings API at http://localhost:7080

Volume shared in `workspace/biothings`.

## Expose a new data source

> To be developed.