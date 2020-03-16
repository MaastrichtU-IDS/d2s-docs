---
id: guide-ontology
title: Choose an ontology
---

![](/img/protege-logo.png)

## Import the BioLink ontology

Import the ontologies describing the predicates and classes used by your RDF Knowledge Graph to enable reasoning and build a more complete graph.

If you are using the BioLink model, the ontology can be imported from the [BioLink model GitHub  repository](https://raw.githubusercontent.com/biolink/biolink-model/master/biolink-model.ttl) or the [latest release](https://github.com/biolink/biolink-model/releases). We recommend to use the graph https://w3id.org/biolink/biolink-model when importing the ontology.

## Find relevant ontologies

Search for relevant existing models in ontology repositories:

* [BioPortal](https://bioportal.bioontology.org/recommender) for biomedical concepts by the NCBI.
* [OntologyLookupService](https://www.ebi.ac.uk/ols/ontologies
  ) by the EBI
* [AgroPortal](http://agroportal.lirmm.fr/recommender) for agronomy by INRIA.

## Ontology design with Protégé

You can use the [Protégé ontology editor](https://protege.stanford.edu/) to build your ontology.

[Install Protégé](http://protegeproject.github.io/protege/installation/) on your computer for better performance than the web hosted service.

> TODO: tuto use BioPortal recommender

## Resolve prefixes

http://prefix.cc is a handy tool to resolve prefixes

> E.g. http://prefix.cc/bl