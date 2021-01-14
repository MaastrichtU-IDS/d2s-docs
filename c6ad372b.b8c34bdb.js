(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{113:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return b})),a.d(t,"toc",(function(){return o})),a.d(t,"default",(function(){return l}));var r=a(3),n=a(7),i=(a(0),a(128)),c={id:"services-interfaces",title:"Interfaces"},b={unversionedId:"services-interfaces",id:"services-interfaces",isDocsHomePage:!1,title:"Interfaces",description:"Interfaces to browse and consume Knowledge Graphs data.",source:"@site/docs/services-interfaces.md",slug:"/services-interfaces",permalink:"/docs/services-interfaces",editUrl:"https://github.com/MaastrichtU-IDS/d2s-docs/edit/master/website/docs/services-interfaces.md",version:"current",lastUpdatedBy:"Vincent Emonet",lastUpdatedAt:1610634692},o=[{value:"Integrated interfaces",id:"integrated-interfaces",children:[{value:"d2s-api",id:"d2s-api",children:[]},{value:"into-the-graph",id:"into-the-graph",children:[]},{value:"Comunica Widget",id:"comunica-widget",children:[]},{value:"BioThings Studio",id:"biothings-studio",children:[]}]},{value:"Additional interfaces",id:"additional-interfaces",children:[{value:"LinkedDataHub",id:"linkeddatahub",children:[]},{value:"LinkedPipes",id:"linkedpipes",children:[]},{value:"YASGUI",id:"yasgui",children:[]},{value:"LODEstar",id:"lodestar",children:[]},{value:"Trifid",id:"trifid",children:[]},{value:"brwsr",id:"brwsr",children:[]},{value:"RhizomerEye",id:"rhizomereye",children:[]},{value:"TriplyDB",id:"triplydb",children:[]}]}],s={toc:o};function l(e){var t=e.components,c=Object(n.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},s,c,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Interfaces to browse and consume Knowledge Graphs data."),Object(i.b)("h2",{id:"integrated-interfaces"},"Integrated interfaces"),Object(i.b)("h3",{id:"d2s-api"},"d2s-api"),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.openapis.org/"}),Object(i.b)("img",{alt:"OpenAPI",src:a(207).default}))),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/MaastrichtU-IDS/d2s-api"}),Object(i.b)("img",Object(r.a)({parentName:"a"},{src:"https://img.shields.io/github/stars/MaastrichtU-IDS/d2s-api?label=GitHub&style=social",alt:"GitHub"})))),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/MaastrichtU-IDS/d2s-api"}),"Web services")," described following the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"http://spec.openapis.org/oas/v3.0.1"}),"OpenAPI 3.0")," specifications. The generated services enable the user to query a ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://biolink.github.io/biolink-model/"}),"BioLink-compliant")," RDF knowledge graph using HTTP request following the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/NCATS-Tangerine/NCATS-ReasonerStdAPI/tree/master/API"}),"Reasoner API Specifications"),". "),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),'d2s start api\n\ndocker run -it --rm -p 8080:8080 \\\n  --net d2s-core_network \\\n  -e ENDPOINT="http://graphdb:7200/repositories/test" \\\n  umids/d2s-api\n')),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Access on http://localhost:8080")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"into-the-graph"},"into-the-graph"),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/MaastrichtU-IDS/into-the-graph"}),Object(i.b)("img",Object(r.a)({parentName:"a"},{src:"https://img.shields.io/github/stars/MaastrichtU-IDS/into-the-graph?label=GitHub&style=social",alt:"GitHub"})))),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/MaastrichtU-IDS/into-the-graph"}),"into-the-graph")," is a lightweight RDF linked data browser supporting graphs."),Object(i.b)("p",null,"Browse various SPARQL endpoints and their graphs by providing the endpoint URL. It includes a YASGUI editor and provide insights about the graphs content using  precomputed ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/MaastrichtU-IDS/d2s-scripts-repository/tree/master/sparql/compute-hcls-stats"}),"HCLS descriptive statistics"),"."),Object(i.b)("p",null,"See an example deployment at ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"http://trek.semanticscience.org"}),"trek.semanticscience.org"),". The SPARQL endpoint can be changed directly on the web app in ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"http://trek.semanticscience.org/settings"}),"/settings"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"d2s start into-the-graph\n\ndocker run --rm -it -p 8082:80 umids/into-the-graph:latest\n")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Access on http://localhost:8082")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"comunica-widget"},"Comunica Widget"),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/comunica/jQuery-Widget.js"}),Object(i.b)("img",Object(r.a)({parentName:"a"},{src:"https://img.shields.io/github/stars/comunica/jQuery-Widget.js?label=GitHub&style=social",alt:"GitHub"})))),Object(i.b)("p",null,"A ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"http://query.linkeddatafragments.org/"}),"jQuery widget")," to query heterogeneous interfaces using Comunica SPARQL and GraphQL.  "),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"d2s start comunica\n\ndocker run -p 8084:80 -it --rm umids/comunica-sparql-widget\n\n# Provide a local queries.json file\ndocker run -v $(pwd)/workspace/comunica-settings.json:/usr/share/nginx/html/queries.json -p 8080:80 -it --rm umids/comunica-sparql-widget\n")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Access on http://localhost:8084")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},Object(i.b)("inlineCode",{parentName:"p"},"settings.json")," file and ",Object(i.b)("inlineCode",{parentName:"p"},"queries")," needs to be changed before ",Object(i.b)("inlineCode",{parentName:"p"},"docker build"),". See ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/vemonet/jQuery-Widget.js"}),"documentation"),".")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},Object(i.b)("strong",{parentName:"p"},"TODO"),": improve how settings and queries pass (script to download them from URL before starting nginx?.")),Object(i.b)("p",null,"See ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://comunica.github.io/Article-ISWC2018-Demo-GraphQlLD/"}),"documentation")," about Comunica's GraphQL-LD implementation."),Object(i.b)("hr",null),Object(i.b)("h3",{id:"biothings-studio"},"BioThings Studio"),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/biothings/biothings_studio"}),Object(i.b)("img",Object(r.a)({parentName:"a"},{src:"https://img.shields.io/github/stars/biothings/biothings_studio?label=GitHub&style=social",alt:"RMLMapper"})))),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/biothings/biothings_studio"}),"BioThings Studio")," enables to deploy a Docker container with all dependencies required to build BioThings APIs. See the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://docs.biothings.io/en/latest/doc/studio.html"}),"BioThings Studio documentation"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"d2s start biothings-studio\n\ndocker run -d --rm --name studio \\\n  -p 8001:8080 -p 8000:8000 -p 9000:9000 \\\n  -p 7022:7022 -p 7080:7080 -p 9200:9200 -p 27017:27017 \\\n  -v $(pwd)/workspace/biothings:/data \\\n  biothings/biothings-studio:0.2a\n")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Access BioThings Studio web UI at http://localhost:8880")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Access BioThings API at http://localhost:7080")),Object(i.b)("hr",null),Object(i.b)("h2",{id:"additional-interfaces"},"Additional interfaces"),Object(i.b)("h3",{id:"linkeddatahub"},"LinkedDataHub"),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/AtomGraph/LinkedDataHub"}),Object(i.b)("img",Object(r.a)({parentName:"a"},{src:"https://img.shields.io/github/stars/AtomGraph/LinkedDataHub?label=GitHub&style=social",alt:null})))),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://atomgraph.github.io/LinkedDataHub/"}),"LinkedDataHub")," is an ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/AtomGraph/LinkedDataHub"}),"Open Source")," Knowledge Graph management system. You can use it to manage data, create visualizations and build apps on RDF Knowledge Graphs."),Object(i.b)("p",null,"Clone the repository and prepare the environment file:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"git clone https://github.com/AtomGraph/LinkedDataHub.git\ncd LinkedDataHub\ncp .env_sample .env\n")),Object(i.b)("p",null,"Start LinkedDataHub:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"docker-compose up -d\n")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Access LinkedDataHub web UI at ",Object(i.b)("strong",{parentName:"p"},"https://localhost:4443"))),Object(i.b)("p",null,"You will need to ",Object(i.b)("strong",{parentName:"p"},"accept the risk")," due to self-signed certificates."),Object(i.b)("p",null,"You can now follow the web UI instructions to create an account to login to your LinkedDataHub."),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Access Fuseki admin UI at http://localhost:3030/ds")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Access Fuseki end user UI at ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"http://localhost:3031/ds?query=select%20*%20where%20%7B?s%20?p%20?o%20.%7D%20limit%2010"}),"http://localhost:3031/ds"))),Object(i.b)("p",null,"To stop LinkedDataHub, run from the ",Object(i.b)("inlineCode",{parentName:"p"},"LinkedDataHub")," folder:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"docker-compose down\n")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"linkedpipes"},"LinkedPipes"),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://linkedpipes.com/"}),"LinkedPipes")," is a Suite for Linked Data, with ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://etl.linkedpipes.com/"}),"ETL"),", ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://visualization.linkedpipes.com/"}),"Visualization")," services and ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://applications.linkedpipes.com"}),"Applications"),"."),Object(i.b)("p",null,"Try the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://demo.etl.linkedpipes.com/#/pipelines"}),"ETL web UI")," to define data transformation pipelines to RDF:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"git clone https://github.com/linkedpipes/etl linkedpipes-etl\ncd linkedpipes-etl\nLP_ETL_PORT=8091 docker-compose up -d\n")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Access at http://localhost:8091")),Object(i.b)("p",null,"LinkedPipes proposes ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://visualization.linkedpipes.com/"}),"various visualisation services"),":"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"https://github.com/ldvm/LDVMi/tree/master/doc/assistant"}),"LinkedPipes Visualization Assistant"),": lets you configure interactive views based on Linked Data"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"https://docs.applications.linkedpipes.com/"}),"LinkedPipes Applications"),": visualization web platform that allows the users to explore, visualize and publish LinkedData based visualizer applications")),Object(i.b)("p",null,"To stop the LinkedPipes ETL, run from the ",Object(i.b)("inlineCode",{parentName:"p"},"linkedpipes-etl")," folder:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"docker-compose down\n")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"yasgui"},"YASGUI"),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"http://doc.yasgui.org/"}),Object(i.b)("img",{alt:"OpenLink Virtuoso",src:a(208).default}))),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/OpenTriply/YASGUI"}),Object(i.b)("img",Object(r.a)({parentName:"a"},{src:"https://img.shields.io/github/stars/OpenTriply/YASGUI?label=GitHub&style=social",alt:"GitHub"})))),Object(i.b)("p",null,"The popular ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://hub.docker.com/r/erikap/yasgui"}),"Yet Another Sparql Graphical User Interface"),". Integrated to ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/services-interfaces#into-the-graph"}),"into-the-graph"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),'docker run -it --rm --name yasgui -p 8088:80 \\\n    -e "DEFAULT_SPARQL_ENDPOINT=http://dbpedia.org/sparql" \\\n    -e "ENABLE_ENDPOINT_SELECTOR=true" \\\n    erikap/yasgui\n')),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Require the SPARQL endpoint to ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/"}),"allow Cross-Origin Requests"),".")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Access at http://localhost:8088")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"lodestar"},"LODEstar"),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/EBISPOT/lodestar"}),Object(i.b)("img",Object(r.a)({parentName:"a"},{src:"https://img.shields.io/github/stars/EBISPOT/lodestar?label=GitHub&style=social",alt:"GitHub"})))),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.w3.org/TR/sparql11-query/"}),"SPARQL")," query and URI resolution, available through ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://hub.docker.com/r/netresearch/lodestar"}),"DockerHub"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"docker run --rm -d --name lodestar -p 8082:8080 \\\n  -e ENDPOINT_URL=https://graphdb.dumontierlab.com/repositories/ncats-red-kg \\\n  -e TOP_RELATIONSHIP=http://w3id.org/biolink/vocab/id,http://w3id.org/biolink/vocab/name,http://w3id.org/biolink/vocab/description \\\n  -e LABEL=http://w3id.org/biolink/vocab/label \\\n  -e DESCRIPTION=http://w3id.org/biolink/vocab/description \\\n  -e MAX_OBJECTS=10 \\\n  -e SERVICE_BASE_URI=http://localhost:8080/ncats-red-kg netresearch/lodestar\n")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Access at ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"http://localhost:8082/lodestar/sparql"}),"http://localhost:8082/lodestar/sparql"))),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Does not support graphs \ud83d\udeab")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"trifid"},"Trifid"),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/zazuko/trifid"}),Object(i.b)("img",Object(r.a)({parentName:"a"},{src:"https://img.shields.io/github/stars/zazuko/trifid?label=GitHub&style=social",alt:"GitHub"})))),Object(i.b)("p",null,"Linked Data Server: ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"http://lod.opentransportdata.swiss/sparql/"}),"URI dereferencing"),", custom HTML render, ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"http://lod.opentransportdata.swiss/sparql/"}),"YASGUI SPARQL endpoint"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"git clone https://github.com/vemonet/trifid.git\ndocker build -t trifid ./trifid\n\ndocker run --rm -ti --name trifid -p 8080:8080 trifid --sparql-endpoint-url=https://graphdb.dumontierlab.com/repositories/test --dataset-base-url=https://w3id.org/d2s/\n\ndocker run --rm -ti --name trifid -v /home/vemonet/sandbox/trifid:/data -p 8080:8080 trifid --config=/data/config-ncats-red-kg.json\n")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Go to http://localhost:8080/dataset/huri/ to resolve ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://w3id.org/d2s/dataset/huri/"}),"https://w3id.org/d2s/dataset/huri/")," ")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Modified version on ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/vemonet/trifid"}),"GitHub"),".")),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/zazuko/trifid"}),"Original project")," available on ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://hub.docker.com/r/zazuko/trifid/"}),"DockerHub"),". But config not working."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"docker run -ti -p 8080:8080 zazuko/trifid\n# Not working, provide env config file?\ndocker run -ti -p 8080:8080 -e TRIFID_CONFIG=config-ncats-red-kg.json zazuko/trifid\ndocker run -ti -p 8080:8080 -e SPARQL_ENDPOINT_URL=https://graphdb.dumontierlab.com/repositories/test -e DATASET_BASE_URL=https://w3id.org/d2s/ zazuko/trifid\n")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Access ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/zazuko/tbbt-ld/blob/master/dist/tbbt.nq"}),"default example")," on http://localhost:8080/data/person/mary-cooper to resolve URI.")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Does not support graphs \ud83d\udeab")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"brwsr"},"brwsr"),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/Data2Semantics/brwsr"}),Object(i.b)("img",Object(r.a)({parentName:"a"},{src:"https://img.shields.io/github/stars/Data2Semantics/brwsr?label=GitHub&style=social",alt:"GitHub"})))),Object(i.b)("p",null,"Lightweight Linked Data Browser."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"git clone https://github.com/Data2Semantics/brwsr.git\ndocker-compose up\n")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Go to http://localhost:5000.")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Change the SPARQL endpoint in the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/Data2Semantics/brwsr/blob/master/docker-compose.yml"}),"docker-compose.yml"),".")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Does not support graphs \ud83d\udeab")),Object(i.b)("hr",null),Object(i.b)("h3",{id:"rhizomereye"},"RhizomerEye"),Object(i.b)("p",null,Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://rhizomer.rhizomik.net/about"}),"RhizomerEye")," is a tool to expose a SPARQL endpoint as REST API and deploy a Web UI to browse the triplestore."),Object(i.b)("p",null,"See the source code for the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/rhizomik/rhizomerAPI"}),"RhizomerAPI")," and ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/rhizomik/rhizomerEye"}),"RhizomerEye"),"."),Object(i.b)("p",null,"The Web UI has been deployed publicly for a few triplestores:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"https://rhizomer.rhizomik.net/datasets/covid19/ucsb:Record"}),"COVID-19")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"https://rhizomer.rhizomik.net/datasets/dbpedia/describe?uri=http:%2F%2Fdbpedia.org%2Fresource%2FEngland"}),"DBpedia"))),Object(i.b)("hr",null),Object(i.b)("h3",{id:"triplydb"},"TriplyDB"),Object(i.b)("p",null,"See ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://triply.cc/docs/triply-db-getting-started"}),"official documentation"),". It allows to deploy the following services over a triplestore:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"https://triplydb.com/wouter/linkedmdb/sparql/linkedmdb"}),"YASGUI SPARQL endpoint")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"https://triplydb.com/wouter/linkedmdb/search/search"}),"Search index")," using ElasticSearch."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"https://triplydb.com/wouter/linkedmdb/id/actor/1"}),"Web UI")," to resolve and browse a triplestore"),Object(i.b)("li",{parentName:"ul"},"Supports graphs in the ",Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"https://triplydb.com/wouter/linkedmdb/table"}),"TPF table browser")," (not in the ",Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"https://triplydb.com/wouter/linkedmdb/browser?resource=https%3A%2F%2Ftriplydb.com%2Fwouter%2Flinkedmdb%2Fvocab%2FActor&focus=forward"}),"browser"),")")),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://triplydb.com/"}),"TriplyDB")," is hosted centrally and cannot be deployed locally \ud83d\udeab")))}l.isMDXComponent=!0},128:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return h}));var r=a(0),n=a.n(r);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function b(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=n.a.createContext({}),l=function(e){var t=n.a.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):b(b({},t),e)),a},p=function(e){var t=l(e.components);return n.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},d=n.a.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),p=l(a),d=r,h=p["".concat(c,".").concat(d)]||p[d]||u[d]||i;return a?n.a.createElement(h,b(b({ref:t},s),{},{components:a})):n.a.createElement(h,b({ref:t},s))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,c=new Array(i);c[0]=d;var b={};for(var o in t)hasOwnProperty.call(t,o)&&(b[o]=t[o]);b.originalType=e,b.mdxType="string"==typeof e?e:r,c[1]=b;for(var s=2;s<i;s++)c[s]=a[s];return n.a.createElement.apply(null,c)}return n.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"},207:function(e,t,a){"use strict";a.r(t),t.default=a.p+"assets/images/openapi-logo-eb16bedc2b7d271c659e35143689b4cc.png"},208:function(e,t,a){"use strict";a.r(t),t.default=a.p+"assets/images/yasgui-logo-0228243eb2a0527ae825882888dd0110.png"}}]);