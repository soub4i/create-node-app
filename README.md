#create-node-app

> a minimalist command line interface to speed-up your node projects

**node-cli** : allow you to create a new project using `new` command and generate all related files to the project :

`nac generate model [options]` Generate new model

`nac generate controller [options]` Generate new controller

`nac generate route [options]` Generate new route

`nac generate service [options]` Generate new service

###install

**Usage:**

`nac [command] [options]`

**Commands:**

`generate <type> <file> --option` : alias g Generate a file; type can be model|service|route|controller

`new <project> --option` : create a new project a file

`crud <file> --option` : create a model , route , controller

**Options:**

**--typescript** : use typescript | default value

**--javascript** : use javascript

-h, --help output usage information

###Usage

`nac [command] [options]`

`nac generate model [options]` Generate new model
`nac generate controller [options]` Generate new controller
`nac generate route [options]` Generate new route
`nac generate service [options]` Generate new service

`[options]` here can be --typescript for Typescript project or --javascript for Javascript one.

Made with ❤ By Abderrahim SOUBAI-ELIDRISI
