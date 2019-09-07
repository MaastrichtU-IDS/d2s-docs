/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        {/* <img src={props.img_src} alt="Project Logo" /> */}
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/undraw_monitor.svg`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('introduction')}>Get started</Button>
            <Button href="#d2sinaction">Data2Services in action</Button>
            {/* <Button href={docUrl('doc2.html')}>Example Link 2</Button> */}
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Sustainable Data Science made easy</h2>
        <MarkdownBlock>
          Define a mapping files to make sense out of your data.
        </MarkdownBlock>
        <MarkdownBlock>
          Link your different data sources together and access them through a variety of interfaces and services.
        </MarkdownBlock>
        <MarkdownBlock>
          Version your data and query your archives.
        </MarkdownBlock>
      </div>
    );

    const TryOut = () => (
      <Block>
        {[
          {
            content:
              'Integrate various data sources to comply to a common model and build the Knowledge Graph that will power your services.',
            image: `${baseUrl}img/data2services-broad_vision.png`,
            imageAlign: 'left',
            title: 'Integrate your data in a powerful Knowledge Graph',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark" id="d2sinaction">
        {[
          {
            content:
              'Automatically deploy a variety of interfaces and services ([SPARQL](https://www.w3.org/TR/sparql11-overview/), ' +
              '[GraphQL-LD](https://comunica.github.io/Article-ISWC2018-Demo-GraphQlLD/), [OpenAPI](https://www.openapis.org/), ' +
              '[GUI](https://github.com/MaastrichtU-IDS/linked-data-browser)) to access your data.',
            image: `${baseUrl}img/undraw_note_list.svg`,
            imageAlign: 'right',
            title: 'Deploy services',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content:
              'The Data2Services framework is built on basic principles:<br/> **standardized**, **modular**, **scalable**, **sustainable**.',
            image: `${baseUrl}img/data2services-pyramid_diagram.svg`,
            imageAlign: 'right',
            title: 'Universal and sustainable',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'Using the [Resource Description Framework](https://www.w3.org/RDF/) to describe data.',
            image: `${baseUrl}img/rdf_logo.gif`,
            imageAlign: 'top',
            title: 'Built on standard',
          },
          {
            content: 'Every module is a [Docker](https://www.docker.com/) container.',
            image: `${baseUrl}img/docker.png`,
            imageAlign: 'top',
            title: 'Runs everywhere',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2><a href={pageUrl('users.html')}>Who is Using This?</a></h2>
          <p>This project is used by <a href={pageUrl('users.html')}>these people</a></p>
          <div className="logos">{showcase}</div>
          {/* <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div> */}
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <FeatureCallout />
          <LearnHow />
          <TryOut />
          <Description />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
