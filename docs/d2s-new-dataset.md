---
id: d2s-new-dataset
title: Add a new dataset
---

In this documentation I will use [d2s-transform-template](https://github.com/MaastrichtU-IDS/d2s-transform-template) as example, but you are encouraged to create a new Git repository [using the template](https://github.com/MaastrichtU-IDS/d2s-transform-template/generate).

## Generate the new dataset

The files required to transform the dataset will be generated in `datasets/$dataset_id`

```shell
d2s generate dataset
```

> You will be prompted to enter some metadata about the dataset to create.

The dataset mappings, metadata, notebook and download files are created in the `dataset/$dataset_id` folder.

The dataset folder is generated based on [this template folder](https://github.com/MaastrichtU-IDS/d2s-core/tree/master/support/template/dataset). Example mapping files are provided for DrugBank XML data and Columbia Open Health clinical Data TSV data.

> [Let us know](/help) if those examples are helpful, or if they would need to be more explicit.

### Describe the dataset metadata

You are encouraged to improve the metadata description of your dataset by editing the 2 metadata files generated in `datasets/$dataset_id/metadata`.

A dozen of metadata are defined using a SPARQL query for the summary of the dataset, and for each distribution.

* SPARQL insert dataset [summary metadata](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/support/template/dataset/metadata/metadata-template-0-summary.rq) (once by dataset).
* SPARQL insert dataset [distribution metadata](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/support/template/dataset/metadata/metadata-template-1.rq) (for each new version).

> Change the URIs between `<>` and strings between `""`.

> We recommend using `Stardog RDF Grammars` extension in Visual Studio Code to edit SPARQL queries (`.rq` files).

### Add files to download

You can define the files to download using:

* a [Bash file](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/datasets/cohd/download/download.sh)
  * In `datasets/$dataset_id/download/download.sh`
  * Download with `d2s download $dataset_id`
* a [Jupyter Notebook](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/datasets/cohd/process-cohd.ipynb)
  * In `datasets/$dataset_id/process-dataset_id.ipynb`

The files will be downloaded in `workspace/input/$dataset_id`.

A [template](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/support/template/dataset/download/download_examples.sh) is provided with examples to download, unzip or add column labels provided.

> `d2s` extract data from csv/tsv files based on their column label. If your tabular doesn't have column you can add them at the end of the [download.sh](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/support/template/dataset/download/download_examples.sh) file by using the `sed` command.

---

## Integrate data

Multiple solutions are available to integrate data in a standard Knowledge Graph:

* [RML mappings](/docs/d2s-rml) (RDF Mapping Language)
* [CWL workflows](https://d2s.semanticscience.org/docs/d2s-run) defined to convert structured files to RDF using SPARQL queries
* [BioThings Studio](/docs/d2s-biothings) to build BioThings APIs (exposed to the Translator using the ReasonerStd API)
* [DOCKET](/docs/services-utilities#docket-multiomics-data-provider) to integrate omics data
* Python scripts and notebooks
  * [Dipper ETL](/docs/d2s-dipper)
* Define new CWL workflows to build and share your data transformation pipelines
  * See the [CWL workflows defined for d2s](https://github.com/MaastrichtU-IDS/d2s-core/tree/master/cwl).