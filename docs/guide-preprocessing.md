---
id: guide-preprocessing
title: Preprocess input files
---

![](/img/csv-logo.png)

## Convert TSV to CSV

Can be helpful, especially for [processing RML mappings](/docs/d2s-rml).

```shell
sed -e 's/"/\\"/g' -e 's/\t/","/g' -e 's/^/"/' -e 's/$/"/' -e 's/\r//' dataset.tsv > dataset.csv
```

## Add Tabular file header label

[AutoR2RML](https://github.com/MaastrichtU-IDS/AutoR2RML) generates the generic RDF predicates out of tabular files columns header. If the tabular files to process don't have a header, it can easily be added by using the `sed` command in the [download.sh](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/support/template/dataset/download/download_examples.sh#L68) script.

> See the [example](https://github.com/MaastrichtU-IDS/d2s-cwl-workflows/blob/master/support/template/dataset/download/download_examples.sh#L68) in the dataset template.

### CSV

```shell
sed -i '1s/^/column1,column2,column3\n/' *.csv
```

### TSV

```shell
sed -i '1s/^/column1\tcolumn2\tcolumn3\n/' *.tsv
```

### PSV

```shell
sed -i '1s/^/column1|column2|column3\n/' *.psv
```

## Split big files

To process large CSV or TSV file with Apache Drill, you might need to change some parameters in the [Drill web UI](http://localhost:8048/options) at http://localhost:8048/options:

*  Increase the `max_memory_per_node`. The maximum value of this parameter is `8589934592` on our servers.
* Try increasing `planner.memory_limit` to `8589934592`

In case changing the parameters doesn't solve the issue, you can try to split the file:

```shell
rm -rf {1..90}
mkdir split
# Split in less than 1G files for COHD
split -l 6150000 paired_concept_counts_associations.tsv split/
# 3000000
split -l 1000000 paired_concept_counts_associations.tsv split
# 1000000 : 100M ...
count=1
for file in split/*
do
	mkdir $count
	mv $file $count/paired_concept_counts_associations.tsv
	count=$((count+1))
done
rmdir split
# Add columns header for every file
sed -i '1s/^/dataset_id\tconcept_id_1\tconcept_id_2\tconcept_count\tconcept_prevalence\tchi_square_t\tchi_square_p\texpected_count\tln_ratio\trel_freq_1\trel_freq_2\n/' */*.tsv
# Remove the extra header line in the first split
sed -i -e "1d" 1/paired_concept_counts_associations.tsv

# Copy the splitted file in the workspace
rm -rf /data/ddbiolink/workspace/input/cohd/{1..90}
cp -r /data/translator/cohd/{1..90} /data/ddbiolink/workspace/input/cohd/
```

Processing large files on node2 can lead to generating an important amount of logs which is overloading the memory. Logs generated in `/var/lib/docker/overlay2`

To clear the memory perform `docker system prune`

Test Drill query:

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

