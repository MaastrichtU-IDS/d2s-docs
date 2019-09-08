---
id: start-process-overview
title: Overview of the data integration process
---


Integrating data has never been effortless, this framework aims to make it easier by bringing together commonly accepted standards and modern scalable technologies.

Here is described everything you will need to do, in practice, to build a Knowledge Graph out of your data.

---

## Choose a data model

**Choose** or build **a common data model** (ontology) to represent your data *(10' to 10 weeks)*

* Try to reuse existing ontologies and concepts as much as possible.
* Combine concepts from different ontologies, or define new ones.

> Search for relevant existing models in ontology repositories, such as [BioPortal](https://bioportal.bioontology.org/recommender) for biomedical concepts or [AgroPortal](http://agroportal.lirmm.fr/recommender) for agronomy.

---

## Define download script

Setup the source data to **download using Bash scripts** via [data2services-download](https://github.com/MaastrichtU-IDS/data2services-download) *(~10')*

> Most of the time, if the data is properly distributed, it should consist in a simple `wget -N` 

> We provide [a template](https://github.com/MaastrichtU-IDS/data2services-download/blob/master/datasets/TEMPLATE/download.sh) for common operations, such as extracting URLs from an HTML file, recursive download, uncompressing files, adding missing columns headers to tabular files...

---

## Automatically convert source to generic RDF

**Automatically convert** source data to [**generic RDF**](https://raw.githubusercontent.com/MaastrichtU-IDS/data2services-transform-biolink/master/output/stitch-sample/rdf_output.nq) (usually using [xml2rdf](https://github.com/MaastrichtU-IDS/xml2rdf) or [AutoR2RML](https://github.com/MaastrichtU-IDS/AutoR2RML)) *(~10')*

> Template SPARQL mapping queries are generated to help the users to start define the mappings

---

## Define metadata

Define the dataset **metadata** *(~10')*

* The [summary metadata](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/drugbank/metadata/1/metadata-drugbank-summary.rq) needs to be defined once for each dataset *(~10 fields to fill)*
* The [distribution metadata](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/drugbank/metadata/1/metadata-drugbank-1.rq) needs to be defined for each new version *(~6 fields to fill)*

> Some metadata from the summary is retrieved for the distribution

> Much metadata fields don't need changes between versions

---

## Define mappings

Define SPARQL mapping queries to **transform the generic RDF to the target data model** 

*(~20' for a tabular file, can be hours for a complex XML file)*

* Start from the previously generated templates if you don't have mappings for this kind of data.
* See examples to map [tabular files](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/stitch/transform/1/insert-stitch.rq) or [XML files](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/tree/master/mapping/drugbank/transform/1).
* Be careful when iterating on multiple result arrays in SPARQL, it can blow up the processing time(for XML mapping). Always split your queries to never iterate over more than one array for a parent node.
  * E.g. if `drug:001` from a XML file has multiple `publications` and multiple `synonyms` nodes in its child, then it is preferable to get them in 2 different queries. Retrieving the 2 arrays in a single query would results in the returned row count be a cartesian product of the 2 arrays, which grows exponentially with the size of each array.
  * Final semantic results are the same, but the performance of the transformation is highly impacted.

>  Defining the mappings is the hardest and most cumbersome task in data integration. We are working actively on making it easier, by working on mapping automations and GUIs. 

---

## Run the workflow

Now the mappings have been designed you are done, and just need to start your triplestore if it is not already running, and **run the transformation** using a workflow orchestration tool (such as [Argo](https://argoproj.github.io/argo/) or [CWL](https://www.commonwl.org/)).

> Define the **workflow YAML configuration file**: triplestore URL and credentials, path to mapping files, path to download script, URI of the final graph *(~10')*

---

## Project structure

We recommend you to reproduce the directory structure used in [data2services-transform-biolink](https://github.com/MaastrichtU-IDS/data2services-transform-biolink).

Example of directory structure for the `drugbank` dataset:

```bash
root-directory
├── LICENSE
├── README.md
├── data2services-argo-workflows (submodule)
├── data2services-cwl-workflows (submodule)
├── input
│   ├── download_failed.log
│   └── drugbank
│       ├── download.log
│       └── drugbank.xml
├── mapping
│    └── drugbank
│       ├── transform
│       │   └── 1
│       │       ├── drugbank-drugbank_id.rq
│       │       └── drugbank-snp_effects.rq
│       └── metadata
│           ├── metadata-drugbank-summary.rq
│           └── 1
│               └── metadata-drugbank-1.rq
├── output
│    └── drugbank
│       ├── rdf_output.nq
│       ├── xml2rdf_file_structure.txt
│       ├── rdf-upload.txt
│       └── execute-sparql-query-logs.txt
└── support
    ├── cwl-custom-workflows
    ├── cwl-custom-steps
    └── config
        ├── config-transform-xml-drugbank.yml
        └── config-transform-csv-stitch.yml
```

> TODO: change the structure to include download script (or in `input`?). We don't want the files in the git repository
