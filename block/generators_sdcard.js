module.exports = function (Blockly) {
  "use strict";
  const ORDER_ATOMIC = Blockly.JavaScript.ORDER_ATOMIC;
  const valueToCode = (a, b) => Blockly.JavaScript.valueToCode(a, b);

Blockly.JavaScript["sdcard_begin"] = function (block) {
  var code = `
#EXTINC#include "utility/kbSD.h"#END
if(!SD.begin(TFCARD_CS_PIN, SPI, 4000000, "/sd")){
  Serial.println("Card Mount Failed");
}
Serial.println("Card Mount Done");\n`;
  return code;
};

Blockly.JavaScript["sdcard_write_txt"] = function (block) {
  var value_filename = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('FILENAME'), Blockly.Variables.NAME_TYPE);
  var value_data = valueToCode(block, "DATA", ORDER_ATOMIC);
  var code =`SD.writeFile(SD, "/${value_filename}.txt", String(${value_data}).c_str());\n`;
  return code;
};

Blockly.JavaScript["sdcard_append_txt"] = function (block) {
  var value_filename = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('FILENAME'), Blockly.Variables.NAME_TYPE);
  var value_data = valueToCode(block, "DATA", ORDER_ATOMIC);
  var checkbox_newline = block.getFieldValue('NL') == 'TRUE';

  if (checkbox_newline) {
    var code = `SD.appendFile(SD, "/${value_filename}.txt", String(${value_data}).c_str(), 1);\n`;
  } else {
    var code = `SD.appendFile(SD, "/${value_filename}.txt", String(${value_data}).c_str(), 0);\n`;
  }
  return code;
};

Blockly.JavaScript["sdcard_write_csv"] = function (block) {
  var value_filename = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('FILENAME'), Blockly.Variables.NAME_TYPE);
  var value_data1 = valueToCode(block, "DATA1", ORDER_ATOMIC);
  var value_data2 = valueToCode(block, "DATA2", ORDER_ATOMIC);
  var value_data3 = valueToCode(block, "DATA3", ORDER_ATOMIC);
  var value_data4 = valueToCode(block, "DATA4", ORDER_ATOMIC);

  var code = `SD.writeCSV(SD, "/${value_filename}.csv", String(${value_data1}).c_str(), String(${value_data2}).c_str(), String(${value_data3}).c_str(), String(${value_data4}).c_str());\n`;
  return code;
};

Blockly.JavaScript['sdcard_read_file'] = function(block) {
  var value_filename = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('FILENAME'), Blockly.Variables.NAME_TYPE);;
  var code = `SD.readText("/${value_filename}.txt")`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sdcard_list'] = function(block) {
  var code = `SD.listDir(SD, "/", 0)`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sdcard_card_type'] = function(block) {
  var code = `SD.readCardtype()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sdcard_card_size'] = function(block) {
  var code = `SD.readCardSize()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sdcard_total_space'] = function(block) {
  var code = `SD.readTotalBytes()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sdcard_used_space'] = function(block) {
  var code = `SD.readUsedBytes()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
  // ######################################################################
};
