---
id: guide-virtuoso
title: Setting up Virtuoso
---


[OpenLink Virtuoso](https://virtuoso.openlinksw.com/) triplestore is available on [DockerHub](https://hub.docker.com/r/tenforce/virtuoso).

## Run it


Be careful when changing the DBA_PASSWORD for [tenforce/virtuoso](tenforce/virtuoso). This doesn't work every time, so you might need to use the default `dba` password.

```shell
docker run --rm --name d2s-virtuoso \
	--network d2s-core_network \
    -p 8890:8890 -p 1111:1111 \
    -e DBA_PASSWORD=dba \
    -e SPARQL_UPDATE=true \
    -e DEFAULT_GRAPH=https://w3id.org/d2s/graph \
    -v /data/virtuoso:/data \
    -d umids/d2s-virtuoso
```

> Access at http://localhost:8890/ and SPARQL endpoint at http://localhost:8890/sparql.

> Admin login: `dba` / `dba`

> Shared in `/data/virtuoso`


## Use the Search Index

Example working on DBpedia and Bio2RDF:

```SPARQL
SELECT ?foundUri ?foundLabel WHERE {?foundUri <http://www.w3.org/2000/01/rdf-schema#label> ?foundLabel . ?foundLabel bif:contains '$TEXT_TO_SEARCH' . } LIMIT 200
```

> Enable Virtuoso full text index following [this documentation](http://docs.openlinksw.com/virtuoso/rdfsparqlrulefulltext/).

## Clear Virtuoso triplestore

```shell
docker exec -it d2s-virtuoso isql-v -U dba -P dba exec="RDF_GLOBAL_RESET ();"
```

## RDF bulk load

This command should work to load all `.nq` files in the `workspace/virtuoso` directory, but it seems to have issues:

```shell
docker exec -it d2s-virtuoso isql-v -U dba -P dba exec="ld_dir('/usr/local/virtuoso-opensource/var/lib/virtuoso/db', '*.nq', 'http://test/'); rdf_loader_run();"
```

This command is used by the CWL workflow, but fails when run manually:

```shell
docker exec -i d2s-virtuoso bash -c "/load.sh" "/usr/local/virtuoso-opensource/var/lib/virtuoso/db" "rdf_output.nq" "https://w3id.org/d2s/graph/default" "rdf_output_vload.log" "dba"
```

> For some reason the args are not passed to the script 🚧

## Dump graphs

See the [official documentation for dumping and loading graphs](http://docs.openlinksw.com/virtuoso/rdfperfdumpandreloadgraphs/).

### Dump one graph

See [Virtuoso documentation](http://vos.openlinksw.com/owiki/wiki/VOS/VirtRDFDatasetDump#Dump%20One%20Graph) to dump a specific graph as Turtle (`.ttl`)

> First create the `dump_one_graph` procedure according to the [documentation](http://vos.openlinksw.com/owiki/wiki/VOS/VirtRDFDatasetDump#Dump%20One%20Graph).

See example to dump the Bio2RDF ClinicalTrials Graph from Virtuoso:

```shell
docker exec -i d2s-virtuoso isql-v -U dba -P dba exec="dump_one_graph ('http://bio2rdf.org/clinicaltrials_resource:bio2rdf.dataset.clinicaltrials.R3', '/usr/local/virtuoso-opensource/var/lib/virtuoso/db/dumps/clinicaltrials', 999999999999999);"
```

### Dump all graphs

See [Virtuoso documentation](http://vos.openlinksw.com/owiki/wiki/VOS/VirtRDFDumpNQuad) to dump all graphs as Nquads.

> First create the `dump_nquads` procedure according to the [documentation](http://vos.openlinksw.com/owiki/wiki/VOS/VirtRDFDumpNQuad).

See example to dump a complete Virtuoso triplestore:

```shell
docker exec -i d2s-virtuoso isql-v -U dba -P dba exec="dump_nquads ('dumps', 1, 999999999999999, 1);"
```

## Configuration

CORS can be enabled following [this tutorial](http://vos.openlinksw.com/owiki/wiki/VOS/VirtTipsAndTricksCORsEnableSPARQLURLs).