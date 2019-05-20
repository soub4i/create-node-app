#node-cli

> a minimalist command line interface to speed-up your node projects

**node-cli** : allow you to create a new project using `new` command and generate all related files to the project :


###install

`npm install -g @soubai/node-cli`

###Commands:
`generate <type> <file>` : alias g Generate a file
`new <project>` : create a new project a file

###Options:
--typescript default value
--javascript
-h, --help output usage information

###Usage

`nac [command] [options]`

`nac generate model [options]` Generate new model
`nac generate controller [options]` Generate new controller
`nac generate route [options]` Generate new route
`nac generate service [options]` Generate new service

`[options]` here can be --typescript for Typescript project or --javascript for Javascript one.




Made with ❤ By Abderrahim SOUBAI-ELIDRISI
