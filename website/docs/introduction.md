---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /
---

This documentation provides straightforward guidelines to integrate and access data in a RDF knowledge graph.

* Integrate any structured data using various solutions.
* Deploy various interfaces to consume the Knowledge Graph data.
* Deploy user-friendly web UI to access the integrated data.

The documented method allow to quickly publish structured data complying with the **FAIR principles** (Findable, Accessible, Interoperable, Re-usable).

## Create a repository

First step is to create a repository for your project on [GitHub](https://github.com). This will allow you to keep track of the changes to your scripts and mappings using `git`.

* Add a `README.md` file with basic informations about your project: description, how to run it, etc.
* Add a `LICENSE` file with the license information (e.g. MIT license)
* Follow a consistent pattern to store your mapping files and scripts.

## Recommended project folder structure

```bash
root-directory
├── .github/workflows
│   ├── process-dataset1.yml
│   └── process-dataset2.yml
├── .gitignore
├── LICENSE
├── README.md
├── docker-compose.yml	# If needed
├── Dockerfile			# If needed
└── mappings			# Folders of the different datasets mappings
    └── my-dataset1
        ├── README.md	# Notes about how and where to run those mappings
        ├── mappings.yarrr.yml		# YARRRML mappings
        ├── mappings.rml.ttl		# RML mappings
        ├── scripts			# Script to download input files
        │   ├── download.sh			# Bash script to download data
        │   └── preprocessing.py	# Python script for preprocessing
        └── metadata			# HCLS metadata about the dataset 
            ├── metadata-summary.ttl
            ├── metadata-version-1.ttl
            └── metadata-version-2.ttl
```