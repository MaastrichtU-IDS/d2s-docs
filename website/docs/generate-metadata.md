---
id: generate-metadata
title: generate-metadata
---

After the RDF Knowledge Graph has been generated and loaded in a triplestore, [HCLS dataset descriptive statistics](https://www.w3.org/TR/hcls-dataset/) can be easily generated and published for the published dataset. 

Use the `d2s` Python library to generate [HCLS metadata](https://www.w3.org/TR/hcls-dataset/) to analyze entities relations in a SPARQL endpoint:

```bash
d2s metadata analyze https://graphdb.dumontierlab.com/repositories/d2s-projects -o metadata.ttl
```

:::tip Automate the process

Automate the metadata generation by adding it to your GitHub Action workflow. And upload it to your triplestore.

:::