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
      content: `<a href="https://gitter.im/um-dsri/data2services"
        target="_blank" rel="noreferrer noopener" aria-label="Chat on Gitter">
        <img alt="Ask on Gitter" 
        src="https://img.shields.io/gitter/room/um-dsri/data2services"/>
      </a>
      <p>Feel free to ask questions, or share issues and successes on [Gitter](https://gitter.im/um-dsri/data2services) 💬</p>`,
      title: 'Ask on Gitter'
    },
    {
      content: `<a href="https://github.com/MaastrichtU-IDS/d2s-documentation/issues"
      target="_blank" aria-label="Issues d2s-documentation on GitHub">
      <img alt="GitHub d2s-documentation" src="https://img.shields.io/github/issues/MaastrichtU-IDS/d2s-documentation?label=d2s-documentation"/>
    </a><br/>
    <a href="https://github.com/MaastrichtU-IDS/d2s-cli/issues"
    target="_blank" aria-label="Issues d2s-cli on GitHub">
      <img alt="GitHub d2s-cli" src="https://img.shields.io/github/issues/MaastrichtU-IDS/d2s-cli?label=d2s-cli"/>
    </a><br/>
    <a href="https://github.com/MaastrichtU-IDS/d2s-transform-template/issues"
    target="_blank" aria-label="Issues d2s-transform-template on GitHub">
      <img alt="GitHub d2s-transform-template" src="https://img.shields.io/github/issues/MaastrichtU-IDS/d2s-transform-template?label=d2s-transform-template"/>
    </a>
    <p>Browse and submit [issues](https://github.com/MaastrichtU-IDS/d2s-documentation/issues) or [pull requests](https://github.com/MaastrichtU-IDS/d2s-documentation/pulls) 
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
