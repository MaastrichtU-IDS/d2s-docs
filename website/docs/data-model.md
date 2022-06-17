---
id: data-model
title: Define the data model
---

## Define a conceptual model 

Define a conceptual model of the data you want to convert.

For example with CSV files or relational databases tables, most of the time:

* each **file/table** represents a **class** (aka. type),
* each **row** is an **entity**,
* each **column** is a **property** of this entity

![Tables to RDF](/img/tables_to_rdf.png)

> *Source: https://kgbook.org*

If you create a diagram for your conceptual model, we encourage you to add an image of it in the `model` folder of your repository.

## Tools to build your model

Depending on what you are trying to achieve you might not need to use the same tools. If you want to build a complete OWL ontology, then a specialized tool like Protege would be more suited.

If you just want to define a schema with only a few classes and properties, then your favorite drawing tool will be probably enough. A popular tool used for defining data model is Diagram.io (previously yed and draw.io). There is also the [Graffoo](https://essepuntato.it/graffoo/) tool to generate an ontology from your Diagram.io diagram.

Here is a non-exhaustive list of tools specialized to define data models:

* Protege is the most popular and mature tool to build OWL ontologies. It is available as Desktop version and Web version (the desktop version has more functionalities)
* Gra.fo is a commercial website that will allow you to define your model using a nice graphical interface with nodes and edges. It can be useful for small simple models, but will require you to pay to unlock advanced features.

## Search for ontology concepts

You will need to define the class and relations for the properties in your data. The easiest way is to find classes and properties in existing model (aka. ontologies). Some properties are standard like `rdf:type` and  `rdfs:label`, but for more specific concepts the best is to find an existing data model matching your model.

📝 Write an **example RDF entity** in the turtle format for each class you expect to create. Put the file(s) in the `model` folder

You can search for relevant concepts in existing models in ontology repositories:

* [Linked Open Vocabulary (LOV)](https://lov.linkeddata.es/dataset/lov/) for generic ontologies
* [BioPortal](https://bioportal.bioontology.org/recommender) for biomedical concepts by the NCBI 🇺🇸
* [OntologyLookupService](https://www.ebi.ac.uk/ols/ontologies
  ) for biomedical concepts by the EBI 🇪🇺
* [AgroPortal](http://agroportal.lirmm.fr/recommender) for agronomy by INRIA 🌾
* [EcoPortal](http://ecoportal.lifewatchitaly.eu/) for ecology by Life Watch Italy 
* [Bartoc.org](https://bartoc.org) for social science and digital humanities

Here is a list of popular ontologies for generic or biomedical concepts:

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

If you need to know which URI is behind a mysterious prefix, http://prefix.cc is a handy service to resolve prefixes., e.g. http://prefix.cc/bl

## Define a validation shape

📝 Write a **SHACL or ShEx shape** file describing exactly the model (classes and properties) you expect to use in the `model` folder. This will be used later for validating the created KG.

