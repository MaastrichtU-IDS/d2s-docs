---
id: steps-to-do
title: What you will need to do
---


Integrating data has never been effortless, this framework aims to make it easier by bringing together accepted standards and modern scalable technologies.

Here is what you will need to do in practice to build a Knowledge Graph out of your data:

* **Choose** or build **a common data model** (ontology) to represent your data (10' to 10 weeks)
  * Try to reuse existing ontologies and concepts as much as possible.
  * Search for relevant existing models in repository such as [BioPortal](https://bioportal.bioontology.org/recommender).
  * Combine concepts from different ontologies, or define new ones.
* **Setup the source data download** using Bash scripts via [data2services-download](https://github.com/MaastrichtU-IDS/data2services-download) (10')
  * Most of the time, if the data is properly distributed, it should consist in a simple `wget -N` 
  * We provide [examples](https://github.com/MaastrichtU-IDS/data2services-download/blob/master/datasets/TEMPLATE/download.sh) for common operations, such as extracting URLs from an HTML file, recursive download, uncompress, adding missing columns headers to tabular files.
* **Automatically convert** source data **to generic** RDF (usually using xml2rdf or AutoR2RML) (5')
  * Template SPARQL mapping queries are generated to help the users to start define the mappings
* Define the dataset **metadata** (10')
  * The [summary metadata](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/drugbank/metadata/1/metadata-drugbank-summary.rq) needs to be defined once for each dataset (~5 fields)
  * The [distribution metadata](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/mapping/drugbank/metadata/1/metadata-drugbank-1.rq) needs to be defined for each new version (~5 fields)
  * A lot of metadata fields don't need much changes
  * Some metadata for the distribution is retrieved from the summary
* **Design SPARQL mapping query** (20' for a tabular file, can be hours for a complex XML file)
  * Start from the previously generated templates if you don't have mappings for this kind of data.
  * Be careful when iterating on multiple result arrays in SPARQL, it can blow up the processing time. Always split your queries to never iterate over more than one array for parent node
    * E.g. if `drug:001` from a XML file  as multiple `publications` and multiple `synonyms` nodes in children, then it is preferable to get them in 2 different queries. Retrieving the 2 arrays in a single query would result in a cartesian product of the 2 arrays, which grows exponentially with the size of the arrays.
  * Defining the mappings is the hardest and most cumbersome task in data integration. We are working actively on making it easier, by working on mapping automations and GUIs. 
* Now the mappings have been designed you are done, and just need to start your triplestore if it is not already running, and **run the transformation** through using a workflow orchestration tool.
  * Set the pipeline YAML configuration file: triplestore URL and credentials, path to mapping files, path to download script, URI of the integrated graph 