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

## Docker build and run

```shell
# Here shared locally at /data/graphdb and /data/graphdb-import
docker build -t graphdb --build-arg version=8.11.0 .

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
- `Create new user`
  - User name: `import_user`
  - Password: `my_password`
  - `Repository rights` > Write right on Any data repository
  - Click `Create`


