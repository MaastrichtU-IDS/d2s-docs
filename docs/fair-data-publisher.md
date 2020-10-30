---
id: fair-data-publisher
title: FAIR data publisher
---

> **⚠️  Work in development.**

The **FAIR data publisher** is a set of straightforward instructions to quickly publish structured data complying with the **FAIR principles** (Findable, Accessible, Interoperable, Re-usable)

## Pick a data model

You will need to define the class and relations for the properties in your data. The easiest way is to find classes and properties in existing model (aka. ontologies). Some properties are standard like `rdf:type` and  `rdfs:label`, but for more specific concepts the best is to find an existing data model matching your model.

> Feel free to [contact us](https://gitter.im/um-dsri/data2services) to ask for help with choosing a data model.

### Search for ontologies

Search for relevant existing models in ontology repositories:

* [BioPortal](https://bioportal.bioontology.org/recommender) for biomedical concepts by the NCBI.
* [OntologyLookupService](https://www.ebi.ac.uk/ols/ontologies
  ) by the EBI
* [AgroPortal](http://agroportal.lirmm.fr/recommender) for agronomy by INRIA.
* [EcoPortal](http://ecoportal.lifewatchitaly.eu/) for ecology by Life Watch Italy.

> The [BioPortal Recommender](https://bioportal.bioontology.org/recommender) and [Search](https://bioportal.bioontology.org/search) services are efficient to look for concepts in most existing biomedical ontologies.

### Common ontologies

The [Linked Open Vocabulary (LOV)](https://lov.linkeddata.es/dataset/lov/) provide an overview of existing ontologies and the links between them.

* [**Semanticscience Integrated Ontology** (SIO)](https://github.com/MaastrichtU-IDS/semanticscience), a simple, integrated ontology of types and relations for rich description of objects, processes and their attributes.
* [**BioLink Model**](https://biolink.github.io/biolink-model/), A high level datamodel of biological entities ([genes](https://biolink.github.io/biolink-model/docs/Gene), [diseases](https://biolink.github.io/biolink-model/docs/Disease), [phenotypes](https://biolink.github.io/biolink-model/docs/Phenotype), [pathways](https://biolink.github.io/biolink-model/docs/Pathway), [individuals](https://biolink.github.io/biolink-model/docs/IndividualOrganism), [substances](https://biolink.github.io/biolink-model/docs/ChemicalSubstance), etc) and their [associations](https://biolink.github.io/biolink-model/docs/Association).
* [**Schema.org**](https://schema.org/docs/schemas.html), a collaborative project to define schemes for structured data on the Internet, on web pages, in email messages, and beyond.
  * Various classes described such as [schema:Person](https://schema.org/Person), [schema:MedicalGuideline](https://schema.org/MedicalGuideline), [schema:Review](https://schema.org/Review), [schema:ScholarlyArticle](https://schema.org/ScholarlyArticle), [schema:MedicalScholarlyArticle](https://schema.org/MedicalScholarlyArticle), [schema:Dataset](https://schema.org/Dataset), [etc](https://schema.org/docs/full.html).
  * Extensions available, such as [BioSchemas](https://bioschemas.org/profiles/Dataset/0.3-RELEASE-2019_06_14/) for biological data
  * Alternatively you can look into [Google Data Types](https://developers.google.com/search/docs/data-types/article), which are mainly built from schema.org and allow to describe and index your website using RDF (JSON-LD)
* [**DublinCore** (dc, dct, dctypes)](https://dublincore.org/specifications/dublin-core/dcmi-terms), one of the most generic vocabulary (includes properties such as `dc:identifier`, `dct:description`, `dct:creator`, `dct:license`, `dct:rights`...)
* [**PAV**: Provenance, Authoring and Versioning ontology](https://pav-ontology.github.io/pav/)
* [**PROV**: The Provenance Ontology](https://www.w3.org/TR/prov-o/), another ontology to describe provenance more in detail
* [**DCAT**: Data Catalog Vocabulary](https://www.w3.org/TR/vocab-dcat-2/), to describe datasets
* [**NCIT**: National Cancer Institute Thesaurus](https://bioportal.bioontology.org/ontologies/NCIT), a vocabulary for clinical care, translational and basic research, and public information and administrative activities.

### Collaborative

Report interesting ontologies for your domain by creating an issue.

## Use Python

We provide example to easily build a RDF knowledge graph 

The best way to generate RDF data using Python is to use the `rdflib` library. You can access the `rdflib` documentation [here](https://rdflib.readthedocs.io/en/stable/).

We recommend to use `pandas` to handle tabular files as dataframes efficiently.

You can easily map any structured data (CSV, TSV, XLSX, SPSS, SQL, XML, JSON, YAML) to RDF using Python and `rdflib`.

## Use the RDF Mapping Language


Use the [RDF Mapping Language (RML)](https://rml.io/) to map your structured data (CSV, TSV, XLSX, SPSS, SQL, XML, JSON, YAML) to RDF using a declarative mapping language. 

We recommend to use [YARRRML](https://rml.io/yarrrml/), a mapping language to replace the RDF by YAML, to make the definition of RML mappings easier.

The **[Matey Web UI editor 🦜](https://rml.io/yarrrml/matey/#edit)** is available to easily write and test RML mappings in [YAML](https://yaml.org/) files using the [YARRRML](https://rml.io/yarrrml/) simplified mapping language. The mappings can be conveniently tested in the browser on a sample of the file to transform.

* RML Specifications can be found as a [W3C unofficial draft](https://rml.io/specs/rml/).

* See the [rml.io](https://rml.io/) website for more documentation about RML and the various tools built and deployed by Ghent University.

> YARRRML can also be parsed locally using a npm package:
>
> ```shell
> npm i @rmlio/yarrrml-parser -g
> ```
>

Example  of a YARRRML mapping file using the commonly needed [split function](https://rml.io/docs/rmlmapper/default-functions/#split):

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

## Automatically run using GitHub Actions

We use GitHub Actions to automatically run the different part of the workflow in a reproducible way:

* Run Python script (to directly generate RDF, or perform preprocessing of the data for RML)
* Run the RML mapper to generate the RDF data, if applicable
* Upload the generated RDF file to the SPARQL endpoint
* Generate and publish descriptive statistics for the published data

## Generate dataset descriptive statistics

After the RDF Knowledge Graph has been generated and loaded in a triplestore, [HCLS dataset descriptive statistics](https://www.w3.org/TR/hcls-dataset/) can be easily generated and published for the published dataset. 

Automate it by adding a GitHub Action to your workflow:

```yaml
- name: Generate dataset descriptive statistics
  uses: MaastrichtU-IDS/d2s-sparql-operations
```

* Insert dataset metadata defined in the [datasets/cohd/metadata](https://github.com/MaastrichtU-IDS/d2s-project-template/tree/master/datasets/cohd/metadata) folder.
* [Compute and insert HCLS](https://github.com/MaastrichtU-IDS/d2s-scripts-repository/tree/master/sparql/compute-hcls-stats) descriptive statistics using SPARQL queries.

## Expose the data with a FAIR API

Define a few simple SPARQL query to expose an Open API with a Swagger UI to easily query your data

## Enable persistent identifiers

TODO: start a service to enable URI resolution 

## Scale to huge dataset

Large datasets can be resource intensive to convert and fail due to insufficient memory. In this case you optimize your Python script to run in parallel, or use the [RMLStreamer](/docs/services-utilities#rmlstreamer), a scalable implementation of the [RDF Mapping Language Specifications](https://rml.io/specs/rml/) to generate RDF out of structured input data streams running in parallel on a Apache Flink cluster.

The [RML mappings](https://rml.io/specs/rml/) takes RML mapping file as input to convert datasets in a streaming fashion.

> ⚠️ The RMLStreamer is still in development, some features such as functions are yet to be implemented. Use a Python preprocessing scripts to prepare the data before the mapping.

Start Apache Flink using Docker:

[![Apache Flink](/img/flink-logo.png)](https://flink.apache.org/)

Starting [Apache Flink](https://flink.apache.org/) on http://localhost:8078:

```shell
docker-compose up apache-flink
```

>  [Contact us](https://gitter.im/um-dsri/data2services) to run your run your transformation on the [Data Science Research Infrastructure](https://maastrichtu-ids.github.io/dsri-documentation/) Flink cluster if you need it.
