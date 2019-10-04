module.exports = function(Blockly){
'use strict';

const notes = {
  "SIL" : -1,
  "C2" : 65,  "C#2" : 69,  "D2" : 73,  "D#2" : 78,  "E2" : 82,  "F2" : 87,  "F#2" : 93,  "G2" : 98,  "G#2" : 104,  "A2" : 110,  "A#2" : 117,  "B2" : 123,
  "C3" : 131,  "C#3" : 139,  "D3" : 147,  "D#3" : 156,  "E3" : 165,  "F3" : 175,  "F#3" : 185,  "G3" : 196,  "G#3" : 208,  "A3" : 220,  "A#3" : 233,  "B3" : 247,
  "C4" : 262,  "C#4" : 277,  "D4" : 294,  "D#4" : 311,  "E4" : 330,  "F4" : 349,  "F#4" : 370,  "G4" : 392,  "G#4" : 415,  "A4" : 440,  "A#4" : 466,  "B4" : 494,
  "C5" : 523,  "C#5" : 554,  "D5" : 587,  "D#5" : 622,  "E5" : 659,  "F5" : 698,  "F#5" : 740,  "G5" : 784,  "G#5" : 831,  "A5" : 880,  "A#5" : 932,  "B5" : 988,
  "C6" : 1047,  "C#6" : 1109,  "D6" : 1175,  "D#6" : 1245,  "E6" : 1319,  "F6" : 1397,  "F#6" : 1480,  "G6" : 1568,  "G#6" : 1661,  "A6" : 1760,  "A#6" : 1865,  "B6" : 1976
};
// =============================================================================
// music
// =============================================================================
Blockly.JavaScript['music_begin'] = function(block) {
  var dropdown_channel = block.getFieldValue('CH');
  var code = 
`
#SETUP
music.begin(${dropdown_channel});
#END
\n`;
	return code;
};

Blockly.JavaScript['music_note'] = function(block) {
	var code = 'music.tone('+ block.getFieldValue('NOTE') + ',' + block.getFieldValue('DURATION') + ');\n';
	return code;
};

Blockly.JavaScript["music_notes"] = function(block) {
    let text_notes = block.getFieldValue("notes").split(",").map(e=>e.trim());
    let keyNote = text_notes.map(e => (e in notes) ? notes[e] : -1);
    let code = `(std::vector<int>{${keyNote}})`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript["music_song_mario_underworld"] = function (block) {
  let text_notes = block.getFieldValue("notes").split(",").map(e => e.trim());
  let keyNote = text_notes.map(e => (e in notes) ? notes[e] : -1);
  let code = `(std::vector<int>{${keyNote}})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript["music_song_jingle_bell"] = function (block) {
  let text_notes = block.getFieldValue("notes").split(",").map(e => e.trim());
  let keyNote = text_notes.map(e => (e in notes) ? notes[e] : -1);
  let code = `(std::vector<int>{${keyNote}})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript["music_song_cannon_rock"] = function (block) {
  let text_notes = block.getFieldValue("notes").split(",").map(e => e.trim());
  let keyNote = text_notes.map(e => (e in notes) ? notes[e] : -1);
  let code = `(std::vector<int>{${keyNote}})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript["music_play_notes"] = function(block) {
    let number_duration = block.getFieldValue("DURATION");
    let dropdown_instrument = block.getFieldValue("instrument");
    let value_note = Blockly.JavaScript.valueToCode(block, "note",Blockly.JavaScript.ORDER_NONE);
    let code = `music.song(${value_note},${number_duration});\n`;
    return code;
};

};

