---
id: sparql-queries
title: Write SPARQL queries
---

Write SPARQL queries to answer the questions you wanted to answer with the data, or just to explore your knowledge graph.

## Execute the queries

If you have uploaded your RDF to a triplestore you can query it directly. If the built-in SPARQL editor is not good, we recommend to use [YASGUI](https://yasgui.triply.cc) to point to your SPARQL endpoint

Otherwise you can use [`rdflib-endpoint`](https://github.com/vemonet/rdflib-endpoint) to deploy a SPARQL endpoint locally with a built-in YASGUI interface.

```bash
pip install rdflib-endpoint
```

You can use wildcard and provide multiple files, for  example to serve all turtle, JSON-LD and nquads files in the current  folder:

```
rdflib-endpoint serve *.ttl *.jsonld *.nq
```

> Access the YASGUI SPARQL editor on [http://localhost:8000](http://localhost:8000)

## Store the queries

Add those SPARQL queries to your Git repository, in separated files with the `.rq` extension in the `queries` folder.

Optionally you can publish an API from those SPARQL queries with [grlc](http://grlc.io/).
