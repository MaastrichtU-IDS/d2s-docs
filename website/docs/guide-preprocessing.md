---
id: guide-preprocessing
title: Preprocess input files
---

Data files sometimes requires preprocessing  (convert to CSV, add column header, split), Python can be quite slow for some tasks, so Bash can be a good solution.

## Convert TSV to CSV

Can be helpful, especially for [processing RML mappings](/docs/d2s-rml).

```shell
sed -e 's/"/\\"/g' -e 's/\t/","/g' -e 's/^/"/' -e 's/$/"/' -e 's/\r//' dataset.tsv > dataset.csv
```

## Add Tabular file header label

RML use the tabular files columns header to map the data. If the tabular files to process don't have a header, it can easily be added by using the `sed` command in the [download.sh](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/support/template/dataset/download/download_examples.sh#L68) script.

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

In case you need to split large files:

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
