---
id: start-new-dataset
title: Transform new dataset
---

## Define download script

[![Bash](/img/bash_logo.png)](https://devhints.io/bash)

Create a repository with a `download.sh` script to download the dataset files in [/datasets](https://github.com/MaastrichtU-IDS/d2s-download/tree/master/datasets) in the [d2s-transform-template](https://github.com/MaastrichtU-IDS/d2s-transform-template) repository.

> See [template example](https://github.com/MaastrichtU-IDS/d2s-download/blob/master/datasets/TEMPLATE/download.sh).

> To come: we will enable to provide the Bash script using a URL, to allow easily hosting it on git.

---

## Define SPARQL queries

[![SPARQL](/img/sparql_logo.png)](https://www.w3.org/TR/sparql11-overview/)

We use [SPARQL](https://www.w3.org/TR/sparql11-query/) to:

* Insert metadata about the dataset in the triplestore.
* Map the generic RDF, generated from your input data structure, to a target RDF and insert the refined RDF in the triplestore.

### Define the dataset metadata

Define the dataset [**HCLS metadata**](https://www.w3.org/TR/hcls-dataset/), you can find example of metadata for [DrugBank](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/mapping/drugbank/metadata/1).

Each dataset has 2 levels of metadata:
* The [summary metadata](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/mapping/drugbank/metadata/1/metadata-drugbank-summary.rq) need to be defined once for each dataset *(~10 fields to fill)*
* The [distribution metadata](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/mapping/drugbank/metadata/1/metadata-drugbank-1.rq) need to be defined for each new version *(~6 fields to fill)*


> Some distribution metadata is retrieved from the summary

> Most metadata fields don't need changes between versions

---

## Define the mappings

You can find example of SPARQL mapping queries for:

* **XML** files
  * [DrugBank](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/mapping/drugbank/transform/1)
  * [PubMed](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/mapping/pubmed/transform/1)
* **CSV/TSV** files
  * [Stitch](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/mapping/stitch/transform/1/insert-stitch.rq)
  * [hpo_annotations](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/mapping/hpo_annotations/transform/1/genes_to_phenotype.tsv.rq)
  * [EggNOG](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/mapping/eggnog/transform/1/insert-eggnog.rq)
  * [PharmGKB](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/mapping/pharmgkb/transform/1/insert-pharmgkb.rq)

> Defining the mappings is the hardest and most cumbersome part of data integration. We are working actively on making it easier, by working on mapping automation and graphical user interfaces.

The mapping definition is **straightforward for flat data format** such as CSV, TSV or relational databases. But **nested data representation** such as XML or JSON require more **complex mappings**.

If you are mapping a dataset for the first time we advice you to run [AutoR2RML](https://github.com/MaastrichtU-IDS/AutoR2RML) or [xml2rdf](https://github.com/MaastrichtU-IDS/xml2rdf) on the data to generate bootstrap SPARQL queries

* [AutoR2RML](https://github.com/MaastrichtU-IDS/AutoR2RML) automatically generates a SPARQL query extracting all columns value for each row. 
  * You just need to generate proper URIs using `BIND`
  * And write the statements corresponding to the target representation


> [PharmGKB](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/mapping/pharmgkb/transform/1/insert-pharmgkb.rq) is a good example of complex TSV file.

* [xml2rdf](https://github.com/MaastrichtU-IDS/xml2rdf) generates a SPARQL mapping file for each array it detects
  * Mapping generation for XML is still experimental as it is complex to detect which fields should be mapped.
  * Be careful when iterating on multiple different child arrays for a parent node in your SPARQL query. It can blow up the processing time. 

    * Always split your queries to never iterate over more than one array for a parent node.
    * E.g. if `drug:001` from a XML file has multiple `publications` and multiple `synonyms` nodes in its child, then it is preferable to get them in 2 different queries. Retrieving the 2 arrays in a single query would results in the returned row count be a cartesian product of the 2 arrays, which grows exponentially with the size of each array.
    * Final semantic results are the same, but the performance of the transformation is highly impacted.

> [DrugBank](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/mapping/drugbank/transform/1) is a good example of multiple mappings files to handle arrays.

---

## Executing the mappings

To perform the transformation, the SPARQL mapping queries will be executed using the [d2s-sparql-operations](https://github.com/MaastrichtU-IDS/d2s-sparql-operations) module. 

This tool uses the [rdf4j](https://rdf4j.eclipse.org/) framework to execute multiple SPARQL queries files, marked by the `.rq` extension, from a same repository on a SPARQL endpoint.

The SPARQL query files to execute can be provided via:
* A [URL pointing to a directory](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/mapping/drugbank/transform/1) containing the `.rq` files in a GitHub repository.
* The local filesystem repository (sharing volume).


[![RDF4J](/img/RDF4J_logo.png)](https://rdf4j.eclipse.org/)