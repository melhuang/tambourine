var Fraction = require('fractional').Fraction

'use strict';
// tambourine functions

// default time signature
time_signature = new Fraction(4,4)

var notes = {
    '1': '1',
    '3/4': '2.',
    '1/2': '2',
    '3/8': '4.',
    '1/4': '4',
    '3/16': '8.',
    '1/8' : '8',
    '3/32' : '16.',
    '1/16' : '16',
    '3/64' : '32.',
    '1/32' : '32'
};

function set_time_signature(top, bottom) {
  time_signature = new Fraction(top, bottom);
}

function determine_beats(measure) {
  //console.log(measure)
  //measure is array of sounds, get length
  //sound is object with array of notes & beats (integer)
  var beats_per_measure = time_signature.top; // number of beats per measure
  var beat_note = time_signature.bottom;  // the note that is given one beat
  var total = 0;

  for (var i in measure) {
    if (measure[i].length == 1) {
      //this means it's an octave, so ignore
    } else {
      total += Math.pow(2, measure[i].beats - 1);
    }
  }

  for (var i in measure) {
    if (measure[i].length == 1) {
      //this means it's an octave, so ignore
    } else {
      var sound = measure[i];
      var ratio = new Fraction(Math.pow(2, sound.beats - 1), total);
      var note_type = ratio.multiply(time_signature).toString();
      if (note_type in notes) {
        measure[i].note_type = notes[note_type];
      } else {
        var output = "| ";
        for (var j in measure) {
          output += measure[j].notes.join(',').toUpperCase() + " ";
        }
        throw "Error: Could not parse beats for measure: " + output + "|";
      }
    }
  }

  return measure;
}

function translate_mml(sounds) {
  // Takes in an array of sounds
  // [{notes:['A','B'], beat:4}, {notes:['A','B'], beat:4}]
  var result = "";
  // console.log(sounds);
  for (var i in sounds) {
    var sound = sounds[i];
    var notes = sound['notes'];
    var note_type = sound['note_type'];

    var exp = "";

    if (sound == '>' || sound == '<') {
      result += sound;
    } else {
      var notes = sound['notes'];
      var beats = sound['beats'];

      var exp = "";
      // Single note
      if (notes.length == 1) {
        exp = notes[0].toLowerCase() + sound.note_type;
      } else {
        var last_note = notes.pop();
        for (var j in notes) {
          exp += notes[j].toLowerCase() + "0";
        }
        exp += last_note.toLowerCase() + sound.note_type;
      }
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
      return note.charAt(0).toLowerCase() + '-';
    } else {
      return note.charAt(0).toLowerCase() + '+';
    }
  }
}

function octave(slash) {
  if (slash.charAt(0) == '<') {
    return '<';
  } else {
    return '>';
  }
}

function count(dashes) {
  if (dashes == "") {
    return 1;
  }
  var num = 1;
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
    'count': count,
    'octave': octave,
    'convert': convert,
    'set_time_signature': set_time_signature
  };
}
