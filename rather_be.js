var Q = require('./tambourine.js');
Q.setGlobalTime('4/4')

var m1 = 'B < D# G# B _- <C#-> A#-- _-- >|';



var m2 = '>> (G#,`G#)- _ (G#,`G#) _- (G#, `G#)- (F#, `F#)-- _-- |';

m1 += ' G# B < D# G# _- F#- D#-- F#-- >|';
m2 += '(E,`E)- _ (E,`E) _- (E, `E)- (B, `B)-- (B, `B)-- |';

m1 += 'B < D# G# B _- <C#-> A#-- _ F# D# > B |';
m2 += '(G#,`G#)- _ (G#,`G#) _- (G#, `G#)- (F#, `F#)-- _-- |';

m1 += ' G# B < D# G# _- F#- D#-- F#-- >|';
m2 += '(E,`E)- _ (E,`E) _- (E, `E)- (B, `B)-- (B, `B)-- |';

m1 = Q.createMelody(m1);
m2 = Q.createMelody(m2);

m1.tempo = 120
m2.tempo = 120

m1.volume = 6
m2.volume = 6
//m1.repeat(2);
Q.play([m1,m2]);

