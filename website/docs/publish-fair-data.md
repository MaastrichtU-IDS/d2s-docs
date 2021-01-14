---
id: publish-fair-data
title: Publish FAIR data
---

## Get a Digital Object Identifier for your resource

For research publish your resource on a repository to get a DOI (Digital Object Identifier)

- https://zenodo.org/ 
  - e.g. https://zenodo.org/record/4269952 
- [https://fairsharing.org](https://fairsharing.org/)
  - e.g. https://fairsharing.org/FAIRsharing.dpkb5f 

:::tip Even more FINDABLE

[ORCID](https://orcid.org/) is a good way to identify and authenticate yourself across research publishing platforms. Don't hesitate to create an account if you need it.

:::

## Enable persistent identifiers

To resolve your concepts URIs.

URLs and domain name can change fast. If you want your knowledge graph identifiers to be resolvable in a few years, it is highly recommended to use a service to redirect a Persistent identifier to the URL resolving the concept.

- [w3id.org](http://w3id.org/)
- [purl.org](http://purl.org/)

We recommend to use the [w3id.org](http://w3id.org/) system, as it allows any GitHub user to define and reserve your persistent namespace for free in a few minutes:

1. **Fork the** **[w3id.org](http://w3id.org/)** **repository**: https://github.com/perma-id/w3id.org 
2. **Create a folder** with your namespace name (e.g. my-onto)
3. **Add a `.htaccess` file** with the redirection to your ontology (and a `README.md` file shortly explaining the purpose of this namespace)
4. **Send a pull request** to the https://github.com/perma-id/w3id.org repository. It usually takes between a few hours and a few days to be accepted.

:::info See example

[See this example](https://github.com/vemonet/w3id.org/blob/master/d2s/.htaccess ) for a `.htaccess` passing the original w3id URI queries

:::

The persistent identifiers can be easily modified later if necessary, you will just need to send a new pull request with the changes.
