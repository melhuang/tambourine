var Q = require('./tambourine.js');

Q.setGlobalTime('4/4');
Q.setGlobalTempo(90);
Q.setGlobalVolume(7);
Q.setGlobalOctave(5);

Q.setSynth(SynthType.PLUCK, 0.5,0.4);
Q.setEnv(10, 3000, 0, 600);

var bassNotes = "Eb-- Eb-- Eb-- Eb- Eb- _- Eb- _- Eb- Eb- Eb- Eb- Eb-|";
bassNotes += "F-- F-- F-- F- F- _- F- _- F- F- F- F- F-|";
bassNotes += "D-- D-- D-- D- D- _- D- _- D- D- D- D- D-|";
bassNotes += "Eb-- Eb-- Eb-- Eb- Eb- _- Eb- _- Eb- Eb- Eb- Eb- Eb-|";
var bass = Q.createMelody(bassNotes);
bass.repeat(8);
bass.octave = 3;

var voiceNotes = "_ | _ | _ | _ |";
voiceNotes += "_-- D- D-- D-- D- | C- C-- >Bb- A- A- A-- | A-- <C-- C-- C- D- | >Bb- A-- G-- G- Bb- G- |";
// voiceNotes = " ";
var voice = Q.createMelody(voiceNotes);
voice.octave = 5;

Q.play([bass, voice]);
