---
id: guide-deploy-app
title: Deploy your app at IDS
---

[![](/img/nginx_logo.svg)](https://www.nginx.com/)

This guide describes different ways to make your app publicly available using IDS infrastructure.

You will need to be able to connect via SSH to http://node000001.cluster.ids.unimaas.nl/ to run your app Docker image.

Consider using [GitHub](https://pages.github.com/) or [GitLab](https://docs.gitlab.com/ee/user/project/pages/) pages for simple static documentation websites.

## The fastest for demo purpose

Use [nip.io](https://nip.io/) to get a public URL based on the server IP address.

Don't need to register to a new service, just run your Docker image on Node1 with an additional parameter.

* Define your app URL with [nip.io](https://nip.io/) by adding `your-app-name` in front of the `IDS server IP address` + `.nip.io`.

  > E.g. http://into-the-graph.137.120.31.101.nip.io

* Run your Docker image providing the defined URL as environment variable `-e VIRTUAL_HOST=`

* If only one port is exposed it should pick it up

* Access on http://your-app-name.137.120.31.101.nip.io

```shell
docker run -d --rm --name your-app-name -e VIRTUAL_HOST=your-app-name.137.120.31.101.nip.io your-app-image
```

> If your container expose multiple port define the port to expose with`-e VIRTUAL_PORT=8080`

## Cleaner URL using free DNS

Register to [afraid.org](https://freedns.afraid.org/) to get a cleaner and stable URL without the inelegant IP address for free.

> E.g. http://into-the-graph.mooo.com/

* Go to `Subdomains`
* Type: `A`
* Subdomain: `your-app-name`
* Domain: pick one (e.g. `mooo.com`)
* Destination: `137.120.31.101` (IDS server IP address)
* Then run your Docker image providing your app URL as an environment variable: `-e VIRTUAL_HOST=`

```shell
docker run -d --rm --name your-app-name -e VIRTUAL_HOST=your-app-name.mooo.com your-app-image
```

## In production on dumontierlab.com

To access it at **[your-app-name.dumontierlab.com](http://your-app-name.dumontierlab.com)**.

```shell
docker run -d --rm --name your-app-name -e VIRTUAL_HOST=your-app-name.dumontierlab.com your-app-image
```

> For production-level apps, please request a subdomain for your app on [dumontierlab.com](http://dumontierlab.com/).