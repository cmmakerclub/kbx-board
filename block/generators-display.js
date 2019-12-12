const nativeImage = require("electron").nativeImage;

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
for (int x=16; x>=-(int(6* String(${argument0}).length())); x--) {
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

	Blockly.JavaScript["i2c128x64_take_a_photo"] = function (block) {
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

		var code = `
KBX.Lcd.spi_init();
KBX.Lcd.drawRGBBitmap(${value_x}, ${value_y}, ${value_img}.data(), ${value_width}, ${value_height});
\n`;

		return code;
	};

	Blockly.JavaScript['basic_TFT_setRotation'] = function (block) {
		var dropdown_rotation = block.getFieldValue('rotation');
		var code = `
KBX.Lcd.spi_init();
KBX.Lcd.setRotation(${dropdown_rotation});
\n`;
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
		var code = `
KBX.Lcd.spi_init();
KBX.Lcd.fillScreen(0x${out});
\n`;
		return code;
	};


	Blockly.JavaScript['basic_TFT_setTextColor'] = function (block) {
		var code = 'KBX.Lcd.spi_init();\nKBX.Lcd.setTextColor(0x' + rgbto16bit(block.getFieldValue('tColor')) + ', 0x' + rgbto16bit(block.getFieldValue('bColor')) + ');\n';
		return code;
	};

	Blockly.JavaScript['basic_TFT_setFonts'] = function (block) {
		var code = 'KBX.Lcd.spi_init();\nKBX.Lcd.setUTF8Font(CF_KN_REG_' + block.getFieldValue('sText') + '_EN, CF_KN_REG_' + block.getFieldValue('sText') + '_TH, NULL);\n';
		return code;
	};

	Blockly.JavaScript['basic_TFT_print'] = function (block) {
		var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
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
		var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
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
		var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
		var value_w = Blockly.JavaScript.valueToCode(block, 'W', Blockly.JavaScript.ORDER_ATOMIC);
		var value_h = Blockly.JavaScript.valueToCode(block, 'H', Blockly.JavaScript.ORDER_ATOMIC);
		var value_tColor = block.getFieldValue('tColor');
		var text_color = rgbto16bit(value_tColor);

		var code = `
KBX.Lcd.spi_init();
KBX.lcd.fillRect(${value_x}, ${value_y}, ${value_w}, ${value_h}, 0x${text_color});
		\n`;
		return code;
	};

	Blockly.JavaScript['basic_string_TH'] = function (block) {
		return [
			'"' + block.getFieldValue('TEXT') + '"',
			Blockly.JavaScript.ORDER_ATOMIC
		];
	};

	// ########################### TFT Display ###################################
	Blockly.JavaScript["tft_display_setRotation"] = function (block) {
		var value_rotation = block.getFieldValue('rotation');
		var code = `
KBX.Lcd.spi_init();
KBX.Lcd.setRotation(${value_rotation});
\n`;
		return code;
	};

	Blockly.JavaScript["tft_display_draw_line"] = function (block) {
		var value_x0 = Blockly.JavaScript.valueToCode(block,
			"x0",
			Blockly.JavaScript.ORDER_ATOMIC);
		var value_y0 = Blockly.JavaScript.valueToCode(block,
			"y0",
			Blockly.JavaScript.ORDER_ATOMIC);
		var value_x1 = Blockly.JavaScript.valueToCode(block,
			"x1",
			Blockly.JavaScript.ORDER_ATOMIC);
		var value_y1 = Blockly.JavaScript.valueToCode(block,
			"y1",
			Blockly.JavaScript.ORDER_ATOMIC);
		var value_color = rgbto16bit(block.getFieldValue("COLOR"));

		var code =
			`
KBX.Lcd.spi_init();
KBX.Lcd.drawLine(${value_x0},${value_y0},${value_x1},${value_y1},0x${value_color});
\n`;
		return code;
	};

	Blockly.JavaScript["tft_display_draw_rect"] = function (block) {
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
		var value_color = rgbto16bit(block.getFieldValue("COLOR"));
		var checkbox_fill = block.getFieldValue("fill") == "TRUE";

		if (checkbox_fill) {
			var code =
				`
KBX.Lcd.spi_init();
KBX.Lcd.fillRect(${value_x},${value_y},${value_width},${value_height},0x${value_color});
		`;
		} else {
			var code =
				`
KBX.Lcd.spi_init();
KBX.Lcd.drawRect(${value_x},${value_y},${value_width},${value_height},0x${value_color});
		`;
		}
		return code;
	};

	Blockly.JavaScript["tft_display_draw_circle"] = function (block) {
		var value_x = Blockly.JavaScript.valueToCode(block,
			"x",
			Blockly.JavaScript.ORDER_ATOMIC);
		var value_y = Blockly.JavaScript.valueToCode(block,
			"y",
			Blockly.JavaScript.ORDER_ATOMIC);
		var value_r = Blockly.JavaScript.valueToCode(block,
			"r",
			Blockly.JavaScript.ORDER_ATOMIC);
		var value_color = rgbto16bit(block.getFieldValue("COLOR"));
		var checkbox_fill = block.getFieldValue("fill") == "TRUE";

		if (checkbox_fill) {
			var code =
				`
KBX.Lcd.spi_init();
KBX.Lcd.fillCircle(${value_x},${value_y},${value_r},0x${value_color});
		`;
		} else {
			var code =
				`
KBX.Lcd.spi_init();
KBX.Lcd.drawCircle(${value_x},${value_y},${value_r},0x${value_color});
		`;
		}
		return code;
	};

	// ########################### TFT Touch screen ###################################
	Blockly.JavaScript["touch_begin"] = function (block) {
		var code = `
#EXTINC#include <XPT2046_Touchscreen.h>#END
#VARIABLEXPT2046_Touchscreen ts(TOUCH_PIN);#END
#SETUP
SPI.begin(22, 32, 21, 27);
ts.begin();
ts.setRotation(1);
#END\n`;
		return code;
	};

	Blockly.JavaScript["touch_condition"] = function (block) {
		var statements_mqtt_statement = Blockly.JavaScript.statementToCode(block, "TOUCH_STATEMENT");
		var value_threshold = Blockly.JavaScript.valueToCode(block, "touch", Blockly.JavaScript.ORDER_ATOMIC);
		var code = `
if (ts.touched(${value_threshold})) {
	TS_Point p = ts.getPoint();
	int tft_point_x = map(p.x, 170, 3750, 0, 320);
	int tft_point_y = map(p.y, 200, 3855, 240, 0);
${statements_mqtt_statement}
}\n`;
		return code;
	};


	Blockly.JavaScript['touch_get_position_x'] = function (block) {
		var code = '(uint16_t)tft_point_x';
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['touch_get_position_y'] = function (block) {
		var code = '(uint16_t)tft_point_y';
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.JavaScript['touch_get_position_z'] = function (block) {
		var code = '(uint32_t)ts.getTouchZ()';
		return [code, Blockly.JavaScript.ORDER_NONE];
	};
}