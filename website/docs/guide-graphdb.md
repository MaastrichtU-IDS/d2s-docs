---
id: guide-graphdb
title: Setting up GraphDB
---

[Ontotext GraphDB](http://graphdb.ontotext.com/) triplestore is available on [DockerHub](https://hub.docker.com/r/ontotext/graphdb/) for `standard` and `enterprise edition`.

If you wish to use GraphDB free edition, you will need to download it from Ontotext and build the Docker image.

* Provide informations to get an email with the link to download GraphDB
  * https://ontotext.com/products/graphdb/
* Download GraphDB as stand-alone server free version (zip)
* Put the downloaded `.zip` file in the GraphDB repository (cloned from [GitHub](https://github.com/MaastrichtU-IDS/graphdb/)).
* Run `docker build -t graphdb --build-arg version=CHANGE_ME .` in the GraphDB repository.

## Run it

```shell
# Here shared locally at /data/graphdb and /data/graphdb-import
docker build -t graphdb --build-arg version=9.1.1 .

docker run -d --rm --name graphdb -p 7200:7200 -v $(pwd)/workspace/graphdb:/opt/graphdb/home -v $(pwd)/workspaceimport:/root/graphdb-import graphdb
```

> Go to http://localhost:7200/


### Configure GraphDB

The memory allocated to the Java Virtual Machine can be increase, especially if you are facing Heap Space error when working with big graphs. See [GraphDB documentation about recommended Java memory allocation](http://graphdb.ontotext.com/documentation/standard/requirements.html).

## Preload a file

When datasets bigger than 5G statements use the preload  tool, which load faster in a stopped graphdb. To avoid stopping our main GraphDB instance we will preload using a temporary GraphDB, then copy the loaded repository in the running GraphDB

* Change the repository to be created and loaded in `workspace/graphdb/preload-config.ttl`
* Put the files to be loaded in `workspace/import/preload`

Run the `docker-compose.yml` for preload 

When the preload has completed, the `graphdb-preload` will stop, you can then copy the loaded repository to the running GraphDB folder:

```bash
cp -r workspace/graphdb/preload-data/repositories/* workspace/graphdb/data/repositories/
```

## Create repository

### Using cURL

Create the `test` repository 

```shell
curl -X POST \
    http://localhost:7200/rest/repositories \
    -H 'Content-Type: multipart/form-data' \
    -F "config=@d2s-core/support/graphdb-test-repo-config.ttl"
```

> Edit the repository in [graphdb-test-repo-config.ttl](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/support/graphdb-test-repo-config.ttl).

### Using the GUI

Go to **Setup** > **Repositories** > **Create new repository**

- **Repository ID**: `test` (or whatever you want it to be, but you will need to change the examples default config)
- Check the box **Use context index**
- Click **Create**

## Manage user

🔓Default `admin` user password is `root`

Go to **Setup**, then **Users and access**

To change your password:

1. Click **Edit admin user**
2. **Enter a new password**
3. Click **Save**

By default security is not enabled, click on **Security is off** to turn it on.

To create a new user click **Create new user**

## Create Search Index

Execute this insert SPARQL query in the repository:

```SPARQL
PREFIX luc: <http://www.ontotext.com/owlim/lucene#>
INSERT DATA { 
    # luc:moleculeSize luc:setParam "1" .
    luc:includePredicates luc:setParam "http://www.w3.org/2000/01/rdf-schema#label https://w3id.org/biolink/vocab/name http://w3id.org/biolink/vocab/name" .
    luc:useRDFRank luc:setParam "yes" .
    luc:searchIndex luc:createIndex "true" .
}
```

## Query inferred statements

See the [official Ontotext GraphDB documentation](http://graphdb.ontotext.com/documentation/standard/query-behaviour.html#how-to-query-explicit-and-implicit-statements).

## Use the HTTP API

See the [Swagger UI](https://graphdb.dumontierlab.com/webapi).

### Import file

Import the `rdf_output.nq` file (in server import)

```shell
curl -X POST -u admin:root --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "fileNames": [
     "rdf_output.nq"
   ],
   "importSettings": {
      "context": "https://w3id.org/d2s/graph"
    }
 }' 'http://localhost:7200/rest/data/import/server/$GRAPHDB_REPOSITORY'
```

Check if import is done:

```shell
curl -X GET --header 'Accept: application/json' 'http://localhost:7200/rest/data/import/server/test'

# Still importing:
[
  {
    "name": "rdf_output.nq",
    "status": "IMPORTING",
    "message": ""
  }
]
```

### Import URL

Does not seems to work.

```shell
curl -X POST -u admin:root --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "baseURI": "https://archive.monarchinitiative.org/latest/rdf/ctd.ttl",
   "context": :
 }' 'http://localhost:7200/rest/data/import/upload/test/url'
```

> e.g. https://archive.monarchinitiative.org/latest/rdf/ctd.ttl

### Export graphs

Export **all graphs** of a repository to nquads:

```bash
wget -O rdf_output.nq --header 'Accept: text/x-nquads' 'https://graphdb.dumontierlab.com/repositories/ncats-red-kg/statements'
```

Export **one graph** to nquads:

```shell
wget -O rdf_output.nq --header 'Accept: application/n-quads' 'https://graphdb.dumontierlab.com/repositories/ncats-red-kg/rdf-graphs/service?graph=https://w3id.org/data2services/graph/biolink/drugbank/datasets'
```

## Importing large files

Recommendations when dealing with large RDF files to import.

* Speaking in general terms, JVM cannot handle big heaps well (>30GB)  due to highly expensive full GC cycles.

- If you load datasets larger than 4B RDF triples use 40-bit identifiers to enable more than 2B unique RDF resources 
- When datasets bigger than 500M statements without inference use the preload  tool, which guarantees a sustained speed of 500M triples per hour 
- Lower the heap to 30GB, the OS will cache some of the files so the big RAM will be still used to cache the files 
- Expect a substantial offheap index (check the [off heap estimate in the GraphDB documentation](http://graphdb.ontotext.com/documentation/standard/requirements.html )) 

When creating the repo:

* `owlim:entity-index-size "2000000000" ;`
* `owlim:entity-id-size  "40" ;`