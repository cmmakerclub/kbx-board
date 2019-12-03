module.exports = function(Blockly){
'use strict';
// =============================================================================
// sensor
// =============================================================================
Blockly.JavaScript['sensor_lm73'] = function(block) {
	//var code = 'lm73.readTemp()\n';
	//return code;
	return [
		'lm73.readTemp()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['sensor_ldr'] = function(block) {
	return [
		'analogRead(36)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['sensor_switch1'] = function(block) {
	return [ '(!(int)digitalRead(KB_BUTTON1))',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['sensor_switch2'] = function(block) {
	return [ '(!(int)digitalRead(KB_BUTTON2))',
		// 'button12.sw2_get()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['tft_switch1'] = function(block) {
	return [ '(!(int)digitalRead(KB_TFT_SW1))',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['tft_switch2'] = function(block) {
	return [ '(!(int)digitalRead(KB_TFT_SW2))',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['tft_switch3'] = function(block) {
	return [ '(!(int)digitalRead(KB_TFT_SW3))',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

};