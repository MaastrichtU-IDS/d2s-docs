[![Publish to GitHub Pages](https://github.com/MaastrichtU-IDS/d2s-docs/workflows/Publish%20to%20GitHub%20Pages/badge.svg)](https://github.com/MaastrichtU-IDS/d2s-docs/actions?query=workflow%3A%22Publish+to+GitHub+Pages%22) [![Gitter](https://badges.gitter.im/um-dsri/data2services.svg)](https://gitter.im/um-dsri/data2services?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# Data2Services project documentation

## Edit documentation pages

Editing a documentation file is as easy as going to https://github.com/MaastrichtU-IDS/d2s-docs/edit/master/docs/start-introduction.md.

- Edit a page by login with an account that has edit permissions.

- Otherwise fork the repository and modify the files you want. Pull requests are welcome!

Browse all documentation pages [here](https://github.com/MaastrichtU-IDS/d2s-docs/tree/master/docs).

> We recommend using [Typora](https://typora.io/) to edit [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) files on your computer.

### Files locations

* Add new `docs` pages to [website/sidebars.json](https://github.com/MaastrichtU-IDS/d2s-docs/blob/master/website/sidebars.json).

* Main parameters of the website can be found in [website/siteConfig.js](https://github.com/MaastrichtU-IDS/d2s-docs/blob/master/website/siteConfig.js).

* Static content (any resource to download, images, css, js) can be provided in [website/static](https://github.com/MaastrichtU-IDS/d2s-docs/tree/master/website/static)

* HTML pages (other than docs markdown) are in [website/pages/en](https://github.com/MaastrichtU-IDS/d2s-docs/tree/master/website/pages/en)

## Run for development

To run in the `/website` directory.

```shell
cd website
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

Logo created with [Inkscape](https://inkscape.org/) and https://weareoutman.github.io/rounded-polygon/.

Diagrams created with [drawio](https://snapcraft.io/install/drawio/ubuntu).

Screencast recorded using [asciinema](https://asciinema.org/).

```bash
# Failing to convert to gif
docker run --rm -v $PWD:/data asciinema/asciicast2gif -t solarized-dark -h 25 -s 2.5 https://asciinema.org/a/309866.json d2s_demo.gif
```