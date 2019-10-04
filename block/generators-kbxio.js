module.exports = function (Blockly) {
	'use strict';
	// =============================================================================
	// sensor
	// =============================================================================
	Blockly.JavaScript['sensor_lm73'] = function (block) {
		//var code = 'lm73.readTemp()\n';
		//return code;
		return [
			'lm73.readTemp()',
			Blockly.JavaScript.ORDER_ATOMIC
		];
	};

	Blockly.JavaScript['sensor_ldr'] = function (block) {
		return [
			'ldr.mapLDR()',
			Blockly.JavaScript.ORDER_ATOMIC
		];
	};

	Blockly.JavaScript['sensor_switch1'] = function (block) {
		return ['((int)digitalRead(KB_BUTTON1))',
			Blockly.JavaScript.ORDER_ATOMIC
		];
	};

	Blockly.JavaScript['sensor_switch2'] = function (block) {
		return ['((int)digitalRead(KB_BUTTON2))',
			// 'button12.sw2_get()',
			Blockly.JavaScript.ORDER_ATOMIC
		];
	};

	Blockly.JavaScript['tft_switch1'] = function (block) {
		return ['((int)digitalRead(KB_TFT_SW1))',
			Blockly.JavaScript.ORDER_ATOMIC
		];
	};

	Blockly.JavaScript['tft_switch2'] = function (block) {
		return ['((int)digitalRead(KB_TFT_SW2))',
			Blockly.JavaScript.ORDER_ATOMIC
		];
	};

	Blockly.JavaScript['tft_switch3'] = function (block) {
		return ['((int)digitalRead(KB_TFT_SW3))',
			Blockly.JavaScript.ORDER_ATOMIC
		];
	};

	//###############################################################################################
	//									KBX-IO
	//###############################################################################################
	Blockly.JavaScript['kbx_usb_loop'] = function (block) {
		var code =`KBXio.usb_loop();\n`;
		return code;
	};

	Blockly.JavaScript['kbx_keyboard_1_char'] = function (block) {
		var code = `KBXio.keyboard_1_char()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['kbx_keyboard_2_char'] = function (block) {
		var code = `KBXio.keyboard_2_char()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['kbx_joystick_left_x'] = function (block) {
		var code = `KBXio.joystick_left_xaxis()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['kbx_joystick_left_y'] = function (block) {
		var code = `KBXio.joystick_left_yaxis()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['kbx_joystick_right_x'] = function (block) {
		var code = `KBXio.joystick_right_xaxis()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['kbx_joystick_right_y'] = function (block) {
		var code = `KBXio.joystick_right_yaxis()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['kbx_joystick_x'] = function (block) {
		var code = `KBXio.joystick_button_x()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['kbx_joystick_y'] = function (block) {
		var code = `KBXio.joystick_button_y()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['kbx_joystick_a'] = function (block) {
		var code = `KBXio.joystick_button_a()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['kbx_joystick_b'] = function (block) {
		var code = `KBXio.joystick_button_b()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['kbx_joystick_select'] = function (block) {
		var code = `KBXio.joystick_button_select()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['kbx_joystick_start'] = function (block) {
		var code = `KBXio.joystick_button_start()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['kbx_joystick_paddle'] = function (block) {
		var code = `KBXio.joystick_paddle()`;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};


	Blockly.JavaScript['kbx_gpio_begin'] = function (block) {
		var code = `  
Wire.beginTransmission(0x34);
Wire.write(32);
Wire.write(0x00);
Wire.write(0x00);
Wire.endTransmission(true);
\n`;
		return code;
	};

	Blockly.JavaScript['kbx_gpio_begin'] = function (block) {
		var dropdown_pin = block.getFieldValue('PIN');
		var dropdown_mode = block.getFieldValue('MODE');
		let code;

		if (dropdown_pin == 0) { code = `KBXio.io_pinMode(0, PIN_RB0, ${dropdown_mode});\n`; }
		else if (dropdown_pin == 1) { code = `KBXio.io_pinMode(0, PIN_RB1, ${dropdown_mode});\n`; }
		else if (dropdown_pin == 2) { code = `KBXio.io_pinMode(0, PIN_RB2, ${dropdown_mode});\n`; }
		else if (dropdown_pin == 3) { code = `KBXio.io_pinMode(0, PIN_RB3, ${dropdown_mode});\n`; }
		else if (dropdown_pin == 4) { code = `KBXio.io_pinMode(0, PIN_RB4, ${dropdown_mode});\n`; }
		else if (dropdown_pin == 5) { code = `KBXio.io_pinMode(0, PIN_RB13, ${dropdown_mode});\n`; }
		else if (dropdown_pin == 6) { code = `KBXio.io_pinMode(0, PIN_RB15, ${dropdown_mode});\n`; }
		else if (dropdown_pin == 7) { code = `KBXio.io_pinMode(PIN_RC0, 0, ${dropdown_mode});\n`; }
		else if (dropdown_pin == 8) { code = `KBXio.io_pinMode(PIN_RC1, 0, ${dropdown_mode});\n`; }
		else if (dropdown_pin == 9) { code = `KBXio.io_pinMode(PIN_RC2, 0, ${dropdown_mode});\n`; }
		else if (dropdown_pin == 10) { code = `KBXio.io_pinMode(PIN_RA4, 0, ${dropdown_mode});\n`; }
		else if (dropdown_pin == 11) { code = `KBXio.io_pinMode(PIN_RA8, 0, ${dropdown_mode});\n`; }
		else if (dropdown_pin == 12) { code = `KBXio.io_pinMode(PIN_RA9, 0, ${dropdown_mode});\n`; }

		return code;
	};

	Blockly.JavaScript['kbx_output_write'] = function (block) {
		let pin = block.getFieldValue('OUTPUT');
		let val = block.getFieldValue('STATUS');
		let code;

		if (pin == 0) { code = `KBXio.io_digitalWrite(0, PIN_RB0, ${val});\n`; }
		else if (pin == 1) { code = `KBXio.io_digitalWrite(0, PIN_RB1, ${val});\n`; }
		else if (pin == 2) { code = `KBXio.io_digitalWrite(0, PIN_RB2, ${val});\n`; }
		else if (pin == 3) { code = `KBXio.io_digitalWrite(0, PIN_RB3, ${val});\n`; }
		else if (pin == 4) { code = `KBXio.io_digitalWrite(0, PIN_RB4, ${val});\n`; }
		else if (pin == 5) { code = `KBXio.io_digitalWrite(0, PIN_RB13, ${val});\n`; }
		else if (pin == 6) { code = `KBXio.io_digitalWrite(0, PIN_RB15, ${val});\n`; }
		else if (pin == 7) { code = `KBXio.io_digitalWrite(PIN_RC0, 0, ${val});\n`; }
		else if (pin == 8) { code = `KBXio.io_digitalWrite(PIN_RC1, 0, ${val});\n`; }
		else if (pin == 9) { code = `KBXio.io_digitalWrite(PIN_RC2, 0, ${val});\n`; }
		else if (pin == 10) { code = `KBXio.io_digitalWrite(PIN_RA4, 0, ${val});\n`; }
		else if (pin == 11) { code = `KBXio.io_digitalWrite(PIN_RA8, 0, ${val});\n`; }
		else if (pin == 12) { code = `KBXio.io_digitalWrite(PIN_RA9, 0, ${val});\n`; }

		return code;
	};

};