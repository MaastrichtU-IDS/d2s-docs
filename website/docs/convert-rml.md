---
id: convert-rml
title: Convert with RML
---


Use the [RDF Mapping Language (RML)](https://rml.io/) to map your structured data (CSV, TSV, XLSX, SPSS, SQL, XML, JSON, YAML) to RDF using a declarative mapping language. 

We recommend to use [YARRRML](https://rml.io/yarrrml/), a mapping language to replace the RDF by YAML, to make the definition of RML mappings easier.

The **[Matey Web UI editor 🦜](https://rml.io/yarrrml/matey/#edit)** is available to easily write and test RML mappings in [YAML](https://yaml.org/) files using the [YARRRML](https://rml.io/yarrrml/) simplified mapping language. The mappings can be conveniently tested in the browser on a sample of the file to transform.

* RML Specifications can be found as a [W3C unofficial draft](https://rml.io/specs/rml/).

* See the [rml.io](https://rml.io/) website for more documentation about RML and the various tools built and deployed by Ghent University.

:::note YARRRML package

YARRRML can also be parsed locally or automatically using a `npm` package:

```shell
npm i @rmlio/yarrrml-parser -g
```

::::

Example  of a YARRRML mapping file using the [split function](https://rml.io/docs/rmlmapper/default-functions/#split) on the `|` character:

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
                - [grel:p_string_sep, "\|"]
            language: en
```

* `grel:p_string_sep` separators needs to be escaped with `\`
* See the [full list of available default functions](https://rml.io/docs/rmlmapper/default-functions/).
* Additional function can be added by integrating them in a `.jar` file, see the [documentation](https://github.com/RMLio/rmlmapper-java#including-functions).

:::note Generate nquads

You can also generate nquads by adding the graph infos in the `rr:subjectMap` in RML mappings (or just `g:` in YARRRML):

```turtle
rr:graphMap [ rr:constant <https://w3id.org/trek/graph/drugbank> ];
```

:::

## Convert with the RML Mapper

The [rmlmapper-java](https://github.com/RMLio/rmlmapper-java/) execute RML mappings to generate RDF Knowledge Graphs.

:::caution Not for large files

The RML Mapper loads all data in memory, so be aware when working with big datasets. 

:::

```bash
java -jar rmlmapper.jar -m mapping.ttl -o rdf-output.nt
```

:::tip Run automatically in workflow

The RMLMapper can be easily run in GitHub Actions workflows, checkout the **[Run workflows](/docs/workflows-github)** page for more details

:::

## Convert with the RML Streamer

The [RMLStreamer](https://github.com/RMLio/RMLStreamer/) is a scalable implementation of the [RDF Mapping Language Specifications](https://rml.io/specs/rml/) to generate RDF out of structured input data streams.

:::caution Work in progress 

The RMLStreamer is still in development, some features such as functions are yet to be implemented.

:::

To run the RMLStreamer you have 2 options:

* Start a single node [Apache Flink cluster using docker on your machine](https://github.com/RMLio/RMLStreamer/blob/development/docker/README.md). 
* Use the DSRI Apache Flink cluster (especially for really large files).

:::info Documentation

* See the [DSRI documentation to deploy Apache Flink](https://maastrichtu-ids.github.io/dsri-documentation/docs/deploy-services#apache-flink)

* Checkout the [documentation to convert COHD using the RMLStreamer](https://github.com/MaastrichtU-IDS/d2s-project-template/tree/master/datasets/cohd) on the DSRI.

:::

Copy the `RMLStreamer.jar` file, your mapping files and data files to the pod before running it. For example:

```shell
# get flink pod id
oc get pod --selector app=flink --selector component=jobmanager --no-headers -o=custom-columns=NAME:.metadata.name

oc exec <flink-jobmanager-id> -- mkdir -p /mnt/workspace/import
oc cp workspace/input <flink-jobmanager-id>:/mnt/workspace/
oc cp datasets <flink-jobmanager-id>:/mnt/
```

Example of command to run the RMLStreamer from the Flink cluster master:

```bash
nohup /opt/flink/bin/flink run -p 128 -c io.rml.framework.Main /mnt/RMLStreamer.jar toFile -m /mnt/mappings.rml.ttl -o /mnt/rmlstreamer-mappings-output.nt --job-name "RMLStreamer mappings.rml.ttl" &
```

:::tip Check the progress

The progress of the job can be checked in the Apache Flink web UI.

:::