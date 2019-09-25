---
id: argo-commands
title: Argo commands
---

![Argo project](/img/argo-logo.png)



## Argo commands

### List running Argo workflows

```shell
argo list
```

### Stop a workflow

```shell
argo terminate my-workflow
```

> This might not stop the workflow, in this case use `argo delete`

### Delete a workflow

```shell
argo delete my-workflow
```

---

## OpenShift commands

![OpenShift](/img/ophenshift-logo.png)

### List pods

```shell
oc get pod

# Get specific pod
oc get pod | grep d2s-download
```

### Create pod from YAML

```shell
oc create -f d2s-download-pod.yaml
```

### Delete pod

```shell
oc delete pod d2s-download-pod
```

### Get logs

```shell
oc logs -f d2s-download-pod
```

---

## Start services

[![Apache Drill](/img/drill-logo.png)](https://github.com/amalic/apache-drill)

### Start apache-drill

```shell
# Create pod
oc create -f d2s-pod-drill.yaml
# Create service for the pod
oc create -f d2s-service-drill.yaml
```

> OpenShift should already [propose Apache Drill](https://thenewstack.io/mapr-brings-apache-spark-and-apache-drill-to-kubernetes/) deployment.

[![GraphDB](/img/graphdb-logo.png)](https://ontotext.com/products/graphdb/)

### Start GraphDB

> **TODO**: Require private access to a private GraphDB build.

### Start Virtuoso

> **TODO**: load nquad files.