module.exports = function (Blockly) {
	'use strict';

	// =============================================================================
	// I/O
	// =============================================================================
	Blockly.JavaScript['output_write'] = function (block) {
		let pin = block.getFieldValue('OUTPUT');
		let val = block.getFieldValue('STATUS');
		if (pin.startsWith("KB_LED")) {
			val = "!" + val;
		}
		let code = 'digitalWrite(' + pin + ',' + val + ');\n';
		return code;
	};

	Blockly.JavaScript['output_toggle'] = function (block) {
		var code = 'digitalWrite(' + block.getFieldValue('OUTPUT') + ', !digitalRead(' + block.getFieldValue('OUTPUT') + '));\n';
		return code;
	};

	Blockly.JavaScript['output_read'] = function (block) {
		return [
			'digitalRead(' + block.getFieldValue('OUTPUT') + ')',
			Blockly.JavaScript.ORDER_ATOMIC
		];
	};

	Blockly.JavaScript['usbsw_write'] = function (block) {
		var code = 'digitalWrite(KB_USB,' + block.getFieldValue('STATUS') + ');\n';
		return code;
	};

	Blockly.JavaScript['usbsw_toggle'] = function (block) {
		var code = 'digitalWrite(KB_USB, digitalRead(KB_USB));\n';
		return code;
	};

	Blockly.JavaScript['usbsw_read'] = function (block) {
		return ['((int)digitalRead(KB_USB))',
			Blockly.JavaScript.ORDER_ATOMIC
		];
	};
	Blockly.JavaScript['input_read'] = function (block) {
		return ['((int)digitalRead(' + block.getFieldValue('INPUT') + '))',
		Blockly.JavaScript.ORDER_ATOMIC
		];

	};

	Blockly.JavaScript["digital_pin_dummy_input"] = function (block) {
		let dropdown_name = block.getFieldValue("IO_PIN");
		let code = `${dropdown_name}`;
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};

	Blockly.JavaScript["digital_pin_dummy_input"] = function (block) {
		let dropdown_name = block.getFieldValue("IO_PIN");
		let code = `${dropdown_name}`;
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};


};