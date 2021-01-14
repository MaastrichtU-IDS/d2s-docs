---
id: guide-postgres
title: Setting up PostgreSQL
---

## Run PostgreSQL

```shell
docker run --name d2s-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d -v $(pwd)/workspace/input:/data postgres:10.4
```

> Shared on your machine at `workspace/input`

> Password is `postgres`

---

## Connect to Postgres and load scripts

### Connect to postgres
```shell
docker exec -it d2s-postgres psql -U postgres
```

### Load SQL script
```shell
docker exec -it d2s-postgres psql -U postgres db < /data/load_database.sql
```

Or execute it directly in the container if the previous command fails:

```shell
docker exec -it d2s-postgres bash
psql -U postgres db < /data/load_database.sql
```

---

## Explore database

Using tools can be helpful to explore the content of your database.

### dbeaver

[Dbeaver](https://dbeaver.io/) is a Eclipse based tool to explore database, it allows to generate diagrams to get an overview of the tables and relations.

Not available as web UI nor Docker image. Can be installed locally:

```shell
sudo snap install dbeaver-ce
```

> Unfortunately the diagrams can be a challenge to export. They manage to face `Java Heap Space` error when generating a png from a ER diagram on 16G machine. How they manage to fail such a simple task is impressing.

### pgAdmin

The [official UI for Postgres databases](https://www.pgadmin.org/). Does not include user-friendly features such as ER diagram generation. But available as web UI in a docker image:

```shell
d2s start pgadmin
```

> Login with `test@test.edu` / `password`

Or directly using docker:

```shell
docker run -p 80:80 --net d2s-core_network \
    -e 'PGADMIN_DEFAULT_EMAIL=test@test.edu' \  
    -e 'PGADMIN_DEFAULT_PASSWORD=password' \
    -d dpage/pgadmin4
```

## PSQL commands

### Manage databases
```plsql
-- List databases
\l

-- Connect database
\c db

-- Create database
CREATE DATABASE db;
```

### Manage schemas
```plsql
-- List schemas
\dn

-- Choose a schema
SET search_path TO schema_name;
```

### Manage tables

#### List tables

```plsql
\dt
```

#### Select from table

```sql
SELECT * FROM table_name LIMIT 10; 
```