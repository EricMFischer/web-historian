var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  index: path.join(__dirname, '../web/public/index.html'),
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(err, contents) {
    if (err) {
      throw err;
    } else {
      callback(contents.toString().split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(array) {
    callback(url, array);
  });
};

exports.addUrlToList = function(url, callback){
  // url and a callback--this callback has no arguments
  exports.isUrlInList(url, function(array) {
    if (_.indexOf(array, url) === -1) {
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback){
  fs.exists(exports.paths.archivedSites + '/' + url, function(exists) {
    callback(exists);
  });
};

exports.downloadUrls = function(array) {
  // for each url in array
  _.each(array, function(url) {
    // request(url, function (error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     console.log(body) // Show the HTML for the Google homepage. 
    //   }
    // });
    // http.post(url, function(err, res) {
    //   if(err) {
    //     console.log(err);
    //     return;
    //   }
    //   console.log(res.code, res.headers, res.buffer.toString());
    // });
    fs.writeFile(exports.paths.archivedSites + '/' + url, 'Hello', function(err) {
      if (err) {
        throw err;
      }
      console.log('saved!');
    });
  });
};