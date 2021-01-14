---
id: argo-debug
title: Debug Argo workflow
---

## Debug a pod

To get into the container. Create YAML with command `tail /dev/null` to keep it running.

> Example of test pod in [tests/test-devnull-pod.yml](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/tests/test-devnull-pod.yml):

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    purpose: test
  name: test-devnull-pod
spec:
  volumes:
  - name: workdir
    hostPath:
      path: /data/d2s-workspace
      type: Directory
    # persistentVolumeClaim:
    #   claimName: d2s-storage
  containers:
  - name: test-devnull
  	# Change the image to test here
    image: umids/rdfunit:latest
    command: [ "tail", "-f", "/dev/null"]
    resources:
      limits:
        cpu: 1000m 
        memory: 10Gi 
    volumeMounts:
    - name: workdir
      mountPath: /data
```

> Then start the pod:

```shell
oc create -f tests/test-devnull-pod.yml
```

> Connect with the Shell:

```shell
oc rsh test-devnull-pod
```

## Debug an Argo workflow

Pod can also be tested within an Argo workflow, see [tests/test-devnull-argo.yml](https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/tests/test-devnull-argo.yml).

```shell
argo submit tests/test-devnull-argo.yml
```

![OpenShift](/img/openshift-logo.png)