---
id: cwl-run
title: Run CWL workflows
---

![CWL](/data2services/img/CWL_logo.png)


* Go to the `data2services-transform-biolink` root folder (the root of the cloned repository)
  * e.g. `/data/data2services-transform-biolink` to run the CWL workflows.
* You will need to put the SPARQL mapping queries in `/mappings/$dataset_name` and provide 3 parameters:
  * `--outdir`: the [output directory](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/tree/master/output/stitch) for files outputted by the workflow (except for the downloaded source files that goes automatically to `/input`). 
    * e.g. `output/$dataset_name`.
  * The `.cwl` [workflow file](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/support/cwl/workflow-xml.cwl)
    * e.g. `data2services-cwl-workflows/workflows/workflow-xml.cwl`
  * The `.yml` [configuration file](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/support/example-config/config-transform-xml-drugbank.yml) with all parameters required to run the workflow
    * e.g. `support/example-config/config-transform-xml-drugbank.yml`
* 3 types of workflows can be run depending on the input data and the tasks executed:

## Convert XML with [xml2rdf](https://github.com/MaastrichtU-IDS/xml2rdf)

```shell
cwl-runner --outdir output/drugbank-sample \
  data2services-cwl-workflows/workflows/workflow-xml.cwl \
  support/example-config/config-transform-xml-drugbank.yml
```

> See [config file](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/support/example-config/config-transform-xml-drugbank.yml).

## Convert CSV/TSV with [AutoR2RML](https://github.com/amalic/autor2rml)

```shell
cwl-runner --outdir output/stitch-sample \
  data2services-cwl-workflows/workflows/workflow-csv.cwl \
  support/example-config/config-transform-csv-stitch.yml
```

> See [config file](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/support/example-config/config-transform-csv-stitch.yml).

## Convert CSV/TSV with [AutoR2RML](https://github.com/amalic/autor2rml) and split a property

```shell
cwl-runner --outdir output/eggnog-sample \
  data2services-cwl-workflows/workflows/workflow-csv-split.cwl \
  support/example-config/config-transform-split-eggnog.yml
```

> See [config file](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/support/example-config/config-transform-split-eggnog.yml).

## Generate mappings for AutoR2RML

When you don't have set the mappings for R2RML: generates the generic RDF and template SPARQL mapping files, and load the generic RDF.

```shell
cwl-runner --outdir output/stitch-sample \
  data2services-cwl-workflows/workflows/workflow-csv-generate_mapping.cwl \
  support/example-config/config-transform-csv-stitch.yml
```

> Same [config file](https://github.com/MaastrichtU-IDS/data2services-transform-biolink/blob/master/support/cwl/config/config-transform-csv-stitch.yml) as the regular CSV workflow.

## Run in the background

```shell
nohup cwl-runner --outdir output/drugbank-sample \
  data2services-cwl-workflows/workflows/workflow-xml.cwl \
  support/example-config/config-transform-xml-drugbank.yml &
```

> Write terminal output to `nohup.out`.
