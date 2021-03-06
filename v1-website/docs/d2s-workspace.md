---
id: d2s-workspace
title: Initialize and update
---

## Initialize the project

Ideally you should **create a new repository from the template [d2s-project-template](https://github.com/MaastrichtU-IDS/d2s-project-template) repository**, and provide this repository URL when asked by `d2s init`.

In this example I will directly use the default [d2s-project-template](https://github.com/MaastrichtU-IDS/d2s-project-template) repository, feel free to do the same to start.

For licensing reason the GraphDB triplestore free edition needs to be [downloaded manually](https://ontotext.com/products/graphdb/ ). Download the `.zip` standalone distribution version `9.1.1` before `d2s init`

Now initialize your project 🎬

```shell
d2s init my-project-folder-name
```

> Follow the instructions to initialize your project.

> Your project settings are stored in `.d2sconfig`

> All `d2s` commands are designed to be run from this directory.

---

## Change directory

All `d2s` commands are designed to be **run from the project root folder**. Once your project initiated, change directory to go in your project folder (where the git repository has been cloned)

```shell
cd my-project-folder-name
```

---

## Pull Docker images

Docker images should be pulled when starting the services. You can pull and build all updated Docker images used by `d2s`:

```shell
d2s update --images
```

Update a single service:

```shell
d2s update --images <my_service>
```

---

## Update folders permissions

You might encounter issues with folder permissions, e.g. [RMLStreamer](/docs/services-utilities#rmlstreamer) not able to write to output. You can update the permissions of `workspace/import` and `workspace/tmp-virtuoso` to make them writable:

```shell
d2s update --permissions
```

## Update d2s-core submodule

The d2s-core submodule, containing Docker deployments and workflows definitions, can be updated using:

```shell
d2s update --submodules
```

