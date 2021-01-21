---
id: translator-standards
title: Translator Standards
---

This page provides a big picture of the various standards developed and used in the [Translator](https://ncatstranslator.github.io/) project.

What we mean about a **Translator API**: an API developed in the context of the Translator project, by a Knowledge Provider (KP) or an Autonomous Relay Agent (ARA). A Translator API implements Translator standards to query the exposed data, and is described using the OpenAPI specifications.

## BioLink model

A high-level semantic model to represent biological and biomedical knowledge. 

All Translator data and tools comply with this model: data is annotated using BioLink concepts, and tools can use the BioLink model to query the data.

The [BioLink model is defined in a YAML file](https://github.com/biolink/biolink-model/blob/master/biolink-model.yaml) using the [BioLink modelling language (biolinkml)](https://biolink.github.io/biolinkml/). From the YAML-defined model `biolinkml` automatically generates all resources required to define the BioLink model:
* OWL ontology
* ShEx shape for data validation
* JSON-LD context
* GraphQL schema
* Human-readable documentation
* And more...

Visit the BioLink model documentation at [https://biolink.github.io/biolink-model/docs](https://biolink.github.io/biolink-model/docs)

## Translator Reasoner API

Also known as "**TRAPI**", or just "Reasoner API"

TRAPI defines standard operations to query a Translator API, described using the [OpenAPI specifications](https://www.openapis.org/) (in an `openapi.yml` file). The TRAPI API operations are implemented in every Translator API, and allow to query the data using the BioLink model and a standard JSON model. It returns the results using a standard JSON message. Note that Translator APIs can also implement their own operations, alongside the TRAPI operations.

See the GitHub repository: [https://github.com/NCATSTranslator/ReasonerAPI](https://github.com/NCATSTranslator/ReasonerAPI)

Example of a TRAPI 1.0.0 query message using the BioLink model:

```json
{
    "query_graph": {
        "nodes": {
            "n0": {
                "category": "biolink:Disease",
                "id": "MONDO:0005737"
            },
            "n1": {
                "category": "biolink:Gene"
            }
        },
        "edges": {
            "e01": {
                "subject": "n0",
                "object": "n1"
            }
        }
    }
}
```

## Knowledge Graph eXchange

Also known as "**KGX**"

A format to define knowledge graphs by providing nodes and edges in CSV files

KGX is particularly used to share and load large Knowledge Graphs as dumps.

See the python library on GitHub at [https://github.com/biolink/kgx](https://github.com/biolink/kgx)

## BioThings

Also known as "**BTE**", "**Smart API** specifications", or just "BioThings"

This standard extend the [Smart API specifications](https://smart-api.info/guide) (which is an extension of the [OpenAPI specifications](https://www.openapis.org/)) enabling to annotate non-standard API operations to make them "more standard" (so that the BioThings Explorer can analyze the API specifications to retrieve more informations about the API call, such as the types of inputs and outputs)

Originally the BioThings specifications are part of the [BioThings API ecosystem](https://biothings.io/), which provides scalable tools to expose data as standard APIs.

See the BioThings GitHub organization: [https://github.com/biothings](https://github.com/biothings)



