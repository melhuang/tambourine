'use strict';
// tambourine functions
function determine_beats(measure) {
  //measure is array of sounds, get length
  //sound is object with array of notes & beats (integer)
  var total = 0;
  for (var sound in measure) {
    total += sound.beats;
  }
  // return
}
function chord(arr) {
  var c = "";
  for (var i = 0, i < arr.length; i++) {
    c += arr[i];
    c += "0";
  }
  c = c.substring(0, c.length - 2);
  return c;
}

if (typeof(module) !== 'undefined') {
  module.exports = {
    'chord': chord,
    'determine_beats': determine_beats
  };
}
