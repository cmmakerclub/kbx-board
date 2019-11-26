module.exports = function (Blockly) {
	'use strict';
	// =============================================================================
	// I/O
	// =============================================================================
	var io_colour = Blockly.Msg.IO_HUE;
	// var io_colour = "#F66563";
	Blockly.Blocks["output_write"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/banana.png", 20, 20, "*"))
				.appendField(Blockly.Msg.OUTPUT_WRITE_TITLE)
				.appendField(new Blockly.FieldDropdown([
					["OUTPUT1 (IO26)", "26"],
					["OUTPUT2 (IO27)", "27"],
					["LED_BT (IO17)", "KB_LED_BT"],
					["LED_WIFI (IO02)", "KB_LED_WIFI"],
					["LED_NTP (IO15)", "KB_LED_NTP"],
					["LED_IOT (IO12)", "KB_LED_IOT"]
				]), 'OUTPUT')
				.appendField(Blockly.Msg.STATUS)
				.appendField(new Blockly.FieldDropdown([
					[Blockly.Msg.STATUS_OFF, "0"],
					[Blockly.Msg.STATUS_ON, "1"]
				]), 'STATUS');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(io_colour);
			this.setTooltip(Blockly.Msg.OUTPUT_WRITE_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.OUTPUT_WRITE_HELPURL);
		}
	};

	Blockly.Blocks["output_toggle"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/banana.png", 20, 20, "*"))
				.appendField(Blockly.Msg.OUTPUT_TOGGLE_TITLE)
				.appendField(new Blockly.FieldDropdown([
					["OUTPUT1 (IO26)", "26"],
					["OUTPUT2 (IO27)", "27"],
					["LED_BT (IO17)", "KB_LED_BT"],
					["LED_WIFI (IO02)", "KB_LED_WIFI"],
					["LED_NTP (IO15)", "KB_LED_NTP"],
					["LED_IOT (IO12)", "KB_LED_IOT"]
				]), 'OUTPUT')
				.appendField(Blockly.Msg.STATUS);
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(io_colour);
			this.setTooltip(Blockly.Msg.OUTPUT_TOGGLE_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.OUTPUT_TOGGLE_HELPURL);
		}
	};

	Blockly.Blocks["output_read"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/banana.png", 20, 20, "*"))
				.appendField(Blockly.Msg.OUTPUT_READ_TITLE)
				.appendField(new Blockly.FieldDropdown([
					["OUTPUT1", "26"],
					["OUTPUT2", "27"]
				]), 'OUTPUT');
			this.setOutput(true, 'Number');
			this.setInputsInline(true);
			this.setPreviousStatement(null);
			this.setNextStatement(null);
			this.setColour(io_colour);
			this.setTooltip(Blockly.Msg.OUTPUT_READ_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.OUTPUT_READ_HELPURL);
		}
	};

	Blockly.Blocks["usbsw_write"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/usb_con.png", 20, 20, "*"))
				.appendField(Blockly.Msg.USBSW_WRITE_TITLE)
				.appendField(Blockly.Msg.USBSW_WRITE_STATUS)
				.appendField(new Blockly.FieldDropdown([
					[Blockly.Msg.STATUS_OFF, "1"],
					[Blockly.Msg.STATUS_ON, "0"]
				]), 'STATUS');
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(io_colour);
			this.setTooltip(Blockly.Msg.USBSW_WRITE_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.USBSW_WRITE_HELPURL);
		}
	};

	Blockly.Blocks["usbsw_toggle"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/usb_con.png", 20, 20, "*"))
				.appendField(Blockly.Msg.USBSW_TOGGLE_TITLE);
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(io_colour);
			this.setTooltip(Blockly.Msg.USBSW_TOGGLE_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.USBSW_TOGGLE_HELPURL);
		}
	};

	Blockly.Blocks["usbsw_read"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/usb_con.png", 20, 20, "*"))
				.appendField(Blockly.Msg.USBSW_READ_TITLE);
			this.setOutput(true, 'Number');
			this.setInputsInline(true);
			this.setPreviousStatement(null);
			this.setNextStatement(null);
			this.setColour(io_colour);
			this.setTooltip(Blockly.Msg.USBSW_READ_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.USBSW_READ_HELPURL);
		}
	};

	Blockly.Blocks["input_read"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage("/static/block_icons/banana.png", 20, 20, "*"))
				.appendField(Blockly.Msg.INPUT_READ_TITLE)
				.appendField(new Blockly.FieldDropdown([
					["INPUT1", "KB_INPUT1"],
					["INPUT2", "KB_INPUT2"],
					["INPUT3", "KB_INPUT3"],
					["INPUT4", "KB_INPUT4"]
				]), 'INPUT');
			this.setOutput(true, 'Number');
			this.setInputsInline(true);
			this.setPreviousStatement(null);
			this.setNextStatement(null);
			this.setColour(io_colour);
			this.setTooltip(Blockly.Msg.INPUT_READ_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.INPUT_READ_HELPURL);
		}
	};

	Blockly.Blocks["digital_pin_dummy_input"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldDropdown([
					["LED_BT (IO17)", "17"],
					["LED_WIFI (IO02)", "2"],
					["LED_NTP (IO15)", "15"],
					["LED_IOT (IO12)", "12"],
					["SW1 (IO16)", "16"],
					["SW2 (IO14)", "14"],
					["OUTPUT_1 (IO26)", "26"],
					["OUTPUT_2 (IO27)", "27"],
					["INPUT_1 (IO32)", "32"],
					["INPUT_2 (IO33)", "33"],
					["INPUT_3 (IO34)", "34"],
					["INPUT_4 (IO35)", "35"],
					["LDR (IO36)", "36"],
					["BUZZER (IO13)", "13"],
					["SDA0 (IO21)", "21"],
					["SCL0 (IO22)", "22"],
					["SDA1 (IO04)", "4"],
					["SCL1 (IO05)", "5"]
				]), "IO_PIN");
			this.setOutput(true, "Number");
			this.setColour(io_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};



};