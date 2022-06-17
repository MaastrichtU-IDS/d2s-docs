---
id: convert-rml
title: Convert with RML
---

Use the [RDF Mapping Language (RML)](https://rml.io/) to map your structured data (CSV, TSV, XLSX, SPSS, SQL, XML, JSON, YAML) to RDF using a declarative mapping language. 

## Create mapping for a dataset

You can run this command at the root of your repository to generate the dataset mappings files in the `datasets` folder, you will be prompted to enter some metadata about the dataset to create.

```shell
d2s new dataset
```

The dataset readme, mappings, metadata, and download files are created in the `datasets/$dataset_id` folder. Check the download script generated in `datasets/$dataset_id/scripts/download.sh` and edit it if needed. 

We use bash for it's performance and reliability with large file download. But you are free to use a python script or other documented methods.

## Define mappings

We recommend to use [YARRRML](https://rml.io/yarrrml/), a mapping language to make the definition of RML mappings easier using a simplified YAML, which is then converted to proper RML.

The **[Matey web UI 🦜](https://rml.io/yarrrml/matey/#edit)** is available to easily write and test RML mappings in [YAML](https://yaml.org/) files using the [YARRRML](https://rml.io/yarrrml/) simplified mapping language. The mappings can be conveniently tested in the browser on a sample of the file to transform.

Recommended workflow to easily create and test RML mappings:

1. Use the **[Matey web UI 🦜](https://rml.io/yarrrml/matey/#edit)** to write YARRRML mappings, and test them against a sample of your data
2. Copy the YARRRML mappings to a file with the extension `.yarrr.yml`
3. Copy the RML mappings to a file with same name, and the extension `.rml.ttl`
4. Optionally you can automate the execution in a [GitHub Actions workflow](/docs/workflow-github).

:::info Specifications

* RML Specifications can be found as a [W3C unofficial draft](https://rml.io/specs/rml/).
* See the [rml.io](https://rml.io/) website for more documentation about RML and the various tools built and deployed by Ghent University.

:::

:::note YARRRML package

YARRRML can also be parsed locally or automatically using the [yarrrml-parser](https://github.com/RMLio/yarrrml-parser) `npm` package:

```shell
npm i @rmlio/yarrrml-parser -g
yarrrml-parser -i mappings.yarrr.yml
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
      - ['countries.csv~csv']
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
rr:graphMap [ rr:constant <https://w3id.org/d2s/graph> ];
```

:::

⚠️ Most RML engines does not support YARRRML by default, so you will need to convert it to RML and use the RML mappings for the conversion.

## Tools for RML conversion

There are multiple tools available to generate RDF from RML mappings, with various efficiency, stability, and features.

[rmlmapper-java](https://github.com/RMLio/rmlmapper-java)

* Reference implementation, written in java
* Not suited for large files
* Supports custom functions (in java, compiled as separate `.jar` files)

[RMLStreamer](https://github.com/RMLio/RMLStreamer)

* Streaming implementation for large files, written in Scala
* Works well for really large CSV files
* Can be parallelized on Apache Flink clusters
* Does not support custom functions yet

[SDM-RDFizer](https://github.com/SDM-TIB/SDM-RDFizer)

* Written in Python
* Can use a separate tool, [Dragoman](https://github.com/SDM-TIB/Dragoman), for executing custom functions

[morph-kgc](https://morph-kgc.readthedocs.io/en/latest/documentation/)

* Written in Python
* Does not support custom functions

[RocketRML](https://github.com/semantifyit/RocketRML)

* Written in JavaScript
* Provide an easy way to define custom functions

We currently only implemented the rmlmapper-java and the RMLStreamer in `d2s`, but you are encouraged to use the tool that fits your needs.

### Convert with the RML Mapper

The [rmlmapper-java](https://github.com/RMLio/rmlmapper-java/) execute RML mappings to generate RDF Knowledge Graphs.

:::caution Not for large files

The RML Mapper loads all data in memory, so be aware when working with big datasets. 

:::

1. Download the rmlmapper `.jar` file at https://github.com/RMLio/rmlmapper-java/releases
2. Run the RML mapper:

```bash
java -jar rmlmapper.jar -m mapping.ttl -o rdf-output.nt
```

:::tip Run automatically in workflow

The RMLMapper can be easily run in GitHub Actions workflows, checkout the **[Run workflows](/docs/workflow-github)** page for more details.

```yaml
- name: Run RML mapper
  uses: vemonet/rmlmapper-java@v4.9.0
  with:
    mapping: mappings.rml.ttl
    output: rdf-output.nt
  env:
    JAVA_OPTS: "-Xmx6g"
```

:::

### Convert with the RML Streamer

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

#### Prepare files

Copy the `RMLStreamer.jar` file, your mapping files and data files to the Flink `jobmanager` pod before running it. 

For example:

```shell
# get flink pod id
POD_ID=$(oc get pod --selector app=flink --selector component=jobmanager --no-headers -o=custom-columns=NAME:.metadata.name)
DATASET=my-dataset
oc rsh flink-jobmanager-7459cc58f7-5hqjb
oc exec $POD_ID -- mkdir -p /mnt/project
# If script run from datasets/dataset1/scripts/ :
oc cp ../../mappings $POD_ID:/mnt/project/
chmod +x /mnt/project/datasets/$DATASET/scripts/download.sh
oc exec $POD_ID -- /mnt/project/datasets/$DATASET/scripts/download.sh
oc exec $POD_ID -- wget -O /mnt/RMLStreamer.jar https://github.com/RMLio/RMLStreamer/releases/download/v2.0.0/RMLStreamer-2.0.0.jar
```

#### Run the RMLStreamer

Example of command to run the RMLStreamer from the Flink cluster master:

```bash
nohup /opt/flink/bin/flink run -p 128 -c io.rml.framework.Main /mnt/RMLStreamer.jar toFile -m /mnt/mappings.rml.ttl -o /mnt/rmlstreamer-mappings-output.nt --job-name "RMLStreamer mappings.rml.ttl" &
```

:::tip Check the progress

The progress of the job can be checked in the Apache Flink web UI.

:::

#### Merge and compress output

The ntriples files produced by RMLStreamer in parallel:

```bash
cd /mnt/cohd/openshift-rmlstreamer-cohd-associations.nt
nohup cat * >> openshift-rmlstreamer-cohd-associations.nt &

ls -alh /mnt/cohd/openshift-rmlstreamer-cohd-associations.nt/openshift-rmlstreamer-cohd-associations.nt

# Zip the merged output file:
nohup gzip openshift-rmlstreamer-cohd-associations.nt &
```

#### Copy to your server

SSH connect to your server, http_proxy var might need to be changed temporarily to access the DSRI

```bash
export http_proxy=""
export https_proxy=""

# Copy with oc tool:
oc login
oc cp flink-jobmanager-7459cc58f7-cjcqf:/mnt/cohd/openshift-rmlstreamer-cohd-associations.nt/openshift-rmlstreamer-cohd-associations.nt.gz /data/graphdb/import/umids-download &!

# Check (19G total):
ls -alh /data/graphdb/import/umids-download
cp /data/graphdb/import/umids-download/openshift-rmlstreamer-cohd-associations.nt.gz /data/d2s-project-trek/workspace/dumps/rdf/cohd/
gzip -d openshift-rmlstreamer-cohd-associations.nt.gz
```

Reactivate the proxy (`EXPORT http_proxy`)

#### Preload in GraphDB

Check the generated COHD file on the server at:

```bash
cd /data/d2s-project-trek/workspace/dumps/rdf/cohd
```

Replace wrong triples:

```bash
sed -i 's/"-inf"^^<http:\/\/www.w3.org\/2001\/XMLSchema#double>/"-inf"/g' openshift-rmlstreamer-cohd-associations.nt
```

Start preload:

```bash
cd /data/deploy-ids-services/graphdb/preload-cohd
docker-compose up -d
```

The COHD repository will be created in `/data/graphdb-preload/data`, copy it to the main GraphDB:

```bash
mv /data/graphdb-preload/data/repositories/cohd /data/graphdb/data/repositories
```

