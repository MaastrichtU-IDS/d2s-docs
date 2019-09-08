---
id: guide-graphdb
title: Setting up GraphDB
---

[![](/data2services/img/graphdb-logo.png)](https://graphdb.ontotext.com/)

Setup your local [GraphDB](http://graphdb.ontotext.com/).

> Go to http://localhost:7200/

## Create repository

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


