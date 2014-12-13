'use strict';
// tambourine functions
function determine_beats(measure) {
  //measure is array of sounds, get length
  //sound is object with array of notes & beats (integer)
  var time = 4; // replace with global
  var total = 0;
  for (var sound in measure) {
    total += sound.beats;
  }
  for (var sound in measure) {
    sound.beats = total / Math.pow(2,sound.beats);
  }
  return measure;
}

function translate_mml(sounds) {
  // Takes in an array of sounds
  // [{notes:['A','B'], beat:4}, {notes:['A','B'], beat:4}]
  result = ""
  for (var sound in sounds) {
    notes = sound['notes']
    beat = sound['beat']

    exp = ""
    // Single note
    if (notes.length == 1)  {
      exp = notes[0].toLowerCase() + beat.toString();
    } else {
      last_note = notes.pop()
      for (var note in notes) {
        exp += note.toLowerCase() + "0"
      }
      exp += last_note + beat.toString();
    }

    result += exp + " "
  }
  return result
}

if (typeof(module) !== 'undefined') {
  module.exports = {
    'determine_beats': determine_beats
  };
}
