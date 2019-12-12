module.exports = function (Blockly) {
  "use strict";

  Blockly.Blocks["sdcard_begin"] = {
    init: function () {
      this.appendDummyInput()
        // .appendField(new Blockly.FieldImage("https://image.flaticon.com/icons/svg/1137/1137754.svg",20,20,"*"))
        .appendField("SD card begin");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['sdcard_write_txt'] = {
    init: function () {
      this.appendDummyInput()
        // .appendField(new Blockly.FieldImage("https://image.flaticon.com/icons/svg/1137/1137707.svg", 20, 20, "*"))
        .appendField("SD card Write")
        .appendField(new Blockly.FieldVariable("file1"), "FILENAME")
        .appendField(".txt");
      this.appendValueInput("DATA")
        .setCheck(null)
        .appendField("value");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['sdcard_append_txt'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("SD card Append")
        .appendField(new Blockly.FieldVariable("file1"), "FILENAME")
        .appendField(".txt");
      this.appendValueInput("DATA")
        .setCheck(null)
        .appendField("value");
      this.appendDummyInput()
        .appendField("Newline")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "NL");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['sdcard_write_csv'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("SD card Write")
        .appendField(new Blockly.FieldVariable("doc1"), "FILENAME")
        .appendField(".csv");
      this.appendValueInput("DATA1")
        .setCheck(null)
        .appendField("colum1");
      this.appendValueInput("DATA2")
        .setCheck(null)
        .appendField("colum2");
      this.appendValueInput("DATA3")
        .setCheck(null)
        .appendField("colum3");
      this.appendValueInput("DATA4")
        .setCheck(null)
        .appendField("colum4");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['sdcard_list'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("SD card List directory");
      this.setOutput(true, "String");
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['sdcard_read_file'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("SD card readFile")
        .appendField(new Blockly.FieldVariable("file1"), "FILENAME")
        .appendField(".txt");
      this.setOutput(true, "String");
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['sdcard_createDir'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("SD card Create directory name")
        .appendField(new Blockly.FieldVariable("file1"), "FILENAME");
      this.appendValueInput("DATA")
        .setCheck(null)
        .appendField("value");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['sdcard_card_type'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("SD card Type")
      this.setOutput(true, "String");
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['sdcard_card_size'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("SD card Size (MB)")
      this.setOutput(true, "String");
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['sdcard_total_space'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("SD card Total space (MB)")
      this.setOutput(true, "String");
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['sdcard_used_space'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("SD card Used space (MB)")
      this.setOutput(true, "String");
      this.setColour(20);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  // ######################################################################
};
