# Sencha Touch generator

Maintainer: [Tomoyuki Kashiro](https://github.com/kashiro)

A Sencha Touch generator for Yoman that provides a function boilerplate Sencha Touch app

* required * : [Sencha command](http://www.sencha.com/products/sencha-cmd/download)

## Usage

### Install

    npm install -g generator-sencha

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

comming soon. (build task does not modify for sencha touch)

### grunt build

comming soon. (build task does not modify for sencha touch)


### TODO

- [x] create test
- [x] modify grunt task ( default and build )


