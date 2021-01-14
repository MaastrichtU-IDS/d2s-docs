---
id: download-data
title: Download data
---

Define a simple Bash script to download the data:

```bash
# Download file from URL
wget -O file.tar.gz https://download.org/file.tar.gz

# Unzip recursively all .tar.gz files
tar -xzvf *.tar.gz

# Unzip .zip files
unzip -o \*.zip

# Rename extension (e.g.: txt in tsv)
rename s/\.txt/.tsv/ *.txt

# Convert TSV to CSV
sed -e 's/"/\\"/g' -e 's/\t/","/g' -e 's/^/"/' -e 's/$/"/'  -e 's/\r//' data.tsv > data.csv

# Add a header row to columns of csv files
sed -i '1s/^/column1,column2,column3\n/' *.csv
```