var Q = require('./tambourine.js');

Q.setGlobalTime('4/4');
Q.setGlobalTempo(90);
Q.setGlobalVolume(7);
Q.setGlobalOctave(5);

var cello = Q.createMelody('D >A B F# | G D G A <|');
cello.octave=3;
cello.repeat(8);

var v1Melody = "_ _ _ _ | _ _ _ _ | F# E D C# | >B A B <C# | D C# >B A | G F# G E |";
v1Melody += " D F# A G F# D F# E | D >B <D A G B A G | F# D E <C# D F# A > A |";
v1Melody += "B-- G-- A-- F#-- D-- < D-- D-- D- C#- |";
v1Melody += " D C# D >D C# A E F# D < D C# >B< C# F# A B| ";
v1Melody += " G F# E G F# E D C# > B A G F# E G F# E |";
v1Melody += " D E F# G A E A G F# B A G A G F# E |";
v1Melody += " D >B< B < C# D C# > B A G F# E B A B A G |";
var violin1 = Q.createMelody(v1Melody);

var v2Melody = "_ _ _ _ | _ _ _ _ | _ _ _ _ | _ _ _ _ |";
v2Melody += "F# E D C# | >B A B <C# | D C# >B A | G F# G E< |";
v2Melody += ">D F# A G F# D F# E | D >B< D A G B A G |";
v2Melody += "F# D E <C# D F# A > A | B-- G-- A-- F#-- D-- < D-- D-- D- C#- |";
v2Melody += "D C# D > D C# A E F# D < D C# >B< C# >A< C# D |";
v2Melody += "> B A G B A G F# E D C# >B A A B A G |";
var violin2 = Q.createMelody(v2Melody);

Q.play([cello, violin1, violin2]);

//var m3 = Q.createMelody('B A- B-- D -- A -- | A B C D | A C D A |');
// var m1 = Q.createMelody('F# E / / / / D C# | B A B C# | A B A B A B A B | A |');
// var m2 = Q.createMelody('D C# B A  | G F# G E | C D C D C D C D | A |');
// Q.play([m1, m2]);