---
id: d2s-rml
title: Run RML transformations
---

Use the [RDF Mapping Language (RML)](https://rml.io/) to map your structured data (CSV, TSV, SQL, XML, JSON, YAML) to RDF using a declarative mapping language. 

The [RMLStreamer](/docs/services-utilities#rmlstreamer) is a scalable implementation of the [RDF Mapping Language Specifications](https://rml.io/specs/rml/) to generate RDF out of structured input data streams.

## Download files to convert

The following documentation will use the COHD Clinical CSV data as example. Download the dataset, if not already done:

```shell
d2s download cohd
```

> Download script defined in [datasets/cohd/download/download.sh](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/datasets/cohd/download/download.sh).

> Downloaded files goes to `workspace/input/cohd`

## Start Apache Flink

[![Apache Flink](/img/flink-logo.png)](https://flink.apache.org/)

Start [Apache Flink](https://flink.apache.org/), required to stream the files:

```shell
d2s start rmlstreamer rmltask
```

> Access at http://localhost:8078

## Run the RMLStreamer

The [RML mappings](https://rml.io/specs/rml/) needs to be defined as `rml-mappings.ttl` in the mapping folder of the dataset to transform, e.g. `datasets/dataset_id/mapping/rml-mappings.ttl`

We provide an example converting a sample of [COHD](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/datasets/cohd/mapping/rml-mappings.ttl) (clinical concepts co-occurences from FDA reports) to the [BioLink](https://biolink.github.io/biolink-model/docs/) model:

```shell
d2s rml cohd
```

> See running RML executions at http://localhost:8078/#/job/running

> Output goes to `workspace/graphdb-import/rml-cohd-output.nt` and can then be loaded to a triplestore.

## Compute HCLS metadata

[HCLS descriptive metadata and statistics](https://www.w3.org/TR/hcls-dataset/) for datasets can easily be computed and inserted for the generated graph by running a CWL workflow:

```shell
d2s run compute-hcls-metadata.cwl cohd
```

* Insert dataset metadata defined in the [datasets/cohd/metadata](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/datasets/cohd/metadata) folder.
* [Compute and insert HCLS](https://github.com/MaastrichtU-IDS/d2s-scripts-repository/tree/master/sparql/compute-hcls-stats) descriptive statistics using SPARQL queries.

> TODO: delete previous metadata before inserting a new one?

## Web-based RML editor

[![](/img/yarrrml-logo.png)](https://rml.io/yarrrml/matey/#edit)

The **[Matey Web UI editor 🦜](https://rml.io/yarrrml/matey/#edit)** is available to easily write RML mappings using the [YARRRML](https://rml.io/yarrrml/) simplified mapping language. The mappings can be conveniently tested in the browser on a sample of the file to transform.

RML Specifications can be found as a [W3C unofficial draft](https://rml.io/specs/rml/).

> See the [rml.io](https://rml.io/) website for more documentation about RML and the various tools built and deployed by Ghent University.