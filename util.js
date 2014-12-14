'use strict';
// tambourine functions
function determine_beats(measure) {
  //measure is array of sounds, get length
  //sound is object with array of notes & beats (integer)
  var time = 4; // replace with global
  var total = 0;
  for (var i in measure) {
    total += measure[i].beats;
  }
  for (var i in measure) {
    measure[i].beats = total / Math.pow(2, measure[i].beats - 1);
  }
  return measure;
}

function translate_mml(sounds) {
  // Takes in an array of sounds
  // [{notes:['A','B'], beat:4}, {notes:['A','B'], beat:4}]
  var result = "";
  console.log(sounds);
  for (var i in sounds) {
    var sound = sounds[i];
    var notes = sound['notes'];
    var beats = sound['beats'];

    var exp = "";
    // Single note
    if (notes.length == 1)  {
      exp = notes[0].toLowerCase() + beats.toString();
    } else {
      var last_note = notes.pop();
      for (var j in notes) {
        exp += notes[j].toLowerCase() + "0";
      }
      exp += last_note.toLowerCase() + beats.toString();
    }

    result += exp + " ";
  }
  return result;
}
function convert(note) {
  if (note.length == 1) {
    return note.toLowerCase();
  } else {
    if (note.charAt(1) == 'b') {
      return note.charAt(0) + '-';
    } else {
      return note.charAt(0) + '+';
    }
  }
}

function count(dashes) {
  if (dashes == "") {
    return 1;
  }
  var num = 0;
  for (var i = 0; i < dashes.length; i++) {
    if (dashes[i] == '-') {
      num += 1;
    } else {
      throw "Count is not a '-'";
    }
  }
  return num;
}

if (typeof(module) !== 'undefined') {
  module.exports = {
    'translate_mml': translate_mml,
    'determine_beats': determine_beats,
    'count': count
  };
}
