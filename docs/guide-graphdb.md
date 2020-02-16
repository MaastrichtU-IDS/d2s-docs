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

You can provide the .zip file required to build GraphDB when doing `d2s init`, otherwise it needs to be placed in [d2s-cwl-workflows/support/graphdb](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/tree/master/support) before running the build.

```shell
# Build
d2s update

# Run
d2s start graphdb
```

### docker build and run

```shell
# Here shared locally at /data/graphdb and /data/graphdb-import
docker build -t graphdb --build-arg version=9.1.1 .

docker run -d --rm --name graphdb -p 7200:7200 -v /data/graphdb:/opt/graphdb/home -v /data/graphdb-import:/root/graphdb-import graphdb
```

> Go to http://localhost:7200/

## Create repository

### Using cURL

Create the `test` repository 

```shell
curl -X POST \
    http://localhost:7200/rest/repositories \
    -H 'Content-Type: multipart/form-data' \
    -F "config=@d2s-cwl-workflows/support/graphdb-test-repo-config.ttl"
```

> Edit the repository in [graphdb-test-repo-config.ttl](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/support/graphdb-test-repo-config.ttl).

### Using the GUI

> Go to `Setup` > `Repositories` > `Create new repository`

- `Repository ID`: `test` (or whatever you want it to be, but you will need to change the examples default config)
- Check `Use context index`
- `Create`

## Create user

> Go to `Setup` > `Users and access`

- `Edit admin user` > `Enter a new password` > `Save`
- Click on `Security is off` to turn it on.
  - 🔓Default `admin` user password is `root`
- `Create new user`
  - User name: `import_user` (for instance)
  - Password: `my_password`
  - `Repository rights` > Write right on Any data repository
  - Click `Create`

## Use the HTTP API

### Import file

Import the `rdf_output.nq` file (in server import)

```shell
curl -X POST -u admin:root --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "fileNames": [
     "rdf_output.nq"
   ]
 }' 'http://localhost:7200/rest/data/import/server/test'
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

### Export graph

Export a Graph to nquads:

```shell
curl -X GET --header 'Accept: application/n-quads' 'http://localhost:7200/repositories/test/rdf-graphs/service?graph=https%3A%2F%2Fw3id.org%2Fd2s%2Fgraph%2Fbiolink%2Fcohd'
```

