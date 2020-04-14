---
id: guide-ontology
title: Choose an ontology
---

## Use the Semanticscience Integrated Ontology (SIO)

The Semanticscience Integrated Ontology (SIO) provides a simple, integrated ontology of types and relations for rich description of objects, processes and their attributes. See the [website](https://github.com/MaastrichtU-IDS/semanticscience) for more details.


## Import the BioLink ontology

Import the ontologies describing the predicates and classes used by your RDF Knowledge Graph to enable reasoning and build a more complete graph.

If you are using the BioLink model, the ontology can be imported from the [BioLink model GitHub  repository](https://raw.githubusercontent.com/biolink/biolink-model/master/biolink-model.ttl) or the [latest release](https://github.com/biolink/biolink-model/releases). We recommend to use the graph https://w3id.org/biolink/biolink-model when importing the ontology.

## Find relevant ontologies

Search for relevant existing models in ontology repositories:

* [BioPortal](https://bioportal.bioontology.org/recommender) for biomedical concepts by the NCBI.
* [OntologyLookupService](https://www.ebi.ac.uk/ols/ontologies
  ) by the EBI
* [AgroPortal](http://agroportal.lirmm.fr/recommender) for agronomy by INRIA.

> The [BioPortal Recommender](https://bioportal.bioontology.org/recommender) and [Search](https://bioportal.bioontology.org/search) services are efficient to look for concepts in most existing biomedical ontologies.

## Ontology design with Protégé

![](/img/protege-logo.png)

You can use the [Protégé ontology editor](https://protege.stanford.edu/) to build your ontology.

[Install Protégé](http://protegeproject.github.io/protege/installation/) on your computer for better performance than the web hosted service.

## Resolve prefixes

http://prefix.cc is a handy service to resolve prefixes.

> E.g. http://prefix.cc/bl

## Try the Zazuko Ontology manager

[Collaborative ontology editor](https://zazuko.github.io/ontology-manager/). See the demo ontology editor at http://editor.zazuko.com/

To deploy it using Docker:

```shell
git clone https://github.com/zazuko/ontology-manager zazuko-ontology-manager
cd zazuko-ontology-manager

# Add environment var to docker-compose.yml app:
environment:
  VIRTUAL_HOST: my-host.nip.io

# Update env variables in file
mv .env.example .env

# Run this in terminal also?
CUSTOMER_NAME=ids
POSTGRESQL_PASSWORD=make-this-secret
POSTGRESQL_HOST=db
POSTGRESQL_USER=postgres
POSTGRESQL_DATABASE=postgres
POSTGRAPHILE_TOKEN_SECRET=this-is-secret-as-well
# Token used as hash/salt, keep it secret for JWT security

# Optional variables
OAUTH_HOST=https://github.com/login/oauth
OAUTH_CLIENT_ID=
OAUTH_CLIENT_SECRET=
GITHUB_PERSONAL_ACCESS_TOKEN=
DEBUG=editor:*
```

Build and run

```shell
docker-compose build
docker-compose up -d
```

> Finish installation at http://my-host.nip.io/install

> Go to http://my-host.nip.io

Check logs

```shell
docker-compose logs -f app nginx
```

