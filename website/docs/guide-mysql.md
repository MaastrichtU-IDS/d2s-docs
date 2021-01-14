---
id: guide-mysql
title: Setting up MySQL
---

> Not integrated to the `d2s` client at the moment, [let us know](https://github.com/MaastrichtU-IDS/d2s-docs/issues) if you would need it to be integrated.

## Run MySQL database

```shell
docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=pwd -d mysql
```

> Password is `pwd`

## Connect to MySQL

```shell
docker exec -it mysql-db mysql -uroot -ppwd
```

## MySQL commands
```sql
SHOW DATABASES;
CREATE DATABASE database_name;
USE database_name;
SELECT * FROM database_name LIMIT 10;
```