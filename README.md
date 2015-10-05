myApp

This is a library client for my mongod media database.

REQUIREMENTS
============

* node.js <- Tested with iojs
* mongodb


BUILD AND INSTALL
=================

```bash
npm install
gulp babelify
gulp less
```

USAGE
=====

```bash
npm start
```


NOTE
====

This client is not production ready. It assumes you have a local mongodb server with default configuration, and metadata gathered with a tool similar to [tagsync](https://github.com/ixxra/mymedia/blob/master/build.sh)
