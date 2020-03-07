---
id: guide-utilities
title: Filebrowser utilities
---

## Public filebrowser

Expose publicly all files in a directory and its subdirectories using [mohamnag/nginx-file-browser](https://github.com/mohamnag/nginx-file-browser)

```shell
d2s start filebrowser

docker run -p 8081:80 \
  -v $PWD/workspace/download:/opt/www/files \
  mohamnag/nginx-file-browser:latest
```

> Access at http://localhost:8081 📂

> See deployed example at [download.bio2rdf.org](https://download.bio2rdf.org/#/)

## Private filebrowser

[![filebrowser](/img/filebrowser_banner.svg)](https://filebrowser.xyz/)

Deploy a [filebrowser](https://hub.docker.com/r/filebrowser/filebrowser) to access files stored on a remote server.

```shell
docker run -d --rm --name d2s-filebrowser \
    -v /data/d2s-workspace:/srv \
    -v /path/.filebrowser.json:/.filebrowser.json \
    -p 8080:80 \
    filebrowser/filebrowser
```

> Access at http://localhost:8080/files 📂

> Login with `admin` / `admin` and change password 🔒
