---
id: d2s-dipper
title: Use Monarch Dipper
---

[Dipper](https://dipper.readthedocs.io/en/latest/) is a [Python package](https://pypi.org/project/dipper/) to generate RDF triples from common scientific resources. It has been used to build and expose RDF from multiple sources for the [Monarch Initiative](https://monarchinitiative.org).

Dipper includes subpackages and modules to create graphical models of this data, including:

- Models package for generating common sets of triples, including  common OWL axioms, complex genotypes, associations, evidence and  provenance models.
- Graph package for building graphs with RDFLib or streaming n-triples
- Source package containing fetchers and parsers that interface with remote databases and web services

## Dipper Notebooks

2 Jupyter Notebooks proposed by the [Dipper documentation](https://dipper.readthedocs.io/en/latest/notebooks.html) can be easily deploy in Jupyterlab:

* [Work with the Dipper Model API](https://nbviewer.jupyter.org/github/monarch-initiative/dipper/blob/master/docs/notebooks/model-api-tutorial.ipynb): see the [documentation](https://dipper.readthedocs.io/en/latest/models.html)
* [Query associations from IMPC](https://nbviewer.jupyter.org/github/monarch-initiative/dipper/blob/master/docs/notebooks/query_impc_evidence.ipynb), including evidence and provenance modeled with SEPIO

Clone in `workspace/notebooks`, install requirements and start the Notebooks:

```shell
d2s start notebook -d dipper
```

> Access at http://localhost:8888

> See the documentation to [work with graphs](https://dipper.readthedocs.io/en/latest/graphs.html)

Or run Jupyterlab it directly using Docker:

```shell
docker run --rm -it -p 8888:8888 -v $(pwd)/notebooks:/notebooks -e GIT_URL="https://github.com/MaastrichtU-IDS/covid-kg-notebooks" -e PASSWORD="<your_secret>" umids/jupyterlab:latest
```

## Download Monarch Dipper data

Monarch Initiative data generated from Dipper can be accessed through multiple interfaces. The dipper output is quality checked and released on a regular basis. 

* As RDF: https://archive.monarchinitiative.org/latest/rdf/
* The data model: OBO
  * E.g. [RO_0001000](http://purl.obolibrary.org/obo/RO_0001000), [CL_0000236](http://purl.obolibrary.org/obo/CL_0000236), rdfs:label, foaf:Person, dc:description, owl:sameAs, `OBO:RO_0002162 OBO:NCBITaxon_9606`
  * The [BioLink model](https://biolink.github.io/biolink-model/docs/) is planned to be adopted in the future.

* Neo4j dump: https://archive.monarchinitiative.org/latest/scigraph.tgz.

* Python scripts to transform the sources: https://github.com/monarch-initiative/dipper/tree/master/dipper/sources

New sources ingestion can be wrote following [this documentation](https://dipper.readthedocs.io/en/latest/writing_ingests.html).