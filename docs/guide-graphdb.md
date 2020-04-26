---
id: guide-graphdb
title: Setting up GraphDB
---

[![](/img/graphdb-logo.png)](https://graphdb.ontotext.com/)

[Ontotext GraphDB](http://graphdb.ontotext.com/) triplestore is available on [DockerHub](https://hub.docker.com/r/ontotext/graphdb/) for `standard` and `enterprise edition`.

If you wish to use GraphDB free edition, you will need to download it from Ontotext and build the Docker image.

* Provide informations to get an email with the link to download GraphDB
  * https://ontotext.com/products/graphdb/
* Download GraphDB as stand-alone server free version (zip)
* Put the downloaded `.zip` file in the GraphDB repository (cloned from [GitHub](https://github.com/MaastrichtU-IDS/graphdb/)).
* Run `docker build -t graphdb --build-arg version=CHANGE_ME .` in the GraphDB repository.

## Run it

### Using the client

You can provide the .zip file required to build GraphDB when doing `d2s init`, otherwise it needs to be placed in [d2s-core/support/graphdb](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/tree/master/support) before running the build.

```shell
# Build
d2s update graphdb

# Run
d2s start graphdb
```

### Docker build and run

```shell
# Here shared locally at /data/graphdb and /data/graphdb-import
docker build -t graphdb --build-arg version=9.1.1 .

docker run -d --rm --name graphdb -p 7200:7200 -v $(pwd)/workspace/graphdb:/opt/graphdb/home -v $(pwd)/workspaceimport:/root/graphdb-import graphdb
```

> Go to http://localhost:7200/

### Permission issues

If you face permissions issues with importing files try the following command (it will `chmod 777` the import folder):

```shell
d2s update --permissions
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

> Edit the repository in [graphdb-test-repo-config.ttl](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/support/graphdb-test-repo-config.ttl).

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

### Export graph

Export a Graph to nquads:

```shell
curl -X GET --header 'Accept: application/n-quads' 'http://localhost:7200/repositories/test/rdf-graphs/service?graph=https%3A%2F%2Fw3id.org%2Fd2s%2Fgraph%2Fbiolink%2Fcohd'
```

