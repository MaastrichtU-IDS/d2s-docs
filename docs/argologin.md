---
id: argologin
title: Login to OpenShift
---

[Authenticate yourself to the DSRI cluster](https://app.dsri.unimaas.nl:8443/) using the OpenShift client

```shell
oc login https://openshift_cluster:8443 --token=MY_TOKEN
```

Get the command with the token from the `Copy Login Command` button in the user details at the top right of the [OpenShift webpage](https://app.dsri.unimaas.nl:8443/).