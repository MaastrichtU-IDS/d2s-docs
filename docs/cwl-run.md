---
id: cwl-run
title: Run CWL workflows
---

![CWL](/img/CWL_logo.png)


* Go to the `d2s-transform-biolink` root folder (the root of the cloned repository)
  * e.g. `/data/d2s-transform-biolink` to run the CWL workflows.
* You will need to put the SPARQL mapping queries in `/mappings/$dataset_name` and provide 3 parameters:
  * `--outdir`: the [output directory](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/tree/master/output/stitch) for files outputted by the workflow (except for the downloaded source files that goes automatically to `/input`). 
    * e.g. `output/$dataset_name`.
  * The `.cwl` [workflow file](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/blob/master/support/cwl/workflow-xml.cwl)
    * e.g. `d2s-cwl-workflows/workflows/workflow-xml.cwl`
  * The `.yml` [configuration file](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/blob/master/support/example-config/config-transform-xml-drugbank.yml) with all parameters required to run the workflow
    * e.g. `support/example-config/config-transform-xml-drugbank.yml`
* 3 types of workflows can be run depending on the input data and the tasks executed:

  * XML
  * CSV/TSV
  * CSV/TSV with split of a statement



## Pull Docker image

The Docker image used by the workflow needs to be pulled from DockerHub first.

```shell
docker-compose -f d2s-cwl-workflows/docker-compose.yaml pull
```

## Command arguments

By default the example files are running using `/data/d2s-kg` as working directory. If you installed the repository at the different location, you will need to edit the `--outdir` and `--tmp-outdir-prefix` parameters in the command line.

- `--outdir`: final dir where the final ouput of the workflow is copied.
- `--tmp-outdir-prefix`: dir for output files (tmp) of each step 
- `--tmpdir-prefix`: dir used to pass inputs
- `-basedir /data/basedir/`: to find out

`outdir` and `tmp-outdir` output files in `/data/d2s-kg`

`tmpdir` output files in `/tmp/red-kg`

## Convert XML with xml2rdf

Using [xml2rdf](https://github.com/MaastrichtU-IDS/xml2rdf) to generate RDF based on the XML structure.

Example converting [DrugBank](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/tree/master/datasets/drugbank) (drug associations) to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

```shell
cwl-runner --custom-net d2s-cwl-workflows_d2s-network \
  --outdir /data/d2s-kg/output \
  --tmp-outdir-prefix=/data/d2s-kg/tmp/ \
  --tmpdir-prefix=/tmp/red-kg/ \
  d2s-cwl-workflows/workflows/workflow-xml.cwl \
  datasets/drugbank/config-transform-xml-drugbank.yml
```

> See [config file](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/blob/master/support/example-config/config-transform-xml-drugbank.yml).

> Output goes to `/data/d2s-kg/output`

## Convert CSV/TSV with AutoR2RML

Using [AutoR2RML](https://github.com/amalic/autor2rml) and Apache Drill to generate R2RML mapping based on input data structure.

Example converting [stitch](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/tree/master/datasets/stitch) (drug-protein associations) to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

```shell
cwl-runner --custom-net d2s-cwl-workflows_d2s-network \
  --outdir /data/d2s-kg/output \
  --tmp-outdir-prefix=/data/d2s-kg/tmp/ \
  --tmpdir-prefix=/tmp/red-kg/ \
  d2s-cwl-workflows/workflows/workflow-csv.cwl \
  datasets/stitch/config-transform-csv-stitch.yml
```

> Example converting [stitch](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/tree/master/datasets/stitch) (drug-protein associations) to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

## Convert CSV/TSV with AutoR2RML and split a property

Also split statements. E.g. `?s ?p "value1,value2,value3"` would be splitted in 3 statements.

```shell
cwl-runner --custom-net d2s-cwl-workflows_d2s-network \
  --outdir /data/d2s-kg/output \
  --tmp-outdir-prefix=/data/d2s-kg/tmp/ \
  --tmpdir-prefix=/tmp/red-kg/ \
  d2s-cwl-workflows/workflows/workflow-csv-split.cwl \
  datasets/eggnog/config-transform-split-eggnog.yml
```

> Example converting the [EggNOG](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/tree/master/datasets/drugbank) dataset to the [BioLink](https://biolink.github.io/biolink-model/docs/) model.

## Run in the background

```shell
nohup cwl-runner --custom-net d2s-cwl-workflows_d2s-network \
  --outdir /data/d2s-kg/output \
  --tmp-outdir-prefix=/data/d2s-kg/tmp/ \
  --tmpdir-prefix=/tmp/red-kg/ \
  d2s-cwl-workflows/workflows/workflow-xml.cwl \
  datasets/drugbank/config-transform-xml-drugbank.yml &
```

> Write terminal output to `nohup.out`.

## Generate mappings for AutoR2RML

> `TODO`: deprecated

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

> Same [config file](https://github.com/MaastrichtU-IDS/d2s-transform-biolink/blob/master/support/cwl/config/config-transform-csv-stitch.yml) as the regular CSV workflow.