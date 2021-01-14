---
id: deploy-additional-services
title: Additional services
---

Additional services to work with RDF data.

## BioThings

[![RMLMapper](https://img.shields.io/github/stars/biothings/biothings_studio?label=GitHub&style=social)](https://github.com/biothings/biothings_studio)

The [BioThings SDK](https://docs.biothings.io/en/latest/) is a [Python package](https://pypi.org/project/biothings/) to build and deploy annotated [Smart APIs](https://smart-api.info/) from flat data files. Multiple BioThings APIs can be built using the BioThings Hub, and exposed using BioThings Web. 

See the [BioThings API Specifications](https://biothings.io/specs/). 

### BioThings Studio

[BioThings Studio](https://github.com/biothings/biothings_studio) enables to deploy a Docker container with all dependencies required to build BioThings APIs. See the [BioThings Studio documentation](https://docs.biothings.io/en/latest/doc/studio.html).

```shell
docker run -d --rm --name studio \
  -p 8001:8080 -p 8000:8000 -p 9000:9000 \
  -p 7022:7022 -p 7080:7080 -p 9200:9200 -p 27017:27017 \
  -v $(pwd)/workspace/biothings:/data \
  biothings/biothings-studio:0.2a
```

Access BioThings Studio web UI at http://localhost:8880

Access BioThings API at http://localhost:7080

### Use the BioThings SDK

Available on [PyPi](https://pypi.org/project/biothings/). BioThings SDK provides a Python-based toolkit to build  high-performance data APIs (or web services) from a single data source  or multiple data sources. It has the particular focus on building data  APIs for biomedical-related entities, a.k.a "BioThings" (such as genes,  genetic variants, drugs, chemicals, diseases, etc).

```shell
pip install biothings
```

> Documentation about BioThings SDK can be found at http://docs.biothings.io

### Use the BioThings Explorer

BioThings APIs can then be queried by the BioThings Explorer: https://biothings.io/explorer

A SDK is also [available on PyPi](https://pypi.org/project/biothings-explorer/) to use the BioThings Explorer

```shell
pip install biothings-explorer
```

---

## LinkedDataHub

[![](https://img.shields.io/github/stars/AtomGraph/LinkedDataHub?label=GitHub&style=social)](https://github.com/AtomGraph/LinkedDataHub)

[LinkedDataHub](https://atomgraph.github.io/LinkedDataHub/) is an [Open Source](https://github.com/AtomGraph/LinkedDataHub) Knowledge Graph management system. You can use it to manage data, create visualizations and build apps on RDF Knowledge Graphs.

Clone the repository and prepare the environment file:

```shell
git clone https://github.com/AtomGraph/LinkedDataHub.git
cd LinkedDataHub
cp .env_sample .env
```

Start LinkedDataHub:

```shell
docker-compose up -d
```

Access LinkedDataHub web UI at **https://localhost:4443**

:::caution Accept the risk

You will need to **accept the risk** due to self-signed certificates.

:::

You can now follow the web UI instructions to create an account to login to your LinkedDataHub.

* Access Fuseki admin UI at http://localhost:3030/ds

* Access Fuseki end user UI at [http://localhost:3031/ds](http://localhost:3031/ds?query=select%20*%20where%20{?s%20?p%20?o%20.}%20limit%2010)

To stop LinkedDataHub, run from the `LinkedDataHub` folder:

```shell
docker-compose down
```

---

## LinkedPipes

[LinkedPipes](https://linkedpipes.com/) is a Suite for Linked Data, with [ETL](https://etl.linkedpipes.com/), [Visualization](https://visualization.linkedpipes.com/) services and [Applications](https://applications.linkedpipes.com).

Try the [ETL web UI](https://demo.etl.linkedpipes.com/#/pipelines) to define data transformation pipelines to RDF:

```bash
git clone https://github.com/linkedpipes/etl linkedpipes-etl
cd linkedpipes-etl
LP_ETL_PORT=8091 docker-compose up -d
```

Access at http://localhost:8091

LinkedPipes proposes [various visualisation services](https://visualization.linkedpipes.com/):

* [LinkedPipes Visualization Assistant](https://github.com/ldvm/LDVMi/tree/master/doc/assistant): lets you configure interactive views based on Linked Data
* [LinkedPipes Applications](https://docs.applications.linkedpipes.com/): visualization web platform that allows the users to explore, visualize and publish LinkedData based visualizer applications

To stop the LinkedPipes ETL, run from the `linkedpipes-etl` folder:

```shell
docker-compose down
```

---

## YASGUI

[![GitHub](https://img.shields.io/github/stars/OpenTriply/YASGUI?label=GitHub&style=social)](https://github.com/OpenTriply/YASGUI)

The popular [Yet Another Sparql Graphical User Interface](https://hub.docker.com/r/erikap/yasgui).

```shell
docker run -it --rm --name yasgui -p 8088:80 \
	-e "DEFAULT_SPARQL_ENDPOINT=http://dbpedia.org/sparql" \
	-e "ENABLE_ENDPOINT_SELECTOR=true" \
	erikap/yasgui
```

Access at http://localhost:8088

:::caution CORS requests

Require the SPARQL endpoint to [allow Cross-Origin Requests](https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/).

:::

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

:::warning No graphs

Does not support graphs 🚫

:::

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

:::warning No graphs

Does not support graphs 🚫

:::

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

:::warning No graphs

Does not support graphs 🚫

:::

---

## RhizomerEye

[RhizomerEye](https://rhizomer.rhizomik.net/about) is a tool to expose a SPARQL endpoint as REST API and deploy a Web UI to browse the triplestore.

See the source code for the [RhizomerAPI](https://github.com/rhizomik/rhizomerAPI) and [RhizomerEye](https://github.com/rhizomik/rhizomerEye).

The Web UI has been deployed publicly for a few triplestores:

* [COVID-19](https://rhizomer.rhizomik.net/datasets/covid19/ucsb:Record)
* [DBpedia](https://rhizomer.rhizomik.net/datasets/dbpedia/describe?uri=http:%2F%2Fdbpedia.org%2Fresource%2FEngland)

---

## TriplyDB

See [official documentation](https://triply.cc/docs/triply-db-getting-started). It allows to deploy the following services over a triplestore:

* [YASGUI SPARQL endpoint](https://triplydb.com/wouter/linkedmdb/sparql/linkedmdb)
* [Search index](https://triplydb.com/wouter/linkedmdb/search/search) using ElasticSearch.
* [Web UI](https://triplydb.com/wouter/linkedmdb/id/actor/1) to resolve and browse a triplestore
* Supports graphs in the [TPF table browser](https://triplydb.com/wouter/linkedmdb/table) (not in the [browser](https://triplydb.com/wouter/linkedmdb/browser?resource=https%3A%2F%2Ftriplydb.com%2Fwouter%2Flinkedmdb%2Fvocab%2FActor&focus=forward))

:::warning No self-hosting

[TriplyDB](https://triplydb.com/) is hosted centrally and cannot be deployed locally 🚫

:::