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

> Access at http://localhost:8078 to see running jobs.

## Run the RMLStreamer

The [RML mappings](https://rml.io/specs/rml/) needs to be defined as in a file with the extension `.rml.ttl`, in the mapping folder of the dataset to transform, e.g. `datasets/dataset_id/mapping/associations-mapping.rml.ttl`

We provide an example converting a sample of [COHD](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/datasets/cohd/mapping/associations-mapping.rml.ttl) (clinical concepts co-occurences from FDA reports) to the [BioLink](https://biolink.github.io/biolink-model/docs/) model:

```shell
d2s rml cohd
```

> Output goes to `workspace/import/rmlstreamer-associations-mapping_rml_ttl-cohd.nt` and can then be loaded to a triplestore.

You can also provide [YARRRML](https://rml.io/yarrrml/spec/) files with the extensions `.yarrr.yml` to be processed to `.rml.ttl` files before running RML:

```shell
d2s rml geonames --yarrrml
```

The command run detached by default, you can keep the terminal attached and watch the execution:

```shell
d2s rml cohd --watch
```

Generate NQuads by adding the graph infos in the `rr:subjectMap` in RML mappings:

```turtle
rr:graphMap [ rr:constant <https://w3id.org/trek/graph/drugbank> ];
```

## Compute HCLS metadata

[HCLS descriptive metadata and statistics](https://www.w3.org/TR/hcls-dataset/) for datasets can easily be computed and inserted for the generated graph by running a CWL workflow:

```shell
d2s run compute-hcls-metadata.cwl cohd
```

* Insert dataset metadata defined in the [datasets/cohd/metadata](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/datasets/cohd/metadata) folder.
* [Compute and insert HCLS](https://github.com/MaastrichtU-IDS/d2s-scripts-repository/tree/master/sparql/compute-hcls-stats) descriptive statistics using SPARQL queries.

## Run the RMLMapper

For small files the [rmlmapper-java](https://github.com/RMLio/rmlmapper-java/) can be used.

```shell
d2s rml cohd --mapper
```

> Output goes to `workspace/import/rmlmapper-associations-mapping_rml_ttl-cohd.nt`

Or using [YARRRML](https://rml.io/yarrrml/spec/) mappings:

```shell
d2s rml geonames --yarrrml --mapper
```

## Web-based RML editor

[![](/img/yarrrml-logo.png)](https://rml.io/yarrrml/matey/#edit)

The **[Matey Web UI editor 🦜](https://rml.io/yarrrml/matey/#edit)** is available to easily write RML mappings in [YAML](https://yaml.org/) files using the [YARRRML](https://rml.io/yarrrml/) simplified mapping language. The mappings can be conveniently tested in the browser on a sample of the file to transform.

RML Specifications can be found as a [W3C unofficial draft](https://rml.io/specs/rml/).

> See the [rml.io](https://rml.io/) website for more documentation about RML and the various tools built and deployed by Ghent University.

YARRRML can also be parsed locally using a npm package:

```shell
npm i @rmlio/yarrrml-parser -g
```

## Run on the DSRI OpenShift

[![](/img/openshift-logo.png)](https://maastrichtu-ids.github.io/dsri-documentation/)

Still experimental, the RMLStreamer can be run on the [Data Science Research Infrastructure OpenShift](https://maastrichtu-ids.github.io/dsri-documentation/) cluster.

* See the [DSRI documentation](https://maastrichtu-ids.github.io/dsri-documentation/docs/deploy-services#apache-flink) to deploy Apache Flink.

* Copy the RMLStreamer.jar file, your mapping files and data files to the pod. It will be proposed when running `d2s rml` but they could be loaded manually before. 

```shell
oc exec <flink-jobmanager-id> -- mkdir -p /mnt/workspace/import
oc rsync workspace/input <flink-jobmanager-id>:/mnt/workspace/
oc rsync datasets <flink-jobmanager-id>:/mnt/
```

> Transferring the files to the Apache Flink storage easily is still a work in progress.

* Run the RMLStreamer job on the GeoNames example

```shell
d2s rml geonames --openshift
```

> The progress of the job can be checked in the Apache Flink web UI.

> Output file in `/mnt/rdf_output-associations-mapping.nt` in the pod
>
> Or in `/apache-flink` in the persistent storage.

## Notice about using functions

RML functions are still not implemented in the RMLStreamer, use the RML mapper if you want to make use of them. See the [full list of available default functions](https://rml.io/docs/rmlmapper/default-functions/).

Example using the [split function](https://rml.io/docs/rmlmapper/default-functions/#split):

```yaml
prefixes:
  grel: "http://users.ugent.be/~bjdmeest/function/grel.ttl#"
  rdfs: "http://www.w3.org/2000/01/rdf-schema#"
  gn: "http://www.geonames.org/ontology#"

mappings:
  neighbours:
    sources:
      - ['/mnt/workspace/input/geonames/dataset-geonames-countryInfo.csv~csv']
    s: http://www.geonames.org/ontology#$(ISO)
    po:
      - [a, gn:Country]
      - p: gn:neighbours
        o:
            function: grel:string_split
            parameters:
                - [grel:valueParameter, $(neighbours)]
                - [grel:p_string_sep, "|"]
            language: en
```

