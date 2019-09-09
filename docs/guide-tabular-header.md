---
id: guide-tabular-header
title: Fix tabular files without header
---

![](/img/csv-logo.png)

AutoR2RML generates the generic RDF predicates out of tabular files columns header. If the tabular files to process don't have a header, it can easily be addedby using the `sed` command in the [data2services-download script](https://github.com/MaastrichtU-IDS/data2services-download/blob/master/datasets/TEMPLATE/download.sh#L75:L79).

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