---
id: create-dataset
title: Create new dataset mappings
---

In this documentation I will use [d2s-project-template](https://github.com/MaastrichtU-IDS/d2s-project-template) as example, but you are encouraged to create a new Git repository [using the template](https://github.com/MaastrichtU-IDS/d2s-project-template/generate).

## Create dataset folder and mapping files

Run this command at the root of your repository to generate the dataset mappings files in the `datasets` folder

```shell
d2s new dataset
```

:::info Provide some dataset metadata

You will be prompted to enter some metadata about the dataset to create.

:::

The dataset readme, mappings, metadata, and download files are created in the `datasets/$dataset_id` folder.

## Check the download script

Check the download script generated in `datasets/$dataset_id/scripts/download.sh` and edit it if needed.

We use bash for it's performance and reliability with large file download. But you are free to use a python script or other documented methods.