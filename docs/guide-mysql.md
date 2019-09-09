---
id: guide-mysql
title: Setting up MySQL
---

[![](/img/mysql_logo.png)](https://www.mysql.com/)

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