---
id: cwl-create
title: Create a CWL tool
---

![CWL](/img/CWL_logo.png)

Most Data2Services CWL tools and workflows are used by multiple projects. Most of them are defined in a common repository: [d2s-core](https://github.com/MaastrichtU-IDS/d2s-core). Add this repo as submodule of your repository (which will contain config files for the workflows).

```shell
git submodule add --recursive https://github.com/MaastrichtU-IDS/d2s-core.git
```

You can also define custom CWL tools and workflows in the `/support` folder of your directory.

## Build CWL tools

See [d2s-sparql-operations](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/cwl/steps/execute-sparql-queries.cwl) as example, a simple tool using the d2s-sparqloperations docker image to dexecute SPARQL queries to a SPARQL endpoint.

## Build CWL workflows

Use [csv-virtuoso.cwl](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/cwl/workflows/csv-virtuoso.cwl) as example, a workflow to convert XML files to a target RDF Knowledge Graph.

> **TODO**

