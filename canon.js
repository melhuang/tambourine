var Q = require('./tambourine.js');

Q.setGlobalTime('4/4');
Q.setGlobalTempo(60);
Q.setGlobalVolume(7);
Q.setGlobalOctave(4);

var cello = Q.createMelody('D <A B F# | G D G A |');

var m1 = Q.createMelody('F# E D C# | (A, B, C) |');
var m2 = Q.createMelody('D C# B A  | G F# G E | C D C D C D C D | (A, B, C) --- |');
var m3 = Q.createMelody('B -- A -- B D (A,B) -- | A B C D | A C D A |');

Q.play([cello]);

//var m3 = Q.createMelody('B A- B-- D -- A -- | A B C D | A C D A |');
// var m1 = Q.createMelody('F# E / / / / D C# | B A B C# | A B A B A B A B | A |');
// var m2 = Q.createMelody('D C# B A  | G F# G E | C D C D C D C D | A |');
// Q.play([m1, m2]);