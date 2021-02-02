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

For example you can use [`pandas`](https://pandas.pydata.org/) to quickly add a `id` column based on another column (e.g. here the `name` column without spaces and lowercase), to be used to build the entity URI:

```python
df = pd.read_csv("my-file.csv")
df["id"] = df["name"].apply (lambda row: row.replace(' ','-').lower())
df.to_csv("my-file-processed.csv", index=False)
```

## Python for RDF conversion

### RDFLib

You can perform the conversion to RDF using the [RDFLib](https://rdflib.readthedocs.io/en/stable/) library.

You can easily map any structured data (CSV, TSV, XLSX, SPSS, SQL, XML, JSON, YAML...) to RDF using Python and `rdflib`.

### Dipper

[Dipper](https://dipper.readthedocs.io/en/latest/) is a [Python package](https://pypi.org/project/dipper/) to generate RDF triples from common scientific resources. It has been used to build and expose RDF from multiple sources for the [Monarch Initiative](https://monarchinitiative.org).

Dipper includes subpackages and modules to create graphical models of this data, including:

- Models package for generating common sets of triples, including  common OWL axioms, complex genotypes, associations, evidence and  provenance models.
- Graph package for building graphs with RDFLib or streaming n-triples

- Source package containing fetchers and parsers that interface with remote databases and web services

## Data Science on knowledge graphs

### kglab

[kglab](https://github.com/DerwenAI/kglab) is an abstraction layer in Python for building knowledge graphs, integrated with popular graph libraries – atop Pandas, RDFlib, pySHACL, NetworkX,  iGraph, PyVis, pslpython, pyarrow, etc. Check the [kglab documentation](https://derwen.ai/docs/kgl/).

`kglab` features:

* Load a RDF graph with `rdflib`
* Validate the RDF with `pySHACL` 
* RDFS, OWLRL and SKOS inference
* Generate nodes/edges statistics
* Generate graph embeddings from RDF subgraphs

### pyRDF2Vec

[pyRDF2vec](https://github.com/IBCNServices/pyRDF2Vec) is a Python implementation and extension of [RDF2Vec](http://rdf2vec.org/) to create a 2D feature matrix from a knowledge graph for downstream ML tasks. Check the [pyRDF2Vec documentation](https://pyrdf2vec.readthedocs.io/en/latest/).


