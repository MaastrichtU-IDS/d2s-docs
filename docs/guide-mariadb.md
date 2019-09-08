---
id: guide-mariadb
title: Setting up MariaDB
---

[![](/data2services/img/mariadb.png)](https://mariadb.org/)

## Run MariaDB
```shell
docker run --rm --name mariadb -v /data/data2services:/data -e MYSQL_ROOT_PASSWORD=pwd -d mariadb
```

> Shared on your machine at `/data/data2services`

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