var Q = require('./tambourine.js');

Q.setGlobalTime('4/4');
Q.setGlobalTempo(50);
Q.setGlobalVolume(7);
Q.setGlobalOctave(5);

var cello = Q.createMelody('D >A B F# | G D G A <|');
cello.octave=3;
cello.repeat(16);

var v1Melody = "_ _ _ _ | _ _ _ _ | F# E D C# | >B A B <C# | D C# >B A | G F# G E |";
v1Melody += " D F# A G F# D F# E | D >B <D A G B A G | F# D E <C# D F# A > A |";
v1Melody += "B-- G-- A-- F#-- D-- < D-- D-- D- C#- |";
v1Melody += " D C# D >D C# A E F# D < D C# >B< C# F# A B| ";
v1Melody += " G F# E G F# E D C# > B A G F# E G F# E |";
v1Melody += " D E F# G A E A G F# B A G A G F# E |";
v1Melody += " D >B< B < C# D C# > B A G F# E B A B A G |";
v1Melody += " F#--- <C#--- D--- C#- F#- A- B- | G F# E G F# E D C# > B A G F# E G F# E |";
v1Melody += " D E F# G A E A G F# B A G A G F# E | D- >B- < B- <C#- D- C#- >B- A- B-- B-- <C#-- A-- |";
v1Melody += " A-- F#- G- A-- F#- G- A- > A- B- <C#- D- E- F#- G- F#-- D- E- F#-- >F#- G- A- B- A- G- A- F#- G- A- |";
v1Melody += " B-- <D- C#- >B-- A- G- A- G- F#- G- A- B- <C#- D- >B-- <D- C#- D-- C#- > B- < C#- D- E- D- C#- D- >B-< C#-|";
v1Melody += " A-- F#- G- A-- F#- G- A- > A- B- <C#- D- E- F#- G- F#-- D- E- F#-- >F#- G- A- B- A- G- A- F#- G- A- |";
v1Melody += " B-- <D- C#- >B-- A- G- A- G- F#- G- A- B- <C#- D- >B-- <D- C#- D-- C#- > B- < C#- D- E- D- C#- D- >B-< C#-|";
var violin1 = Q.createMelody(v1Melody);

var v2Melody = "_ _ _ _ | _ _ _ _ | _ _ _ _ | _ _ _ _ |";
v2Melody += "F# E D C# | >B A B <C# | D C# >B A | G F# G E< |";
v2Melody += ">D F# A G F# D F# E | D >B< D A G B A G |";
v2Melody += "F# D E <C# D F# A > A | B-- G-- A-- F#-- D-- < D-- D-- D- C#- |";
v2Melody += "D C# D > D C# A E F# D < D C# >B< C# >A< C# D |";
v2Melody += "> B A G B A G F# E D C# >B A A B A G |";
v2Melody += "<F# E D C# | >B A B< C# |  F#--- <C#--- D--- C#- F#- A- B- |";
v2Melody += "G F# E G F# E D C# > B A G F# E G F# E | D E F# G A E A G F# B A G A G F# E |";
v2Melody += "D- >B-< B- < C#- D- C#- > B- A- B-- B-- < C#-- A-- |";
v2Melody += "A-- F#- G- A-- F#- G- A- > A- B- <C#- D- E- F#- G- F#-- D- E- F#-- >F#- G- A- B- A- G- A- F#- G- A- |";
v2Melody += "B-- <D- C#- >B-- A- G- A- G- F#- G- A- B- <C#- D- >B-- <D- C#- D-- C#- > B- < C#- D- E- D- C#- D- >B-< C#-|";
v2Melody += "D D E D >A< C# D C# >B< B A B F# C# F# E | >D <D E G F# >F# A < F# D G F# G E A G A |";
v2Melody += "D--- E- E- F#- E- D--- >A---| B- B- <C#- > B- A--- B- B- <C#- >B- <C#-- >E-- |";
var violin2 = Q.createMelody(v2Melody);

Q.play([cello, violin1, violin2]);
