# Data2Services project documentation

## Edit documentation pages

Editing a documentation file is as easy as going to https://github.com/MaastrichtU-IDS/d2s-documentation/edit/master/docs/start-introduction.md.

- Edit a page by login with an account that has edit permissions.

- Otherwise fork the repository and modify the files you want. Pull requests are welcome!

Browse all documentation pages [here](https://github.com/MaastrichtU-IDS/d2s-documentation/tree/master/docs).

We recommend using [Typora](https://typora.io/) to edit [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) files on your computer.

### Files locations

* Add new `docs` pages to [website/sidebars.json](https://github.com/MaastrichtU-IDS/d2s-documentation/blob/master/website/sidebars.json).

* Main parameters of the website can be found in [website/siteConfig.js](https://github.com/MaastrichtU-IDS/d2s-documentation/blob/master/website/siteConfig.js).

* Static content (any resource to download, images, css, js) can be provided in [website/static](https://github.com/MaastrichtU-IDS/d2s-documentation/tree/master/website/static)

* HTML pages (other than docs markdown) are in [website/pages/en](https://github.com/MaastrichtU-IDS/d2s-documentation/tree/master/website/pages/en)

## Run for development

To run in the `/website` directory.

```shell
yarn install
yarn start
```

## Run with Docker

```shell
docker-compose up
```

> Access at http://localhost:3000/

## Deploy on server

Using jwilder's [nginx-proxy](https://github.com/jwilder/nginx-proxy) 

Set environment `VIRTUAL_HOST` and `VIRTUAL_PORT` in `docker-compose.yml`.

```shell
docker-compose up -d
```

> Access at https://d2s.semanticscience.org

## Deploy to GitHub pages

To run in `/website` directory. Make sure the `/website/build` directory has been generated before deploying.

```shell
yarn install
yarn build
GIT_USER=MaastrichtU-IDS CURRENT_BRANCH=master USE_SSH=true yarn run publish-gh-pages
```

## Install Docusaurus boostrap tool

```shell
sudo npm install --global yarn
sudo npm install --global docusaurus-init

npx docusaurus-init
```

# Acknowledgments

Documentation website generated using [Docusaurus](https://docusaurus.io/).

Logo created with [Inkscape](https://inkscape.org/).

Diagrams created with [drawio](https://snapcraft.io/install/drawio/ubuntu).