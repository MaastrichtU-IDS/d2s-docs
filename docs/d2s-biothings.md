---
id: d2s-biothings
title: Use BioThings Studio
---

The [BioThings SDK](https://docs.biothings.io/en/latest/) is a [Python package](https://pypi.org/project/biothings/) to build and deploy annotated Smart APIs from flat data files.

## Deploy BioThings Studio

[BioThings Studio](https://github.com/biothings/biothings_studio) enables to deploy a Docker container with all dependencies required to build BioThings APIs. See the [BioThings Studio documentation](https://docs.biothings.io/en/latest/doc/studio.html).

```shell
d2s start biothings-studio
```

> Access web UI at http://localhost:8001

> Access BioThings API at http://localhost:8000

Or run it directly using Docker:

```shell
docker run --rm -it -p 8888:8888 -v $(pwd)/notebooks:/notebooks -e GIT_URL="https://github.com/MaastrichtU-IDS/covid-kg-notebooks" -e PASSWORD="<your_secret>" umids/jupyterlab:latest
```

