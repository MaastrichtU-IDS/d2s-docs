---
id: generate-metadata
title: Generate metadata
---

After the RDF Knowledge Graph has been generated and loaded in a triplestore, [HCLS dataset descriptive statistics](https://www.w3.org/TR/hcls-dataset/) can be easily generated and published for the published dataset using the `d2s` library. 

`d2s metadata` will generate descriptive statistics for knowledge graphs, defined by the [Health Care and Life Science Community Profile](https://www.w3.org/TR/hcls-dataset/), for each graph in the SPARQL endpoint. The computed metadata provide an overview of the SPARQL endpoint content in RDF, with quantitative insights on entities classes, and the relations between them.

Generate descriptive [HCLS metadata](https://www.w3.org/TR/hcls-dataset/) to analyze entities and the relations between them in a SPARQL endpoint:

```bash
d2s metadata analyze https://graphdb.dumontierlab.com/repositories/d2s-projects -o metadata.ttl
```
