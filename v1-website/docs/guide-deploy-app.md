---
id: guide-deploy-app
title: Deploy services publicly
---

[![](/img/nginx_logo.svg)](https://www.nginx.com/)

This guide describes different ways to make your app publicly available from your server.

Consider using [GitHub](https://pages.github.com/) or [GitLab](https://docs.gitlab.com/ee/user/project/pages/) pages for simple static documentation websites.

## Deploy the nginx proxy

Port 80 of your server needs to be publicly available (and 443 if you want to use https)

Deploy [jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy) on port 80:

```shell
d2s start proxy
```

> You can now modify the [docker-compose.yml](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/docker-compose.yml#L15) to set the URL of the deployed services as the environment variable `VIRTUAL_HOST`.

> If only one port is exposed it should pick it up. Otherwise you can set the port to expose using the environment variable `VIRTUAL_PORT`.

The proxy can also be run manually:

```shell
docker run -d --name nginxproxy \
    -p 80:80 \
    --volume /var/run/docker.sock:/tmp/docker.sock:ro \
    #--net=host \
    --restart unless-stopped \
    jwilder/nginx-proxy:latest
```

## Choose your DNS and URL

### The fastest for demo purpose

Use [nip.io](https://nip.io/) to get a public URL based on the server public IP address. You don't need to register to a new service, just use your public IP address.

Define your app URL with [nip.io](https://nip.io/):

```
your-app-name.your-server-IP-address.nip.io
```

> E.g. http://into-the-graph.137.120.31.101.nip.io

Example with a simple docker run:

```shell
docker run -d --rm --name your-app-name -e VIRTUAL_HOST=your-app-name.137.120.31.101.nip.io your-app-image
```

> Access on http://your-app-name.137.120.31.101.nip.io

### Cleaner URL using free DNS

Register to [afraid.org](https://freedns.afraid.org/) to get a cleaner and stable URL without the inelegant IP address for free.

> E.g. http://into-the-graph.mooo.com/

* Go to `Subdomains`

* Type: `A`

* Subdomain: `your-app-name`

* Domain: pick one (e.g. `mooo.com`)

* Destination: `137.120.31.101` (IDS server IP address)

* Then change the `docker-compose.yml` environment variables.

  * Or run your Docker image providing your app URL as an environment variable: `-e VIRTUAL_HOST=`

    ```shell
    docker run -d --rm --name your-app-name -e VIRTUAL_HOST=your-app-name.mooo.com your-app-image
    ```

### In production on dumontierlab.com

To access it at **[your-app-name.dumontierlab.com](http://your-app-name.dumontierlab.com)**.

```shell
docker run -d --rm --name your-app-name -e VIRTUAL_HOST=your-app-name.dumontierlab.com your-app-image
```

> For production-level apps, please request a subdomain for your app on [dumontierlab.com](http://dumontierlab.com/).
