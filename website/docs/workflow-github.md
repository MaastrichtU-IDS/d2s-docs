---
id: workflow-github
title: Run workflows
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

## Automate data processing and loading

RDF data can be automatically generated and loaded using GitHub Actions workflows.

See [this workflow](https://github.com/MaastrichtU-IDS/food-claims-kg/blob/master/.github/workflows/generate-rdf.yml) to generate data using a simple `convert_to_rdf.py` file and load it in the triplestore

1. Download input file from Google Docs

```yaml
    - name: Download CSV files from Google docs
      run: |
        mkdir -p data/output
        wget -O data/food-claims-kg.xlsx "https://docs.google.com/spreadsheets/d/1RWZ6AlGB8m7PO5kjsbbbeI4ETLwvKLOvkrzOpl8zAM8/export?format=xlsx&id=1RWZ6AlGB8m7PO5kjsbbbeI4ETLwvKLOvkrzOpl8zAM8"
```

2. Install Python dependencies

```yaml
    - name: Install Python dependencies
      run: |
        python -m pip install -r requirements.txt
```

3. Run the python script to generate RDF

```yaml
    - name: Run Python script to generate RDF
      run: |
        python src/convert_to_rdf.py
```

4. Optional: clear existing graph

```yaml
    - name: Clear existing graph
      uses: vemonet/sparql-operations-action@v1
      with:
        query: "CLEAR GRAPH <https://w3id.org/foodkg/graph>"
        endpoint: https://graphdb.dumontierlab.com/repositories/FoodHealthClaimsKG/statements
        user: ${{ secrets.GRAPHDB_USER }}
        password: ${{ secrets.GRAPHDB_PASSWORD }}
```

:::caution Secrets

You will need to define those 2 secrets in your GitHub repository workflows secrets: `GRAPHDB_USER` and `GRAPHDB_PASSWORD`

:::

## Test Actions locally

[Act](https://github.com/nektos/act) allows to run GitHub Actions workflows directly on your local machine to test.

Provide a specific image and run a specific job:

```shell
act -P ubuntu-latest=nektos/act-environments-ubuntu:18.04 -j generate-rdf
```

