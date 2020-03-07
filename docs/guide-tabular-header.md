---
id: guide-tabular-header
title: Fix tabular files without header
---

![](/img/csv-logo.png)

[AutoR2RML](https://github.com/MaastrichtU-IDS/AutoR2RML) generates the generic RDF predicates out of tabular files columns header. If the tabular files to process don't have a header, it can easily be addedby using the `sed` command in the [download.sh](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/support/template/dataset/download/download_examples.sh#L68) script.

> See the [example](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/support/template/dataset/download/download_examples.sh#L68) in the dataset template.

## CSV

```shell
sed -i '1s/^/column1,column2,column3\n/' *.csv
```

## TSV

```shell
sed -i '1s/^/column1\tcolumn2\tcolumn3\n/' *.tsv
```

## PSV

```shell
sed -i '1s/^/column1|column2|column3\n/' *.psv
```

## Split huge files

You might want to split huge files if Apache Drill faces memory issues.

```shell
split -l 24639941 paired_concept_counts_associations.tsv split
sed -i '1s/^/<added columns header> /' file
sed -i '1s/^/dataset_id\tconcept_id_1\tconcept_id_2\tconcept_count\tconcept_prevalence\tchi_square_t\tchi_square_p\texpected_count\tln_ratio\trel_freq_1\trel_freq_2/' */*.tsv
```

Test Drill

```sql
select row_number() over (partition by filename) as autor2rml_rownum
    , NULLIF(trim(columns[0]), '') as `Dataset_id`
    , NULLIF(trim(columns[1]), '') as `Concept_id_1`
    , NULLIF(trim(columns[2]), '') as `Concept_id_2`
    , NULLIF(trim(columns[3]), '') as `Concept_count`
    , NULLIF(trim(columns[4]), '') as `Concept_prevalence`
    , NULLIF(trim(columns[5]), '') as `Chi_square_t`
    , NULLIF(trim(columns[6]), '') as `Chi_square_p`
    , NULLIF(trim(columns[7]), '') as `Expected_count`
    , NULLIF(trim(columns[8]), '') as `Ln_ratio`
    , NULLIF(trim(columns[9]), '') as `Rel_freq_1`
    , NULLIF(trim(columns[10]), '') as `Rel_freq_2`
  from dfs.root.`/data/cohd/paired_concept_counts_associations.tsv` OFFSET 1;
```

