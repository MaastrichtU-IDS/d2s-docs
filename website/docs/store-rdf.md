---
id: store-rdf
title: Store RDF data
---

Store RDF data in a triplestore accessible by querying a SPARQL endpoint.


## Publish to our public GraphDB triplestore

Create a new repository on our GraphDB triplestore at https://graphdb.dumontierlab.com/

:::info Ask for permissions

Ask us to get the permissions to create new repositories after creating an account.

:::

### Create the GraphDB repository

👩‍💻 Go to **Setup** > **Repositories** > **Create Repository**

* Or click here: https://graphdb.dumontierlab.com/repository/create

👨‍💻 Choose the settings of your repository (leave the default if not mentioned here):

* `Ruleset`: use **RDFS-Plus (Optimized)** by default, or a OWL ruleset if you are performing reasoning using OWL ontologies
* `Supports SHACL validation`: enable if you plan on using SHACL shapes to validate the RDF loaded in the repository. 
  * Visit https://maastrichtu-ids.github.io/shapes-of-you to find SHACL Shapes
  * Add new shapes to IDS Shapes repository: https://github.com/MaastrichtU-IDS/shacl-shapes
* `Use context index`: **enable** this to index the contexts (aka. graphs)
* For large dataset:
  * `Entity index size`: increase this to **999999999**
  * `Entity ID bit-size`: increase this to **40**

To access your repository:

* SPARQL endpoint at https://graphdb.dumontierlab.com/repositories/my-repository
* SPARQL endpoint to run update queries (e.g. `INSERT`): https://graphdb.dumontierlab.com/repositories/my-repository/statements
* GraphDB admin web UI: https://graphdb.dumontierlab.com and change the repository using the button at the top right of the screen.

### Edit your repository access

By default your repository will not be available publicly.

