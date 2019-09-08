---
id: ecosystem
title: The Data2Services Ecosystem
---

This repository lists modules available for the **Data2Services framework**, enabling data processing to [RDF](https://www.w3.org/RDF/) and services exposure.

Feel free to propose new modules using [pull requests](https://github.com/MaastrichtU-IDS/data2services-ecosystem/pulls). The list of modules we are planning to work on can be found in the [Wiki](https://github.com/MaastrichtU-IDS/data2services-ecosystem/wiki/Modules-to-develop).

Only [Docker](https://docs.docker.com/install/) is required to run the modules. A typical module should only require a few arguments to be run, making it easy to deploy and combine them.

## Build

Clone recursively the repository to get all submodules.

```bash
git clone --recursive https://github.com/MaastrichtU-IDS/data2services-ecosystem.git

# Update submodules
git submodule update --recursive --remote
```

We offer a convenience script to build and pull all Docker images. Each [Docker](https://docs.docker.com/install/) image can also be **built independently**.

For *Apache Drill* and *GraphDB* you **need to download** an extra file:

* [Apache Drill installation bundle](https://drill.apache.org/download/) (latest version) and the [GraphDB standalone zip](https://www.ontotext.com/products/graphdb/) (register to get an email with the download URL).
* To be put respectively in `./submodules/apache-drill` and  `./submodules/graphdb`

```bash
./build.sh
```

---

## Convert to RDF

### [data2services-download](https://github.com/MaastrichtU-IDS/data2services-download)

Download datasets using Shell scripts. See [script example](https://github.com/MaastrichtU-IDS/data2services-download/blob/master/datasets/TEMPLATE/download.sh).

```bash
docker pull vemonet/data2services-download:latest
docker run -it --rm -v /data/data2services:/data vemonet/data2services-download \
	--download-datasets aeolus,pharmgkb,ctd \
	--username my_login --password my_password
```

> See on [DockerHub](https://hub.docker.com/r/vemonet/data2services-download).

---

### [xml2rdf](https://github.com/MaastrichtU-IDS/xml2rdf)

Streams XML to a [generic RDF](https://github.com/MaastrichtU-IDS/xml2rdf#rdf-model) representing the structure of the file. 

```bash
docker pull vemonet/xml2rdf:latest
docker run --rm -it -v /data:/data vemonet/xml2rdf  \
	-i "/data/data2services/file.xml.gz" \
	-o "/data/data2services/file.nq.gz" \
	-g "https://w3id.org/data2services/graph"
```

> See on [DockerHub](https://hub.docker.com/r/vemonet/xml2rdf).

---

### [Apache Drill](https://github.com/amalic/apache-drill)

Exposes tabular text files (CSV, TSV, PSV) as SQL, and enables queries on large datasets. Used by [AutoR2RML](https://github.com/amalic/AutoR2RML) and [R2RML](https://github.com/amalic/r2rml) to convert tabular files to a generic RDF representation.

```bash
docker-compose up drill
docker pull vemonet/apache-drill:latest
docker run -dit --rm -p 8047:8047 -p 31010:31010 \
	--name drill -v /data:/data:ro vemonet/apache-drill
```

> Access at [http://localhost:8047/](http://localhost:8047/).

> See on [DockerHub](https://hub.docker.com/r/vemonet/apache-drill).

---

### [AutoR2RML](https://github.com/amalic/AutoR2RML)

Automatically generate [R2RML](https://www.w3.org/TR/r2rml/) files from Relational databases (SQL, Postgresql).

```bash
docker pull vemonet/autor2rml:latest
docker run -it --rm --link drill:drill --link postgres:postgres -v /data:/data \
	vemonet/autor2rml -j "jdbc:drill:drillbit=drill:31010" -r \
	-o "/data/data2services/mapping.trig" \
	-d "/data/data2services" \
	-u "postgres" -p "pwd" \
	-b "https://w3id.org/data2services/" \
	-g "https://w3id.org/data2services/graph"
```

> Can be combined with [Apache Drill](https://github.com/amalic/apache-drill) to process tabular files

> See on [DockerHub](https://hub.docker.com/r/vemonet/autor2rml).

---

### [R2RML](https://github.com/amalic/r2rml)

Convert Relational Databases to RDF using the [R2RML](https://www.w3.org/TR/r2rml/) mapping language.

```bash
docker pull vemonet/r2rml:latest
docker run -it --rm --link drill:drill --link postgres:postgres \
	-v /data:/data vemonet/r2rml /data/config.properties
```

> Require a [config.properties](https://github.com/amalic/r2rml/blob/master/example/config.properties) file

> Can be combined with [Apache Drill](https://github.com/amalic/apache-drill) to process tabular files.

> See on [DockerHub](https://hub.docker.com/r/vemonet/r2rml).

---

### [RdfUpload](https://github.com/MaastrichtU-IDS/RdfUpload)

Upload RDF files to a triplestore.

```bash
docker pull vemonet/rdf-upload:latest
docker run -it --rm --link graphdb:graphdb -v /data/data2services:/data \
	vemonet/rdf-upload -m "HTTP" -if "/data" \
	-url "http://graphdb:7200" -rep "test" \
	-un "username" -pw "password"
```

> Only tested on [GraphDB](https://github.com/MaastrichtU-IDS/graphdb) at the moment

> See on [DockerHub](https://hub.docker.com/r/vemonet/rdf-upload).

---

### [PyShEx](https://github.com/hsolbrig/PyShEx)

Validate RDF from a SPARQL endpoint against a [ShEx](http://shex.io/) file.

```bash
docker build -t pyshex ./submodules/PyShEx/docker
docker run --rm -it pyshex -gn '' -ss -ut -pr \
	-sq 'select ?item where{?item a <http://w3id.org/biolink/vocab/Gene>} LIMIT 1' \
    http://graphdb.dumontierlab.com/repositories/ncats-red-kg \
    https://github.com/biolink/biolink-model/raw/master/shex/biolink-modelnc.shex
```

---

### [BridgeDb](https://github.com/bridgedb/BridgeDb)

[BridgeDb](https://www.bridgedb.org/) links URI identifiers from various datasets (Uniprot, PubMed).

```bash
docker pull bigcatum/bridgedb
docker run -p 8183:8183 bigcatum/bridgedb
```

---

## Store RDF

### [GraphDB](https://github.com/MaastrichtU-IDS/graphdb)

[Ontotext](https://www.ontotext.com/) GraphDB triplestore including GUI and multiple repositories.

```bash
docker-compose up graphdb
docker build -t graphdb ./submodules/graphdb
docker run -d --rm --name graphdb -p 7200:7200 \
	-v /data/graphdb:/opt/graphdb/home \
	-v /data/graphdb-import:/root/graphdb-import \
	graphdb
```

> Download [standalone zip file](https://www.ontotext.com/products/graphdb/) of free version, and place it in `submodules/graphdb` before *docker build*.

> Access at [http://localhost:7200/](http://localhost:7200/)

---

### [Virtuoso](https://github.com/tenforce/docker-virtuoso)

[Virtuoso](https://virtuoso.openlinksw.com/) triplestore.

```bash
docker-compose up virtuoso
docker pull tenforce/virtuoso
docker run --name virtuoso \
    -p 8890:8890 -p 1111:1111 \
    -e DBA_PASSWORD=password \
    -e SPARQL_UPDATE=true \
    -e DEFAULT_GRAPH=https://w3id.org/data2services/graph \
    -v /data/virtuoso:/data \
    -d tenforce/virtuoso
```

> Access at [http://localhost:8890/](http://localhost:8890/)

> Admin login: `dba`

---

### [Linked Data Fragments Server](https://github.com/LinkedDataFragments/Server.js)

Server supporting the [Memento](https://mementoweb.org/guide/rfc/) protocol to query over datasets (can be [HDT](http://www.rdfhdt.org/) or [SPARQL](https://www.w3.org/TR/sparql11-query/)).

```bash
docker-compose up ldf-server
docker build -t ldf-server ./submodules/Server.js
docker run -p 3000:3000 -t -i --rm \
	-v /data/data2services:/data \
	-v $(pwd)/config.json:/tmp/config.json \
	ldf-server /tmp/config.json

# Query example
curl -IL -H "Accept-Datetime: Wed, 15 Apr 2013 00:00:00 GMT" http://localhost:3000/timegate/dbpedia?subject=http%3A%2F%2Fdata2services%2Fmodel%2Fgo-category%2Fprocess
```

> Require a [config.json](https://github.com/LinkedDataFragments/Server.js/blob/develop/config/config-example-memento.json) file

> Access at [http://localhost:3000](http://localhost:3000)

---

### [rdf2hdt](https://github.com/vemonet/rdf2hdt)

Convert RDF to [HDT](http://www.rdfhdt.org/) files. *Header, Dictionary, Triples* is a binary serialization format for RDF  that keeps big datasets compressed while maintaining search and browse operations without prior decompression.

```bash
docker build -t rdf2hdt ./submodules/rdf2hdt
docker run -it -v /data/data2services:/data \
	rdf2hdt /data/input.nt /data/output.hdt
```

---

## Access RDF

### [data2services-sparql-operations](https://github.com/MaastrichtU-IDS/data2services-sparql-operations)

Execute [SPARQL](https://www.w3.org/TR/sparql11-query/) queries from string, URL or multiple files using [RDF4J](http://rdf4j.org/).

```bash
docker pull vemonet/data2services-sparql-operations
docker run -it --rm vemonet/data2services-sparql-operations -op select \
  -sp "select distinct ?Concept where {[] a ?Concept} LIMIT 10" \
  -ep "http://dbpedia.org/sparql"
```

> See [documentation](https://maastrichtu-ids.github.io/data2services-sparql-operations/).

> See on [DockerHub](https://hub.docker.com/r/vemonet/data2services-sparql-operations).

------

### [Comunica](https://github.com/comunica/comunica)

Framework to perform [federated queries](https://www.w3.org/TR/sparql11-federated-query/) over a lot of different stores (triplestores, [TPF](http://linkeddatafragments.org/in-depth/), [HDT](http://www.rdfhdt.org/)).

```bash
docker pull comunica/actor-init-sparql
docker run -it comunica/actor-init-sparql \
	http://fragments.dbpedia.org/2015-10/en \
	"CONSTRUCT WHERE { ?s ?p ?o } LIMIT 100"
```

---

## Linked Data GUI

### [Trifid](https://github.com/vemonet/trifid)

Linked Data Server: YASGUI editor, URI dereferencing, custom HTML render.

```bash
git clone https://github.com/vemonet/trifid
docker build -t trifid ./trifid

docker run --rm -ti --name trifid -p 8080:8080 trifid --sparql-endpoint-url=http://graphdb.dumontierlab.com/repositories/test --dataset-base-url=https://w3id.org/data2services/

docker run --rm -ti --name trifid -v /home/vemonet/sandbox/trifid:/data -p 8080:8080 trifid --config=/data/config-ncats-red-kg.json
```

> Go to http://localhost:8080/dataset/huri/

> To resolve https://w3id.org/data2services/dataset/huri/ 

[Original project](https://github.com/zazuko/trifid) available on [DockerHub](https://hub.docker.com/r/zazuko/trifid/). But config not working.

```bash
docker pull zazuko/trifid
docker run -ti -p 8080:8080 zazuko/trifid
# Not working, provide env config file?
docker run -ti -p 8080:8080 -e TRIFID_CONFIG=config-ncats-red-kg.json zazuko/trifid
docker run -ti -p 8080:8080 -e SPARQL_ENDPOINT_URL=http://graphdb.dumontierlab.com/repositories/test -e DATASET_BASE_URL=https://w3id.org/data2services/ zazuko/trifid
```

> Access [default example](https://github.com/zazuko/tbbt-ld/blob/master/dist/tbbt.nq) on http://localhost:8080/data/person/mary-cooper to resolve URI.

> Doesn't support graphs

---

### [YASGUI](https://github.com/OpenTriply/YASGUI.server)

[Yet Another Sparql GUI](http://doc.yasgui.org/).

```bash
docker-compose up yasgui
docker pull erikap/yasgui
docker run -it --rm --name yasgui -p 8080:80 \
	-e "DEFAULT_SPARQL_ENDPOINT=http://dbpedia.org/sparql" \
	-e "ENABLE_ENDPOINT_SELECTOR=true" \
	erikap/yasgui
```

> Require to [allow Cross-Origin Requests](https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/)

> Access at [http://localhost:8080/](http://localhost:8080/)

---

### [LODEstar](https://github.com/EBISPOT/lodestar)

[SPARQL](https://www.w3.org/TR/sparql11-query/) query and URI resolution, available through [DockerHub](https://hub.docker.com/r/netresearch/lodestar).

```bash
docker run --rm -d --name lodestar -p 8082:8080 -e ENDPOINT_URL=http://graphdb.dumontierlab.com/repositories/ncats-red-kg -e TOP_RELATIONSHIP=http://w3id.org/biolink/vocab/id,http://w3id.org/biolink/vocab/name,http://w3id.org/biolink/vocab/description -e LABEL=http://w3id.org/biolink/vocab/label -e DESCRIPTION=http://w3id.org/biolink/vocab/description -e MAX_OBJECTS=10 -e SERVICE_BASE_URI=http://localhost:8080/ncats-red-kg netresearch/lodestar
```

> Access at [http://localhost:8082/ncats-red-kg](http://localhost:8082/ncats-red-kg)

> Original Docker build available in [Wiki](https://github.com/MaastrichtU-IDS/data2services-ecosystem/wiki/Additional-modules#lodestar)