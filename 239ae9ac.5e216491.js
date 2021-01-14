(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{128:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var b=a.a.createContext({}),l=function(e){var t=a.a.useContext(b),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=l(e.components);return a.a.createElement(b.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,b=i(e,["components","mdxType","originalType","parentName"]),u=l(r),d=n,m=u["".concat(p,".").concat(d)]||u[d]||s[d]||o;return r?a.a.createElement(m,c(c({ref:t},b),{},{components:r})):a.a.createElement(m,c({ref:t},b))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,p=new Array(o);p[0]=d;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:n,p[1]=c;for(var b=2;b<o;b++)p[b]=r[b];return a.a.createElement.apply(null,p)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},82:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return p})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return i})),r.d(t,"default",(function(){return l}));var n=r(3),a=r(7),o=(r(0),r(128)),p={id:"guide-deploy-app",title:"Deploy services publicly"},c={unversionedId:"guide-deploy-app",id:"guide-deploy-app",isDocsHomePage:!1,title:"Deploy services publicly",description:"This guide describes different ways to make your app publicly available from your server.",source:"@site/docs/guide-deploy-app.md",slug:"/guide-deploy-app",permalink:"/docs/guide-deploy-app",editUrl:"https://github.com/MaastrichtU-IDS/d2s-docs/edit/master/website/docs/guide-deploy-app.md",version:"current",lastUpdatedBy:"Vincent Emonet",lastUpdatedAt:1610634692,sidebar:"docs",previous:{title:"Preprocess input files",permalink:"/docs/guide-preprocessing"},next:{title:"Docker guide",permalink:"/docs/guide-docker"}},i=[{value:"Deploy the nginx proxy",id:"deploy-the-nginx-proxy",children:[]},{value:"Choose your DNS and URL",id:"choose-your-dns-and-url",children:[{value:"The fastest for demo purpose",id:"the-fastest-for-demo-purpose",children:[]},{value:"Cleaner URL using free DNS",id:"cleaner-url-using-free-dns",children:[]},{value:"In production on dumontierlab.com",id:"in-production-on-dumontierlabcom",children:[]}]}],b={toc:i};function l(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},b,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"This guide describes different ways to make your app publicly available from your server."),Object(o.b)("p",null,"Consider using ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://pages.github.com/"}),"GitHub")," or ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://docs.gitlab.com/ee/user/project/pages/"}),"GitLab")," pages for simple static documentation websites."),Object(o.b)("h2",{id:"deploy-the-nginx-proxy"},"Deploy the nginx proxy"),Object(o.b)("p",null,"Port 80 of your server needs to be publicly available (and 443 if you want to use https)"),Object(o.b)("p",null,"Deploy ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/jwilder/nginx-proxy"}),"jwilder/nginx-proxy")," on port 80:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-shell"}),"d2s start proxy\n")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"You can now modify the ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/MaastrichtU-IDS/d2s-core/blob/master/docker-compose.yml#L15"}),"docker-compose.yml")," to set the URL of the deployed services as the environment variable ",Object(o.b)("inlineCode",{parentName:"p"},"VIRTUAL_HOST"),".")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"If only one port is exposed it should pick it up. Otherwise you can set the port to expose using the environment variable ",Object(o.b)("inlineCode",{parentName:"p"},"VIRTUAL_PORT"),".")),Object(o.b)("p",null,"The proxy can also be run manually:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-shell"}),"docker run -d --name nginxproxy \\\n    -p 80:80 \\\n    --volume /var/run/docker.sock:/tmp/docker.sock:ro \\\n    #--net=host \\\n    --restart unless-stopped \\\n    jwilder/nginx-proxy:latest\n")),Object(o.b)("h2",{id:"choose-your-dns-and-url"},"Choose your DNS and URL"),Object(o.b)("h3",{id:"the-fastest-for-demo-purpose"},"The fastest for demo purpose"),Object(o.b)("p",null,"Use ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://nip.io/"}),"nip.io")," to get a public URL based on the server public IP address. You don't need to register to a new service, just use your public IP address."),Object(o.b)("p",null,"Define your app URL with ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://nip.io/"}),"nip.io"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{}),"your-app-name.your-server-IP-address.nip.io\n")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"E.g. ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://into-the-graph.137.120.31.101.nip.io"}),"http://into-the-graph.137.120.31.101.nip.io"))),Object(o.b)("p",null,"Example with a simple docker run:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-shell"}),"docker run -d --rm --name your-app-name -e VIRTUAL_HOST=your-app-name.137.120.31.101.nip.io your-app-image\n")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Access on ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://your-app-name.137.120.31.101.nip.io"}),"http://your-app-name.137.120.31.101.nip.io"))),Object(o.b)("h3",{id:"cleaner-url-using-free-dns"},"Cleaner URL using free DNS"),Object(o.b)("p",null,"Register to ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://freedns.afraid.org/"}),"afraid.org")," to get a cleaner and stable URL without the inelegant IP address for free."),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"E.g. ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://into-the-graph.mooo.com/"}),"http://into-the-graph.mooo.com/"))),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Go to ",Object(o.b)("inlineCode",{parentName:"p"},"Subdomains"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Type: ",Object(o.b)("inlineCode",{parentName:"p"},"A"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Subdomain: ",Object(o.b)("inlineCode",{parentName:"p"},"your-app-name"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Domain: pick one (e.g. ",Object(o.b)("inlineCode",{parentName:"p"},"mooo.com"),")")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Destination: ",Object(o.b)("inlineCode",{parentName:"p"},"137.120.31.101")," (IDS server IP address)")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Then change the ",Object(o.b)("inlineCode",{parentName:"p"},"docker-compose.yml")," environment variables."),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Or run your Docker image providing your app URL as an environment variable: ",Object(o.b)("inlineCode",{parentName:"p"},"-e VIRTUAL_HOST=")),Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-shell"}),"docker run -d --rm --name your-app-name -e VIRTUAL_HOST=your-app-name.mooo.com your-app-image\n")))))),Object(o.b)("h3",{id:"in-production-on-dumontierlabcom"},"In production on dumontierlab.com"),Object(o.b)("p",null,"To access it at ",Object(o.b)("strong",{parentName:"p"},Object(o.b)("a",Object(n.a)({parentName:"strong"},{href:"http://your-app-name.dumontierlab.com"}),"your-app-name.dumontierlab.com")),"."),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-shell"}),"docker run -d --rm --name your-app-name -e VIRTUAL_HOST=your-app-name.dumontierlab.com your-app-image\n")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"For production-level apps, please request a subdomain for your app on ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://dumontierlab.com/"}),"dumontierlab.com"),".")))}l.isMDXComponent=!0}}]);