👩‍💻 Go to **[Users and Access](https://graphdb.dumontierlab.com/users)**

* Change the **Free Access Settings** (top right of the page) to enable public access to read the SPARQL endpoint of your repository
  * Find your repository and enable **Read** access (checkbox on the left)
* You can also give **Write** access to other users
  * We usually give **Write** access to the `import_user` to be used in automated workflow (to automatically upload new data to the repository)

### Optional: enable GraphDB search index

You can easily enable GraphDB [Lucene search index](https://lucene.apache.org/) to quickly search string in your triplestore

Here is an example to create a search index for the `rdfs:label` and `dct:description` properties.

👨‍💻 Running this in your GraphDB repository SPARQL editor will insert the triples and the search index will be created (this might take some time). Feel free to edit the predicates indexed.

```SPARQL
PREFIX luc: <http://www.ontotext.com/owlim/lucene#>
INSERT DATA { 
    # luc:moleculeSize luc:setParam "1" .
    luc:includePredicates luc:setParam "http://www.w3.org/2000/01/rdf-schema#label http://www.w3.org/2000/01/rdf-schema#comment http://purl.org/dc/terms/description" .
    luc:useRDFRank luc:setParam "yes" .
    luc:searchIndex luc:createIndex "true" .
}
```

Query the GraphDB search index:

```SPARQL
PREFIX luc: <http://www.ontotext.com/owlim/lucene#>
SELECT ?foundUri ?foundLabel ?score {
    ?foundLabel luc:searchIndex 'TEXT_TO_SEARCH*' ;
      luc:score ?score .
    ?foundUri ?p ?foundLabel .
} ORDER BY ?score LIMIT 200
```

:::note Wildcard

We are using a `*` wildcard at the end to match all strings starting with the string `TEXT_TO_SEARCH`

:::

## List of RDF triplestores

### Ontotext GraphDB

[![Docker Image Version (latest by date)](https://img.shields.io/docker/pulls/ontotext/graphdb)](https://hub.docker.com/r/ontotext/graphdb/)

[Ontotext GraphDB™](https://www.ontotext.com/) triplestore includes a web UI, various [data visualizations](http://graphdb.ontotext.com/documentation/free/exploring-data.html), [OntoRefine](http://graphdb.ontotext.com/documentation/free/loading-data-using-ontorefine.html), [SHACL validation](http://graphdb.ontotext.com/documentation/free/shacl-validation.html), RDFS/OWL [reasoning](http://graphdb.ontotext.com/documentation/standard/reasoning.html) to infer new triples and the possibility to deploy multiple repositories. It uses mainly the [rdf4j](https://rdf4j.org/) framework.

[Download the zip file](https://www.ontotext.com/products/graphdb/graphdb-free/) of the latest GraphDB standalone free version, and place it in the same folder as the `Dockerfile` before building the image.

```shell
docker build -t graphdb --build-arg version=9.3.0 .
docker run -d --rm --name graphdb -p 7200:7200 \
	-v $(pwd)/workspace/graphdb:/opt/graphdb/home \
	-v $(pwd)/workspace/import:/root/graphdb-import \
	graphdb
```

> Access at [http://localhost:7200/](http://localhost:7200/)

> See the [official Ontotext GraphDB™ documentation](http://graphdb.ontotext.com/documentation/) and the [source code for Docker images](https://github.com/Ontotext-AD/graphdb-docker) for more details.

> [Obtain a license](https://www.ontotext.com/products/graphdb/graphdb-enterprise/) for more features such as performance improvement, easy deployment using the [official DockerHub image](https://hub.docker.com/r/ontotext/graphdb/) or distributed deployment on multiple nodes with Kubernetes.

GraphDB allow to perform **bulk load on large files** using a second container:

* Change the repository to be created and loaded in `workspace/graphdb/preload-config.ttl` (default: `demo`)
* **Put the files to be loaded** in `workspace/import/preload` 📩
* Start `graphdb-preload` docker container

When the preload has completed, the `graphdb-preload` container will stop, you can then copy the loaded repository from `workspace/graphdb/preload-data/repositories` to the running GraphDB folder:

```bash
cp -r workspace/graphdb/preload-data/repositories/* workspace/graphdb/data/repositories/
```

And access the newly loaded repository in the running GraphDB instance without downtime.

> See additional [d2s documentation about setting up GraphDB](/docs/guide-graphdb)

---

### Virtuoso

[![GitHub](https://img.shields.io/github/stars/tenforce/docker-virtuoso?label=GitHub&style=social)](https://github.com/tenforce/docker-virtuoso)

[![Docker Image Version (latest by date)](https://img.shields.io/docker/pulls/tenforce/virtuoso)](https://hub.docker.com/r/tenforce/virtuoso)

[OpenLink Virtuoso](https://virtuoso.openlinksw.com/) triplestore. Available on [DockerHub](https://hub.docker.com/r/tenforce/virtuoso/).

```shell
docker run --name virtuoso \
    -p 8890:8890 -p 1111:1111 \
    -e DBA_PASSWORD=dba \
    -e SPARQL_UPDATE=true \
    -e DEFAULT_GRAPH=https://w3id.org/d2s/graph \
    -v $(pwd)/workspace/virtuoso:/data \
    -d tenforce/virtuoso
```

> Access at http://localhost:8890/ and SPARQL endpoint at http://localhost:8890/sparql.

> Admin username: `dba` 

> CORS can be enabled following [those instructions](http://vos.openlinksw.com/owiki/wiki/VOS/VirtTipsAndTricksCORsEnableSPARQLURLs). See our complete [Virtuoso documentation](/docs/guide-virtuoso) for more details.

Clear the Virtuoso triplestore using this command:

```shell
docker exec -it d2s-virtuoso isql-v -U dba -P dba exec="RDF_GLOBAL_RESET ();"
```

---

### Blazegraph

[![GitHub](https://img.shields.io/github/stars/blazegraph/database?label=GitHub&style=social)](https://github.com/blazegraph/database)

[![Docker Image Version (latest by date)](https://img.shields.io/docker/pulls/lyrasis/blazegraph)](https://hub.docker.com/r/lyrasis/blazegraph)

A high-performance [RDF graph database](https://blazegraph.com/). See its [documentation for Docker](https://github.com/lyrasis/docker-blazegraph). 

It uses mainly the [rdf4j](https://rdf4j.org/) framework.

```shell
# Start triplestore with specific UID and GID for the bulk load (UI)
# Tested on Ubuntu with $UID=1000 and nothing in $GROUPS (by default)
docker run --name blazegraph \
  -e BLAZEGRAPH_UID=$UID \
  -e BLAZEGRAPH_GID=$GROUPS \
  -p 8082:8080 \
  -v $(pwd)/workspace/import:/data \
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

> Access UI at http://localhost:8082/bigdata

> SPARQL endpoint at http://localhost:8080/bigdata/sparql (original port)

To clear the graph go to the [update tab](http://localhost:8082/bigdata/#update) and enter `clear all`

Follow [those instructions](https://sourceforge.net/p/bigdata/discussion/676946/thread/bf76fb62/) to enable CORS on Blazegraph SPARQL endpoint.

---

### Jena Fuseki 

[![Docker Image Version (latest by date)](https://img.shields.io/docker/pulls/stain/jena-fuseki)](https://hub.docker.com/r/stain/jena-fuseki)

[Fuseki](http://jena.apache.org/documentation/fuseki2/index.html) is a SPARQL server on top of [Apache TDB](https://jena.apache.org/documentation/tdb/) RDF store, for single machines. It uses mainly the [Jena](https://jena.apache.org/) framework.

```shell
docker run -d --name fuseki -p 3030:3030 -v $(pwd)/workspace/fuseki:/fuseki -v $(pwd)/workspace/import:/staging stain/jena-fuseki
```

> Access at http://localhost:3030

Bulk load files in `demo` dataset from `workspace/import` (container needs to be stopped):

```shell
docker-compose -f d2s-core/docker-compose.yml \
  run -v $(pwd)/workspace/import:/staging \
  stain/jena-fuseki ./load.sh demo test1.ttl test2.nt
```

> If you don't specify any filenames to `load.sh`, all filenames directly under `/staging` that match these GLOB patterns will be loaded:
>
> ```
> *.rdf *.rdf.gz *.ttl *.ttl.gz *.owl *.owl.gz *.nt *.nt.gz *.nquads *.nquads.gz
> ```

---

### Stardog

[![Docker Image Version (latest by date)](https://img.shields.io/docker/pulls/stardog/stardog)](https://hub.docker.com/r/stardog/stardog)

Requires to [download the free license](https://www.stardog.com/get-started/) first, then place it in the folder shared with Stardog.

See the [official Stardog documentation](https://docs.stardog.com/get-started/install-stardog/docker) for Docker. A [JavaScript wrapper is available](https://github.com/stardog-union/stardog.js) to communicate with Stardog API and SPARQL endpoint.

```shell
docker run -v $(pwd)/workspace/stardog:/var/opt/stardog -p 5820:5820 -e STARDOG_SERVER_JAVA_ARGS="-Xmx8g -Xms8g -XX:MaxDirectMemorySize=12g" stardog/stardog:latest
```

>  Access at http://localhost:5820, volume shared at `workspace/stardog`

---

### AllegroGraph

[![GitHub](https://img.shields.io/github/stars/franzinc/docker-agraph?label=GitHub&style=social)](https://github.com/franzinc/docker-agraph)

[![Docker Image Version (latest by date)](https://img.shields.io/docker/pulls/franzinc/agraph)](https://hub.docker.com/r/franzinc/agraph)

[AllegroGraph®](https://franz.com/agraph/) is a modern, high-performance, persistent graph database. It supports SPARQL, RDFS++, and Prolog reasoning from numerous client applications. 

```shell
docker run -d -m 1g -v $(pwd)/workspace/allegrograph:/data -p 10000-10035:10000-10035 --shm-size 1g --name allegrograph franzinc/agraph:v6.6.0
```

> Access at http://localhost:10035

> Default login: `test` / `xyzzy`

See [official documentation](https://franz.com/agraph/support/documentation/current/agload.html) for bulk load.

> **TODO:** fix shared volumes

---

### AnzoGraph

[![Docker Image Version (latest by date)](https://img.shields.io/docker/pulls/cambridgesemantics/anzograph)](https://hub.docker.com/r/cambridgesemantics/anzograph)

[AnzoGraph® DB](https://www.cambridgesemantics.com/anzograph/) by [Cambridge Semantics](https://www.cambridgesemantics.com/). See its [official documentation](https://docs.cambridgesemantics.com/anzograph/userdoc/deploy-docker.htm) to deploy with Docker.

* Unregistered Free edition limited to 8G RAM, single user and single node deployment. 
* [Register](https://docs.cambridgesemantics.com/anzograph/userdoc/register-license.htm) to access the 16G single node deployment for free.

* Deploy AnzoGraph on multi-server cluster for horizontal scaling with the [Enterprise Edition 💶](https://customercenter.cambridgesemantics.com/products/anzograph/comparisonMatrix.html)

```shell
docker run -d -p 8086:8080 -p 8443:8443 --name anzograph -v $(pwd)/workspace/anzograph:/opt/anzograph cambridgesemantics/anzograph:2.0.2
```

> Access at http://localhost:8086

> Default login: `admin` / `Passw0rd1`.

> [Kubernetes deployment](https://docs.cambridgesemantics.com/anzograph/userdoc/deploy-k8s-helm.htm) available using Helm.

---

### Linked Data Fragments Server

[![GitHub](https://img.shields.io/github/stars/LinkedDataFragments/Server.js?label=GitHub&style=social)](https://github.com/LinkedDataFragments/Server.js)

[![Docker Image Version (latest by date)](https://img.shields.io/docker/pulls/linkeddatafragments/server.js)](https://hub.docker.com/r/linkeddatafragments/server.js)

Technically not a triplestore, server supporting the [Memento](https://mementoweb.org/guide/rfc/) protocol to timestamped SPARQL querying over multiple linked data sources, e.g. [HDT](http://www.rdfhdt.org/) or [SPARQL](https://www.w3.org/TR/sparql11-query/).

```shell
docker run -p 8085:3000 -t -i --rm \
	-v $(pwd)/workspace/hdt-archives:/data \
	-v $(pwd)/workspace/ldfserver-config.json:/tmp/config.json \
	umids/ldf-server:latest /tmp/config.json

# Query example
curl -IL -H "Accept-Datetime: Wed, 15 Apr 2013 00:00:00 GMT" http://localhost:3000/timegate/dbpedia?subject=http%3A%2F%2Fdata2services%2Fmodel%2Fgo-category%2Fprocess
```

> HDT archives goes in `workspace/hdt-archives` and the [config file](https://github.com/LinkedDataFragments/Server.js/blob/develop/config/config-example-memento.json) is in `workspace/ldfserver-config.json`

> Access at http://localhost:8085

---

## Property graphs

### Neo4j

[![GitHub](https://img.shields.io/github/stars/neo4j/neo4j?label=GitHub&style=social)](https://github.com/neo4j/neo4j)

[![Docker Image Version (latest by date)](https://img.shields.io/docker/pulls/_/neo4j)](https://hub.docker.com/r/_/neo4j)

Not supporting RDF, [Neo4j](https://neo4j.com/) is a property graph database. It uses [Cypher](https://neo4j.com/docs/cypher-manual/current/) as query language.

```shell
docker run -p 7474:7474 -p 7687:7687 -v $(pwd)/workspace/neo4j:/data neo4j
```

> Access at http://localhost:7474, volume shared at `workspace/neo4j`

> Login with `neoj4` / `neo4j` and change the password.virtu

---

## Additional triplestores

### MarkLogic

Licensed RDF triplestore 📜

Follow the [GitHub Docker instructions](https://github.com/alan-johnson/docker-marklogic) to deploy it.

> You will need to download the [MarkLogic Server 📥](https://developer.marklogic.com/products/marklogic-server/10.0)

---

### RDFox

Licensed RDF triplestore 📜

[RDFox](https://www.oxfordsemantic.tech/) is a in-memory triplestore only supporting triples. RDFox is a main-memory, scalable, centralized data store that allows users to efficiently manage graph-structured data represented according to the [RDF data model](https://www.w3.org/RDF/), run reasoning engines, and query that data using the [SPARQL 1.1 query language](https://www.w3.org/TR/sparql11-query/). 

See the [documentation](https://docs.oxfordsemantic.tech/docker.html) to deploy it using docker.

