---
id: argo-commands
title: Argo commands
---

![Argo project](/data2services/img/argo-logo.png)

## List running Argo workflows

```shell
argo list
```

## Stop a workflow

```shell
argo terminate my-workflow
```

> This might not stop the workflow, in this case use `argo delete`

## Delete a workflow

```shell
argo delete my-workflow
```

---

![OpenShift](/data2services/img/ophenshift-logo.png)

## List OpenShift pods

```shell
oc get pod

# Get specific pod
oc get pod | grep d2s-download
```

## Create OpenShift pod from JSON

```shell
oc create -f d2s-download-pod.yaml
```

## Delete pod

```shell
oc delete pod d2s-download-pod
```

## Get logs

```shell
oc logs -f d2s-download-pod
```

