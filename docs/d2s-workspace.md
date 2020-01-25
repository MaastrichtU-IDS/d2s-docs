---
id: d2s-workspace
title: Initialize workspace
---

## Initialize the project

Ideally you should **create a new repository from the template [d2s-transform-template](https://github.com/MaastrichtU-IDS/d2s-transform-template) repository**, and provide this repository when asked by `d2s init`.

In this example I will directly use the default [d2s-transform-template](https://github.com/MaastrichtU-IDS/d2s-transform-template) repository.

Create the directory you want to use

```shell
mkdir my-workflow-project
cd my-workflow-project
```

> All `d2s` commands are designed to be run from this directory.

For licensing reason GraphDB free edition needs to be [downloaded manually](https://ontotext.com/products/graphdb/ ). Download the `.zip` standalone distribution version `8.10.1` before `d2s init`

Now initialize your project and workspace

```shell
d2s init
```

> Follow the instructions to initialize your project.

> Your project settings are stored in `.d2sconfig`

---

## Pull Docker images

Now that the `d2s` project is set, we need to update the Docker images used by the workflow (pull and build).

```shell
d2s update
```
