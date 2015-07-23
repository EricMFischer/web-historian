var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  action(req, res);                  
  // if get request is /
  // if get request url exists in sites, return content of sites file
  // res.end(archive.paths.list);
};

var actions = {
  GET: function(req, res) {
    // gives access to req.url
    // either render the page, or check if the site exists
    // if the site exists, we render that page from sites folder
    // in all cases, results eventually need to be read
    if (req.url === '/') {
      getContents(res, archive.paths.index);
    } else {
      getContents(res, archive.paths.archivedSites + '/' + req.url);
    }

    // else if (archive.isUrlInList(req.url)) {
      // getContents(res, archive.paths.archivedSites + '/' + req.url) 
    // }

  },

  POST: function(req, res) {
    fs.appendFile('../archives/sites.txt', req.url, function(err) {
      if (err) {
        throw err;
      }
      console.log('data appended');
    });
  },
  OPTIONS: function(req, res) {}
};

var getContents = function(res, file) {
  fs.readFile(file, function(err, contents) {
    if (err) {
      res.writeHeader(404, headers);
      res.end('404: Page not found');
      // throw err;
    } else {  
      res.writeHeader(200, headers);
      /*do something with read content*/
      res.end(contents);
      // if only '/' read contents
      // in the case of google entered
      // search for google in sites.txt
      // if exists
      // get contents at/sites/www.google.com
    }
  }); 
}

// callback functions to pass into fs.readFile
// read file
// check contents of file