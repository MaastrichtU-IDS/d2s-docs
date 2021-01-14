---
id: choose-data-model
title: Choose a data model
---

You will need to define the class and relations for the properties in your data. The easiest way is to find classes and properties in existing model (aka. ontologies). Some properties are standard like `rdf:type` and  `rdfs:label`, but for more specific concepts the best is to find an existing data model matching your model.

> Feel free to [contact us](https://gitter.im/um-dsri/data2services) to ask for help with choosing a data model.

## Search for ontologies

Search for relevant existing models in ontology repositories:

* [BioPortal](https://bioportal.bioontology.org/recommender) for biomedical concepts by the NCBI.
* [OntologyLookupService](https://www.ebi.ac.uk/ols/ontologies
  ) by the EBI
* [AgroPortal](http://agroportal.lirmm.fr/recommender) for agronomy by INRIA.
* [EcoPortal](http://ecoportal.lifewatchitaly.eu/) for ecology by Life Watch Italy.

> The [BioPortal Recommender](https://bioportal.bioontology.org/recommender) and [Search](https://bioportal.bioontology.org/search) services are efficient to look for concepts in most existing biomedical ontologies.

## Common ontologies

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

## Ontology design with Protégé

![protege](/img/protege-logo.png)

You can use the [Protégé ontology editor](https://protege.stanford.edu/) to build your ontology.

* [Install Protégé](http://protegeproject.github.io/protege/installation/) on your computer for better performance than the web hosted service.
* Or use Web Protégé for its collaborative features.

## Resolve prefixes

http://prefix.cc is a handy service to resolve prefixes.

> E.g. http://prefix.cc/bl



