var Q = require('./tambourine.js');
// console.log(Q);

var m1 = Q.createMelody('C');
var m2 = Q.createMelody('D');
var m3 = Q.createMelody('B A - B-- D -- A -- | A B C D | A C D A');
Q.play([m1,m2, m3]);