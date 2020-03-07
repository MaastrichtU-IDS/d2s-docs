---
id: d2s-ecosystem
title: The Data2Services Ecosystem
---

This repository lists modules available for the **Data2Services framework**, enabling data processing to a [RDF](https://www.w3.org/RDF/) knowledge graph and deployment of services over this data.

> The `d2s` command is provided when available. A `docker run` command is provided for every module.

Feel free to propose new modules using [pull requests](https://github.com/MaastrichtU-IDS/data2services-ecosystem/pulls). The list of modules we are planning to work on can be found in the [Wiki](https://github.com/MaastrichtU-IDS/data2services-ecosystem/wiki/Modules-to-develop).

Only [Docker](https://docs.docker.com/install/) is required to run the modules. A typical module should only require a few arguments to be run, making it easy to deploy and combine them.

---

## Convert to RDF

### d2s-bash-exec

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/d2s-bash-exec?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/d2s-bash-exec)

Simple container to execute Bash scripts from URL (e.g. hosted on GitHub). Mainly used to download datasets. See [download script example](https://github.com/MaastrichtU-IDS/d2s-download/blob/master/datasets/TEMPLATE/download.sh).

```shell
docker run -it --rm -v /data/input:/data umids/d2s-bash-exec:latest https://raw.githubusercontent.com/MaastrichtU-IDS/d2s-transform-template/master/datasets/stitch/download/download-stitch.sh
```

> See on [DockerHub](https://hub.docker.com/r/umids/d2s-bash-exec).

---

### xml2rdf

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/xml2rdf?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/xml2rdf)

Streams XML to a [generic RDF](https://github.com/MaastrichtU-IDS/xml2rdf#rdf-model) representing the structure of the file. 

```shell
docker run --rm -it -v /data:/data umids/xml2rdf:latest  \
	-i "/data/d2s-workspace/file.xml.gz" \
	-o "/data/d2s-workspace/file.nq.gz" \
	-g "https://w3id.org/d2s/graph"
```

> See on [DockerHub](https://hub.docker.com/r/umids/xml2rdf).

---

### Apache Drill

[![Apache Drill](/img/drill-logo.png)](https://github.com/amalic/apache-drill)

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/apache-drill?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/apache-drill)

Exposes tabular text files (CSV, TSV, PSV) as SQL, and enables queries on large datasets. Used by [AutoR2RML](https://github.com/amalic/AutoR2RML) and [R2RML](https://github.com/amalic/r2rml) to convert tabular files to a generic RDF representation.

```shell
d2s start drill

docker run -dit --rm -p 8047:8047 -p 31011:31010 \
	--name drill -v /data:/data:ro umids/apache-drill:latest
```

> Access at [http://localhost:8047/](http://localhost:8047/).

> See on [DockerHub](https://hub.docker.com/r/umids/apache-drill).

---

### AutoR2RML

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/AutoR2RML?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/AutoR2RML)

Automatically generate [R2RML](https://www.w3.org/TR/r2rml/) files from Relational databases (SQL, Postgresql).

```shell
docker run -it --rm --link drill:drill --link postgres:postgres -v /data:/data \
	umids/autor2rml:latest -j "jdbc:drill:drillbit=drill:31010" -r \
	-o "/data/d2s-workspace/mapping.trig" \
	-d "/data/d2s-workspace" \
	-u "postgres" -p "pwd" \
	-b "https://w3id.org/d2s/" \
	-g "https://w3id.org/d2s/graph"
```

> Can be combined with [Apache Drill](https://github.com/amalic/apache-drill) to process tabular files

> See on [DockerHub](https://hub.docker.com/r/umids/autor2rml).

---

### R2RML

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/r2rml?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/r2rml)

Convert Relational Databases to RDF using the [R2RML](https://www.w3.org/TR/r2rml/) mapping language.

```shell
docker run -it --rm --net d2s-cwl-workflows_network \
  -v /data/d2s:/data \
  umids/r2rml:latest \ 
  --connectionURL jdbc:drill:drillbit=drill:31010 \
  --mappingFile /data/mapping.trig \
  --outputFile /data/rdf_output.nq \
  --format NQUADS
```

> Shared on `/data/d2s`

> Can be combined with [Apache Drill](https://github.com/amalic/apache-drill) to process tabular files.

> See on [DockerHub](https://hub.docker.com/r/umids/r2rml).

---

### RdfUpload

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/RdfUpload?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/RdfUpload)


Upload RDF files to a triplestore.

```shell
docker run -it --rm --link graphdb:graphdb -v /data/d2s-workspace:/data \
	umids/rdf-upload:latest -m "HTTP" -if "/data" \
	-url "http://graphdb:7200" -rep "test" \
	-un "username" -pw "password"
```

> Only tested on [GraphDB](https://github.com/MaastrichtU-IDS/graphdb) at the moment

> See on [DockerHub](https://hub.docker.com/r/umids/rdf-upload).

---

### json2xml

[![](https://img.shields.io/github/stars/lukas-krecan/json2xml?label=GitHub&style=social)](https://github.com/lukas-krecan/json2xml)

Convert JSON to XML using [json2xml](https://github.com/vemonet/json2xml). This XML can be then converted to generic RDF.

```shell
docker run -it -v /data/d2s-workspace:data vemonet/json2xml:latest -i /data/test.json 
```

> Shared on your machine at `/data/d2s-workspace`

---

### PyShEx

[![](https://img.shields.io/github/stars/hsolbrig/PyShEx?label=GitHub&style=social)](https://github.com/hsolbrig/PyShEx)

Validate RDF from a SPARQL endpoint against a [ShEx](http://shex.io/) file.

```shell
git clone https://github.com/hsolbrig/PyShEx.git
docker build -t pyshex ./PyShEx/docker
docker run --rm -it pyshex -gn '' -ss -ut -pr \
	-sq 'select ?item where{?item a <http://w3id.org/biolink/vocab/Gene>} LIMIT 1' \
    http://graphdb.dumontierlab.com/repositories/ncats-red-kg \
    https://github.com/biolink/biolink-model/raw/master/shex/biolink-modelnc.shex
```

---

### BridgeDb

[![](https://img.shields.io/github/stars/bridgedb/BridgeDb?label=GitHub&style=social)](https://github.com/bridgedb/BridgeDb)

[BridgeDb](https://www.bridgedb.org/) links URI identifiers from various datasets (Uniprot, PubMed).

```shell
docker run -p 8183:8183 bigcatum/bridgedb
```

---

## Store RDF

### GraphDB

[![GraphDB](/img/graphdb-logo.png)](https://github.com/MaastrichtU-IDS/graphdb)

[![GitHub](https://img.shields.io/github/stars/MaastrichtU-IDS/graphdb?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/graphdb)

[Ontotext](https://www.ontotext.com/) GraphDB triplestore including GUI and multiple repositories.

```shell
d2s start graphdb

docker build -t graphdb ./d2s-cwl-workflows/support/graphdb
docker run -d --rm --name graphdb -p 7200:7200 \
	-v /data/graphdb:/opt/graphdb/home \
	-v /data/graphdb-import:/root/graphdb-import \
	graphdb
```

> Download [standalone zip file](https://www.ontotext.com/products/graphdb/) of free version, and place it in `submodules/graphdb` before *docker build*.

> Access at [http://localhost:7200/](http://localhost:7200/)

---

### Virtuoso

[![OpenLink Virtuoso](/img/openlink-virtuoso.png)](https://virtuoso.openlinksw.com/)

[![GitHub](https://img.shields.io/github/stars/tenforce/docker-virtuoso?label=GitHub&style=social)](https://github.com/tenforce/docker-virtuoso)

[OpenLink Virtuoso](https://virtuoso.openlinksw.com/) triplestore.

```shell
d2s start virtuoso

docker run --name virtuoso \
    -p 8890:8890 -p 1111:1111 \
    -e DBA_PASSWORD=dba \
    -e SPARQL_UPDATE=true \
    -e DEFAULT_GRAPH=https://w3id.org/d2s/graph \
    -v /data/d2s-workspace/virtuoso:/data \
    -d tenforce/virtuoso
```

> Access at http://localhost:8890/ and SPARQL endpoint at http://localhost:8890/sparql.

> Admin login: `dba`

> See [Virtuoso documentation](/docs/guide-virtuoso) for more details.

---

### Blazegraph

[![GitHub](https://img.shields.io/github/stars/blazegraph/database?label=GitHub&style=social)](https://github.com/blazegraph/database)

A high-performance [RDF graph database](https://blazegraph.com/). See its [documentation for Docker](https://github.com/lyrasis/docker-blazegraph). Not developed for 4 years but still efficient and used by Wikidata.

```shell
d2s start blazegraph

# Start triplestore with specific UID and GID for the bulk load (UI)
# Tested on Ubuntu with $UID=1000 and nothing in $GROUPS (by default)
docker run --name blazegraph \
  -e BLAZEGRAPH_UID=$UID \
  -e BLAZEGRAPH_GID=$GROUPS \
  -p 8082:8080 \
  -v /data/d2s-workspace:/data \
  lyrasis/blazegraph:2.1.5

# To bulk load: create the dataloader.txt file
namespace=kb
propertyFile=/RWStore.properties
fileOrDirs=/data
format=n-triples
defaultGraph=http://defaultGraph
quiet=false
verbose=0
closure=false
durableQueues=true

# And submit it using a HTTP POST query to load all nt files in /data/d2s-workspace
curl -X POST \
  --data-binary @dataloader.txt \
  --header 'Content-Type:text/plain' \
http://localhost:8889/bigdata/dataloader
```

> UID and Group ID needs to be set in order to have the right permission to bulk load a file (example given for Ubuntu). And `RWStore.properties` can be rewritten, see [example](https://github.com/lyrasis/docker-blazegraph/blob/master/data/RWStore.properties). 

> Access UI at http://localhost:8882/bigdata

> SPARQL endpoint at http://localhost:8080/bigdata/sparql (original port)

To clear the graph go to the [update tab](http://localhost:8889/bigdata/#update) and enter `clear all`

---

### AllegroGraph

[![GitHub](https://img.shields.io/github/stars/franzinc/docker-agraph?label=GitHub&style=social)](https://github.com/franzinc/docker-agraph)

[AllegroGraph®](https://franz.com/agraph/) is a modern, high-performance, persistent graph database. It supports SPARQL, RDFS++, and Prolog reasoning from numerous client applications.  

```shell
d2s start allegrograph

docker run -d -m 1g -v $(pwd)/workspace/allegrograph:/data -p 10000-10035:10000-10035 --shm-size 1g --name allegrograph franzinc/agraph:v6.6.0
```

> Access at http://localhost:10035

> Default login: `test` / `xyzzy`

See [official documentation](https://franz.com/agraph/support/documentation/current/agload.html) for bulk load.

> **TODO:** fix shared volumes

---

### AnzoGraph

[AnzoGraph® DB](https://www.cambridgesemantics.com/anzograph/) by [Cambridge Semantics](https://www.cambridgesemantics.com/). See its [official documentation](https://docs.cambridgesemantics.com/anzograph/userdoc/deploy-docker.htm) to deploy with Docker, or its [DockerHub repository](https://hub.docker.com/r/cambridgesemantics/anzograph/). 

* Unregistered Free edition limited to 8G RAM, single user and single node deployment. 
* [Register](https://docs.cambridgesemantics.com/anzograph/userdoc/register-license.htm) to access the 16G single node deployment for free.

* Deploy AnzoGraph on multi-server cluster for horizontal scaling with the [Enterprise Edition 💶](https://customercenter.cambridgesemantics.com/products/anzograph/comparisonMatrix.html)

```shell
d2s start anzograph

docker run -d -p 8086:8080 -p 8443:8443 --name anzograph -v $(pwd)/workspace/anzograph:/opt/anzograph cambridgesemantics/anzograph:2.0.2
```

> Access at http://localhost:8086

> Default login: `admin` / `Passw0rd1`.

> [Kubernetes deployment](https://docs.cambridgesemantics.com/anzograph/userdoc/deploy-k8s-helm.htm) available using Helm.

---

### MarkLogic

Licensed triplestore 📜

Follow the [GitHub Docker instructions](https://github.com/alan-johnson/docker-marklogic) to deploy it.

> You will need to download the [MarkLogic Server 📥](https://developer.marklogic.com/products/marklogic-server/10.0)

---

### Stardog

Licensed triplestore 📜

See the [official Stardog documentation](https://www.stardog.com/docs/#_docker) for Docker, or the [DockerHub repository](https://hub.docker.com/r/stardog/stardog). A [JavaScript wrapper is available](https://github.com/stardog-union/stardog.js) to communicate with Stardog API and SPARQL endpoint.

```shell
docker run -v $(pwd)/workspace/stardog-license:/var/opt/stardog -e STARDOG_SERVER_JAVA_ARGS="-Xmx8g -Xms8g -XX:MaxDirectMemorySize=2g" stardog/stardog:latest
```

> ✔️ If you have a Stardog license, then put `stardog-license-key.bin` in the `workspace/stardog-license` folder.

> ❌ If you don't have a license key, you will be able to retrieve a trial license-key via the command line once you start Stardog.

---

### Neo4j

[![Neo4j](/img/neo4j_logo.png)](https://neo4j.com/)

[![GitHub](https://img.shields.io/github/stars/neo4j/neo4j?label=GitHub&style=social)](https://github.com/neo4j/neo4j)

[Neo4j](https://neo4j.com/) property graph database, using [Cypher](https://neo4j.com/docs/cypher-manual/current/) as query language. Deployed from [DockerHub](https://hub.docker.com/_/neo4j).

```shell
docker run -p 7474:7474 -p 7687:7687 -v /data/d2s-workspace:/data neo4j
```

> Access at http://localhost:7474.

> Login with `neoj4` / `neo4j` and change the password.

---

### Linked Data Fragments Server

[![Linked Data Fragments server](/img/linked-data-fragments.svg)](https://linkeddatafragments.org/)

[![GitHub](https://img.shields.io/github/stars/LinkedDataFragments/Server.js?label=GitHub&style=social)](https://github.com/LinkedDataFragments/Server.js)

Server supporting the [Memento](https://mementoweb.org/guide/rfc/) protocol to query over datasets (can be [HDT](http://www.rdfhdt.org/) or [SPARQL](https://www.w3.org/TR/sparql11-query/)).

```shell
# docker build -t ldf-server ./submodules/Server.js
docker run -p 3000:3000 -t -i --rm \
	-v /data/d2s-workspace:/data \
	-v $(pwd)/config.json:/tmp/config.json \
	umids/ldf-server:latest /tmp/config.json

# Query example
curl -IL -H "Accept-Datetime: Wed, 15 Apr 2013 00:00:00 GMT" http://localhost:3000/timegate/dbpedia?subject=http%3A%2F%2Fdata2services%2Fmodel%2Fgo-category%2Fprocess
```

> Require a [config.json](https://github.com/LinkedDataFragments/Server.js/blob/develop/config/config-example-memento.json) file

> Access at [http://localhost:3000](http://localhost:3000)

> **TODO:** add to `d2s start`

---


### rdf2hdt

[![GitHub](https://img.shields.io/github/stars/rdfhdt/hdt-cpp?label=GitHub&style=social)](https://github.com/rdfhdt/hdt-docker)

Convert RDF to [HDT](http://www.rdfhdt.org/) files. *Header, Dictionary, Triples* is a binary serialization format for RDF  that keeps big datasets compressed while maintaining search and browse operations without prior decompression.

```shell
docker run -it --rm -v $PWD:/data \
  rdfhdt/hdt-cpp rdf2hdt /data/input.nt /data/output.hdt
```

---

## Access RDF

### d2s-sparql-operations

[![GitHub](https://img.shields.io/github/stars/MaastrichtU-IDS/d2s-sparql-operations?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/d2s-sparql-operations)

Execute [SPARQL](https://www.w3.org/TR/sparql11-query/) queries from string, URL or multiple files using [RDF4J](http://rdf4j.org/).

```shell
docker run -it --rm umids/d2s-sparql-operations:latest -op select \
  -sp "select distinct ?Concept where {[] a ?Concept} LIMIT 10" \
  -ep "http://dbpedia.org/sparql"
```

> See [documentation](https://maastrichtu-ids.github.io/d2s-sparql-operations/).

> See on [DockerHub](https://hub.docker.com/r/umids/d2s-sparql-operations).

------

### Comunica

[![OpenLink Virtuoso](/img/comunica.svg)](https://comunica.linkeddatafragments.org/)

[![GitHub](https://img.shields.io/github/stars/comunica/comunica?label=GitHub&style=social)](https://github.com/comunica/comunica)

Framework to perform [federated queries](https://www.w3.org/TR/sparql11-federated-query/) over a lot of different stores (triplestores, [TPF](http://linkeddatafragments.org/in-depth/), [HDT](http://www.rdfhdt.org/)).

```shell
docker run -it comunica/actor-init-sparql \
	http://fragments.dbpedia.org/2015-10/en \
	"CONSTRUCT WHERE { ?s ?p ?o } LIMIT 100"
```

---

### d2s-api

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

---

## Linked Data GUI

Web UI to browse a triplestore through its SPARQL endpoint: resolve URI, SPARQL query editor.

### YASGUI

[![OpenLink Virtuoso](/img/yasgui-logo.png)](http://doc.yasgui.org/)

[![GitHub](https://img.shields.io/github/stars/OpenTriply/YASGUI?label=GitHub&style=social)](https://github.com/OpenTriply/YASGUI)

The popular [Yet Another Sparql GUI](https://hub.docker.com/r/erikap/yasgui).

```shell
docker run -it --rm --name yasgui -p 8088:80 \
	-e "DEFAULT_SPARQL_ENDPOINT=http://dbpedia.org/sparql" \
	-e "ENABLE_ENDPOINT_SELECTOR=true" \
	erikap/yasgui
```

> Require the SPARQL endpoint to [allow Cross-Origin Requests](https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/).

> Access at http://localhost:8088

---

### into-the-graph

[![GitHub](https://img.shields.io/github/stars/MaastrichtU-IDS/into-the-graph?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/into-the-graph)

[into-the-graph](https://github.com/MaastrichtU-IDS/into-the-graph) is a lightweight RDF linked data browser supporting graphs ✔️

Browse a RDF triplestore and its graphs by providing the SPARQL endpoint URL. It includes a YASGUI editor and provide insights about the graphs content using  precomputed [HCLS descriptive statistics](https://github.com/MaastrichtU-IDS/d2s-scripts-repository/tree/master/sparql/compute-hcls-stats).

```shell
d2s start into-the-graph browse-local-virtuoso browse-local-graphdb

docker run --rm -it -p 8082:80 umids/into-the-graph:latest
```

> Access on http://localhost:8082

> The SPARQL endpoint URL and other parameters can be changed before the build in [settings.json](https://github.com/MaastrichtU-IDS/into-the-graph/blob/master/settings.json). See the [README](https://github.com/MaastrichtU-IDS/into-the-graph#do-a-local-build) for more details.

---

### Comunica Widget

[![GitHub](https://img.shields.io/github/stars/comunica/jQuery-Widget.js?label=GitHub&style=social)](https://github.com/comunica/jQuery-Widget.js)

A [jQuery widget](http://query.linkeddatafragments.org/) to query heterogeneous interfaces using Comunica SPARQL and GraphQL.  

```shell
d2s start comunica

docker run -p 8084:80 -it --rm umids/comunica-sparql-widget

# Provide a local queries.json file
docker run -v $(pwd)/queries.json:/usr/share/nginx/html/queries.json -p 8080:80 -it --rm umids/comunica-sparql-widget
```

> Access on http://localhost:8084

> `settings.json` file and `queries` needs to be changed before `docker build`. See [documentation](https://github.com/vemonet/jQuery-Widget.js).

> **TODO**: improve how settings and queries pass (script to download them from URL before starting nginx?.

See [documentation](https://comunica.github.io/Article-ISWC2018-Demo-GraphQlLD/) about Comunica's GraphQL-LD implementation.

---

### LODEstar

[SPARQL](https://www.w3.org/TR/sparql11-query/) query and URI resolution, available through [DockerHub](https://hub.docker.com/r/netresearch/lodestar).

[![GitHub](https://img.shields.io/github/stars/EBISPOT/lodestar?label=GitHub&style=social)](https://github.com/EBISPOT/lodestar)

```shell
docker run --rm -d --name lodestar -p 8082:8080 \
  -e ENDPOINT_URL=http://graphdb.dumontierlab.com/repositories/ncats-red-kg \
  -e TOP_RELATIONSHIP=http://w3id.org/biolink/vocab/id,http://w3id.org/biolink/vocab/name,http://w3id.org/biolink/vocab/description \
  -e LABEL=http://w3id.org/biolink/vocab/label \
  -e DESCRIPTION=http://w3id.org/biolink/vocab/description \
  -e MAX_OBJECTS=10 \
  -e SERVICE_BASE_URI=http://localhost:8080/ncats-red-kg netresearch/lodestar
```

> Access at [http://localhost:8082/lodestar/sparql](http://localhost:8082/lodestar/sparql)

> Does not support graphs 🚫

---

### Trifid

[![GitHub](https://img.shields.io/github/stars/zazuko/trifid?label=GitHub&style=social)](https://github.com/zazuko/trifid)

Linked Data Server: [URI dereferencing](http://lod.opentransportdata.swiss/sparql/), custom HTML render, [YASGUI SPARQL endpoint](http://lod.opentransportdata.swiss/sparql/).

```shell
git clone https://github.com/vemonet/trifid.git
docker build -t trifid ./trifid

docker run --rm -ti --name trifid -p 8080:8080 trifid --sparql-endpoint-url=http://graphdb.dumontierlab.com/repositories/test --dataset-base-url=https://w3id.org/d2s/

docker run --rm -ti --name trifid -v /home/vemonet/sandbox/trifid:/data -p 8080:8080 trifid --config=/data/config-ncats-red-kg.json
```

> Go to http://localhost:8080/dataset/huri/ to resolve https://w3id.org/d2s/dataset/huri/ 

> Modified version on [GitHub](https://github.com/vemonet/trifid).

[Original project](https://github.com/zazuko/trifid) available on [DockerHub](https://hub.docker.com/r/zazuko/trifid/). But config not working.

```shell
docker run -ti -p 8080:8080 zazuko/trifid
# Not working, provide env config file?
docker run -ti -p 8080:8080 -e TRIFID_CONFIG=config-ncats-red-kg.json zazuko/trifid
docker run -ti -p 8080:8080 -e SPARQL_ENDPOINT_URL=http://graphdb.dumontierlab.com/repositories/test -e DATASET_BASE_URL=https://w3id.org/d2s/ zazuko/trifid
```

> Access [default example](https://github.com/zazuko/tbbt-ld/blob/master/dist/tbbt.nq) on http://localhost:8080/data/person/mary-cooper to resolve URI.

> Does not support graphs 🚫

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

> Does not support graphs 🚫

---

### TriplyDB

See [official documentation](https://triply.cc/docs/triply-db-getting-started). It allows to deploy the following services over a triplestore:

* [YASGUI SPARQL endpoint](https://triplydb.com/wouter/linkedmdb/sparql/linkedmdb)
* [Search index](https://triplydb.com/wouter/linkedmdb/search/search) using ElasticSearch.
* [Web UI](https://triplydb.com/wouter/linkedmdb/id/actor/1) to resolve and browse a triplestore
* Supports graphs in the [TPF table browser](https://triplydb.com/wouter/linkedmdb/table) (not in the [browser](https://triplydb.com/wouter/linkedmdb/browser?resource=https%3A%2F%2Ftriplydb.com%2Fwouter%2Flinkedmdb%2Fvocab%2FActor&focus=forward))

> [TriplyDB](https://triplydb.com/) is hosted centrally and cannot be deployed locally 🚫

---

## Utility

### Filebrowser

[![filebrowser](/img/filebrowser_banner.svg)](https://filebrowser.xyz/)

Deploy [filebrowser](https://hub.docker.com/r/filebrowser/filebrowser) on files stored on a remote server.

```shell
docker run -d --rm --name d2s-filebrowser \
    -v /data/d2s-workspace:/srv \
    -v /path/.filebrowser.json:/.filebrowser.json \
    -p 8080:80 \
    filebrowser/filebrowser
```

> Navigate to http://localhost:8080/files

> Login with `admin` / `admin`
