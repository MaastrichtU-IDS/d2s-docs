---
id: workflow-github
title: Run workflows
---

We use GitHub Actions to automatically run the different part of the workflow in a reproducible way:

* Run Python script (to directly generate RDF, or perform preprocessing of the data for RML)
* Run the RML mapper to generate the RDF data, if applicable
* Upload the generated RDF file to the SPARQL endpoint
* Generate and publish descriptive statistics for the published data
* Define credentials as GitHub secrets (API keys, username, password)

### Automate data processing and loading

RDF data can be automatically generated and loaded using GitHub Actions workflows.

See [this workflow](https://github.com/MaastrichtU-IDS/food-claims-kg/blob/master/.github/workflows/generate-rdf.yml) to generate data using a simple `convert_to_rdf.py` file and load it in the triplestore

1. Download input file from Google Docs and run python script to generate RDF

```yaml
    - name: Install Python dependencies
      run: |
        python -m pip install -r requirements.txt
    - name: Download CSV files from Google docs
      run: |
        mkdir -p data/output
        wget -O data/food-claims-kg.xlsx "https://docs.google.com/spreadsheets/d/1RWZ6AlGB8m7PO5kjsbbbeI4ETLwvKLOvkrzOpl8zAM8/export?format=xlsx&id=1RWZ6AlGB8m7PO5kjsbbbeI4ETLwvKLOvkrzOpl8zAM8"
    - name: Run Python script to generate RDF
      run: |
        python src/convert_to_rdf.py
```

2. Optional: clear existing graph

```yaml
    - name: Clear existing graph
      uses: vemonet/sparql-operations-action@v1
      with:
        query: "CLEAR GRAPH <https://w3id.org/foodkg/graph>"
        endpoint: https://graphdb.dumontierlab.com/repositories/FoodHealthClaimsKG/statements
        user: ${{ secrets.GRAPHDB_USER }}
        password: ${{ secrets.GRAPHDB_PASSWORD }}
```

3. Load RDF file previously generated by the workflow in `data/output/food_health_kg.ttl` for the example

```yaml
    - name: Import RDF files in the triplestore
      uses: MaastrichtU-IDS/RdfUpload@master
      with:
        file: data/output/food_health_kg.ttl
        endpoint: https://graphdb.dumontierlab.com/repositories/FoodHealthClaimsKG/statements
        user: ${{ secrets.GRAPHDB_USER }}
        password: ${{ secrets.GRAPHDB_PASSWORD }}
        graph: "https://w3id.org/foodkg/graph"
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
