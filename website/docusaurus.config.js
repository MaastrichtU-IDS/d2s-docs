module.exports={
  "title": "Data2Services",
  "tagline": "Guidelines and tools to integrate and access heterogeneous data into FAIR RDF knowledge graphs",
  "url": "https://d2s.semanticscience.org/",
  "baseUrl": "/",
  "organizationName": "MaastrichtU-IDS",
  "projectName": "d2s-docs",
  "scripts": [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "/js/code-blocks-buttons.js"
  ],
  "stylesheets": [
    "https://fonts.googleapis.com/css?family=Open+Sans:200,300,400,400i,500,600,700",
    "/css/code-blocks-buttons.css"
  ],
  "favicon": "img/d2s-logo.png",
  "customFields": {
    "repoUrl": "https://github.com/MaastrichtU-IDS/d2s-docs",
    "blogSidebarTitle": {
      "default": "Use-cases"
    },
    "users": [
      {
        "caption": "Maastricht University",
        "image": "img/um_logo.svg",
        "infoLink": "https://www.maastrichtuniversity.nl/",
        "pinned": true
      },
      {
        "caption": "Bio2RDF project",
        "image": "img/bio2rdf.png",
        "infoLink": "http://bio2rdf.org/",
        "pinned": true
      },
      {
        "caption": "NCATS Biomedical Data Translator",
        "image": "img/biolink-logo.png",
        "infoLink": "https://ncats.nih.gov/translator",
        "pinned": true
      }
    ],
    "markdownPlugins": [
      null,
      null,
      null
    ],
    "gaGtag": true
  },
  "onBrokenLinks": "log",
  "onBrokenMarkdownLinks": "log",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          // "homePageId": "d2s-introduction",
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true,
          "editUrl": "https://github.com/MaastrichtU-IDS/d2s-docs/edit/master/website/",
          "path": "./docs",
          "sidebarPath": "./sidebars.json"
        },
        "blog": {
          "path": "blog"
        },
        "theme": {
          "customCss": "../src/css/customTheme.css"
        }
      }
    ]
  ],
  "plugins": [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        language: ["en"],
      },
    ],
  ],
  "themeConfig": {
    "hideableSidebar": true,
    "announcementBar": {
      "id": 'supportus',
      "content":
        '⭐️ If you like Data2Services, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/MaastrichtU-IDS/d2s-docs">GitHub</a>! ⭐️',
    },
    "navbar": {
      "title": "Data2Services",
      "logo": {
        "src": "img/d2s-logo.png"
      },
      "items": [
        {
          "to": "docs/",
          "label": "Documentation",
          "position": "left"
        },
        {
          "to": "blog/",
          "label": "Blog",
          "position": "left"
        },
        {
          "to": "/help",
          "label": "Help",
          "position": "left"
        },
        {
          "to": "/contributing",
          "label": "Contribute",
          "position": "left"
        },
        {
          "href": "https://github.com/MaastrichtU-IDS/d2s-docs",
          // "label": "GitHub",
          "position": "right",
          "className": 'header-github-link'
        }
      ]
    },
    "image": "img/undraw_online.svg",
    "footer": {
      "links": [],
      "copyright": "Copyright © 2021 Institute of Data Science at Maastricht University",
      "logo": {
        "src": "img/um_logo.svg"
      }
    },
    "gtag": {
      "trackingID": "UA-172146359-2"
    }
  }
}