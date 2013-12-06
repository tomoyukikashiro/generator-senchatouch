'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;
var q = require('q');


var AppGenerator = module.exports = function Appgenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';

  // for hooks to resolve on mocha by default
  options['test-framework'] = this.testFramework;

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', { as: 'app' });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.welcome = function welcome() {
  // welcome message
  console.log(this.yeoman);
};

AppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [
    {
      name: 'appname',
      message: 'What is your app name?',
      'default': 'app'
    },
    {
      name: 'sdkpath',
      message: 'Where is your sencha touch sdk? Please input path to sdk.'
    }
  ];

  this.prompt(prompts, function (answers) {

    this.appname = answers.appname;
    this.sdkpath = answers.sdkpath;

    cb();
  }.bind(this));
};

AppGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AppGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

AppGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

AppGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

AppGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'app/favicon.ico');
  this.copy('robots.txt', 'app/robots.txt');
  this.copy('htaccess', 'app/.htaccess');
};

AppGenerator.prototype.app = function app() {

  var deferred = q.defer(),
      self = this,
      senchaCmd;

  this.mkdir('app');

  senchaCmd = exec('sencha -sdk ' + this.sdkpath + ' generate app ' + this.appname + ' app/', {
    cwd: '.'
  });

  senchaCmd.stdout.on('data', function(message) {
    console.log(String(message || '').replace(/\n+$/, ''));
  });

  senchaCmd.on('exit', function(code) {
    self.log.ok('sencha command end.');
    self.mkdir('app/resources/images');
    self.mkdir('app/resources/fonts');
    self.installDependencies();
    return code === 0 ? deferred.resolve(true) : deferred.reject(new Error('error'));
  });

  return deferred.promise;

};
