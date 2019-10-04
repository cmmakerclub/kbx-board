module.exports = function (Blockly) {
	'use strict';
	// =============================================================================
	// sensor
	// =============================================================================
	var sensor_colour = Blockly.Msg.SENSOR_HUE;
	// var sensor_colour="#CAC745";

	Blockly.Blocks["sensor_lm73"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/sot23-6_1.png", 20, 20, "*"))
				.appendField("Temperature snesor (LM73)");
			this.setOutput(true, 'Number');
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setColour(sensor_colour);
			this.setTooltip(Blockly.Msg.SENSOR_LM73_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.SENSOR_LM73_HELPURL);
		}
	};

	Blockly.Blocks["sensor_ldr"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/ldr1.png", 20, 20, "*"))
				.appendField("Light Level sensor (IO36)");
			this.setOutput(true, 'Number');
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setColour(sensor_colour);
			this.setTooltip(Blockly.Msg.SENSOR_LDR_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.SENSOR_LDR_HELPURL);
		}
	};

	Blockly.Blocks["sensor_switch1"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/sw12x12.png", 20, 20, "*"))
				.appendField("Switch1 (IO16)");
			this.setOutput(true, ['Number', 'Boolean']);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setColour(sensor_colour);
			this.setTooltip(Blockly.Msg.SENSOR_SWITCH1_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.SENSOR_SWITCH1_HELPURL);
		}
	};

	Blockly.Blocks["sensor_switch2"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/sw12x12.png", 20, 20, "*"))
				.appendField("Switch2 (IO14)");
			this.setOutput(true, ['Number', 'Boolean']);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setColour(sensor_colour);
			this.setTooltip(Blockly.Msg.SENSOR_SWITCH2_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.SENSOR_SWITCH2_HELPURL);
		}
	};

	Blockly.Blocks["tft_switch1"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/sw12x12.png", 20, 20, "*"))
				.appendField("TFT Switch1 (IO33)");
			this.setOutput(true, ['Number', 'Boolean']);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setColour(sensor_colour);
			this.setTooltip(Blockly.Msg.SENSOR_SWITCH2_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.SENSOR_SWITCH2_HELPURL);
		}
	};

	Blockly.Blocks["tft_switch2"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/sw12x12.png", 20, 20, "*"))
				.appendField("TFT Switch2 (IO34)");
			this.setOutput(true, ['Number', 'Boolean']);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setColour(sensor_colour);
			this.setTooltip(Blockly.Msg.SENSOR_SWITCH2_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.SENSOR_SWITCH2_HELPURL);
		}
	};

	Blockly.Blocks["tft_switch3"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/sw12x12.png", 20, 20, "*"))
				.appendField("TFT Switch3 (IO35)");
			this.setOutput(true, ['Number', 'Boolean']);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setColour(sensor_colour);
			this.setTooltip(Blockly.Msg.SENSOR_SWITCH2_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.SENSOR_SWITCH2_HELPURL);
		}
	};

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
					["RB00", "0"],
					["RB01", "1"],
					["RB02", "2"],
					["RB03", "3"],
					["RB04", "4"],
					["RB13", "5"],
					["RB15", "6"],
					["RC00", "7"],
					["RC01", "8"],
					["RC02", "9"],
					["RA04", "10"],
					["RA08", "11"],
					["RA09", "12"]
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
				.appendField(new Blockly.FieldImage("/static/block_icons/banana.png", 20, 20, "*"))
				.appendField(Blockly.Msg.OUTPUT_WRITE_TITLE)
				.appendField(new Blockly.FieldDropdown([
					["RB00", "0"],
					["RB01", "1"],
					["RB02", "2"],
					["RB03", "3"],
					["RB04", "4"],
					["RB13", "5"],
					["RB15", "6"],
					["RC00", "7"],
					["RC01", "8"],
					["RC02", "9"],
					["RA04", "10"],
					["RA08", "11"],
					["RA09", "12"]
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
};