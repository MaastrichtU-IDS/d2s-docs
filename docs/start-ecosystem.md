---
id: start-ecosystem
title: The Data2Services Ecosystem
---

This repository lists modules available for the **Data2Services framework**, enabling data processing to [RDF](https://www.w3.org/RDF/) and services exposure.

Feel free to propose new modules using [pull requests](https://github.com/MaastrichtU-IDS/data2services-ecosystem/pulls). The list of modules we are planning to work on can be found in the [Wiki](https://github.com/MaastrichtU-IDS/data2services-ecosystem/wiki/Modules-to-develop).

Only [Docker](https://docs.docker.com/install/) is required to run the modules. A typical module should only require a few arguments to be run, making it easy to deploy and combine them.

## Build

Clone recursively the repository to get all submodules.

```shell
git clone --recursive https://github.com/MaastrichtU-IDS/data2services-ecosystem.git

# Update submodules
git submodule update --recursive --remote
```

We offer a convenience script to build and pull all Docker images. But each [Docker](https://docs.docker.com/install/) image can also be **built independently**.

For *GraphDB* you **need to download** an extra file to put in `./submodules/graphdb`:

> **[Download GraphDB standalone zip](https://www.ontotext.com/products/graphdb/)** (register to get an email with the download URL).

```shell
./build.sh
```

> You can pull GraphDB directly from [DockerHub](https://hub.docker.com/r/ontotext/graphdb/) if you have a license for the `standard` or `enterprise` edition

---

## Convert to RDF

### d2s-download

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/d2s-download?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/d2s-download)

Download datasets using Bash scripts. See [script example](https://github.com/MaastrichtU-IDS/d2s-download/blob/master/datasets/TEMPLATE/download.sh).

```shell
docker pull maastrichtuids/d2s-download:latest
docker run -it --rm -v /data/data2services:/data maastrichtuids/d2s-download \
	--download-datasets aeolus,pharmgkb,ctd \
	--username my_login --password my_password
```

> See on [DockerHub](https://hub.docker.com/r/maastrichtuids/d2s-download).

> **TODO**: deprecated, to remove

---

### d2s-bash-exec

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/d2s-bash-exec?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/d2s-bash-exec)

Simple container to execute Bash scripts from URL (e.g. hosted on GitHub). Mainly used to download datasets. See [download script example](https://github.com/MaastrichtU-IDS/d2s-download/blob/master/datasets/TEMPLATE/download.sh).

```shell
docker pull maastrichtuids/d2s-bash-exec:latest
docker run -it --rm -v /data/input:/data maastrichtuids/d2s-bash-exec https://raw.githubusercontent.com/MaastrichtU-IDS/d2s-transform-biolink/master/datasets/stitch/download/download-stitch.sh
```

> See on [DockerHub](https://hub.docker.com/r/maastrichtuids/d2s-bash-exec).

---

### xml2rdf

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/xml2rdf?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/xml2rdf)

Streams XML to a [generic RDF](https://github.com/MaastrichtU-IDS/xml2rdf#rdf-model) representing the structure of the file. 

```shell
docker pull maastrichtuids/xml2rdf:latest
docker run --rm -it -v /data:/data maastrichtuids/xml2rdf  \
	-i "/data/data2services/file.xml.gz" \
	-o "/data/data2services/file.nq.gz" \
	-g "https://w3id.org/data2services/graph"
```

> See on [DockerHub](https://hub.docker.com/r/maastrichtuids/xml2rdf).

---

### Apache Drill

[![Apache Drill](/img/drill-logo.png)](https://github.com/amalic/apache-drill)

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/apache-drill?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/apache-drill)

Exposes tabular text files (CSV, TSV, PSV) as SQL, and enables queries on large datasets. Used by [AutoR2RML](https://github.com/amalic/AutoR2RML) and [R2RML](https://github.com/amalic/r2rml) to convert tabular files to a generic RDF representation.

```shell
docker-compose up drill
docker pull maastrichtuids/apache-drill:latest
docker run -dit --rm -p 8047:8047 -p 31010:31010 \
	--name drill -v /data:/data:ro maastrichtuids/apache-drill
```

> Access at [http://localhost:8047/](http://localhost:8047/).

> See on [DockerHub](https://hub.docker.com/r/maastrichtuids/apache-drill).

---

### AutoR2RML

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/AutoR2RML?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/AutoR2RML)

Automatically generate [R2RML](https://www.w3.org/TR/r2rml/) files from Relational databases (SQL, Postgresql).

```shell
docker pull maastrichtuids/autor2rml:latest
docker run -it --rm --link drill:drill --link postgres:postgres -v /data:/data \
	maastrichtuids/autor2rml -j "jdbc:drill:drillbit=drill:31010" -r \
	-o "/data/data2services/mapping.trig" \
	-d "/data/data2services" \
	-u "postgres" -p "pwd" \
	-b "https://w3id.org/data2services/" \
	-g "https://w3id.org/data2services/graph"
```

> Can be combined with [Apache Drill](https://github.com/amalic/apache-drill) to process tabular files

> See on [DockerHub](https://hub.docker.com/r/maastrichtuids/autor2rml).

---

### R2RML

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/r2rml?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/r2rml)

Convert Relational Databases to RDF using the [R2RML](https://www.w3.org/TR/r2rml/) mapping language.

```shell
docker pull maastrichtuids/r2rml:latest
docker run -it --rm --net d2s-cwl-workflows_d2s-network \
  -v /data/d2s:/data \
  maastrichtuids/r2rml \ 
  --connectionURL jdbc:drill:drillbit=drill:31010 \
  --mappingFile /data/mapping.trig \
  --outputFile /data/rdf_output.nq \
  --format NQUADS
```

> Shared on `/data/d2s`

> Can be combined with [Apache Drill](https://github.com/amalic/apache-drill) to process tabular files.

> See on [DockerHub](https://hub.docker.com/r/maastrichtuids/r2rml).

---

### RdfUpload

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/RdfUpload?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/RdfUpload)


Upload RDF files to a triplestore.

```shell
docker pull maastrichtuids/rdf-upload:latest
docker run -it --rm --link graphdb:graphdb -v /data/data2services:/data \
	maastrichtuids/rdf-upload -m "HTTP" -if "/data" \
	-url "http://graphdb:7200" -rep "test" \
	-un "username" -pw "password"
```

> Only tested on [GraphDB](https://github.com/MaastrichtU-IDS/graphdb) at the moment

> See on [DockerHub](https://hub.docker.com/r/maastrichtuids/rdf-upload).

---

### json2xml

[![](https://img.shields.io/github/stars/lukas-krecan/json2xml?label=GitHub&style=social)](https://github.com/lukas-krecan/json2xml)

Convert JSON to XML using [json2xml](https://github.com/vemonet/json2xml). This XML can be then converted to generic RDF.

```shell
docker run -it -v /data/data2services:data vemonet/json2xml:latest -i /data/test.json 
```

> Shared on your machine at `/data/data2services`

---

### PyShEx

[![](https://img.shields.io/github/stars/hsolbrig/PyShEx?label=GitHub&style=social)](https://github.com/hsolbrig/PyShEx)

Validate RDF from a SPARQL endpoint against a [ShEx](http://shex.io/) file.

```shell
docker build -t pyshex ./submodules/PyShEx/docker
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
docker pull bigcatum/bridgedb
docker run -p 8183:8183 bigcatum/bridgedb
```

---

## Store RDF

### GraphDB

[![GraphDB](/img/graphdb-logo.png)](https://github.com/MaastrichtU-IDS/graphdb)

[![GitHub](https://img.shields.io/github/stars/MaastrichtU-IDS/graphdb?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/graphdb)

[Ontotext](https://www.ontotext.com/) GraphDB triplestore including GUI and multiple repositories.

```shell
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

### Virtuoso

[![OpenLink Virtuoso](/img/openlink-virtuoso.png)](https://virtuoso.openlinksw.com/)

[![GitHub](https://img.shields.io/github/stars/tenforce/docker-virtuoso?label=GitHub&style=social)](https://github.com/tenforce/docker-virtuoso)

[Virtuoso](https://virtuoso.openlinksw.com/) triplestore.

```shell
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

### Linked Data Fragments Server

[![Linked Data Fragments server](/img/linked-data-fragments.svg)](https://linkeddatafragments.org/)

[![GitHub](https://img.shields.io/github/stars/LinkedDataFragments/Server.js?label=GitHub&style=social)](https://github.com/LinkedDataFragments/Server.js)

Server supporting the [Memento](https://mementoweb.org/guide/rfc/) protocol to query over datasets (can be [HDT](http://www.rdfhdt.org/) or [SPARQL](https://www.w3.org/TR/sparql11-query/)).

```shell
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


### rdf2hdt

[![GitHub](https://img.shields.io/github/stars/vemonet/rdf2hdt?label=GitHub&style=social)](https://github.com/vemonet/rdf2hdt)

Convert RDF to [HDT](http://www.rdfhdt.org/) files. *Header, Dictionary, Triples* is a binary serialization format for RDF  that keeps big datasets compressed while maintaining search and browse operations without prior decompression.

```shell
docker build -t rdf2hdt ./submodules/rdf2hdt
docker run -it -v /data/data2services:/data \
	rdf2hdt /data/input.nt /data/output.hdt
```

---

## Access RDF

### d2s-sparql-operations

[![GitHub](https://img.shields.io/github/stars/MaastrichtU-IDS/d2s-sparql-operations?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/d2s-sparql-operations)

Execute [SPARQL](https://www.w3.org/TR/sparql11-query/) queries from string, URL or multiple files using [RDF4J](http://rdf4j.org/).

```shell
docker pull maastrichtuids/d2s-sparql-operations
docker run -it --rm maastrichtuids/d2s-sparql-operations -op select \
  -sp "select distinct ?Concept where {[] a ?Concept} LIMIT 10" \
  -ep "http://dbpedia.org/sparql"
```

> See [documentation](https://maastrichtu-ids.github.io/d2s-sparql-operations/).

> See on [DockerHub](https://hub.docker.com/r/maastrichtuids/d2s-sparql-operations).

------

### Comunica

[![OpenLink Virtuoso](/img/comunica.svg)](https://comunica.linkeddatafragments.org/)

[![GitHub](https://img.shields.io/github/stars/comunica/comunica?label=GitHub&style=social)](https://github.com/comunica/comunica)

Framework to perform [federated queries](https://www.w3.org/TR/sparql11-federated-query/) over a lot of different stores (triplestores, [TPF](http://linkeddatafragments.org/in-depth/), [HDT](http://www.rdfhdt.org/)).

```shell
docker pull comunica/actor-init-sparql
docker run -it comunica/actor-init-sparql \
	http://fragments.dbpedia.org/2015-10/en \
	"CONSTRUCT WHERE { ?s ?p ?o } LIMIT 100"
```

---

## Linked Data GUI

### YASGUI

[![OpenLink Virtuoso](/img/yasgui-logo.png)](http://doc.yasgui.org/)

[![GitHub](https://img.shields.io/github/stars/OpenTriply/YASGUI?label=GitHub&style=social)](https://github.com/OpenTriply/YASGUI)

[Yet Another Sparql GUI](https://hub.docker.com/r/erikap/yasgui).

```shell
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

### LODEstar

[SPARQL](https://www.w3.org/TR/sparql11-query/) query and URI resolution, available through [DockerHub](https://hub.docker.com/r/netresearch/lodestar).

[![GitHub](https://img.shields.io/github/stars/EBISPOT/lodestar?label=GitHub&style=social)](https://github.com/EBISPOT/lodestar)

```shell
docker run --rm -d --name lodestar -p 8082:8080 -e ENDPOINT_URL=http://graphdb.dumontierlab.com/repositories/ncats-red-kg -e TOP_RELATIONSHIP=http://w3id.org/biolink/vocab/id,http://w3id.org/biolink/vocab/name,http://w3id.org/biolink/vocab/description -e LABEL=http://w3id.org/biolink/vocab/label -e DESCRIPTION=http://w3id.org/biolink/vocab/description -e MAX_OBJECTS=10 -e SERVICE_BASE_URI=http://localhost:8080/ncats-red-kg netresearch/lodestar
```

> Access at [http://localhost:8082/ncats-red-kg](http://localhost:8082/ncats-red-kg)

> Original Docker build available in [Wiki](https://github.com/MaastrichtU-IDS/data2services-ecosystem/wiki/Additional-modules#lodestar)

---

### Trifid

[![GitHub](https://img.shields.io/github/stars/zazuko/trifid?label=GitHub&style=social)](https://github.com/zazuko/trifid)

Linked Data Server: [URI dereferencing](http://lod.opentransportdata.swiss/sparql/), custom HTML render, [YASGUI SPARQL endpoint](http://lod.opentransportdata.swiss/sparql/).

```shell
git clone https://github.com/vemonet/trifid
docker build -t trifid ./trifid

docker run --rm -ti --name trifid -p 8080:8080 trifid --sparql-endpoint-url=http://graphdb.dumontierlab.com/repositories/test --dataset-base-url=https://w3id.org/data2services/

docker run --rm -ti --name trifid -v /home/vemonet/sandbox/trifid:/data -p 8080:8080 trifid --config=/data/config-ncats-red-kg.json
```

> Go to http://localhost:8080/dataset/huri/ to resolve https://w3id.org/data2services/dataset/huri/ 

> Modified version on [GitHub](https://github.com/vemonet/trifid).

[Original project](https://github.com/zazuko/trifid) available on [DockerHub](https://hub.docker.com/r/zazuko/trifid/). But config not working.

```shell
docker pull zazuko/trifid
docker run -ti -p 8080:8080 zazuko/trifid
# Not working, provide env config file?
docker run -ti -p 8080:8080 -e TRIFID_CONFIG=config-ncats-red-kg.json zazuko/trifid
docker run -ti -p 8080:8080 -e SPARQL_ENDPOINT_URL=http://graphdb.dumontierlab.com/repositories/test -e DATASET_BASE_URL=https://w3id.org/data2services/ zazuko/trifid
```

> Access [default example](https://github.com/zazuko/tbbt-ld/blob/master/dist/tbbt.nq) on http://localhost:8080/data/person/mary-cooper to resolve URI.

> Doesn't support graphs

---

## Utility

### Filebrowser

[![filebrowser](/img/filebrowser_banner.svg)](https://filebrowser.xyz/)

Deploy [filebrowser](https://hub.docker.com/r/filebrowser/filebrowser) on files stored on a remote server.

```shell
docker run -d --rm --name d2s-filebrowser \
    -v /data/data2services:/srv \
    -v /path/.filebrowser.json:/.filebrowser.json \
    -p 8080:80 \
    filebrowser/filebrowser
```

> Navigate to http://localhost:8080/files

> admin / admin
