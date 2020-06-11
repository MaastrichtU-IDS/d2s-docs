---
id: guide-github-actions
title: GitHub Actions workflows
---

[![](https://github.githubassets.com/images/modules/site/features/actions-icon-actions.svg)](https://github.com/features/actions)

This guide aims to give introduce GitHub Actions to define Continous Integration workflows.

## Example of GitHub Actions workflows

You can find here example of GitHub Actions workflows used to build applications or process data

* Docker build and publish
* Convert YARRRML to RML automatically and commit
* 

## Test Action locally using Act

[Act](https://github.com/nektos/act) allows to run GitHub Actions workflows directly on your local machine to test.

Provide a specific image and run a specific job:

```shell
act -P ubuntu-latest=nektos/act-environments-ubuntu:18.04 -j generate-rdf
```

