/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: `<p>For more informations about the Institute of Data Science, see the [IDS website](https://maastrichtuniversity.nl/ids)</p>`,
      title: 'Browse the IDS website'
    },
    {
      content: `<a href="https://github.com/MaastrichtU-IDS/d2s-docs/issues"
      target="_blank" aria-label="Issues d2s-docs on GitHub">
      <img alt="GitHub d2s-docs" src="https://img.shields.io/github/issues/MaastrichtU-IDS/d2s-docs?label=d2s-docs"/>
    </a><br/>
    <a href="https://github.com/MaastrichtU-IDS/d2s-cli/issues"
    target="_blank" aria-label="Issues d2s-cli on GitHub">
      <img alt="GitHub d2s-cli" src="https://img.shields.io/github/issues/MaastrichtU-IDS/d2s-cli?label=d2s-cli"/>
    </a><br/>
    <a href="https://github.com/MaastrichtU-IDS/d2s-project-template/issues"
    target="_blank" aria-label="Issues d2s-project-template on GitHub">
      <img alt="GitHub d2s-project-template" src="https://img.shields.io/github/issues/MaastrichtU-IDS/d2s-project-template?label=d2s-project-template"/>
    </a>
    <p>Browse and submit [issues](https://github.com/MaastrichtU-IDS/d2s-docs/issues) or [pull requests](https://github.com/MaastrichtU-IDS/d2s-docs/pulls) 
    for bugs you find or any new features you would like to see implemented 🔧</p>`,
      title: 'Submit issues',
    },
    {
      content: `Feel free to [contact the main maintainers](mailto:vincent.emonet@maastrichtuniversity.nl) if you have any questions 📬`,
      title: 'Contact us',
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <p>If you need help or have questions about Data2Services try one of the mechanisms above.</p>
          <GridBlock contents={supportLinks} layout="threeColumn" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
