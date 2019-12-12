module.exports = function (Blockly) {
	'use strict';
	//###############################################################################################
	//									KBX-IO
	//###############################################################################################
	Blockly.Blocks['kbx_usb_loop'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO Keyboard & Joystick loop");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_keyboard_1_char'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO Keyboard data 1");
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_keyboard_2_char'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO Keyboard data 2");
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_joystick_left_x'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO Left Stick X");
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_joystick_left_y'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO Left Stick Y");
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_joystick_right_x'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO Right Stick X");
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_joystick_right_y'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO Right Stick Y");
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_joystick_x'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO joyStick button X");
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_joystick_y'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO joyStick button Y");
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_joystick_a'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO joyStick button A");
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_joystick_b'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO joyStick button B");
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_joystick_select'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO joyStick button SELECT");
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_joystick_start'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO joyStick button START");
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_joystick_paddle'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO joyStick Paddle");
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_gpio_begin'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO GPIO setup")
				.appendField(new Blockly.FieldDropdown([
					["IO1", "11"],
					["IO2", "12"],
					["IO3", "10"],
					["IO4", "9"],
					["IO5", "7"],
					["IO6", "8"],
					["IO7", "6"],
					["IO8", "5"],
					["IO9", "4"],
					["IO10", "2"],
					["IO11", "3"],
					["IO12", "0"],
					["IO13", "1"]
				]), 'PIN')
				.appendField("mode")
				.appendField(new Blockly.FieldDropdown([
					["OUTPUT", "0"],
					["INPUT", "1"]
				]), "MODE");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks["kbx_output_write"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(Blockly.Msg.OUTPUT_WRITE_TITLE)
				.appendField(new Blockly.FieldDropdown([
					["IO1", "11"],
					["IO2", "12"],
					["IO3", "10"],
					["IO4", "9"],
					["IO5", "7"],
					["IO6", "8"],
					["IO7", "6"],
					["IO8", "5"],
					["IO9", "4"],
					["IO10", "2"],
					["IO11", "3"],
					["IO12", "0"],
					["IO13", "1"]
				]), 'OUTPUT')
				.appendField(Blockly.Msg.STATUS)
				.appendField(new Blockly.FieldDropdown([
					[Blockly.Msg.STATUS_ON, "1"],
					[Blockly.Msg.STATUS_OFF, "0"]
				]), 'STATUS');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(255);
			this.setTooltip(Blockly.Msg.OUTPUT_WRITE_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.OUTPUT_WRITE_HELPURL);
		}
	};


	Blockly.Blocks['kbx_pwm_setup'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO PWM setup");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_pwm_write'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO PWM write")
				.appendField(new Blockly.FieldDropdown([
					["PWM1", "IO_PWM1"], 
					["PWM2", "IO_PWM2"], 
					["PWM3", "IO_PWM3"]
				]), "pin")
				.appendField("value");
			this.appendValueInput("VALUE")
				.setCheck("Number");
			this.appendDummyInput()
				.appendField("(0-200)");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_pwm_digitalRead'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO digitalRead")
				.appendField(new Blockly.FieldDropdown([
					["IO1", "12"],
					["IO2", "13"],
					["IO3", "11"],
					["IO4", "10"],
					["IO5", "8"],
					["IO6", "9"],
					["IO7", "7"],
					["IO8", "5"],
					["IO9", "4"],
					["IO10", "2"],
					["IO11", "3"],
					["IO12", "0"],
					["IO13", "1"]
				]), "pin");
			this.setInputsInline(true);
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['kbx_pwm_analogRead'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("KBX-IO analogRead")
				.appendField(new Blockly.FieldDropdown([
					["ADC1", "IO_Analog1"],
					["ADC2", "IO_Analog2"]
				]), "pin");
			this.setInputsInline(true);
			this.setOutput(true, null);
			this.setColour(255);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};
};