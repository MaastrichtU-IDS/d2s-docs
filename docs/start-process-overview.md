---
id: start-process-overview
title: Overview of the data integration process
---


Integrating data has never been effortless, this framework aims to make it easier by bringing together commonly accepted standards and modern scalable technologies.

Here is described everything you will need to do, in practice, to build a Knowledge Graph out of your data.

---

## Choose a data model

**Choose** or build **a common data model** ([ontology](https://www.w3.org/standards/semanticweb/ontology)) to represent your data *(10' to 10 weeks)*

* Try to reuse existing ontologies and concepts as much as possible.
* Combine concepts from different ontologies, or define new ones.

> Search for relevant existing models in ontology repositories, such as [BioPortal](https://bioportal.bioontology.org/recommender) for biomedical concepts or [AgroPortal](http://agroportal.lirmm.fr/recommender) for agronomy.

> You can use the [Protégé ontology editor](https://protege.stanford.edu/) to build your ontology.

> This task only needs to be **done once**, when starting to project. To define the data model the integrated datasets will comply to.

---

## Write the download script

Setup the source data to **download using Bash scripts** via [data2services-download](https://github.com/MaastrichtU-IDS/data2services-download) *(~10')*

> Most of the time, if the data is properly distributed, it should consist in a simple `wget -N` 

> We provide [a template](https://github.com/MaastrichtU-IDS/data2services-download/blob/master/datasets/TEMPLATE/download.sh) for common operations, such as extracting URLs from an HTML file, recursive download, uncompressing files, adding missing columns headers to tabular files...

---

## Automatically convert source data to generic RDF

Run [xml2rdf](https://github.com/MaastrichtU-IDS/xml2rdf) or [AutoR2RML](https://github.com/MaastrichtU-IDS/AutoR2RML) (tabular files, RDB) to **Automatically convert** source data to [**generic RDF**](https://raw.githubusercontent.com/MaastrichtU-IDS/data2services-transform-biolink/master/output/stitch-sample/rdf_output.nq) *(~10')*

> Template SPARQL mapping queries are generated to help the users to start define the mappings

---

## Define the dataset metadata

Define the dataset [**HCLS metadata**](https://www.w3.org/TR/hcls-dataset/) *(~10')*

* [Summary metadata](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/drugbank/metadata/1/metadata-drugbank-summary.rq) need to be defined once for each dataset *(~10 fields to fill)*
* [Distribution metadata](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/drugbank/metadata/1/metadata-drugbank-1.rq) need to be defined for each new version *(~6 fields to fill)*

> Some metadata from the summary is retrieved for the distribution

> Much metadata fields don't need changes between versions

---

## Define the mappings

Define [SPARQL](https://www.w3.org/TR/sparql11-query/) mapping queries to **transform the generic RDF to the target data model** 

*(~20' for a tabular file, can be hours for a complex XML file)*

* Start from the previously generated templates if you don't have mappings for this kind of data.
* See examples to map [tabular files](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/stitch/transform/1/insert-stitch.rq) or [XML files](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/tree/master/mapping/drugbank/transform/1).
* Be careful when iterating on multiple result arrays in SPARQL, it can blow up the processing time(for XML mapping). Always split your queries to never iterate over more than one array for a parent node.
  * E.g. if `drug:001` from a XML file has multiple `publications` and multiple `synonyms` nodes in its child, then it is preferable to get them in 2 different queries. Retrieving the 2 arrays in a single query would results in the returned row count be a cartesian product of the 2 arrays, which grows exponentially with the size of each array.
  * Final semantic results are the same, but the performance of the transformation is highly impacted.

>  Defining the mappings is the hardest and most cumbersome task in data integration. We are working actively on making it easier, by working on mapping automations and GUIs. 

---

## Run the workflow

Now that the mappings have been designed you are almost done.

* **Start your triplestore** (database for RDF Knowledge Graph), if it is not already running
* **Run the transformation**, using a workflow orchestration tool (such as [Argo](https://argoproj.github.io/argo/) or [CWL](https://www.commonwl.org/)).

> Define the **workflow YAML configuration file**: triplestore URL and credentials, path to mapping files, path to download script, URI of the final graph *(~10')*

---

## Project structure

We recommend you to reproduce the directory structure used in [data2services-transform-biolink](https://github.com/MaastrichtU-IDS/data2services-transform-biolink).

Example of directory structure for the `drugbank` dataset:

Structure of the [configuration repository](https://github.com/MaastrichtU-IDS/data2services-transform-biolink).

```bash
root-directory
├── LICENSE
├── README.md
├── data2services-argo-workflows (submodule)
├── data2services-cwl-workflows (submodule)
├── datasets
│   └── drugbank
│       ├── README.md
│       ├── config-transform-xml-drugbank.yml	# The workflow config file
│       ├── download
│       │   └── download-drugbank.sh						# Download script goes here
│       ├── mappings
│       │   └── 1								# SPARQL mapping queries goes here 
│       │       ├── drugbank-drugbank_id.rq
│       │       └── drugbank-snp_effects.rq
│       └── metadata							# SPARQL metadata queries goes here 
│           ├── 1
│           │   ├── metadata-drugbank-summary.rq
│           │   └── metadata-drugbank-1.rq
│           └── 2
│               └── metadata-drugbank-2.rq
└── support
    ├── cwl-custom-workflows
    └── cwl-custom-steps
```

Structure of the workflow working directory:

```bash
root-directory
├── input			# Downloaded file to process
├── output			# Every file generated by the workflow
└── support			# Config and mapping files to run the workflow
    ├── download
    ├── mappings
    └── metadata
```

