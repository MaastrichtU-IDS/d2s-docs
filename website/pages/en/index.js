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
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle" style={{color: siteConfig.colors.secondaryColor}}>
        {siteConfig.title}
        <small style={{color: siteConfig.colors.primaryColor}}>{siteConfig.tagline}</small>
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
        <Logo img_src={`${baseUrl}img/d2s-logo.svg`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('d2s-introduction')}>Introduction</Button>
            <Button href={docUrl('d2s-installation')}>Install the client</Button>
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
        <h2>Build and consume RDF Knowledge Graphs</h2>
        <MarkdownBlock>
          Define mappings (SPARQL, RML, Python) to convert your structured data (CSV, SQL, XML) to a RDF Knowledge Graph.
        </MarkdownBlock>
        <MarkdownBlock>
          Use standard Ontologies to link your different data sources under a same model.
        </MarkdownBlock>
        <MarkdownBlock>
          Deploy a variety of interfaces and services (SPARQL, HTTP OpenAPI, Web UI) to access the integrated data.
        </MarkdownBlock>
        <MarkdownBlock>
          Run reproducible pipelines to transform and update your data faithfully.
        </MarkdownBlock>
        <MarkdownBlock>
          Version your data and query the archives.
        </MarkdownBlock>
      </div>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'Like [Elsevier](https://www.w3.org/2001/sw/sweo/public/UseCases/Elsevier/), the [BBC](https://www.bbc.co.uk/ontologies), or [Uber](https://www.zdnet.com/article/ubers-graph-expert-bears-the-scars-of-billions-of-trips/), we are using the [Resource Description Framework](https://www.w3.org/RDF/) to describe data as an expressive Knowledge Graph.',
            image: `${baseUrl}img/rdf-icon-simple.png`,
            imageAlign: 'top',
            title: 'Built on standard',
          },
          {
            content: 'Each module run as a [Docker](https://www.docker.com/) container, with support for [Kubernetes](https://kubernetes.io/) coming soon.',
            image: `${baseUrl}img/docker.png`,
            // image: `${baseUrl}img/Kubernetes.png`,
            imageAlign: 'top',
            title: 'Runs everywhere',
          },
        ]}
      </Block>
    );

    const Demo = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
          <script id="asciicast-w3yoKaYBudlFCK39cmU0rpWWu" height='300px' 
            src="https://asciinema.org/a/w3yoKaYBudlFCK39cmU0rpWWu.js" 
            data-autoplay="true"  data-loop="1" data-speed="2.5"
            data-rows="25" async></script>
      </div>
    )

    const ArchitectureDiagram = () => (
      <Block background="light">
        {[
          {
            content:
              'The `d2s` Command Line Interface has been developed to make the deployment of Docker containers and execution of CWL workflows easy.<br/> '
              + 'Simply start a new project with <br/>`d2s init my-project`<br/> '
              + 'A Desktop UI might be developed in the future 🖥️',
            image: `${baseUrl}img/d2s-architecture.png`,
            imageAlign: 'right',
            title: 'Use a simple client',
          },
        ]}
      </Block>
    );

    const Data2ServicesDiagram = () => (
      <Block>
        {[
          {
            content:
              'Integrate various data sources to comply to a common data model (ontology) and build the Knowledge Graph that will power different interfaces and services 🔋',
            image: `${baseUrl}img/data2services-broad_vision.png`,
            imageAlign: 'left',
            title: 'Integrate your data in a larger Knowledge Graph',
          },
        ]}
      </Block>
    );

    const DeployServices = () => (
      <div>
      <Block background="light" id="d2sinaction">
        {[
          {
            content:
              'Automatically deploy a variety of interfaces and services ([SPARQL](/docs/services-webui#yasgui), ' +
              '[GraphQL-LD](/docs/services-webui#comunica-widget), [OpenAPI](/docs/services-interfaces#d2s-api), ' +
              '[Web UI](/docs/services-webui#into-the-graph), [Jupyter Notebooks](/docs/services-rdf-utilities#jupyter-notebooks)) to access your data 🔭',
            image: `${baseUrl}img/linked-data-browser.png`,
            imageAlign: 'right',
            title: 'Deploy services',
          },
        ]}
      </Block>
    </div>
    );


    const PyramidDiagram = () => (
      <Block>
        {[
          {
            content:
              'The Data2Services framework is built on basic principles 📖<br/> **Standardized**, **modular**, **scalable**, **sustainable**.',
            image: `${baseUrl}img/data2services-pyramid_diagram.svg`,
            imageAlign: 'left',
            title: 'Universal and sustainable',
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
          <h2><a href={pageUrl('users')}>Who uses Data2Services?</a></h2>
          {/* <p>This project is used by <a href={pageUrl('users')}>these people</a></p> */}
          <div className="logos">{showcase}</div>
          {/* <div className="more-users">
            <a className="button" href={pageUrl('users')}>
              More {siteConfig.title} Users
            </a>
          </div> */}
        </div>
      );
    };

    // TODO: Not used at the moment, too confusing, better put everything in docs  
    const IntroCodeBlocks = () => (
      <div className="productShowcaseSection">
        <h2>Try d2s</h2>
        <span className="font300">On Linux or MacOS</span>
        <div style={{textAlign: 'left', marginLeft:'30px', marginRight:'30px'}}>
          <h3 className="font400">
            Install the pip packages
          </h3>
          <pre>
            <code className="hljs css language-shell">
              pipx install d2s cwlref-runner
            </code>
          </pre>
          <h3 className="font400">
            Initialize your project
          </h3>
          <pre>
            <code className="hljs css language-shell">
              d2s init my-project-folder
              cd my-project-folder/
            </code>
          </pre>
          <h3 className="font400">
            Start services
          </h3>
          <pre>
            <code className="hljs css language-shell">
              d2s start postgres drill virtuoso graphdb blazegraph api browse-local-graphdb comunica
            </code>
          </pre>
          <h3 className="font400">
            Run integration workflows
          </h3>
          <pre>
            <code className="hljs css language-shell">
              d2s download drugbank <br/>
              d2s run xml-virtuoso.cwl drugbank
            </code>
          </pre>
        </div>
      </div>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          {/* <IntroCodeBlocks /> */}
          <Features />
          <FeatureCallout />
          <Demo />
          <ArchitectureDiagram />
          <Data2ServicesDiagram />
          <DeployServices />
          <PyramidDiagram />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
