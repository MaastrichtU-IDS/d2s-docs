---
id: deploy-services
title: Deploy services
---

## Deploy a serverless API for the triplestore

Deploying an API to access and explore your SPARQL endpoint is really easy to do with **[grlc.io](http://grlc.io/)**. You just need to define a few SPARQL queries in a GitHub repository, and grlc.io will handle everything else to expose a Swagger API (aka. Open API) to access your knowledge graph. 

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