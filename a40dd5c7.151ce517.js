(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{110:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return p}));var r=n(3),o=n(7),a=(n(0),n(141)),l=["components"],c={id:"argo-debug",title:"Debug Argo workflow"},s={unversionedId:"argo-debug",id:"argo-debug",isDocsHomePage:!1,title:"Debug Argo workflow",description:"Debug a pod",source:"@site/docs/argo-debug.md",slug:"/argo-debug",permalink:"/docs/argo-debug",editUrl:"https://github.com/MaastrichtU-IDS/d2s-docs/edit/master/website/docs/argo-debug.md",version:"current",lastUpdatedBy:"Vincent Emonet",lastUpdatedAt:1628781500,sidebar:"docs",previous:{title:"Argo commands",permalink:"/docs/argo-commands"},next:{title:"Use OpenShift secrets",permalink:"/docs/argo-secret"}},u=[{value:"Debug a pod",id:"debug-a-pod",children:[]},{value:"Debug an Argo workflow",id:"debug-an-argo-workflow",children:[]}],i={toc:u};function p(e){var t=e.components,n=Object(o.a)(e,l);return Object(a.b)("wrapper",Object(r.a)({},i,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"debug-a-pod"},"Debug a pod"),Object(a.b)("p",null,"To get into the container. Create YAML with command ",Object(a.b)("inlineCode",{parentName:"p"},"tail /dev/null")," to keep it running."),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"Example of test pod in ",Object(a.b)("a",{parentName:"p",href:"https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/tests/test-devnull-pod.yml"},"tests/test-devnull-pod.yml"),":")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: v1\nkind: Pod\nmetadata:\n  labels:\n    purpose: test\n  name: test-devnull-pod\nspec:\n  volumes:\n  - name: workdir\n    hostPath:\n      path: /data/d2s-workspace\n      type: Directory\n    # persistentVolumeClaim:\n    #   claimName: d2s-storage\n  containers:\n  - name: test-devnull\n    # Change the image to test here\n    image: umids/rdfunit:latest\n    command: [ "tail", "-f", "/dev/null"]\n    resources:\n      limits:\n        cpu: 1000m \n        memory: 10Gi \n    volumeMounts:\n    - name: workdir\n      mountPath: /data\n')),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"Then start the pod:")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell"},"oc create -f tests/test-devnull-pod.yml\n")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"Connect with the Shell:")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell"},"oc rsh test-devnull-pod\n")),Object(a.b)("h2",{id:"debug-an-argo-workflow"},"Debug an Argo workflow"),Object(a.b)("p",null,"Pod can also be tested within an Argo workflow, see ",Object(a.b)("a",{parentName:"p",href:"https://github.com/MaastrichtU-IDS/d2s-core/blob/master/argo/tests/test-devnull-argo.yml"},"tests/test-devnull-argo.yml"),"."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell"},"argo submit tests/test-devnull-argo.yml\n")))}p.isMDXComponent=!0},141:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=o.a.createContext({}),i=function(e){var t=o.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=i(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=i(n),b=r,m=p["".concat(l,".").concat(b)]||p[b]||d[b]||a;return n?o.a.createElement(m,c(c({ref:t},u),{},{components:n})):o.a.createElement(m,c({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,l=new Array(a);l[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,l[1]=c;for(var u=2;u<a;u++)l[u]=n[u];return o.a.createElement.apply(null,l)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);