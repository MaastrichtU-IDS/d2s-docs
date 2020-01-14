---
id: cwl-create
title: Create a CWL tool
---

![CWL](/img/CWL_logo.png)

Most Data2Services CWL tools and workflows are used by multiple projects. Most of them are defined in a common repository: [d2s-cwl-workflows](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows). Add this repo as submodule of your repository (which will contain config files for the workflows).

```shell
git submodule add --recursive https://github.com/MaastrichtU-IDS/d2s-cwl-workflows.git
```

You can also define custom CWL tools and workflows in the `/support` folder of your directory.

## Build CWL tools

Use [d2s-bash-download](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/develop/steps/d2s-bash-download.cwl) as example, a simple tool using the d2s-bash-exec docker image to download files from a Shell script retrieved in a input config directory.

## Build CWL workflows

Use [workflow-xml.cwl](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/develop/workflows/workflow-xml.cwl) as example, a workflow to convert XML files to a target RDF Knowledge Graph.

> **TODO**

