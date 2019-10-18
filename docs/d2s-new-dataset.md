---
id: d2s-new-dataset
title: Transform a new dataset
---

Go to [d2s-transform-template](https://github.com/MaastrichtU-IDS/d2s-transform-template), click on [Use this template](https://github.com/MaastrichtU-IDS/d2s-transform-template/generate).

Clone the created repository on your machine

```shell
git clone your-repository
cd your-repository
```

## Start from the template

Copy the [template repository](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/datasets/template) and rename it to your dataset name.

### Describe the dataset metadata

* SPARQL insert dataset [summary metadata](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/datasets/template/metadata/1/metadata-template-0-summary.rq) (once by dataset).
* SPARQL insert dataset [distribution metadata](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/datasets/template/metadata/1/metadata-template-1.rq) (for each new version).

### Add files to download

Edit the [download.sh](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/datasets/template/download) script to set the files to download. 

> [Example](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/datasets/template/download/download.sh) to download, unzip, add column labels provided.

### Define the SPARQL mappings

Add [SPARQL mappings](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/datasets/template/mappings/1) to convert the RDF based on input data structure to a target data model.

After a first run of the workflow `autor2rml` and `xml2rdf` will have generated a `sparql_mapping_templates` folder in the workflow `output` directory.

> Example provided for [Stitch TSV](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/datasets/template/mappings/1/insert-template.rq) (chemical to protein).

[![Bash](/img/bash_logo.png)](https://devhints.io/bash)

---

## SPARQL queries in details

[![SPARQL](/img/sparql_logo.png)](https://www.w3.org/TR/sparql11-overview/)

We use [SPARQL](https://www.w3.org/TR/sparql11-query/) to:

* Insert metadata about the dataset in the triplestore.
* Map the generic RDF, generated from your input data structure, to a target RDF and insert the refined RDF in the triplestore.

---

### Define the dataset metadata

Define the dataset [**HCLS metadata**](https://www.w3.org/TR/hcls-dataset/), you can find example of metadata for [DrugBank](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/mapping/drugbank/metadata/1).

Each dataset has 2 levels of metadata:
* The [summary metadata](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/mapping/drugbank/metadata/1/metadata-drugbank-summary.rq) need to be defined once for each dataset *(~10 fields to fill)*
* The [distribution metadata](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/mapping/drugbank/metadata/1/metadata-drugbank-1.rq) need to be defined for each new version *(~6 fields to fill)*


> Some distribution metadata is retrieved from the summary

> Most metadata fields don't need changes between versions

---

### Define mappings to target model

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

### Execute the mappings

To perform the transformation, the SPARQL mapping queries will be executed using the [d2s-sparql-operations](https://github.com/MaastrichtU-IDS/d2s-sparql-operations) module. 

This tool uses the [rdf4j](https://rdf4j.eclipse.org/) framework to execute multiple SPARQL queries files, marked by the `.rq` extension, from a same repository on a SPARQL endpoint.

The SPARQL query files to execute can be provided via:
* A [URL pointing to a directory](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/mapping/drugbank/transform/1) containing the `.rq` files in a GitHub repository.
* The local filesystem repository (sharing volume).


[![RDF4J](/img/RDF4J_logo.png)](https://rdf4j.eclipse.org/)