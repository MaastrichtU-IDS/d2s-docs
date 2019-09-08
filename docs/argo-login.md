---
id: argo-login
title: Login to OpenShift
---

You will first need to authenticate to the [DSRI cluster](https://app.dsri.unimaas.nl:8443/) using the [OpenShift client](https://www.okd.io/download.html).

Get the command from the `Copy Login Command` button, in the user details, at the top right of the [OpenShift webpage](https://app.dsri.unimaas.nl:8443/) (your token is automatically provided).

```bash
oc login https://openshift_cluster:8443 --token=MY_TOKEN
```

> Paste the command in your terminal.

![](/data2services/img/ophenshift-logo.png)

<!-- ![](/img/getting-started-preparation-verify.png) -->