# Data2Services project documentation

Generated using [Docusaurus](https://docusaurus.io/).

## Development

To run in the `/website` directory.

```bash
npm install
npm start
```

## Deploy to GitHub pages

To run in `/website` directory. Make sure the `/website/build` directory has been generated before deploying.

```bash
npm install
npm run build
GIT_USER=MaastrichtU-IDS CURRENT_BRANCH=master USE_SSH=true npm run publish-gh-pages
```

## Install boostrap tool

```bash
sudo npm install --global yarn
sudo npm install --global docusaurus-init

npx docusaurus-init
```

