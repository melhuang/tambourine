var rparse = require('./rparse.js').rparse;
var fs = require('fs');

var argLength = process.argv.length;
if (argLength != 3 && argLength != 4) {
  return console.log('Please give arguments: regular expression file and optional grammar file.');
}

var defaultGrammar = 'regularExpressionHighlightingServer.grm';
var files = [process.argv[2]];
if (argLength == 4)
  files.push(process.argv[3]);

function readFiles(files, callback, fileContents) {
  if (!fileContents)
    fileContents = [];

  var file, remainingFiles;
  if (files.length > 0) {
    file = files.shift();
    remainingFiles = files;
  } else { //no more files to read, ready to parse and interpret
    callback(fileContents);
    return;
  }

  fs.readFile(file, 'utf8', function(err, fileContent) {
    if (err) { return console.log(err); }
    fileContents.push(fileContent);
    readFiles(remainingFiles, callback, fileContents);
  });
}

function handleAst(ast) {
  var output = "<html><head><script src='http://code.jquery.com/jquery-1.11.0.min.js'></script></head><body>" + ast + "</body></html>";
  console.log(output);
}

readFiles(files, function(fileContents) {
  if (fileContents.length == 1) {
    rparse(fileContents, null, defaultGrammar, function(asts) {
      handleAst(asts[0]);
    });
  } else {
    rparse([fileContents[0]], fileContents[1], null, function(asts) {
      handleAst(asts[0]);
    });
  }
});
