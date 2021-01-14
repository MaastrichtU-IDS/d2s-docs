(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{104:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return i}));var r=n(3),a=n(7),o=(n(0),n(128)),c={id:"argo-debug",title:"Debug Argo workflow"},l={unversionedId:"argo-debug",id:"argo-debug",isDocsHomePage:!1,title:"Debug Argo workflow",description:"Debug a pod",source:"@site/docs/argo-debug.md",slug:"/argo-debug",permalink:"/docs/argo-debug",editUrl:"https://github.com/MaastrichtU-IDS/d2s-docs/edit/master/website/docs/argo-debug.md",version:"current",lastUpdatedBy:"Vincent Emonet",lastUpdatedAt:1610634692,sidebar:"docs",previous:{title:"Argo commands",permalink:"/docs/argo-commands"},next:{title:"Use OpenShift secrets",permalink:"/docs/argo-secret"}},s=[{value:"Debug a pod",id:"debug-a-pod",children:[]},{value:"Debug an Argo workflow",id:"debug-an-argo-workflow",children:[]}],u={toc:s};function i(e){var t=e.components,c=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},u,c,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"debug-a-pod"},"Debug a pod"),Object(o.b)("p",null,"To get into the container. Create YAML with command ",Object(o.b)("inlineCode",{parentName:"p"},"tail /dev/null")," to keep it running."),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Example of test pod in ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/tests/test-devnull-pod.yml"}),"tests/test-devnull-pod.yml"),":")),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-yaml"}),'apiVersion: v1\nkind: Pod\nmetadata:\n  labels:\n    purpose: test\n  name: test-devnull-pod\nspec:\n  volumes:\n  - name: workdir\n    hostPath:\n      path: /data/d2s-workspace\n      type: Directory\n    # persistentVolumeClaim:\n    #   claimName: d2s-storage\n  containers:\n  - name: test-devnull\n    # Change the image to test here\n    image: umids/rdfunit:latest\n    command: [ "tail", "-f", "/dev/null"]\n    resources:\n      limits:\n        cpu: 1000m \n        memory: 10Gi \n    volumeMounts:\n    - name: workdir\n      mountPath: /data\n')),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Then start the pod:")),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"oc create -f tests/test-devnull-pod.yml\n")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Connect with the Shell:")),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"oc rsh test-devnull-pod\n")),Object(o.b)("h2",{id:"debug-an-argo-workflow"},"Debug an Argo workflow"),Object(o.b)("p",null,"Pod can also be tested within an Argo workflow, see ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/tests/test-devnull-argo.yml"}),"tests/test-devnull-argo.yml"),"."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"argo submit tests/test-devnull-argo.yml\n")),Object(o.b)("p",null,Object(o.b)("img",{alt:"OpenShift",src:n(145).default})))}i.isMDXComponent=!0},128:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=a.a.createContext({}),i=function(e){var t=a.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=i(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=i(n),d=r,m=p["".concat(c,".").concat(d)]||p[d]||b[d]||o;return n?a.a.createElement(m,l(l({ref:t},u),{},{components:n})):a.a.createElement(m,l({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,c[1]=l;for(var u=2;u<o;u++)c[u]=n[u];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},145:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/openshift-logo-7daf9a66dcccc10992638b7fb7ca8c3f.png"}}]);