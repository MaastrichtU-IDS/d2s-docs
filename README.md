# Data2Services project documentation

Generated using [Docusaurus](https://docusaurus.io/).

## Development

To run in the `/website` directory.

```shell
npm install
npm start
```

## Run with Docker

```bash
docker-compose up
```

## Deploy to GitHub pages

To run in `/website` directory. Make sure the `/website/build` directory has been generated before deploying.

```shell
npm install
npm run build
GIT_USER=MaastrichtU-IDS CURRENT_BRANCH=master USE_SSH=true npm run publish-gh-pages
```

## Add new docs page

* Create the `.md` in `/docs` and define it's `id` in the header (it will be used to build the URL path)
* Add the page in the right category in `sideBars.json`

## Install boostrap tool

```shell
sudo npm install --global yarn
sudo npm install --global docusaurus-init

npx docusaurus-init
```

