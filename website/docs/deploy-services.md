---
id: deploy-services
title: Deploy services
---

## Recommended services

Recommended services easy to set to improve accessibility of your triplestore.

### Grlc SPARQL API

[![grlc API](https://img.shields.io/github/stars/CLARIAH/grlc?label=GitHub&style=social)](https://github.com/CLARIAH/grlc)

Deploying a serverless API to access and explore your SPARQL endpoint is really easy to do with **[grlc.io](http://grlc.io/)**. You just need to define a few SPARQL queries in a GitHub repository, and grlc.io will handle everything else to expose a Swagger API (aka. Open API) to access your knowledge graph. 

:::info Enable easy data exploration

🧭 This API will be the entrypoint for people who want to discover your data: they can quickly explore and understand the structure of your knowledge graph through the query you exposed.

:::

To make this example easier to reproduce, we will use the existing [grlc.io](http://grlc.io/) API deployment defined for the [food-claims-kg](https://github.com/MaastrichtU-IDS/food-claims-kg) as example

1. 👩‍💻 Provide the URL of SPARQL endpoint to query in the [`endpoint.txt` file](https://github.com/MaastrichtU-IDS/food-claims-kg/blob/master/endpoint.txt)

2. 👨‍💻 Define the SPARQL queries in `.rq` files at the base of the git repo.

   :::note Example

   See [this example of a `.rq` file](https://github.com/MaastrichtU-IDS/food-claims-kg/blob/master/get-claims-for-food.rq) to define a SPARQL query with a parameter (used to filter using `regex()`).

   :::

3. That's it 🤯 you can go to your API Swagger UI automatically generated and hosted by [grlc.io](http://grlc.io/) based on the GitHub repository URL: http://grlc.io/api-git/MaastrichtU-IDS/food-claims-kg

Bonus: combine [grlc.io](https://github.com/MaastrichtU-IDS/food-claims-kg) with the GraphDB search index query, and you have a Search API for your knowledge graph! 🔎

:::tip An active project

The project is still active and reactive, feel free to [post an issue](https://github.com/CLARIAH/grlc/issues) if you face any problem.

:::

---

### Into-the-graph web UI

[![into-the-graph](https://img.shields.io/github/stars/MaastrichtU-IDS/into-the-graph?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/into-the-graph)

[**Into the Graph**](https://github.com/MaastrichtU-IDS/into-the-graph/tree/typescript-rewrite) is a lightweight and fast [RDF](https://www.w3.org/RDF/) browser that just need a SPARQL endpoint URL to give a comfortable experience when exploring differents graphs.

:::caution Work in progress

**Into the Graph** is still in development. It is mainly tested for biomedical SPARQL endpoints, such as [Bio2RDF](https://bio2rdf.org)

:::

:::info Access into-the-graph

Access into-the-graph at https://maastrichtu-ids.github.io/into-the-graph

:::

This RDF linked data browser features:

- A web-based UI to browse SPARQL endpoints content easily. Stateful  URL to resolve a specific URI in a specific SPARQL endpoint can be  defined using the `uri` and `endpoint` parameters. Tested with RDF4J (Ontotext GraphDB) and Virtuoso SPARQL endpoints.
- Visualize the data as a datatable, or a nodes-edges network
- Easily search for concepts in the triplestore. Possibility to change the SPARQL query to define the custom query to use the Search index of  different triplestores in [settings](http://trek.semanticscience.org/settings) (Ontotext GraphDB and Virtuoso triplestores documented).
- Insights about the content of the triplestore and its different graphs, using precomputed [HCLS descriptives metadata](https://www.w3.org/TR/hcls-dataset/).

---

## Additional services

Additional services to work with RDF data.

### BioThings Studio

[![RMLMapper](https://img.shields.io/github/stars/biothings/biothings_studio?label=GitHub&style=social)](https://github.com/biothings/biothings_studio)

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

---

### LinkedDataHub

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

### LinkedPipes

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

### YASGUI

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

### LODEstar

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

### Trifid

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

### brwsr

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

### RhizomerEye

[RhizomerEye](https://rhizomer.rhizomik.net/about) is a tool to expose a SPARQL endpoint as REST API and deploy a Web UI to browse the triplestore.

See the source code for the [RhizomerAPI](https://github.com/rhizomik/rhizomerAPI) and [RhizomerEye](https://github.com/rhizomik/rhizomerEye).

The Web UI has been deployed publicly for a few triplestores:

* [COVID-19](https://rhizomer.rhizomik.net/datasets/covid19/ucsb:Record)
* [DBpedia](https://rhizomer.rhizomik.net/datasets/dbpedia/describe?uri=http:%2F%2Fdbpedia.org%2Fresource%2FEngland)

---

### TriplyDB

See [official documentation](https://triply.cc/docs/triply-db-getting-started). It allows to deploy the following services over a triplestore:

* [YASGUI SPARQL endpoint](https://triplydb.com/wouter/linkedmdb/sparql/linkedmdb)
* [Search index](https://triplydb.com/wouter/linkedmdb/search/search) using ElasticSearch.
* [Web UI](https://triplydb.com/wouter/linkedmdb/id/actor/1) to resolve and browse a triplestore
* Supports graphs in the [TPF table browser](https://triplydb.com/wouter/linkedmdb/table) (not in the [browser](https://triplydb.com/wouter/linkedmdb/browser?resource=https%3A%2F%2Ftriplydb.com%2Fwouter%2Flinkedmdb%2Fvocab%2FActor&focus=forward))

:::warning No self-hosting

[TriplyDB](https://triplydb.com/) is hosted centrally and cannot be deployed locally 🚫

:::