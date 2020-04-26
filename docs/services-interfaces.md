---
id: services-interfaces
title: Interfaces
---

Web UI to browse a triplestore through its SPARQL endpoint: resolve URI, SPARQL query editor.

## into-the-graph

[![GitHub](https://img.shields.io/github/stars/MaastrichtU-IDS/into-the-graph?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/into-the-graph)

[into-the-graph](https://github.com/MaastrichtU-IDS/into-the-graph) is a lightweight RDF linked data browser supporting graphs.

Browse various SPARQL endpoints and their graphs by providing the endpoint URL. It includes a YASGUI editor and provide insights about the graphs content using  precomputed [HCLS descriptive statistics](https://github.com/MaastrichtU-IDS/d2s-scripts-repository/tree/master/sparql/compute-hcls-stats).

See an example deployment at [trek.semanticscience.org](http://trek.semanticscience.org). The SPARQL endpoint can be changed directly on the web app in [/settings](http://trek.semanticscience.org/settings).

```shell
d2s start into-the-graph

docker run --rm -it -p 8082:80 umids/into-the-graph:latest
```

> Access on http://localhost:8082

## d2s-api

[![OpenAPI](/img/openapi-logo.png)](https://www.openapis.org/)

[![GitHub](https://img.shields.io/github/stars/MaastrichtU-IDS/d2s-api?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/d2s-api)

[Web services](https://github.com/MaastrichtU-IDS/d2s-api) described following the [OpenAPI 3.0](http://spec.openapis.org/oas/v3.0.1) specifications. The generated services enable the user to query a [BioLink-compliant](https://biolink.github.io/biolink-model/) RDF knowledge graph using HTTP request following the [Reasoner API Specifications](https://github.com/NCATS-Tangerine/NCATS-ReasonerStdAPI/tree/master/API). 

```shell
d2s start api

docker run -it --rm -p 8080:8080 \
  --net d2s-core_network \
  -e ENDPOINT="http://graphdb:7200/repositories/test" \
  umids/d2s-api
```

> Access on http://localhost:8080

---

## YASGUI

[![OpenLink Virtuoso](/img/yasgui-logo.png)](http://doc.yasgui.org/)

[![GitHub](https://img.shields.io/github/stars/OpenTriply/YASGUI?label=GitHub&style=social)](https://github.com/OpenTriply/YASGUI)

The popular [Yet Another Sparql Graphical User Interface](https://hub.docker.com/r/erikap/yasgui).

```shell
docker run -it --rm --name yasgui -p 8088:80 \
	-e "DEFAULT_SPARQL_ENDPOINT=http://dbpedia.org/sparql" \
	-e "ENABLE_ENDPOINT_SELECTOR=true" \
	erikap/yasgui
```

> Require the SPARQL endpoint to [allow Cross-Origin Requests](https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/).

> Access at http://localhost:8088

---

## Comunica Widget

[![GitHub](https://img.shields.io/github/stars/comunica/jQuery-Widget.js?label=GitHub&style=social)](https://github.com/comunica/jQuery-Widget.js)

A [jQuery widget](http://query.linkeddatafragments.org/) to query heterogeneous interfaces using Comunica SPARQL and GraphQL.  

```shell
d2s start comunica

docker run -p 8084:80 -it --rm umids/comunica-sparql-widget

# Provide a local queries.json file
docker run -v $(pwd)/workspace/comunica-settings.json:/usr/share/nginx/html/queries.json -p 8080:80 -it --rm umids/comunica-sparql-widget
```

> Access on http://localhost:8084

> `settings.json` file and `queries` needs to be changed before `docker build`. See [documentation](https://github.com/vemonet/jQuery-Widget.js).

> **TODO**: improve how settings and queries pass (script to download them from URL before starting nginx?.

See [documentation](https://comunica.github.io/Article-ISWC2018-Demo-GraphQlLD/) about Comunica's GraphQL-LD implementation.

---

## LODEstar

[![GitHub](https://img.shields.io/github/stars/EBISPOT/lodestar?label=GitHub&style=social)](https://github.com/EBISPOT/lodestar)

[SPARQL](https://www.w3.org/TR/sparql11-query/) query and URI resolution, available through [DockerHub](https://hub.docker.com/r/netresearch/lodestar).

```shell
docker run --rm -d --name lodestar -p 8082:8080 \
  -e ENDPOINT_URL=https://graphdb.dumontierlab.com/repositories/ncats-red-kg \
  -e TOP_RELATIONSHIP=http://w3id.org/biolink/vocab/id,http://w3id.org/biolink/vocab/name,http://w3id.org/biolink/vocab/description \
  -e LABEL=http://w3id.org/biolink/vocab/label \
  -e DESCRIPTION=http://w3id.org/biolink/vocab/description \
  -e MAX_OBJECTS=10 \
  -e SERVICE_BASE_URI=http://localhost:8080/ncats-red-kg netresearch/lodestar
```

> Access at [http://localhost:8082/lodestar/sparql](http://localhost:8082/lodestar/sparql)

> Does not support graphs 🚫

---

## Trifid

[![GitHub](https://img.shields.io/github/stars/zazuko/trifid?label=GitHub&style=social)](https://github.com/zazuko/trifid)

Linked Data Server: [URI dereferencing](http://lod.opentransportdata.swiss/sparql/), custom HTML render, [YASGUI SPARQL endpoint](http://lod.opentransportdata.swiss/sparql/).

```shell
git clone https://github.com/vemonet/trifid.git
docker build -t trifid ./trifid

docker run --rm -ti --name trifid -p 8080:8080 trifid --sparql-endpoint-url=https://graphdb.dumontierlab.com/repositories/test --dataset-base-url=https://w3id.org/d2s/

docker run --rm -ti --name trifid -v /home/vemonet/sandbox/trifid:/data -p 8080:8080 trifid --config=/data/config-ncats-red-kg.json
```

> Go to http://localhost:8080/dataset/huri/ to resolve https://w3id.org/d2s/dataset/huri/ 

> Modified version on [GitHub](https://github.com/vemonet/trifid).

[Original project](https://github.com/zazuko/trifid) available on [DockerHub](https://hub.docker.com/r/zazuko/trifid/). But config not working.

```shell
docker run -ti -p 8080:8080 zazuko/trifid
# Not working, provide env config file?
docker run -ti -p 8080:8080 -e TRIFID_CONFIG=config-ncats-red-kg.json zazuko/trifid
docker run -ti -p 8080:8080 -e SPARQL_ENDPOINT_URL=https://graphdb.dumontierlab.com/repositories/test -e DATASET_BASE_URL=https://w3id.org/d2s/ zazuko/trifid
```

> Access [default example](https://github.com/zazuko/tbbt-ld/blob/master/dist/tbbt.nq) on http://localhost:8080/data/person/mary-cooper to resolve URI.

> Does not support graphs 🚫

---

## brwsr

[![GitHub](https://img.shields.io/github/stars/Data2Semantics/brwsr?label=GitHub&style=social)](https://github.com/Data2Semantics/brwsr)

Lightweight Linked Data Browser.

```shell
git clone https://github.com/Data2Semantics/brwsr.git
docker-compose up
```

> Go to http://localhost:5000.

> Change the SPARQL endpoint in the [docker-compose.yml](https://github.com/Data2Semantics/brwsr/blob/master/docker-compose.yml).

> Does not support graphs 🚫

---

## RhizomerEye

[RhizomerEye](https://rhizomer.rhizomik.net/about) is a tool to expose a SPARQL endpoint as REST API and deploy a Web UI to browse the triplestore.

See the source code for the [RhizomerAPI](https://github.com/rhizomik/rhizomerAPI) and [RhizomerEye](https://github.com/rhizomik/rhizomerEye).

The Web UI has been deployed publicly for a few triplestores:

* [COVID-19](https://rhizomer.rhizomik.net/datasets/covid19/ucsb:Record)
* [DBpedia](https://rhizomer.rhizomik.net/datasets/dbpedia/describe?uri=http:%2F%2Fdbpedia.org%2Fresource%2FEngland)

> Deployment will be integrated in [d2s](https://pypi.org/project/d2s/) soon.

---

## TriplyDB

See [official documentation](https://triply.cc/docs/triply-db-getting-started). It allows to deploy the following services over a triplestore:

* [YASGUI SPARQL endpoint](https://triplydb.com/wouter/linkedmdb/sparql/linkedmdb)
* [Search index](https://triplydb.com/wouter/linkedmdb/search/search) using ElasticSearch.
* [Web UI](https://triplydb.com/wouter/linkedmdb/id/actor/1) to resolve and browse a triplestore
* Supports graphs in the [TPF table browser](https://triplydb.com/wouter/linkedmdb/table) (not in the [browser](https://triplydb.com/wouter/linkedmdb/browser?resource=https%3A%2F%2Ftriplydb.com%2Fwouter%2Flinkedmdb%2Fvocab%2FActor&focus=forward))

> [TriplyDB](https://triplydb.com/) is hosted centrally and cannot be deployed locally 🚫
