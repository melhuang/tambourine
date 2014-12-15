var Q = require('./tambourine.js');

Q.setGlobalTime('4/4');
Q.setGlobalTempo(60);
Q.setGlobalVolume(7);
Q.setGlobalOctave(5);

var cello = Q.createMelody('D >A B F# | G D G A <|');
cello.octave=3;
cello.repeat(8);

var violin1 = Q.createMelody('_ _ _ _ | _ _ _ _ | F# E D C# | >B A B <C# | D C# >B A | G F# G E< |');

var m1 = Q.createMelody('F# E D C# | (A, B, C) |');
var m2 = Q.createMelody('D C# B A  | G F# G E | C D C D C D C D | (A, B, C) --- |');
var m3 = Q.createMelody('B -- A -- B D (A,B) -- | A B C D | A C D A |');

Q.play([cello, violin1]);

//var m3 = Q.createMelody('B A- B-- D -- A -- | A B C D | A C D A |');
// var m1 = Q.createMelody('F# E / / / / D C# | B A B C# | A B A B A B A B | A |');
// var m2 = Q.createMelody('D C# B A  | G F# G E | C D C D C D C D | A |');
// Q.play([m1, m2]);