---
id: workflow-github
title: Deploy workflows
---

We use GitHub Actions to automatically run the different part of the workflow in a reproducible way:

* Download the input data files
* Run Python script (to directly generate RDF, or perform preprocessing of the data for RML)
* Run the RML mapper to generate the RDF data, if applicable
* Upload the generated RDF file to the SPARQL endpoint
* Generate and publish descriptive statistics for the published data

:::info Secure credentials 🔒

Securely define credentials as GitHub secrets (API keys, username, password, etc)

:::

## GitHub Actions for RDF

A few GitHub Actions are available on the [GitHub marketplace](https://github.com/marketplace?query=rdf) to easily work with RDF data.

### 🗺️ RML Mapper

A [GitHub Action for the rmlmapper-java](https://github.com/marketplace/actions/rml-mapper-java)

```yaml
- name: Run RML mapper
  uses: vemonet/rmlmapper-java@v4.9.0
  with:
    mapping: mappings.rml.ttl
    output: rdf-output.nt
  env:
    JAVA_OPTS: "-Xmx6g"
```

### 📬 SPARQL operations

A [GitHub Action for d2s-sparql-operations](https://github.com/marketplace/actions/sparql-operations), it allows to perform operations on SPARQL endpoints using [RDF4J](https://rdf4j.org/) (SPARQL select, construct, insert, delete queries, upload RDF files, split statements...)

Execute insert queries using local folder:

```yaml
- uses: MaastrichtU-IDS/sparql-operations-action@v1
  with:
    operation: upload
    file: my-folder/*.ttl
    endpoint: https://graphdb.ontotext.com/repositories/test/statements
    user: ${{ secrets.SPARQL_USER }}
    password: ${{ secrets.SPARQL_PASSWORD }}
    inputvar: https://w3id.org/d2s/graph/geonames
    outputvar: https://w3id.org/d2s/metadata
    servicevar: http://localhost:7200/repositories/test-vincent
```

Upload RDF from local folder:

```yaml
- uses: MaastrichtU-IDS/sparql-operations-action@v1
  with:
    file: folder-with-rq-files/
    endpoint: https://graphdb.ontotext.com/repositories/test/statements
    user: ${{ secrets.SPARQL_USER }}
    password: ${{ secrets.SPARQL_PASSWORD }}
```

### ✔️ Validate RDF

A [GitHub Action to validate RDF with Jena](https://github.com/marketplace/actions/validate-rdf-with-jena)

```yaml
- uses: vemonet/jena-riot-action@v3.14
  with:
    input: my_file.ttl
```

### 📝 Convert YARRRML to RML

A [GitHub Action for the yarrrml-parser](https://github.com/marketplace/actions/yarrrml-parser), to convert YARRRML YAML files to RML turtle files.

```yaml
- uses: vemonet/yarrrml-parser@v1.1
  with:
    input: mappings.yarrr.yml
    output: mappings.rml.ttl
```

###  💽 Compress RDF to HDT

Convert ntriples to HDT using the [hdt-cpp docker image](https://hub.docker.com/r/rdfhdt/hdt-cpp):

```yaml
- name: Compress RDF to HDT
  uses: vemonet/rdfhdt-action@master
  with:
    input: rdf-output.nt
    output: hdt-output.hdt
```

### 📈 Compute metadata

:::caution Work in progress

Computing [HCLS descriptive metadata](https://www.w3.org/TR/hcls-dataset/) for a SPARQL endpoint is a work in development in the [`d2s` CLI](https://github.com/MaastrichtU-IDS/d2s-cli)

:::

Requires Python 3.6+ setup.

```yaml
- name: Generate HCLS metadata for a SPARQL endpoint
  run: |
  	pip install d2s
    d2s metadata analyze $SPARQL_ENDPOINT -o metadata.ttl
```

> Metadata generated as turtle RDF in the `metadata.ttl` file.

## Automate data processing and loading

RDF data can be automatically generated and loaded using GitHub Actions workflows.

See [this workflow](https://github.com/MaastrichtU-IDS/food-claims-kg/blob/master/.github/workflows/generate-rdf.yml) to generate data using a simple `convert_to_rdf.py` file and load it in the triplestore

1. Checkout the `git` repository file in your current folder:

```yaml
- uses: actions/checkout@v2
```

2. Download input file from Google Docs

```yaml
    - name: Download CSV files from Google docs
      run: |
        mkdir -p data/output
        wget -O data/food-claims-kg.xlsx "https://docs.google.com/spreadsheets/d/1RWZ6AlGB8m7PO5kjsbbbeI4ETLwvKLOvkrzOpl8zAM8/export?format=xlsx&id=1RWZ6AlGB8m7PO5kjsbbbeI4ETLwvKLOvkrzOpl8zAM8"
```

3. Install Python dependencies

```yaml
    - name: Install Python dependencies
      run: |
        python -m pip install -r requirements.txt
```

4. Run the python script to generate RDF

```yaml
    - name: Run Python script to generate RDF
      run: |
        python src/convert_to_rdf.py
```

5. Optional: clear an existing graph in the triplestore

```yaml
    - name: Clear existing graph
      uses: vemonet/sparql-operations-action@v1
      with:
        query: "CLEAR GRAPH <https://w3id.org/foodkg/graph>"
        endpoint: https://graphdb.dumontierlab.com/repositories/FoodHealthClaimsKG/statements
        user: ${{ secrets.GRAPHDB_USER }}
        password: ${{ secrets.GRAPHDB_PASSWORD }}
```

6. Upload the output as artifact to be able to download them from the GitHub website, or pass them between jobs:

```yaml
- name: Upload RDF output artifact
  id: stepupload
  uses: actions/upload-artifact@v1
  with:
    name: rdf-output
    path: rdf-file.nq
```

7. Optional: download the artifact (`rdf-output` here) back in another job:

```yaml
- name: Get RDF output artifact
  uses: actions/download-artifact@v1
  with:
    name: rdf-output
```

The files in the artifact can be accessed directly, e.g. here `rdf-output/rdf-file.nq`

:::caution Secrets

You will need to define those 2 secrets in your GitHub repository workflows secrets: `GRAPHDB_USER` and `GRAPHDB_PASSWORD`

:::

## Limitations

The following [limitations apply to GitHub-hosted runner](https://help.github.com/en/actions/getting-started-with-github-actions/about-github-actions#usage-limits) (they do not apply for self-hosted runners):

- Each **job** in a workflow can run for up to **6 hours** of execution time.
- Each **workflow** run is limited to **72 hours**.
- Total **concurrent jobs** for the free plan: **20 jobs** (5 macOS)

GitHub-hosted runners run on [machines with the following specifications](https://help.github.com/en/actions/reference/virtual-environments-for-github-hosted-runners):

- **2-core CPU**
- **7 GB** of RAM memory
- **14 GB** of SSD disk space
- Environments: `ubuntu-latest` (a.k.a. `ubuntu-18.04`), `ubuntu-20.04`, `windows-latest`, `macos-latest`

[GitHub free plan](https://help.github.com/en/github/setting-up-and-managing-billing-and-payments-on-github/about-billing-for-github-actions) allows to run Actions **in private repositories**, but impose execution time and storage limitations. By default GitHub set your spending limit to 0 €, so you will not be billed by surprise. The free plan provides the following credits per months, they are attached to the user or organization owning the repository running the workflows:

- **2,000 minutes** of execution time (~33h)
- **500 MB of storage** (for private artifacts and GitHub Packages)

## Test Actions locally

[Act](https://github.com/nektos/act) allows to run GitHub Actions workflows directly on your local machine to test.

Provide a specific image and run a specific job:

```shell
act -P ubuntu-latest=nektos/act-environments-ubuntu:18.04 -j generate-rdf
```

