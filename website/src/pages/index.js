import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Build knowledge graph',
    imageUrl: 'img/undraw_mindmap.svg',
    description: (
      <>
        Define mappings (SPARQL, RML, Python) to convert your structured data (CSV, SQL, XML) to a RDF knowledge graph.
      </>
    ),
  },
  {
    title: 'Use standards',
    imageUrl: 'img/rdf-icon-simple.png',
    description: (
      <>
        Use the <a href="https://www.w3.org/RDF">Resource Description Framework</a> (RDF) to describe data complying with a stndard data model
      </>
    ),
  },
  {
    title: 'Deploy services',
    imageUrl: 'img/undraw_data.svg',
    // imageUrl: 'img/undraw_collaborators.svg',
    description: (
      <>
        Deploy a interfaces and services (SPARQL, HTTP OpenAPI, Web UI) to the integrated data more FAIR.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Data2Services">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          {/* <Logo img_src={`${baseUrl}img/dsri_logo.png`} /> */}
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;





