---
id: guide-mariadb
title: Setting up MariaDB
---

[![](/img/mariadb.png)](https://mariadb.org/)

> Not integrated to the `d2s` client at the moment, [let us know](https://github.com/MaastrichtU-IDS/d2s-documentation/issues) if you would need it to be integrated.

## Run MariaDB

```shell
docker run --rm --name mariadb -v /data/d2s-workspace:/data -e MYSQL_ROOT_PASSWORD=pwd -d mariadb
```

> Shared on your machine at `/data/d2s-workspace`

> Password is`pwd`

## Connect to MySQL

```shell
docker exec -it mariadb mysql -uroot -ppwd
```

### MySQL commands
```sql
SHOW DATABASES;
CREATE DATABASE database_name;
USE database_name;

SHOW TABLES;
SELECT * FROM table_name LIMIT 10;
```

### Load scripts
```shell
docker exec -i mariadb mysql -uroot -ppwd database_name < /data/load_data.sql
```

## JDBC URL

```shell
jdbc:mariadb://localhost:3306/DB?user=root&password=pwd
```