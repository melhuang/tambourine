
var rparse = require('./rparse.js').rparse;

var T = require('timbre');
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

var env   = T("adsr", {d:3000, s:0, r:600});
var synth = T("SynthDef", {mul:0.45, poly:8});

synth.def = function(opts) {
  var op1 = T("sin", {freq:opts.freq*6, fb:0.25, mul:0.4});
  var op2 = T("sin", {freq:opts.freq, phase:op1, mul:opts.velocity/128});
  return env.clone().append(op2).on("ended", opts.doneAction).bang();
};

var master = synth;
var mod    = T("sin", {freq:2, add:3200, mul:800, kr:1});
master = T("eq", {params:{lf:[800, 0.5, -2], mf:[6400, 0.5, 4]}}, master);
master = T("phaser", {freq:mod, Q:2, steps:4}, master);
master = T("delay", {time:"BPM60 L16", fb:0.65, mix:0.25}, master);

var tempo = '4/4';
var volume = 8;
var octave = 4;

/* PUBLIC METHODS */

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
  obj.rep = null;
  obj.repeat = function (num) {
    obj.rep = num;
  }
  return obj;
}


exports.play = function (melodies) {
  var mmlNotes = [];

  forEachAsync(melodies, function(next, element, index, array) {
    console.log("element: " + JSON.stringify(element));
    rparse([element.notes], grammar, null, function(results) {
      if (element.rep != null) {
        results = '[' + results + ']' + element.rep;
      }
      mmlNotes.push(results);
      next();
    });
  }).then(function(){
    console.log('all requests have finished');
    console.log('mmlNotes: ' + mmlNotes);
    //Play music here
    T("mml", {mml:mmlNotes}, synth).on("ended", function() {
      this.stop();
    }).set({buddies:master}).start().play();
  });
}
