---
id: argo-volume
title: Define volumes
---

## Define persistent volume

Go to https://app.dsri.unimaas.nl:8443/console/project/argo/create-pvc

* Storage class > `maprfs-ephemeral`
* Shared Access (RWX)

---

## Mount a filesystem UI

Deploy [filebrowser](https://hub.docker.com/r/filebrowser/filebrowser) on MapR to access volumes

Go to https://app.dsri.unimaas.nl:8443/console/catalog > click **Deploy image**

* Add to Project: `argo`
* Image Name: `filebrowser/filebrowser` 
* Give a name to your image: `filebrowser`
* Click **Deploy**
* Go to `argo` project > Click on latest deployment of the `filebrowser`
* Delete the automatically mounted volume, and add the persistent volume (`data2services-storage`). Should be on `/srv`
* Add route

> Access on http://d2s-filebrowser-argo.app.dsri.unimaas.nl/files/

---

## Define a temporary volume for a workflow

Temporary volumes can be defined in Argo at runtime and are removed when the workflow terminates.

```yaml
volumeClaimTemplates:            # define volume, same syntax as k8s Pod spec
  - metadata:
      name: workdir              # name of volume claim
      annotations:
        volume.beta.kubernetes.io/storage-class: maprfs-ephemeral
        volume.beta.kubernetes.io/storage-provisioner: mapr.com/maprfs
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 100Gi 
```