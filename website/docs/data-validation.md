---
id: data-validation
title: RDF data validation
---

Optionally you can setup data validation to make sure all data added to the knowledge graph is complying with a specific data model.

### SHACL validation

For more informations about creating SHACL shapes, checkout the SHACL Shapes repository of the Institute of Data Science at Maastricht University: **https://github.com/MaastrichtU-IDS/shacl-shapes**

To find SHACL shapes, checkout the **Shapes of You** SHACL shapes registry: **http://index.semanticscience.org**

Here are a few solutions to validate RDF with SHACL:

* Enable SHACL validation when creating a new repository if using Ontotext GraphDB free edition. 
* Use [RDF4J](https://rdf4j.org/documentation/programming/shacl/) with java (good if your already working on a java app based on RDF4J) 
* [TopQuadrant/shacl](https://github.com/TopQuadrant/shacl) (java)
* [RDFLib/pySHACL](https://github.com/RDFLib/pySHACL) (python, requires to load the RDF in rdflib)

You can also validate small RDF files directly from a few web app:

* https://shacl.org/playground
* http://rdfshape.weso.es/validate

### Use Compact SHACL

You can try out the experimental [Compact SHACL syntax](https://w3c.github.io/shacl/shacl-compact-syntax/) to more easily write shapes.

There are currently no VisualStudio Code extension for better visualization of compact SHACL files, but you can use the `turtle` format to make it more readable. Open the `settings.json` file in **File** > **Preference** > **Settings**, and add:

```bash
    "files.associations": {
        "*.shaclc": "turtle",
        "*.shc": "turtle"
    }
```

You can easily convert Compact SHACL to RDF SHACL (required for most use of SHACL) with java:

1. Download the jar:

```bash 
wget https://gitlab.ontotext.com/yasen.marinov/shaclconvert/-/raw/master/built/shaclconvert.jar
```

2. Convert compact SHACL to RDF SHACL:

```bash
java -jar shaclconvert.jar input.shaclc output.shacl
```

### ShEx validation

Here are a few solutions to validate RDF with ShEx:

* [iovka/shex-java](https://github.com/iovka/shex-java) using RDF4J 
* [hsolbrig/PyShEx](https://github.com/hsolbrig/PyShEx/) (python, can perform validation directly on a SPARQL endpoint)

You can also validate small RDF files directly from a few web app:

* http://shex.io/webapps/shex.js/doc/shex-simple.html
* http://rdfshape.weso.es/validate