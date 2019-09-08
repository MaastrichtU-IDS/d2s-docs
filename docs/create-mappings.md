---
id: create-mappings
title: Define the mappings
---

[![SPARQL](/data2services/img/sparql_logo.png)](https://www.w3.org/TR/sparql11-overview/)

We use SPARQL to:
* Map the generic RDF, generated from your input data structure, to a target RDF.
* Insert metadata about the dataset in the Knowledge Graph

We recommend you to reproduce the directory structure used in [data2services-transform-biolink](https://github.com/MaastrichtU-IDS/data2services-transform-biolink).

Example of directory structure for the `drugbank` dataset:

```
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

---

## Define metadata

You can find example of metadata for [DrugBank](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/tree/master/mapping/drugbank/metadata/1)

Each dataset has 2 levels of metadata:
* The [summary metadata](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/drugbank/metadata/1/metadata-drugbank-summary.rq) needs to be defined once for each dataset *(~5 fields to fill)*
* The [distribution metadata](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/drugbank/metadata/1/metadata-drugbank-1.rq) needs to be defined for each new version *(~5 fields to fill)*
  
  
> A lot of metadata fields don't need much changes

> Some metadata for the distribution is retrieved from the summary

---

## Define mapping queries

You can find example of SPARQL mapping queries for:

* **XML** files
  * [DrugBank](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/tree/master/mapping/drugbank/transform/1)
  * [PubMed](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/tree/master/mapping/pubmed/transform/1)
* **CSV/TSV** files
  * [Stitch](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/stitch/transform/1/insert-stitch.rq)
  * [hpo_annotations](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/hpo_annotations/transform/1/genes_to_phenotype.tsv.rq)
  * [EggNOG](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/eggnog/transform/1/insert-eggnog.rq)
  * [PharmGKB](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/pharmgkb/transform/1/insert-pharmgkb.rq)

Defining the mappings is the hardest and most cumbersome part of data integration. We are working actively on making it easier, by working on mapping automation and graphical user interfaces.

The mapping definition is **straightforward for flat data format** such as CSV, TSV or relational databases. But **nested data representation** such as XML or JSON require more **complex mappings**.

If you are mapping a dataset for the first time we advice you to run [AutoR2RML](https://github.com/MaastrichtU-IDS/AutoR2RML) or [xml2rdf](https://github.com/MaastrichtU-IDS/xml2rdf) on the data to generate bootstrap SPARQL queries

* [AutoR2RML](https://github.com/MaastrichtU-IDS/AutoR2RML) automatically generates a SPARQL query extracting all columns value for each row. 
  * You just need to generate proper URIs using `BIND`
  * And write the statements corresponding to the target representation

* [xml2rdf](https://github.com/MaastrichtU-IDS/xml2rdf) generates a SPARQL mapping file for each array it detects
  * Mapping generation for XML is still experimental as it is complex to detext which fields should be mapped.
  * Be careful when iterating on multiple different child arrays for a parent node in your SPARQL query. It can blow up the processing time. 

    * Always split your queries to never iterate over more than one array for a parent node.
    * E.g. if `drug:001` from a XML file has multiple `publications` and multiple `synonyms` nodes in its child, then it is preferable to get them in 2 different queries. Retrieving the 2 arrays in a single query would results in the returned row count be a cartesian product of the 2 arrays, which grows exponentially with the size of each array.
    * Final semantic results are the same, but the performance of the transformation is highly impacted.
    * [DrugBank](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/tree/master/mapping/drugbank/transform/1) is a good example of multiple mappings files to handle arrays.

---

## Executing the mapping queries

To perform the transformation, the mappings will be executed using the [data2services-sparql-operations](https://github.com/MaastrichtU-IDS/data2services-sparql-operations) module. 

This tool uses the [rdf4j](https://rdf4j.eclipse.org/) framework to execute multiple SPARQL queries files, marked by the `.rq` extension, from a same repository on a SPARQL endpoint.

The SPARQL query files to execute can be provided via:
* A [URL pointing to a directory](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/tree/master/mapping/drugbank/transform/1) containing the `.rq` files in a GitHub repository
* The local filesystem repository (sharing volume)


[![RDF4J](/data2services/img/RDF4J_logo.png)](https://rdf4j.eclipse.org/)