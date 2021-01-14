---
id: use-python
title: Use Python
---

## Add a requirements file

Always add a `requirements.txt` file at the root of your repository with all libraries required to run your Python scripts.

For example:

```
rdflib
SPARQLWrapper
pandas
dipper
```

Command to install the dependencies:

```bash
pip install -r requirements.txt
```

## Python for preprocessing

Python is a good solution to perform preprocessing on the data for tasks not supported by RML. 

## Python for RDF conversion

### RDFLib

You can perform the conversion to RDF using the [RDFLib](https://rdflib.readthedocs.io/en/stable/) library.

You can easily map any structured data (CSV, TSV, XLSX, SPSS, SQL, XML, JSON, YAML...) to RDF using Python and `rdflib`.

### Pandas

We recommend to use [Pandas](https://pandas.pydata.org/) to handle tabular files as dataframes efficiently.

### Dipper

[Dipper](https://dipper.readthedocs.io/en/latest/) is a [Python package](https://pypi.org/project/dipper/) to generate RDF triples from common scientific resources. It has been used to build and expose RDF from multiple sources for the [Monarch Initiative](https://monarchinitiative.org).

Dipper includes subpackages and modules to create graphical models of this data, including:

- Models package for generating common sets of triples, including  common OWL axioms, complex genotypes, associations, evidence and  provenance models.
- Graph package for building graphs with RDFLib or streaming n-triples

- Source package containing fetchers and parsers that interface with remote databases and web services