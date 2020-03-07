---
id: services-access-rdf
title: RDF access
---

We list here the services available for deployment within a Data2Services project.

> The `d2s` command is provided when available. A `docker run` command is provided for every module.

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/data2services-ecosystem/pulls) or creating a [new issue](https://github.com/MaastrichtU-IDS/d2s-documentation/issues). The list of modules we are planning to work on can be found in the [Wiki](https://github.com/MaastrichtU-IDS/data2services-ecosystem/wiki/Modules-to-develop).

Only [Docker](https://docs.docker.com/install/) is required to run the modules. A typical module should only require a few arguments to be run, making it easy to deploy and combine them.

---

## d2s-sparql-operations

[![GitHub](https://img.shields.io/github/stars/MaastrichtU-IDS/d2s-sparql-operations?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/d2s-sparql-operations)

Execute [SPARQL](https://www.w3.org/TR/sparql11-query/) queries from string, URL or multiple files using [RDF4J](http://rdf4j.org/). Available on [DockerHub](https://hub.docker.com/r/umids/d2s-sparql-operations).

```shell
docker run -it --rm umids/d2s-sparql-operations:latest -op select \
  -sp "select distinct ?Concept where {[] a ?Concept} LIMIT 10" \
  -ep "http://dbpedia.org/sparql"
```

> See [documentation](https://maastrichtu-ids.github.io/d2s-sparql-operations/).

------

## Comunica

[![OpenLink Virtuoso](/img/comunica.svg)](https://comunica.linkeddatafragments.org/)

[![GitHub](https://img.shields.io/github/stars/comunica/comunica?label=GitHub&style=social)](https://github.com/comunica/comunica)

Framework to perform [federated queries](https://www.w3.org/TR/sparql11-federated-query/) over a lot of different stores (triplestores, [TPF](http://linkeddatafragments.org/in-depth/), [HDT](http://www.rdfhdt.org/)).

```shell
docker run -it comunica/actor-init-sparql \
	http://fragments.dbpedia.org/2015-10/en \
	"CONSTRUCT WHERE { ?s ?p ?o } LIMIT 100"
```

---

## d2s-api

[![GitHub](https://img.shields.io/github/stars/MaastrichtU-IDS/d2s-api?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/d2s-api)

[Web services](https://github.com/MaastrichtU-IDS/d2s-api) described following the [OpenAPI 3.0](http://spec.openapis.org/oas/v3.0.1) specifications. The generated services enable the user to query a [BioLink-compliant](https://biolink.github.io/biolink-model/) RDF knowledge graph using HTTP request following the [Reasoner API Specifications](https://github.com/NCATS-Tangerine/NCATS-ReasonerStdAPI/tree/master/API). 

```shell
d2s start api

docker run -it --rm -p 8080:8080 \
  --net d2s-cwl-workflows_network \
  -e ENDPOINT="http://graphdb:7200/repositories/test" \
  umids/d2s-api
```

> Access on http://localhost:8080
