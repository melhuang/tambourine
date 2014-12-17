var rparser = require('./rparse.js');
var rparse = rparser.rparse;

/* Packages */
var T = require('timbre');
var forEachAsync = require('forEachAsync').forEachAsync;
var fs = require('fs');

/* Grammar File */
var grammar = '';
fs.readFile('grammar.grm', 'utf8', function (err, fileContent) {
  if (err) { return console.error(err);}
  grammar = fileContent;
});

/* Default Instrument Settings */
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

exports.setEnv = function(attack, decay, sustain, release){
  env = T("adsr", {a:attack, d:decay, s:sustain, r:release});
}

global.SynthType = {
  SIN: "sin",
  PLUCK: "pluck"
};

exports.setSynth = function (type, fb, mul) {
  synth.def = function(opts) {
    var op1 = T(type, {freq:opts.freq*6, fb:fb, mul:mul});
    var op2 = T("sin", {freq:opts.freq, phase:op1, mul:opts.velocity/128});
    return env.clone().append(op2).on("ended", opts.doneAction).bang();
  }
  master = synth;
  var mod    = T("sin", {freq:2, add:3200, mul:800, kr:1});
  master = T("eq", {params:{lf:[800, 0.5, -2], mf:[6400, 0.5, 4]}}, master);
  master = T("phaser", {freq:mod, Q:2, steps:4}, master);
  master = T("delay", {time:"BPM60 L16", fb:0.65, mix:0.25}, master);
}

/* SONG SETTINGS */
var time = '4/4';
var tempo = 100;
var volume = 8;
var octave = 4;

exports.setGlobalTime = function (newTime) {
  var patt = /^([1-9])+\/([1-9])+$/g;
  if (!patt.test(newTime)) {
    console.error("Time signature should be defined in syntax: \'n/n\'");
  }
  else {
    time = newTime.split('/');
    rparser.set_time_signature(time[0], time[1]);
  }
}

exports.setGlobalTempo = function (newTempo) {
  if (!(newTempo % 1 === 0)) {
    console.error("Tempo should be an integer");
  }
  else {
    tempo = newTempo;
  }
}

exports.setGlobalVolume = function (newVolume) {
  if (!(newVolume % 1 === 0)) {
    console.error("Volume should be an integer");
  }
  else {
    volume = newVolume;
  }
}

exports.setGlobalOctave = function (newOctave) {
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
    obj.tempo = tempo;
  } else {
    obj.tempo = tmpo;
  }
  if (vol == undefined) {
    obj.volume = volume;
  } else {
    obj.volume = vol;
  }
  if (oct == undefined) {
    obj.octave = octave;
  } else {
    obj.octave = octave;
  }

  obj.rep = null;
  obj.repeat = function (num) {
    if (this.rep == null) {
      this.rep = num;
    } else {
      this.rep = this.rep * num;
    }
  }
  obj.setRepeat = function (num) {
    this.rep = num;
  }
  return obj;
}

exports.play = function (melodies) {
  var mmlNotes = [];

  forEachAsync(melodies, function(next, element, index, array) {
    //console.log("element: " + JSON.stringify(element));
    rparse([element.notes], grammar, null, function(results) {
      var settings = "";
      settings += "t" + element.tempo;
      settings += " v" + element.volume;
      settings += " o" + element.octave;
      settings += " l" + 4;
      results = settings + " " + results;
      if (element.rep != null) {
        results = '[' + results + ']' + element.rep;
      }
      mmlNotes.push(results);
      next();
    });
  }).then(function(){
    console.log('all requests have finished');
    // console.log('mmlNotes: ' + mmlNotes);
    //Play music here
    T("mml", {mml:mmlNotes}, synth).on("ended", function() {
      this.stop();
    }).set({buddies:master}).start().play();
  });
}
