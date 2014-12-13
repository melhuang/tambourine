'use strict';

if (typeof(module) !== 'undefined') {
  var LocalStorage = require('./storage.js');
  var localStorage = new LocalStorage('./parser.cache', {strict: false});
  var http = require('http');
  var ParseError = require('./errors.js').ParseError;
  var determine_beats = require('./util.js').determine_beats;
}

var useCache = false;

var rparse = function(inputArray, grammar, serverGrammar, callback) {
  localStorage.clear();

  var inputs = [];

  for (var i = 0; i<inputArray.length; i++){
    var input = inputArray[i];
    // check if input is in cache
    var cachedValue = null;
    if (useCache)
      cachedValue = localStorage.getItem(input);
    if (!cachedValue){
      inputs.push(input);
    }
  }

  if (inputs.length == 0){
      setTimeout(function() {
        handleResponse("[]");
      }, 0);
      return;
  }

  var server = 'cs164parsertest.appspot.com';
  var port = '80';

  var path = '/parser_emit';

  // convert program data into parameters
  var paramsList = [];
  if (serverGrammar) {
    paramsList.push(encodeURIComponent('server_grammar') + '=' +
        encodeURIComponent(serverGrammar));
  } else if (grammar) {
    paramsList.push(encodeURIComponent('grammar') + '=' +
        encodeURIComponent(grammar));
  } else {
    paramsList.push(encodeURIComponent('server_grammar') + '=' +
        encodeURIComponent('cs164c.grm'));
  }
  for (var i in inputs) {
    paramsList.push(encodeURIComponent('input') + '=' +
        encodeURIComponent(inputs[i]));
  }
  var encodedParams = paramsList.join('&');

  // check if we are in nodejs so we can use http instead of XMLHttpRequest
  if (typeof(module) !== 'undefined') {
    // An object of options to indicate where to post to
    var postOptions = {
      host: server,
      port: port,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': encodedParams.length
      }
    };

    var postReq = http.request(postOptions, function(response) {
      var data = '';

      response.setEncoding('utf8');
      response.on('data', function(chunk) {
        data += chunk.toString();
      });
      response.on('end', function() {
        handleResponse(data);
      });
    });

    postReq.write(encodedParams);
    postReq.end();

  // we are not in node, so issue an XLMHttpRequest
  } else {
    var str = 'http://' + server;
    if (port)
      str += ':' + port;
    if (path)
      str += path;

    var r = new XMLHttpRequest();
    r.open('POST', str, true);
    r.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    r.onload = function(x) {
      if (r.status === 200)
        handleResponse(r.responseText);
    };
    r.send(encodedParams);
  }

  // Handle the server response
  function handleResponse(response) {
    // Parse JSON data
    try {
      var parsedResponse = JSON.parse(response);
    } catch (e) {
      console.error('Bad response: ', inputs, response);
      throw new ParseError('Error parsing JSON response from remote parser.');
    }

    // update cache
    for (var input in parsedResponse){
      var result = parsedResponse[input];
      if (result.ast) {
        var ast = result.ast;
      } else if (result.emit) {
         var ast = eval(result.emit);
      } else if (result.output) {
        console.error(result.output);
      } else {
        throw new ParseError('Unknown parsed response from remote parser.');
      }
      localStorage.setItem(input,JSON.stringify(ast));
    }

    var trees = [];
    for (var i=0; i<inputArray.length; i++) {
      var input = inputArray[i];
      var result = JSON.parse(localStorage.getItem(input));
      // value contains the parse tree
      var tree = result;
      if (tree == 'Error') {
        throw new ParseError('Parsing error.');
      }
      trees.push(tree);
    }
    callback(trees);
  }
};

if (typeof(module) !== 'undefined') {
  module.exports = {
    'rparse': rparse
  };
}
