module.exports = function (Blockly) {
	'use strict';

	function rgbto16bit(colorIN) {
		let color = colorIN.replace("#", "0x");
		let sourceColor = parseInt(color, 16);
		let red = (sourceColor & 0x00FF0000) >> 16;
		let green = (sourceColor & 0x0000FF00) >> 8;
		let blue = sourceColor & 0x000000FF;
		let out = (red >> 3 << 11) + (green >> 2 << 5) + (blue >> 3);
		out = out.toString(16)
		return out;
	}

	Blockly.JavaScript['display_led16x8'] = function (block) {
		var buf = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
		for (var x = 0; x < 16; x++) {
			var byte = 0;
			for (var y = 0; y < 8; y++) {
				var val = block.getFieldValue('POS_X' + x + '_Y' + y);
				if (val == 'TRUE') {
					byte |= (0x01 << y);
				};
			}
			buf[15 - x] = byte;
		}

		var str = '';
		for (var i = 0; i < 16; i++) {
			str += '\\x' + buf[i].toString(16);
		}

		var code =
			`
KBX.matrix.clear();
KBX.matrix.setRotation(0);
KBX.matrix.drawBitmap(0, 0, (uint8_t *)"${str}", 8, 16, LED_ON);
KBX.matrix.writeDisplay();
KBX.matrix.setRotation(1);
\n`;
		return code;
		// return 'KBX.matrix.drawBitmap(0, 0, (uint8_t *)"' + str + '"), 16, 8, LED_ON;\n';
	};

	Blockly.JavaScript['display_led16x8_clr'] = function (block) {
		var code =
			`
KBX.matrix.clear();
KBX.matrix.setCursor(0, 0);
KBX.matrix.print("     ");
KBX.matrix.writeDisplay();
\n`;
		return code;
	};

	Blockly.JavaScript['display_led16x8_print'] = function (block) {
		var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
		var code =
			`
KBX.matrix.clear();
KBX.matrix.setCursor(0, 0);
KBX.matrix.print(String(${argument0}));
KBX.matrix.writeDisplay();
\n`;
		return code;
	};

	Blockly.JavaScript['display_led16x8_scroll'] = function (block) {
		var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
		var value_speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC);
		var code =
			`
for (int x=16; x>=-(int(60+sizeof(String(${argument0})))); x--) {
	KBX.matrix.clear();
    KBX.matrix.setCursor(x, 0);
    KBX.matrix.print(String(${argument0}));
    KBX.matrix.writeDisplay();
    delay(${value_speed});
}
\n`;
		return code;
	};



	/***** TFT Display *****/
	Blockly.JavaScript["i2c128x64_create_image"] = function (block) {
		var dataurl = block.inputList[1].fieldRow["0"].src_;
		var image = nativeImage.createFromDataURL(dataurl);
		var size = image.getSize();

		var mm = image.getBitmap();
		var arr = [];
		var raw = [];
		for (let i = 0; i < image.getBitmap().length - 4; i += 4) {
			let [r, g, b] = [mm[i + 2], mm[i + 1], mm[i + 0]];
			let out = (((r & 0xf8) << 8) + ((g & 0xfc) << 3) + (b >> 3));
			arr.push("0x" + out.toString(16));
		}
		console.log(raw);
		var code = `(std::vector<uint16_t>{${arr.join(",")}})`;
		return [code, Blockly.JavaScript.ORDER_ATOMIC];
	};

	Blockly.JavaScript["i2c128x64_display_image"] = function (block) {
		var value_img = Blockly.JavaScript.valueToCode(block,
			"img",
			Blockly.JavaScript.ORDER_ATOMIC);
		var value_x = Blockly.JavaScript.valueToCode(block,
			"x",
			Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block,
			"y",
			Blockly.JavaScript.ORDER_ATOMIC);
		var value_width = Blockly.JavaScript.valueToCode(block,
			"width",
			Blockly.JavaScript.ORDER_ATOMIC);
		var value_height = Blockly.JavaScript.valueToCode(block,
			"height",
			Blockly.JavaScript.ORDER_ATOMIC);
		//var code = `display.drawFastImage(${value_x}, ${value_y}, ${value_width},${value_height},${value_img}.data());\n`;
		var code = `tft.drawRGBBitmap(${value_x}, ${value_y}, ${value_img}.data(), ${value_width}, ${value_height});`;

		return code;
	};

	Blockly.JavaScript['basic_TFT_setRotation'] = function (block) {
		var code = 'KBX.Lcd.setRotation(' + block.getFieldValue('rotation') + ');\n';
		return code;
	};

	Blockly.JavaScript['basic_TFT_fillScreen'] = function (block) {
		let color = block.getFieldValue('COLOR');
		color = color.replace("#", "0x");
		let sourceColor = parseInt(color, 16);
		let red = (sourceColor & 0x00FF0000) >> 16;
		let green = (sourceColor & 0x0000FF00) >> 8;
		let blue = sourceColor & 0x000000FF;
		let out = (red >> 3 << 11) + (green >> 2 << 5) + (blue >> 3);
		out = out.toString(16);
		var code = 'KBX.Lcd.spi_init();\nKBX.Lcd.fillScreen(0x' + out + ');\n';
		return code;
	};


	Blockly.JavaScript['basic_TFT_setTextColor'] = function (block) {
		var code = 'KBX.Lcd.setTextColor(0x' + rgbto16bit(block.getFieldValue('tColor')) + ', 0x' + rgbto16bit(block.getFieldValue('bColor')) + ');\n';
		return code;
	};

	Blockly.JavaScript['basic_TFT_setFonts'] = function (block) {
		var code = 'KBX.Lcd.setUTF8Font(CF_KN_REG_' + block.getFieldValue('sText') + '_EN, CF_KN_REG_' + block.getFieldValue('sText') + '_TH, NULL);\n';
		return code;
	};

	Blockly.JavaScript['basic_TFT_print'] = function (block) {
		var value_x = block.getFieldValue('X');
		var value_y = block.getFieldValue('Y');
		var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
		var value_tColor = block.getFieldValue('tColor');
		var value_bColor = block.getFieldValue('bColor');
		var value_fonts = block.getFieldValue('sText');

		var text_color = rgbto16bit(value_tColor);
		var background_color = rgbto16bit(value_bColor);

		var code =
			`
KBX.Lcd.spi_init();
KBX.Lcd.setUTF8Font(CF_KN_REG_${value_fonts}_EN, CF_KN_REG_${value_fonts}_TH, NULL);
KBX.Lcd.setTextColor(0x${text_color}, 0x${background_color});
KBX.Lcd.drawString(String(${value_text}), ${value_x}, ${value_y}, 1);
\n`;
		return code;
	};

	Blockly.JavaScript['basic_TFT_print_TH'] = function (block) {
		var value_x = block.getFieldValue('X');
		var value_y = block.getFieldValue('Y');
		var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
		var value_tColor = block.getFieldValue('tColor');
		var value_bColor = block.getFieldValue('bColor');
		var value_fonts = block.getFieldValue('sText');

		var text_color = rgbto16bit(value_tColor);
		var background_color = rgbto16bit(value_bColor);
		var code =
			`
KBX.Lcd.spi_init();
KBX.Lcd.setUTF8Font(CF_KN_REG_${value_fonts}_EN, CF_KN_REG_${value_fonts}_TH, NULL);
KBX.Lcd.setTextColor(0x${text_color}, 0x${background_color});
KBX.Lcd.drawUTF8String(${value_text}, ${value_x}, ${value_y}, 1);
\n`;
		return code;
	};

	Blockly.JavaScript['basic_TFT_clearPixel'] = function (block) {
		var code = 'KBX.Lcd.fillRect(' + block.getFieldValue('X') + ', ' + block.getFieldValue('Y') + ', ' + block.getFieldValue('W') + ', ' + block.getFieldValue('H') + ', 0x' + rgbto16bit(block.getFieldValue('tColor')) + ');\n';
		return code;
	};

	Blockly.JavaScript['basic_string_TH'] = function (block) {
		return [
			'"' + block.getFieldValue('TEXT') + '"',
			Blockly.JavaScript.ORDER_ATOMIC
		];
	};
}