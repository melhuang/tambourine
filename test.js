var Q = require('./tambourine.js');
// console.log(Q);

var m1 = Q.createMelody('C D | E F G|');
var m2 = Q.createMelody('E F | G A B|');
m1.repeat(2);
Q.setSynth(SynthTypes.PLUCK, .25, .4);
// var m2 = Q.createMelody('D');

console.log(SynthTypes.PLUCK);
//var m3 = Q.createMelody('B A- B-- D -- A -- | A B C D | A C D A |');
Q.play([m1, m2]);
