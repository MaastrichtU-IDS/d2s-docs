---
id: argodebug
title: Debug Argo workflows
---

## Debug Argo

To get into the container. Create YAML with command `tail /dev/null` to keep it running.

> Example for [data2services-download](https://github.com/MaastrichtU-IDS/data2services-download):

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    purpose: download-data-files
  name: d2s-download-pod
  namespace: argo
spec:
  volumes:
  - name: workdir
    persistentVolumeClaim:
      claimName: data2services-storage
  containers:
  - name: d2s-download
    image: vemonet/data2services-download:latest
    command: [ "tail", "-f", "/dev/null"]
    volumeMounts:
    - name: workdir
      mountPath: /data
```

> Then start the pod:

```bash
oc create -f archives/d2s-download-pod.yaml

# Connect with Shell
oc rsh d2s-download-pod
```

---

## Commands

```bash
argo list
```

> List running Argo workflows



```bash
oc get pod
```

> List OpenShift pods



```bash
oc create -f examples/hello-openshift/hello-pod.json
```

> Create OpenShift pod from JSON