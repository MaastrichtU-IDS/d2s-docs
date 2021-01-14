---
id: deploy-services
title: Recommended services
---

Recommended services easy to set to improve accessibility of your triplestore.

## Grlc SPARQL API

[![grlc API](https://img.shields.io/github/stars/CLARIAH/grlc?label=GitHub&style=social)](https://github.com/CLARIAH/grlc)

Deploying a serverless API to access and explore your SPARQL endpoint is really easy to do with **[grlc.io](http://grlc.io/)**. You just need to define a few SPARQL queries in a GitHub repository, and grlc.io will handle everything else to expose a Swagger API (aka. Open API) to access your knowledge graph. 

:::info Enable easy data exploration

🧭 This API will be the entrypoint for people who want to discover your data: they can quickly explore and understand the structure of your knowledge graph through the query you exposed.

:::

To make this example easier to reproduce, we will use the existing [grlc.io](http://grlc.io/) API deployment defined for the [food-claims-kg](https://github.com/MaastrichtU-IDS/food-claims-kg) as example

1. 👩‍💻 Provide the URL of SPARQL endpoint to query in the [`endpoint.txt` file](https://github.com/MaastrichtU-IDS/food-claims-kg/blob/master/endpoint.txt)

2. 👨‍💻 Define the SPARQL queries in `.rq` files at the base of the git repo.

   :::note Example

   See [this example of a `.rq` file](https://github.com/MaastrichtU-IDS/food-claims-kg/blob/master/get-claims-for-food.rq) to define a SPARQL query with a parameter (used to filter using `regex()`).

   :::

3. That's it 🤯 you can go to your API Swagger UI automatically generated and hosted by [grlc.io](http://grlc.io/) based on the GitHub repository URL: http://grlc.io/api-git/MaastrichtU-IDS/food-claims-kg

Bonus: combine [grlc.io](https://github.com/MaastrichtU-IDS/food-claims-kg) with the GraphDB search index query, and you have a Search API for your knowledge graph! 🔎

:::tip An active project

The project is still active and reactive, feel free to [post an issue](https://github.com/CLARIAH/grlc/issues) if you face any problem.

:::

---

## Into-the-graph web UI

[![into-the-graph](https://img.shields.io/github/stars/MaastrichtU-IDS/into-the-graph?label=GitHub&style=social)](https://github.com/MaastrichtU-IDS/into-the-graph)

[**Into the Graph**](https://github.com/MaastrichtU-IDS/into-the-graph/tree/typescript-rewrite) is a lightweight and fast [RDF](https://www.w3.org/RDF/) browser that just need a SPARQL endpoint URL to give a comfortable experience when exploring differents graphs.

:::caution Work in progress

**Into the Graph** is still in development. It is mainly tested for biomedical SPARQL endpoints, such as [Bio2RDF](https://bio2rdf.org)

:::

:::info Access into-the-graph

Access into-the-graph at https://maastrichtu-ids.github.io/into-the-graph

:::

This RDF linked data browser features:

- A web-based UI to browse SPARQL endpoints content easily. Stateful  URL to resolve a specific URI in a specific SPARQL endpoint can be  defined using the `uri` and `endpoint` parameters. Tested with RDF4J (Ontotext GraphDB) and Virtuoso SPARQL endpoints.
- Visualize the data as a datatable, or a nodes-edges network
- Easily search for concepts in the triplestore. Possibility to change the SPARQL query to define the custom query to use the Search index of  different triplestores in [settings](http://trek.semanticscience.org/settings) (Ontotext GraphDB and Virtuoso triplestores documented).
- Insights about the content of the triplestore and its different graphs, using precomputed [HCLS descriptives metadata](https://www.w3.org/TR/hcls-dataset/).
