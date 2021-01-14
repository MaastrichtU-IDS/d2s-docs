---
id: translator-prototypes-registry
title: Translator Prototypes
---

[NCATS Biomedical Data Translator](https://ncats.nih.gov/translator) prototypes registry and documentation.

> See the official Translator prototypes registry at https://ncatstranslator.github.io

## Standard Reasoner Implementations (SRI)

Services to explore and validate implementations against the Translator standards.

### ReasonerAPI

[![ReasonerAPI](https://img.shields.io/github/stars/NCATSTranslator/ReasonerAPI?label=ReasonerAPI&style=social)](https://github.com/NCATSTranslator/ReasonerAPI)

Standard recommended when serving an API in the Translator project. It consists in a JSON model for graph data, and allow to query and get answer from Translator APIs.

### KGX

[![kgx](https://img.shields.io/github/stars/NCATS-Tangerine/kgx?label=kgx&style=social)](https://github.com/NCATS-Tangerine/kgx)

KGX (Knowledge Graph Exchange) is a Python library and set of command  line utilities for exchanging Knowledge Graphs (KGs) that conform to or  are aligned to the [Biolink Model](https://biolink.github.io/biolink-model/).

##### Access

* See [KGX presentation](https://docs.google.com/presentation/d/1DHw-499n3mrjBnziSXYV_cCij4QMndrEH2IGWz8-Kzw/edit#slide=id.p).
* See [KGX data preparation documentation](https://github.com/NCATS-Tangerine/kgx/blob/master/data-preparation.md).
* See the [GitHub repository of the Knowledge Graph Exchange Working Group](https://github.com/NCATSTranslator/Knowledge-Graph-Exchange-Working-Group)


### NodeNormalization Service

[![NodeNormalization](https://img.shields.io/github/stars/TranslatorIIPrototypes/NodeNormalization?label=NodeNormalization&style=social)](https://github.com/TranslatorIIPrototypes/NodeNormalization)

* Open API: https://nodenormalization-sri.renci.org/apidocs/ 
* [NodeNormalization Jupyter Notebook](https://github.com/TranslatorIIPrototypes/NodeNormalization/blob/master/documentation/NodeNormalization.ipynb) for documentation

### EdgeNormalization Service

[![EdgeNormalization](https://img.shields.io/github/stars/TranslatorIIPrototypes/EdgeNormalization?label=EdgeNormalization&style=social)](https://github.com/TranslatorIIPrototypes/EdgeNormalization)

* Open API: https://edgenormalization-sri.renci.org/apidocs/
* [EdgeNormnalization Jupyter Notebook](https://github.com/TranslatorIIPrototypes/EdgeNormalization/blob/master/documentation/EdgeNormalization.ipynb) for documentation

### NameResolution

[![NameResolution](https://img.shields.io/github/stars/TranslatorIIPrototypes/NameResolution?label=NameResolution&style=social)](https://github.com/TranslatorIIPrototypes/NameResolution)

* Open API: http://robokop.renci.org:2434/docs
* [NameResolution Jupyter Notebook](https://github.com/TranslatorIIPrototypes/NameResolution/blob/master/documentation/NameResolution.ipynb) for documentation

### BioLink Model Lookup service

[![BioLink Lookup](https://img.shields.io/github/stars/TranslatorIIPrototypes/bl_lookup?label=BL_lookup&style=social)](https://github.com/TranslatorIIPrototypes/bl_lookup)

* Open API: https://bl-lookup-sri.renci.org/apidocs/
* [BioLink Lookup Jupyter Notebook](https://github.com/TranslatorIIPrototypes/bl_lookup/blob/master/documentation/BiolinkLookup.ipynb) for documentation

### BLCompliance

[![BLCompliance](https://img.shields.io/github/stars/TranslatorIIPrototypes/BLComplianceService?label=BLComplianceService&style=social)](https://github.com/TranslatorIIPrototypes/BLComplianceService)

* Open API: https://monarch-sandbox.cgrb.oregonstate.edu/docs
* [BLCompliance Jupyter Notebook](https://github.com/TranslatorIIPrototypes/BLComplianceService/blob/master/documentation/BLCompliance.ipynb) for documentation

## Knowledge Providers (KP)

### COHD Clinical Data2Services Provider

[![COHD](https://img.shields.io/github/stars/WengLab-InformaticsResearch/cohd_api?label=cohd-api&style=social)](https://github.com/WengLab-InformaticsResearch/cohd_api)

* Columbia Open Health Data (COHD)
  * Clinical associations mined from observational EHR data
  * Conditions, drugs, procedures, gender, race, ethnicity
  * EHR prevalence and Co-occurrence count
  * Associations calculated from EHR prevalence and co-occurrence count
  * Privacy protection measures

[![Data2Services documentation](https://img.shields.io/github/stars/MaastrichtU-IDS/d2s-docs?label=d2s-docs&style=social)](https://github.com/MaastrichtU-IDS/d2s-docs)

* Data2Services
  * A framework and Command Line Interface for building and deploying Translator data and services in a reproducible manner.
  * Documentation and tools to transform your data to a BioLink-compliant RDF knowledge graph
  * Automatically deploy a Reasoner API over a [BioLink-compliant](https://biolink.github.io/biolink-model/docs/) RDF triplestore
  * Deploy additional interfaces to explore the knowledge graph

##### Access

* COHD Reasoner API at http://cohd.io/api
* Data2Services documentation at https://d2s.semanticscience.org
* Data2Services Reasoner API over BioLink RDF at http://api.trek.semanticscience.org (see on [GitHub](https://github.com/MaastrichtU-IDS/d2s-api))
* Into-the-graph web UI to browse a BioLink RDF triplestore leveraging metadata and services at http://trek.semanticscience.org
* GitHub repositories for Data2Services [project template](https://github.com/MaastrichtU-IDS/d2s-project-template) and [command line interface](https://github.com/MaastrichtU-IDS/d2s-cli).

##### Deploy

```shell
pip install d2s cwlref-runner
d2s init my-project
```

> Docker must be installed.

---

### MolePro Molecular Data Provider

[![MolePro](https://img.shields.io/github/stars/broadinstitute/molecular-data-provider?label=molecular-data-provider&style=social)](https://github.com/broadinstitute/molecular-data-provider)

A Molecular Data Provider translating molecular scale to systems scale through a Reasoner API.

##### Access

* Open API: https://translator.broadinstitute.org/molecular_data_provider/api
* Reasoner API: https://smart-api.info/ui/912372f46127b79fb387cd2397203709#

---

### Genetic Knowledge Provider

[![Genetic Knowledge Provider](https://img.shields.io/github/stars/broadinstitute/genetics-kp-dev?label=genetics-kp-dev&style=social)](https://github.com/broadinstitute/genetics-kp-dev)

A tool to curate genetic associations for complex diseases, interpret their biological effects, and make these data available to the Translator.

##### Access

* Reasoner API: https://translator.broadinstitute.org/genetics_data_provider/query

---

### ICEES+ KP Exposure Provider

[![ICEES+ KP Exposure Provider](https://img.shields.io/github/stars/NCATS-Tangerine/icees-api?label=icees-api&style=social)](https://github.com/NCATS-Tangerine/icees-api)



* Patient data + environmental exposures data
* Integrated at patient- and visit-level
* UNC Health Care System (UNCHCS) + NIEHS Environmental Polymorphisms Registry (EPR)
* Observational EHR data, EPR survey data, SNP data, exposures data 
* Available for years 2010 – 2016

##### Access

* ICEES+ Open APIs
  * API KP: http://icees.renci.org:16339/apidocs
  * API UNC: https://icees.renci.org:16335/apidocs
  * API NIEHS: https://icees.renci.org:16336/apidocs
  * API Duke: https://icees.renci.org:16337/apidocs
  * Prototype ICEES+ Wireframe UI: http://robokop.renci.org:3001
* TranQL: 
  * Web UI: https://tranql.renci.org
  * [Sample TranQL queries](https://github.com/NCATS-Tangerine/tranql/blob/master/tranql/queries/ICEES+EPR_sample_query)
* Components
  * FHIR-PIT: https://github.com/NCATS-Tangerine/FHIR-PIT
  * Secure Multiparty Computation: https://github.com/RENCI-NRIG/impact-smc
  * Machine learning: https://github.com/NCATS-Tangerine/iceesnn

##### Deploy

```shell
git clone https://github.com/NCATS-Tangerine/icees-api.git
cd icees-api
# Edit .env
docker-compose up --build
```

---

### Text Mining Provider

[![Text Mining Provider roadmap](https://img.shields.io/github/stars/NCATSTranslator/Text-Mining-Provider-Roadmap?label=Text-Mining-Provider-Roadmap&style=social)](https://github.com/NCATSTranslator/Text-Mining-Provider-Roadmap)

Up-to-date, BioLink-compatible, knowledge graph composed of assertions mined from the available full-text biomedical literature using high-performance text mining systems

---

### Connections Hypothesis Provider

* Access Heterogeneous Data
   * Researcher clinical data
   * Knowledge captured in the Biomedical Data Translator project
* Automate Source Selection
* Effective Question-Response Ranking
* Actionable Information

---

### DOCKET multiomics provider

[![DOCKET multiomics provider](https://img.shields.io/github/stars/PriceLab/DOCKET?label=DOCKET&style=social)](https://github.com/PriceLab/DOCKET)



* Big GIM (Gene Interaction Miner), function interaction data for all pairs of genes.  Functional interaction data are available from four different sources:  1) tissue-specific gene expression correlations from healthy tissue  samples (GTEx), 2) tissue-specific gene expression correlations from  cancer samples (TCGA), 3) tissue-specific probabilities of function  interaction (GIANT), and 4) direct interactions (BioGRID).

* Big CLAM (Cell Line Association Miner), integrates large-scale high-quality data of various cell line  resources to uncover associations between genomic and molecular features of cell lines, drug response measurements and gene knockdown viability  scores. The cell line data comes from five different sources: 1) CCLE -  Cancer Cell Line Encyclopedia, 2) GDSC - Genomics of Drug Sensitivity in Cancer, 3) CTRP - Cancer Therapeutics Response Portal, 4) CMap -  Connectivity Map, and 5) CDM - Cancer Dependency Map.

##### Access

* Reasoner API: http://biggim.ncats.io/api
* [Running instructions](https://drive.google.com/drive/u/0/folders/19CT2bu1kzVnXgORhgIQijJd7x8O8Ez6D)
* Big GIM II API: https://github.com/gloriachin/BigGIMII_API

##### Deploy

Documentation and integration to `d2s` [started here](https://d2s.semanticscience.org/docs/services-utilities#docket-multiomics-data-provider).

```shell
d2s start docket
```

---

### BioThings API

[![BioThings API](https://img.shields.io/github/stars/biothings/biothings.api?label=biothings.api&style=social)](https://github.com/biothings/biothings.api)

Build and deploy BioThings APIs from flat data files.

* API-fy knowledge sources on demand
* Use BioThings SDK in Python to download and parse input data sources
* Integrate your API to a meta-KG using Smart API

##### Access

* Translator KP APIs powered by BioThings SDK: https://biothings.ncats.io

* BioThings SDK

  * Docs: https://docs.biothings.io
  * PyPI package: https://pypi.org/project/biothings

* SmartAPI: https://smart-api.info

  * GitHub: https://github.com/SmartAPI/smartAPI
  * Up-to-date Meta-KG: https://smart-api.info/registry/translator/meta-kg 


* Example Disease KP API: https://biothings.ncats.io/DISEASES

  * Knowledge source: https://diseases.jensenlab.org
  * GitHub: https://github.com/kevinxin90/DISEASES
* Up-to-date Meta-KG: https://smart-api.info/registry/translator/meta-kg 
* Service KP milestone dashboard: https://github.com/orgs/biothings/projects/5
* BioThings Studio

  * GitHub: https://github.com/biothings/biothings_studio
  * Docs: https://docs.biothings.io/en/latest/doc/studio.html

##### Deploy

Documentation and integration to `d2s` [started here](https://d2s.semanticscience.org/docs/d2s-biothings). See the [BioLink Studio documentation](https://docs.biothings.io/en/latest/doc/studio.html).

```shell
d2s start biothings-studio
```

---

## Autonomous Relay Agent (ARA)

### BioThings Explorer

[![BioThings Explorer](https://img.shields.io/github/stars/biothings/biothings_explorer?label=biothings-explorer&style=social)](https://github.com/biothings/biothings_explorer)

Federated querying of BioThings APIs, done in 2 steps:

* Build a query path plan defining APIs relevant to answer the query
* Execute the query path plan to retrieve data from the different APIs.

##### Access

* BioThings Explorer UI demo: https://biothings.io/explorer
* Docs: [https://biothings_explorer.readthedocs.io/en/latest](https://biothings_explorer.readthedocs.io/en/latest)
* [Jupyter Notebooks on gitHub](https://github.com/biothings/biothings_explorer/tree/master/jupyter%20notebooks)

---

### ARAGORN

**Autonomous Relay Agent for Generation Of Ranked Networks**. A tool to query Knowledge Providers (KPs) and synthesize highly ranked answers relevant to user-specified questions

* operate in a federated knowledge environment
* bridge the precision mismatch between data specificity in KPs and more abstract level of user queries
* generalize answer ranking

##### Tools

[![QuestionRewrite](https://img.shields.io/github/stars/ranking-agent/QuestionRewrite?label=QuestionRewrite&style=social)](https://github.com/ranking-agent/QuestionRewrite)

* Question Augmentation
  - Open API: https://questionaugmentation.renci.org/apidocs
  - Example Notebooks:
    - https://github.com/ranking-agent/QuestionRewrite/blob/master/documentation/QuestionAugmentationSimilarity_strider.ipynb
    - https://github.com/ranking-agent/QuestionRewrite/blob/master/documentation/QuestionAugmentationEdges.ipynb

[![AnswerCoalesce](https://img.shields.io/github/stars/ranking-agent/AnswerCoalesce?label=AnswerCoalesce&style=social)](https://github.com/ranking-agent/AnswerCoalesce)

* Answer Coalescence
  - Open API: https://answercoalesce.renci.org/apidocs/
  - Example Notebook: https://github.com/ranking-agent/AnswerCoalesce/blob/master/documentation/AnswerCoalescence.ipynb

[![AnswerCoalesce](https://img.shields.io/github/stars/ranking-agent/gamma-viewer?label=gamma-viewer&style=social)](https://github.com/ranking-agent/gamma-viewer)

* ReasonerStdAPI Message Jupyter Notebook visualizer: https://github.com/ranking-agent/gamma-viewer

---

### ARAX

[![RTX](https://img.shields.io/github/stars/RTXteam/RTX?label=RTX&style=social)](https://github.com/RTXteam/RTX)

Team Expander Agent: *A tool for enhancing query graphs*. ARAX exposes all graph reasoning capabilities within a domain specific language: **ARAXi**.
ARAX is a tool for querying, manipulating, filtering, learning on, and exploring biomedical knowledge graphs.

##### Access

* ARAX
  * Open API: https://tiny.cc/arax-api-docs
  * GitHub: https://github.com/RTXteam/RTX/tree/master/code/ARAX
  * GUI: https://arax.rtx.ai/ 
  * [ARAX examples Notebook](https://github.com/RTXteam/RTX/blob/demo/code/ARAX/Examples/ARAX_Example3.ipynb)
  * [ARAXi documentation](https://github.com/RTXteam/RTX/blob/master/code/ARAX/Documentation/DSL_Documentation.md)
  * [Team/Tool/Code Readme](https://github.com/RTXteam/RTX/blob/master/README.md)
* RTX-KG2
  * RTX-KG2 Neo4j UI: https://tiny.cc/arax-kg2-neo4j
  * GitHub: https://github.com/RTXteam/RTX/tree/demo/code/kg2

---

### Explanatory ARA

* Analogical reasoning engine

* Ranking results through explanations
  * Explanatory evidence via NLU model
  * Explanatory evidence via other methods
  * Explaining information vs. explaining decisions

* Visualization of biomedical context

* Open-world learning

---

### mediKanren 2.0

[![mediKanren](https://img.shields.io/github/stars/webyrd/mediKanren?label=mediKanren&style=social)](https://github.com/webyrd/mediKanren)

Based on the [miniKanren](http://minikanren.org/) logic programming language for reasoning over Knowledge Graoph (SemMedDB).

##### Access

* [MediKanren BioLink interface on GitHub](https://github.com/webyrd/mediKanren/tree/master/biolink)

##### Deploy

* See [documentation on GitHub](https://github.com/webyrd/mediKanren#setup).

---

### (im)proving agent

[![PSEV](https://img.shields.io/github/stars/baranzini-lab/PSEV?label=PSEV&style=social)](https://github.com/baranzini-lab/PSEV)

* SPOKE: a biomedical knowledge metagraph (~25 sources)
  * reasoning to support facts from empirical evidences (Electronic Health Records, multi-omics studies)

[![evidARA](https://img.shields.io/github/stars/brettasmi/evidARA?label=evidARA&style=social)](https://github.com/brettasmi/evidARA)

* EvidARA
  * takes query from ARS and extracts a graph q (output graph) from its internal Knowledge Network (SPOKE)
  * checks empirical evidence from raw data of cohorts (EHR and multi-omics studies)

##### Access

* SPOKE
  * GitHub: https://github.com/baranzini-lab/PSEV
* evidARA
  * GitHub: https://github.com/brettasmi/evidARA

##### Deploy

* SPOKE on neo4j. See [documentation on GitHub](https://github.com/baranzini-lab/PSEV).

---

## ARS 

ARS registry: https://ars.transltr.io/ars/app/status


---

## Additional Translator resources

[Jupyter Notebook to combine data from various Knowledge Providers](https://github.com/vemonet/translator-sparql-notebook/blob/master/translator-relay-cluster4.ipynb), produced during the Relay Days.