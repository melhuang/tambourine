var Q = require('./tambourine.js');

Q.setGlobalTime('4/4');
Q.setGlobalTempo(60);
Q.setGlobalVolume(7);
Q.setGlobalOctave(5);

// Q.setSynth(SynthType.PLUCK, 0.5,0.4);
Q.setEnv(5, 3000, 0, 600);

var topNotes = "(E,B)-- _- (E,B)- (E,`C#)-- _- (E,`C#)- (E,`D)-- _- (E,`D)- (E,`C#)-- _- (E,`C#)-|";
topNotes += "(E,B)-- _- (E,B)- (E,`C#)-- _- (E,`C#)- (E,`D)-- _- (E,`D)- (E,`C#)-- _- (E,`C#)-|";
topNotes += "(E,B)-- _- (E,B)- (E,`C#)-- _- (E,`C#)- (E,`D)-- _- (E,`D)- (E,`C#)-- _- (E,`C#)-|";
topNotes += "(E,B)-- _- (E,B)- (E,`C#)-- _- (E,`C#)- (E,`D)-- _- (E,`D)- (E,`C#)-- _- (E,`C#)-|";
topNotes += "(A,`E)-- _- (A,`E)- (A,`F#)-- _- (A,`F#)- (A,`G)-- _- (A,`G)- (A,`F#)-- _- (A,`F#)-|";
topNotes += "(A,`E)-- _- (A,`E)- (A,`F#)-- _- (A,`F#)- (A,`G)-- _- (A,`G)- (A,`F#)-- _- (A,`F#)-|";
topNotes += "(E,B)-- _- (E,B)- (E,`C#)-- _- (E,`C#)- (E,`D)-- _- (E,`D)- (E,`C#)-- _- (E,`C#)-|";
topNotes += "(E,B)-- _- (E,B)- (E,`C#)-- _- (E,`C#)- (E,`D)-- _- (E,`D)- (E,`C#)-- _- (E,`C#)-|";

topNotes += "< (F#,B)-- _- (F#,B)- (G#,B)-- _- (G#,B)- (F#,B)-- _- (F#,B)- (G#,B)-- _- (G#,B)-|";
topNotes += "(E,A)-- _- (E,A)- (F#,A)-- _- (F#,A)- (E,A)-- _- (E,A)- (F#,A)-- _- (F#,A)- >|";
topNotes += "(E,B)-- _- (E,B)- (E,`C#)-- _- (E,`C#)- (E,`D)-- _- (E,`D)- (E,`C#)-- _- (E,`C#)-|";
topNotes += "(E,B)-- _- (E,B)- (E,`C#)-- _- (E,`C#)- (E,`D)-- _- (E,`D)- (E,`C#)-- _- (E,`C#)-|";

var top = Q.createMelody(topNotes);
top.octave = 3;
top.repeat(10);
Q.play([top]);

/** TO PLAY: node blues */