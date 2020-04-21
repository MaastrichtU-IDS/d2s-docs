---
id: d2s-biothings
title: Use BioThings Studio
---

[![BioThings Explorer](/img/biothings-explorer-logo.png)](https://biothings.io/explorer/)

The [BioThings SDK](https://docs.biothings.io/en/latest/) is a [Python package](https://pypi.org/project/biothings/) to build and deploy annotated [Smart APIs](https://smart-api.info/) from flat data files. Multiple BioThings APIs can be built using the BioThings Hub, and exposed using BioThings Web.

BioThings APIs can then be queries by the [BioThings Explorer](https://biothings.io/explorer/).

## Deploy BioThings Studio

[BioThings Studio](https://github.com/biothings/biothings_studio) enables to deploy a Docker container with all dependencies required to build and expose BioThings APIs. See the [BioThings Studio documentation](https://docs.biothings.io/en/latest/doc/studio.html).

```shell
d2s start biothings-studio
```

> Access web UI at http://localhost:8001

> Access BioThings API at http://localhost:8000

Volume shared in `workspace/biothings`.