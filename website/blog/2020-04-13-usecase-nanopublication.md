---
title: Publish Nanopublications
author: Vincent Emonet
authorURL: "https://vemonet.github.io/"
---


Publish [Nanopublications](http://nanopub.org/) using [Nanobench](https://github.com/peta-pico/nanobench).

<!--truncate-->

## Install the d2s tool

See the [complete installation documentation](https://d2s.semanticscience.org/docs/d2s-installation) to install pip, [pipx](https://pipxproject.github.io/pipx/) and Docker using [Chocolatey](https://chocolatey.org/). 

Then  install the [d2s tool](https://pypi.org/project/d2s/) using pipx or pip:

```shell
pipx install d2s cwlref-runner
d2s init my-project-folder
cd my-project-folder
```

> We recommend using [pipx](https://pipxproject.github.io/pipx/), but you can use `pip` or `pip3` depending on your preferences.

You will not need the GraphDB installation file for this tutorial. So you can leave it blank when asked.

## Start Nanobench

We will use the [Nanobench](https://github.com/peta-pico/nanobench) web service to publish [Nanopublications](http://nanopub.org/).

```shell
d2s start nanobench
```

> Access on http://localhost:37373

> See [official documentation for Docker](https://github.com/peta-pico/nanobench/blob/master/INSTALL-with-Docker.md).

Alternatively Nanobench can be run directly using `docker run` if [d2s](https://pypi.org/project/d2s/) is not installed

```shell
docker run -d --rm --name nanobench -p 37373:37373 \
  -v $(pwd)/workspace/.nanopub:/root/.nanopub \
  -e NANOBENCH_API_INSTANCES=http://grlc.np.dumontierlab.com/api/local/local/ http://grlc.nanopubs.lod.labs.vu.nl/api/local/local/ http://130.60.24.146:7881/api/local/local/ \
  nanopub/nanobench
```

## Complete your profile

Follow the instructions provided by the [locally deployed Nanobench web UI](http://localhost:37373/) to complete your profile, and publish your first nanopublication:

* Provide your [ORCID](https://orcid.org) identifier. If you don't have one you can create an account at https://orcid.org.

* You will then be prompted to create you `Keys for Digital Signatures`. Those keys are stored in `workspace/.nanopub/id_rsa`
* To finish, [link your ORCID account](http://localhost:37373/orcidlinking) to prove you are the rightful owner (follow the [Nanobench web UI instructions](http://localhost:37373/orcidlinking))
  * Keep the URL generated for your first nanopublication. It should starts with `http://purl.org/np/`

## Publish your first nanopublications

Follow the tutorial from the [locally deployed Nanobench web UI](http://localhost:37373/) to publish your first nanopublications to the Maastricht University Institute of Data Science and and the official Nanopub servers! 

Feel free to publish new nanopublications anytime you want 📢

## Create a new template

We will now create a new template to **describe a dataset that has a publicly available SPARQL endpoint**.

To create a new template we will need to use [Nanopub-java](https://github.com/Nanopublication/nanopub-java) to publish a Nanopublication from an arbitrary number of triples, instead of Nanobench.

### Define the template

We defined the template to let the user describe 4 properties:

* title
* description
* homepage
* SPARQL endpoint URL

Additionally the type `dcat:Dataset` is used to describe the generated entity.

The template is defined in TRiG format (similar to Turtle):

```turtle
@prefix : <http://purl.org/nanopub/temp/template-boilerplate_> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix dct: <http://purl.org/dc/terms/> .
@prefix prov: <http://www.w3.org/ns/prov#> .
@prefix np: <http://www.nanopub.org/nschema#> .
@prefix orcid: <https://orcid.org/> .
@prefix nt: <https://w3id.org/np/o/ntemplate/> .
@prefix npx: <http://purl.org/nanopub/x/> .
@prefix dcat: <http://www.w3.org/ns/dcat#> .
@prefix dctypes: <http://purl.org/dc/dcmitype/> .
@prefix void: <http://rdfs.org/ns/void#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
:Head {
  : np:hasAssertion :assertion ;
    np:hasProvenance :provenance ;
    np:hasPublicationInfo :pubinfo ;
    a np:Nanopublication .
}
:assertion {
  :assertion a nt:AssertionTemplate ;
    rdfs:label "Describe a dataset with a SPARQL endpoint" ;
    nt:hasStatement :st0 , :st1 , :st2 , :st3 , :st4 .
  :title a nt:LiteralPlaceholder ;
    rdfs:label "add the name of the dataset here" .
  :description a nt:LiteralPlaceholder ;
    rdfs:label "add the description of the dataset here" .
  :homepage a nt:UriPlaceholder ;
    rdfs:label "add the URL to the dataset homepage here" .
  :sparqlEndpoint a nt:UriPlaceholder ;
    rdfs:label "add the URL to the dataset SPARQL endpoint here" .
  :dataset a nt:LocalResource ;
    rdfs:label "This dataset" .
  :st0 rdf:object dctypes:Dataset ;
    rdf:predicate rdf:type ;
    rdf:subject :dataset ;
    a rdf:Statement ;
    nt:statementOrder 0 .
  :st1 rdf:object :title ;
    rdf:predicate dct:title ;
    rdf:subject :dataset ;
    a rdf:Statement ;
    nt:statementOrder 1 .
  :st2 rdf:object :description ;
    rdf:predicate dct:description ;
    rdf:subject :dataset ;
    a rdf:Statement ;
    nt:statementOrder 2 .
  :st3 rdf:object :homepage ;
    rdf:predicate foaf:page ;
    rdf:subject :dataset ;
    a rdf:Statement ;
    nt:statementOrder 3 .
  :st4 rdf:object :sparqlEndpoint ;
    rdf:predicate void:sparqlEndpoint ;
    rdf:subject :dataset ;
    a rdf:Statement ;
    nt:statementOrder 4 .
  dct:title rdfs:label "has name" .
  dct:description rdfs:label "has description" .
  foaf:page rdfs:label "has homepage" .
  void:sparqlEndpoint rdfs:label "has SPARQL endpoint URL" .
  rdf:type rdfs:label "is a" .
  dctypes:Dataset rdfs:label "Dataset" .
}
:provenance {
  :assertion prov:wasAttributedTo orcid:0000-0002-1501-1082 .
}
:pubinfo {
  : dct:created "2020-04-14T13:13:44.817+01:00"^^xsd:dateTime ;
    dct:creator orcid:0000-0002-1501-1082 .
}
```

Copy this template to a file named `nanopub.trig` in the project root folder.

### Publish the template

Copy the `id_rsa` key file generated by Nanobench  to your home

```shell
cp -r workspace/.nanopub ~/.nanopub
```

Sign the `nanopub.trig` in the current folder using [nanopub-java image from DockerHub](https://hub.docker.com/repository/docker/umids/nanopub-java):

```shell
docker run -it --rm -v ~/.nanopub:/root/.nanopub -v $(pwd):/data umids/nanopub-java sign /data/nanopub.trig
```

It should generate a `signed.nanopub.trig`, you can now publish it:

```shell
docker run -it --rm -v ~/.nanopub:/root/.nanopub -v $(pwd):/data umids/nanopub-java publish /data/signed.nanopub.trig
```

Our template can now be used at http://localhost:37373/publish?22&template=http://purl.org/np/RAVF_WDsJRkRXXWgaJx5p9EnjLIguIv0-GqDlbfBtBPcQ 

See an example of a nanopub generated using this template to describe the Bio2RDF biomedical dataset: http://server.nanopubs.lod.labs.vu.nl/RAjqGxG3uPcnpa7RA1h-QiSnGZqRhnQNCboV4bl-Vj0m8 

Feel free to add more datasets or create new templates!