---
id: translator-standards
title: Translator Standards
---

What we mean about a **Translator API**: an API developed in the context of the Translator project, by a Knowledge Provider (KP) or an Autonomous Relay Agent (ARA). A Translator API implements Translator standards to query the exposed data.

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

It is the main standard every Translator APIs needs to implement, and is described using the [OpenAPI specifications](https://www.openapis.org/) (in an `openapi.yml` file)

See the GitHub repository: [https://github.com/NCATSTranslator/ReasonerAPI](https://github.com/NCATSTranslator/ReasonerAPI)

All APIs in the Translator project propose this standard API call, which returns a standard message (both in JSON). Note that usually APIs also implement their own calls alongside this call.

See the standard on GitHub at [https://github.com/NCATSTranslator/ReasonerAPI](https://github.com/NCATSTranslator/ReasonerAPI)

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

KGX is particularly used to share large Knowledge Graphs as dumps.

See the python library on GitHub at [https://github.com/biolink/kgx](https://github.com/biolink/kgx)

## BioThings

Also known as "**BTE**", "**Smart API** specifications", or just "BioThings"

This standard extend the [Smart API specifications](https://smart-api.info/guide) (which is an extension of the [OpenAPI specifications](https://www.openapis.org/)) enabling to annotate non-standard API calls to make them "more standard" (so that the BioThings Explorer can analyze the API specifications to retrieve more informations about the API call, such as the types of inputs and outputs)

Originally the BioThings specifications are part of the [BioThings API ecosystem](https://biothings.io/), which provides scalable tools to expose data as standard APIs.

See the BioThings GitHub organization: [https://github.com/biothings](https://github.com/biothings)



