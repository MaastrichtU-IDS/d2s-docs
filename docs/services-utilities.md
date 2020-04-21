---
id: services-utilities
title: Utilities
---

We list here the services available for deployment within a Data2Services project.

> The `d2s` command is provided when available. A `docker run` command is provided for every module.

Feel free to propose new services using [pull requests](https://github.com/MaastrichtU-IDS/data2services-ecosystem/pulls) or creating a [new issue](https://github.com/MaastrichtU-IDS/d2s-documentation/issues). The list of modules we are planning to work on can be found in the [Wiki](https://github.com/MaastrichtU-IDS/data2services-ecosystem/wiki/Modules-to-develop).

Only [Docker](https://docs.docker.com/install/) is required to run the modules. A typical module should only require a few arguments to be run, making it easy to deploy and combine them.

---

## RMLStreamer

[![RMLMapper](https://img.shields.io/github/stars/RMLio/rmlmapper-java?label=GitHub&style=social)](https://github.com/RMLio/rmlmapper-java)

Use the [RDF Mapping Language (RML)](https://rml.io/) to map your structured data (CSV, TSV, SQL, XML, JSON, YAML) to RDF. The [RMLStreamer](https://github.com/RMLio/RMLStreamer/) is a scalable implementation of RML in development.

The [RML mappings](https://rml.io/specs/rml/) needs to be defined as in a file with the extension `.rml.ttl`, in the mapping folder of the dataset to transform, e.g. `datasets/dataset_id/mapping/associations-mapping.rml.ttl`

Start the required services:

```shell
d2s start rmlstreamer rmltask
```

> Access at http://localhost:8078 to see running jobs.

Run the RMLStreamer:

```shell
d2s rml cohd
```

> Output goes to `workspace/import/associations-mapping_rml_ttl-cohd.nt`

>  See the [original RMLStreamer documentation](https://github.com/RMLio/RMLStreamer/blob/master/docker/README.md) to deploy using Docker.

---

## BioThings Studio

[![RMLMapper](https://img.shields.io/github/stars/biothings/biothings_studio?label=GitHub&style=social)](https://github.com/biothings/biothings_studio)

[BioThings Studio](https://github.com/biothings/biothings_studio) enables to deploy a Docker container with all dependencies required to build BioThings APIs. See the [BioThings Studio documentation](https://docs.biothings.io/en/latest/doc/studio.html).

```shell
d2s start biothings-studio

docker run -d --rm --name studio \
  -p 8001:8080 -p 8000:8000 -p 9000:9000 \
  -p 7022:7022 -p 7080:7080 -p 9200:9200 -p 27017:27017 \
  -v $(pwd)/workspace/biothings:/data \
  biothings/biothings-studio:0.2a
```

> Access web UI at http://localhost:8001

> Access BioThings API at http://localhost:8000

---

## Docket

[![DOCKET](https://img.shields.io/github/stars/PriceLab/DOCKET?label=GitHub&style=social)](https://github.com/PriceLab/DOCKET)

[DOCKET](https://github.com/PriceLab/DOCKET) is a Dataset Overview, Comparison and Knowledge Extraction Tool built for the [NCATS Translator project](https://ncats.nih.gov/translator). See the [DOCKET presentation](/resources/20200319-docket-multiomics_provider.pdf) for more details about its mechanisms.

```shell
d2s start docket

docker run -d --rm --name docket \
  -p 8002:8888 -e PYTHONPATH=/app \
  -v $(pwd)/workspace/docket:/data \
  umids/docket:latest
```

> Access Notebooks at http://localhost:8002

---

## d2s-sparql-operations

[![RDF4J](/img/RDF4J_logo.png)](https://rdf4j.org/)

[![GitHub](https://img.shields.io/github/stars/MaastrichtU-IDS/d2s-sparql-operations?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/d2s-sparql-operations)

Execute [SPARQL](https://www.w3.org/TR/sparql11-query/) queries from string, URL or multiple files using [RDF4J](http://rdf4j.org/). Available on [DockerHub](https://hub.docker.com/r/umids/d2s-sparql-operations).

```shell
docker run -it --rm umids/d2s-sparql-operations:latest -op select \
  -sp "select distinct ?Concept where {[] a ?Concept} LIMIT 10" \
  -ep "http://dbpedia.org/sparql"
  
# Provide the URL to a GitHub folder to execute all .rq files in it
docker run -it --rm umids/d2s-sparql-operations \
  -ep "https://graphdb.dumontierlab.com/repositories/public/statements" \
  -op update -un my_username -pw my_password \
  -f "https://github.com/MaastrichtU-IDS/d2s-sparql-operations/tree/master/src/main/resources/insert-examples"
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

## RdfUpload

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/RdfUpload?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/RdfUpload)


Upload RDF files to a triplestore.

```shell
docker run -it --rm --link graphdb:graphdb -v $(pwd)/workspace/import:/data \
	umids/rdf-upload:latest -m "HTTP" -if "/data" \
	-url "http://graphdb:7200" -rep "test" \
	-un "username" -pw "password"
```

> See on [DockerHub](https://hub.docker.com/r/umids/rdf-upload).

---

## AutoR2RML

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/AutoR2RML?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/AutoR2RML)

Automatically generate [R2RML](https://www.w3.org/TR/r2rml/) files from Relational databases (SQL, Postgresql).

```shell
docker run -it --rm --link drill:drill --link postgres:postgres -v $(pwd)/workspace/input:/data \
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

## R2RML

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/r2rml?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/r2rml)

Convert Relational Databases to RDF using the [R2RML](https://www.w3.org/TR/r2rml/) mapping language.

```shell
docker run -it --rm --net d2s-cwl-workflows_network \
  -v $(pwd)/workspace/input:/data \
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

## Apache Drill

[![Apache Drill](/img/drill-logo.png)](https://github.com/amalic/apache-drill)

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/apache-drill?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/apache-drill)

Exposes tabular text files (CSV, TSV, PSV) as SQL, and enables queries on large datasets. Used by [AutoR2RML](https://github.com/amalic/AutoR2RML) and [R2RML](https://github.com/amalic/r2rml) to convert tabular files to a generic RDF representation.

```shell
d2s start drill

docker run -dit --rm -p 8047:8047 -p 31011:31010 \
	--name drill -v $(pwd)/workspace/input:/data:ro umids/apache-drill:latest
```

> Access at [http://localhost:8047/](http://localhost:8047/).

> See on [DockerHub](https://hub.docker.com/r/umids/apache-drill).

---

## Postgres

Popular SQL database.

```shell
d2s start postgres

docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=pwd -d -v $(pwd)/workspace/postgres:/data postgres
```

> Password is `pwd`

> See the [Postgres guide](/docs/guide-postgres) for more details.

---

## xml2rdf

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/xml2rdf?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/xml2rdf)

Streams XML to a [generic RDF](https://github.com/MaastrichtU-IDS/xml2rdf#rdf-model) representing the structure of the file. 

```shell
docker run --rm -it -v $(pwd)/workspace/input:/data umids/xml2rdf:latest  \
	-i "/data/d2s-workspace/file.xml.gz" \
	-o "/data/d2s-workspace/file.nq.gz" \
	-g "https://w3id.org/d2s/graph"
```

> See on [DockerHub](https://hub.docker.com/r/umids/xml2rdf).

---

## json2xml

[![](https://img.shields.io/github/stars/lukas-krecan/json2xml?label=GitHub&style=social)](https://github.com/lukas-krecan/json2xml)

Convert JSON to XML using [json2xml](https://github.com/vemonet/json2xml). This XML can be then converted to generic RDF.

```shell
docker run -it -v $(pwd)/workspace/input:data vemonet/json2xml:latest -i /data/test.json 
```

> Shared on your machine at `/data/d2s-workspace`

---

## PyShEx

[![](https://img.shields.io/github/stars/hsolbrig/PyShEx?label=GitHub&style=social)](https://github.com/hsolbrig/PyShEx)

Validate RDF from a SPARQL endpoint against a [ShEx](http://shex.io/) file.

```shell
git clone https://github.com/hsolbrig/PyShEx.git
docker build -t pyshex ./PyShEx/docker
docker run --rm -it pyshex -gn '' -ss -ut -pr \
	-sq 'select ?item where{?item a <http://w3id.org/biolink/vocab/Gene>} LIMIT 1' \
    https://graphdb.dumontierlab.com/repositories/ncats-red-kg \
    https://github.com/biolink/biolink-model/raw/master/shex/biolink-modelnc.shex
```

---


## rdf2hdt

[![GitHub](https://img.shields.io/github/stars/rdfhdt/hdt-cpp?label=GitHub&style=social)](https://github.com/rdfhdt/hdt-docker)

Convert RDF to [HDT](http://www.rdfhdt.org/) files. *Header, Dictionary, Triples* is a binary serialization format for RDF  that keeps big datasets compressed while maintaining search and browse operations without prior decompression.

```shell
docker run -it --rm -v $(pwd)/workspace:/data \
  rdfhdt/hdt-cpp rdf2hdt /data/input.nt /data/output.hdt
```

---

## Raptor rdf2rdf

[Raptor](http://librdf.org/raptor/rapper.html) is a small Bash tool to convert from a RDF format to another (nq, nt, ttl, rdf/xml). It can help fix triple normalization and encoding issues.

```shell
docker run -it --rm -v $(pwd)/workspace:/data \
  umids/raptor-rdf2rdf -i ntriples -o rdfxml /data/kg.nt > /data/kg.xml
```

> Also available: `turtle`, `nquads`. JSON-LD not available.

> See [GitHub repository](https://github.com/pheyvaer/raptor-docker) for Docker build.

## rdf2neo

[![GitHub](https://img.shields.io/github/stars/Rothamsted/rdf2neo?label=GitHub&style=social)](https://github.com/Rothamsted/rdf2neo)

Convert RDF data to a neo4j property graph by mapping the RDF to Cypher queries using [Rothamsted/rdf2neo](https://github.com/Rothamsted/rdf2neo).

> To be developed.

---

## LIMES interlinking

[LIMES](https://github.com/dice-group/LIMES) is a tool developed by DICE group to perform interlinking between RDF entities using [various metrics](http://dice-group.github.io/LIMES/#/user_manual/configuration_file/defining_link_specifications?id=implemented-measures): Cosine, ExactMatch, Levenshtein... 

Start the LIMES server:

```bash
d2s start limes-server
```

> Access at http://localhost:8090

See the [official documentation to use the deployed REST API](http://dice-group.github.io/LIMES/#/user_manual/running_limes?id=using-the-cli-server) to submit LIMES jobs.

>[Postman](https://www.postman.com/product/api-client) can be used to perform HTTP POST queries on the API.

> A newly released [public Web UI](http://limes.aksw.org/) can also be tried in the browser.

---

## BridgeDb

[![](https://img.shields.io/github/stars/bridgedb/BridgeDb?label=GitHub&style=social)](https://github.com/bridgedb/BridgeDb)

[BridgeDb](https://www.bridgedb.org/) links URI identifiers from various datasets (Uniprot, PubMed).

```shell
docker run -p 8183:8183 bigcatum/bridgedb
```

---

## d2s-bash-exec

[![](https://img.shields.io/github/stars/MaastrichtU-IDS/d2s-bash-exec?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/d2s-bash-exec)

Simple container to execute Bash scripts from URL (e.g. hosted on GitHub). Mainly used to download datasets. See [download script example](https://github.com/MaastrichtU-IDS/d2s-download/blob/master/datasets/TEMPLATE/download.sh).

```shell
docker run -it --rm -v $(pwd)/workspace/input:/data umids/d2s-bash-exec:latest https://raw.githubusercontent.com/MaastrichtU-IDS/d2s-transform-template/master/datasets/stitch/download/download-stitch.sh
```

> See on [DockerHub](https://hub.docker.com/r/umids/d2s-bash-exec).

---

## LinkedPipes

[LinkedPipes](https://linkedpipes.com/) is a Suite for Linked Data, with [ETL](https://etl.linkedpipes.com/) and [Visualization](https://visualization.linkedpipes.com/) services.

Try the [ETL web UI](https://demo.etl.linkedpipes.com/#/pipelines) to define data transformation pipelines to RDF:

```bash
git clone https://github.com/linkedpipes/etl linkedpipes-etl
cd linkedpipes-etl
LP_ETL_PORT=8091 docker-compose up -d
```

> Access at http://localhost:8091

## Nanobench

[Nanobench](https://github.com/peta-pico/nanobench) is a web UI to publish [Nanopublications](http://nanopub.org/).

```shell
d2s start nanobench

docker run -d --rm --name nanobench -p 37373:37373 \
  -v $(pwd)/workspace/.nanopub:/root/.nanopub \
  -e NANOBENCH_API_INSTANCES=http://grlc.np.dumontierlab.com/api/local/local/ http://grlc.nanopubs.lod.labs.vu.nl/api/local/local/ http://130.60.24.146:7881/api/local/local/ \
  nanopub/nanobench
```

> Access on http://localhost:37373

> Follow the web UI instructions to get started and publish nanopublications.