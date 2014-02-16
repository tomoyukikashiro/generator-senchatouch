# Sencha Touch generator

Maintainer: [Tomoyuki Kashiro](https://github.com/kashiro)

A Sencha Touch generator for [Yeoman](http://yeoman.io/) that provides a function boilerplate Sencha Touch app

* required * : [Sencha command](http://www.sencha.com/products/sencha-cmd/download)

## Usage

### Install

    npm install -g generator-senchatouch

### Generate

    yo senchatouch

## Grunt Task

### grunt serve

The http server is launched. Bowser (`http://localhost:9000`) open automatically.

`js`, `sass`, `images` are watched. so if you modify those resources the compile tasks are excuted and
refresh you browser.

### grunt test

excute test.

### grunt (default)

execute following task.

* jshint
* test
* serve

### grunt build

* `grunt build:testing`

  execute `sencha app build testing`

* `grunt build:production`

  execute `sencha app build production` and some grunt tasks.
 
### grunt build-bower

Copy custom components which are under the `app/ux` folder to `bower-dist`.
It is useful to publish your costom component to bower.

### TODO

- [x] create test


