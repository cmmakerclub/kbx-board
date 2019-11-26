module.exports = function(Blockly){
'use strict';
// =============================================================================
// sensor
// =============================================================================
var sensor_colour= Blockly.Msg.SENSOR_HUE ;
// var sensor_colour="#CAC745";

Blockly.Blocks["sensor_lm73"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/static/block_icons/sot23-6_1.png", 20, 20, "*"))
			.appendField("Temperature sensor (LM73)");
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(sensor_colour);
		this.setTooltip(Blockly.Msg.SENSOR_LM73_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SENSOR_LM73_HELPURL);
	}
};

Blockly.Blocks["sensor_ldr"] = {
	init: function() {
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
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/static/block_icons/sw12x12.png", 20, 20, "*"))
			.appendField("Switch1 (IO16)");
		this.setOutput(true, ['Number','Boolean']);
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(sensor_colour);
		this.setTooltip(Blockly.Msg.SENSOR_SWITCH1_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SENSOR_SWITCH1_HELPURL);
	}
};

Blockly.Blocks["sensor_switch2"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/static/block_icons/sw12x12.png", 20, 20, "*"))
			.appendField("Switch2 (IO14)");
		this.setOutput(true, ['Number','Boolean']);
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(sensor_colour);
		this.setTooltip(Blockly.Msg.SENSOR_SWITCH2_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SENSOR_SWITCH2_HELPURL);
	}
};

Blockly.Blocks["tft_switch1"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/static/block_icons/sw12x12.png", 20, 20, "*"))
			.appendField("TFT Switch1 (IO33)");
		this.setOutput(true, ['Number','Boolean']);
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(sensor_colour);
		this.setTooltip(Blockly.Msg.SENSOR_SWITCH2_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SENSOR_SWITCH2_HELPURL);
	}
};

Blockly.Blocks["tft_switch2"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/static/block_icons/sw12x12.png", 20, 20, "*"))
			.appendField("TFT Switch2 (IO34)");
		this.setOutput(true, ['Number','Boolean']);
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(sensor_colour);
		this.setTooltip(Blockly.Msg.SENSOR_SWITCH2_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SENSOR_SWITCH2_HELPURL);
	}
};

Blockly.Blocks["tft_switch3"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldImage("/static/block_icons/sw12x12.png", 20, 20, "*"))
			.appendField("TFT Switch3 (IO35)");
		this.setOutput(true, ['Number','Boolean']);
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(sensor_colour);
		this.setTooltip(Blockly.Msg.SENSOR_SWITCH2_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SENSOR_SWITCH2_HELPURL);
	}
};
};