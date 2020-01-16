---
id: cwl-run
title: Run CWL workflows
---

![CWL](/img/CWL_logo.png)

## Download files to convert

Files to process (e.g. CSV, XML) needs to be downloaded before running the workflow.

Example for `stitch`:

```shell
docker run -it -v /data/d2s-transform-template:/srv \
  -v /data/d2s-workspace:/data \
  umids/d2s-bash-exec:latest \
  /srv/datasets/stitch/download/download.sh input/stitch
```

> You need to be in the `d2s-transform-template` repository. Here on `/data`.

> Downloaded files goes to `/data/d2s-workspace/input/dataset_name`.

> **TODO:** allow to provide directly a URL for `download.sh`.

## Convert XML with xml2rdf

Using [xml2rdf](https://github.com/MaastrichtU-IDS/xml2rdf) to generate RDF based on the XML structure.

```shell
cwl-runner --custom-net d2s-cwl-workflows_network \
  --outdir /data/d2s-workspace/output \
  --tmp-outdir-prefix=/data/d2s-workspace/output/tmp-outdir/ \
  --tmpdir-prefix=/data/d2s-workspace/output/tmp-outdir/tmp- \
  d2s-cwl-workflows/workflows/workflow-xml.cwl \
  datasets/drugbank/config-transform-xml-drugbank.yml
```

> Example converting [DrugBank](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/datasets/drugbank) (drug associations) to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

> Output goes to `/data/d2s-workspace/output`

---

## Convert CSV/TSV with AutoR2RML

Using [AutoR2RML](https://github.com/amalic/autor2rml) and Apache Drill to generate R2RML mapping based on input data structure.

```shell
cwl-runner --custom-net d2s-cwl-workflows_network \
  --outdir /data/d2s-workspace/output \
  --tmp-outdir-prefix=/data/d2s-workspace/output/tmp-outdir/ \
  --tmpdir-prefix=/data/d2s-workspace/output/tmp-outdir/tmp- \
  d2s-cwl-workflows/workflows/workflow-csv.cwl \
  datasets/stitch/config-transform-csv-stitch.yml
```

> Example converting [stitch](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/datasets/stitch) (drug-protein associations) to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

---

## Convert CSV/TSV with AutoR2RML and split a property

Also split statements. E.g. `?s ?p "value1,value2,value3"` would be splitted in 3 statements.

```shell
cwl-runner --custom-net d2s-cwl-workflows_network \
  --outdir /data/d2s-workspace/output \
  --tmp-outdir-prefix=/data/d2s-workspace/output/tmp-outdir/ \
  --tmpdir-prefix=/data/d2s-workspace/output/tmp-outdir/tmp- \
  d2s-cwl-workflows/workflows/workflow-csv-split.cwl \
  datasets/eggnog/config-transform-split-eggnog.yml
```

> Example converting the [EggNOG](https://github.com/MaastrichtU-IDS/d2s-transform-template/tree/master/datasets/drugbank) dataset to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

---

## Run in the background

```shell
nohup cwl-runner --custom-net d2s-cwl-workflows_network \
  --outdir /data/d2s-workspace/output \
  --tmp-outdir-prefix=/data/d2s-workspace/output/tmp-outdir/ \
  --tmpdir-prefix=/data/d2s-workspace/output/tmp-outdir/tmp- \
  d2s-cwl-workflows/workflows/workflow-csv.cwl \
  datasets/drugbank/config-transform-csv-stitch.yml &
```

> Write terminal output to `nohup.out`.

---

## Generate mappings for AutoR2RML

> `Do not use`: deprecated

When you don't already have mappings sets for R2RML the workflow can be executed in 2 steps

- Generates the generic RDF and template SPARQL mapping files, and load the generic RDF

```shell
cwl-runner --outdir output/stitch-sample \
  d2s-cwl-workflows/workflows/workflow-csv-generate_mapping.cwl \
  support/example-config/config-transform-csv-stitch.yml
```

- Run SPARQL mapping queries to transform generic RDF to the target model 

```shell
cwl-runner --outdir output/stitch-sample \
  d2s-cwl-workflows/workflows/workflow-csv-transform.cwl \
  support/example-config/config-transform-csv-stitch.yml
```

> Same [config file](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/support/cwl/config/config-transform-csv-stitch.yml) as the regular CSV workflow.

---

## Workflow details

* By default the example files are running using `/data/d2s-workspace` as working directory.

* You need to put the SPARQL mapping queries in `/mappings/$dataset_name` and provide those parameters:
  * `--outdir`: final output directory for files outputted by the workflow
    * e.g. `/data/d2s-workspace/output/$dataset_name`.
  * `--tmp-outdir-prefix`: directory for output files (tmp) of each step 
    * e.g. `/data/d2s-workspace/output/tmp-outdir`
  * `--tmpdir-prefix`: directory used to pass inputs of each step
    * e.g. `/data/d2s-workspace/output/tmp-outdir/tmp-`
  * `--custom-net`: docker network used by all containers run in this workflow
  * The `.cwl` [workflow file](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/support/cwl/workflow-xml.cwl)
    * e.g. `d2s-cwl-workflows/workflows/workflow-xml.cwl`
  * The `.yml` [configuration file](https://github.com/MaastrichtU-IDS/d2s-transform-template/blob/master/support/example-config/config-transform-xml-drugbank.yml) with all parameters required to run the workflow
    * e.g. `support/example-config/config-transform-xml-drugbank.yml`
* 3 types of workflows can be run depending on the input data and the tasks executed:

  * XML
  * CSV/TSV
  * CSV/TSV with split of a statement
