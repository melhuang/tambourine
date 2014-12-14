
var rparse = require('./rparse.js').rparse;
var T = require("timbre");

var fs = require('fs');

var argLength = process.argv.length;
if (argLength != 3 && argLength != 4) {
  return console.log('Please give arguments: Tambourine file and optional grammar file.');
}

var grammar = '';
fs.readFile('grammar.grm', 'utf8', function (err, fileContent) {
  if (err) { return console.error(err);}
  grammar = fileContent;
});

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
  output = "fin"
  console.log(output);
}

readFiles(files, function(fileContents) {
  if (fileContents.length == 1) {
    rparse(fileContents, null, grammar, function(asts) {
      handleAst(asts[0]);
    });
  } else {
    rparse([fileContents[0]], fileContents[1], null, function(asts) {
      handleAst(asts[0]);
    });
  }
});

/* PUBLIC METHODS */

var melodies = [];

exports.createMelody = function (str) {
  var finished = function(str) {
    melodies.push(str);
    console.log(melodies);
  }
  rparse([str], grammar, null, function(result) {
    // console.log(JSON.stringify(result));
    finished(result);
  });
}

