var Q = require('./tambourine.js');
// console.log(Q);

// var m1 = Q.createMelody('C D | E F G');
// var m2 = Q.createMelody('E F | G A B');
// m1.repeat(2);
// var m2 = Q.createMelody('D');

//var m3 = Q.createMelody('B A- B-- D -- A -- | A B C D | A C D A |');
var m1 = Q.createMelody('F# E D C# | B A B C# | A B A B A B A B | A |');
var m2 = Q.createMelody('D C# B A  | G F# G E | C D C D C D C D | A |');
Q.play([m1, m2]);
