---
id: guide-postgres
title: Setting up PostgreSQL
---

[![](/img/postgresql_logo.png)](https://www.postgresql.org/)

## Run PostgreSQL

### Use the client

```shell
d2s start postgres
```

### Use docker run

```shell
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=pwd -d -v /data/d2s-workspace/:/data postgres
```

> Shared on your machine at `/data/d2s-workspace`

> Password is `pwd`

---

## Connect to Postgres and load scripts

### Connect to postgres
```shell
docker exec -it postgres psql -U postgres
```

### Load SQL script
```shell
docker exec -it postgres psql -U postgres my-db < /data/load_database.sql
```

---

## PSQL commands

### Manage databases
```plsql
-- List databases
\l

-- Connect database
\c my_database

-- Create database
CREATE DATABASE my_database;
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