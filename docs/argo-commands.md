---
id: argo-commands
title: Argo commands
---

![Argo project](/data2services/img/argo-logo.png)

## List running Argo workflows

```bash
argo list
```

## Stop a workflow

```bash
argo terminate my-workflow
```

> This might not stop the workflow, in this case use `argo delete`

## Delete a workflow

```bash
argo delete my-workflow
```

---

![OpenShift](/data2services/img/ophenshift-logo.png)

## List OpenShift pods

```bash
oc get pod
```

## Create OpenShift pod from JSON

```bash
oc create -f examples/hello-openshift/hello-pod.json
```
