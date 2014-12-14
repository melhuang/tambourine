
var rparse = require('./rparse.js').rparse;

var T = require('timbre');
// var Join = require('join').Join;
var forEachAsync = require('forEachAsync').forEachAsync;
var fs = require('fs');

// var argLength = process.argv.length;
// if (argLength != 3 && argLength != 4) {
//   return console.log('Please give arguments: Tambourine file and optional grammar file.');
// }

var grammar = '';
fs.readFile('grammar.grm', 'utf8', function (err, fileContent) {
  if (err) { return console.error(err);}
  grammar = fileContent;
});

// var files = [process.argv[2]];
// if (argLength == 4)
//   files.push(process.argv[3]);

// function readFiles(files, callback, fileContents) {
//   if (!fileContents)
//     fileContents = [];

//   var file, remainingFiles;
//   if (files.length > 0) {
//     file = files.shift();
//     remainingFiles = files;
//   } else { //no more files to read, ready to parse and interpret
//     callback(fileContents);
//     return;
//   }

//   fs.readFile(file, 'utf8', function(err, fileContent) {
//     if (err) { return console.log(err); }
//     fileContents.push(fileContent);
//     readFiles(remainingFiles, callback, fileContents);
//   });
// }

// function handleAst(ast) {
//   console.log(ast);
// }

// readFiles(files, function(fileContents) {
//   if (fileContents.length == 1) {
//     rparse(fileContents, null, grammar, function(asts) {
//       handleAst(asts[0]);
//     });
//   } else {
//     rparse([fileContents[0]], fileContents[1], null, function(asts) {
//       handleAst(asts[0]);
//     });
//   }
// });

/* PUBLIC METHODS */


/* FutureJS orEachAsync implementation. */

var tempo = '4/4';
var volume = 8;
var octave = 4;

exports.setTempo = function (newTempo) {
  var patt = /^([1-9])+\/([1-9])+$/g;
  if (!patt.test(newTempo)) {
    console.error("Tempo should be defined in syntax: \'n/n\'");
  }
  else {
    tempo = newTempo;
  }
}

exports.setVolume = function (newVolume) {
  if (!(newVolume % 1 === 0)) {
    console.error("Volume should be an integer");
  }
  else {
    volume = newVolume;
  }
}

exports.setOctave = function (newOctave) {
  if (!(newOctave % 1 === 0)) {
    console.error("Octave should be an integer");
  }
  else {
    octave = newOctave;
  }
}

exports.createMelody = function (str, tmpo, vol, oct) {
  obj = {};
  obj.notes = str;
  if (tmpo == undefined) { 
    obj.tempo = tempo 
  }
  else {
    obj.tempo = tmpo;
  }
  if (vol == undefined) { 
    obj.volume = volume 
  }
  else {
    obj.volume = vol;
  }
  if (oct == undefined) { 
    obj.octave = octave 
  }
  else {
    obj.octave = octave;
  }
  return obj;
}

exports.play = function (melodies) {
  // console.log('test');
  var mmlNotes = [];
  forEachAsync(melodies, function(next, element, index, array) {
    console.log("element: " + JSON.stringify(element));
    rparse([element.notes], grammar, null, function(results) {
      mmlNotes.push(results);
      next();
    });
    // rparse([element.notes], grammar, null, next);
  }).then(function(){
    console.log('all requests have finished');
    console.log('mmlNotes: ' + mmlNotes);
  });

  // for (index in melodies) {
  //   console.log("melody: " + JSON.stringify(melodies[index]));
  //   var melody = melodies[index];
  //   rparse(melody.notes, grammar, null, function(results) {
  //     console.log(JSON.stringify(results));
  //   });
  // }
}
