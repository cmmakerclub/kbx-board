const app = require("electron").remote;
const nativeImage = require("electron").nativeImage;
const dialog = app.dialog;

module.exports = function (Blockly) {
	'use strict';
	var basic_colour = Blockly.Msg.BASIC_HUE;

	Blockly.Blocks["i2c128x64_create_image"] = {
		init: function () {
			this.appendDummyInput()
				.appendField("create image from PNG file");
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage(
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABACAIAAABdtOgoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ/SURBVHhe7ZbbdQIxDES3LgraeqiGZiiG2JLWHhmbx08Gkrk/kWU9GR/IdhNUJAAZCUBGApCRAGQkABkJQEYCkJEAZCQAGQlARgKQkQBkJAAZCUBGApCRAGQkABkJQEYCkJEAZCQAGQlARgKQkQBkJACZFwW47Nu2nc7XOP4ZbK9tv8SRgASQAP+bhQDX86k+jYo9jxDgbA+mAG/GH5GDEs393dtLQLNRZL9qTnwHs/oeHpUh18xjfHzvkBAxF/NUirf16DnQts+KsxTiwos7PXZgKkDesxrRweZw20dCGxZe+aHw9bzH33obC9p92A4WhfRF/VTszj+UrkBCxKT4sVfxm+s+8a492pO9GjMB+p6N5OqHHOk96/Ghv18U0pzTSWfdVvVTte5GMwMJKSYVyt2CPAymQbW2iUW3EzIRYMg10gztkGaGi5X/MB3rAOfGMGiqalWW9dPoEJX8CFykoikBxh/m7cUH65W9nKUA0TDAGeCQ3DD1yn/QW+TIORaznU5tu2X91Kk3mUwQwAWEDwmtG3r7CO4NjqFe2cuYfQWlUeA3YFIc/fPx0F+s8PV7s45VF7QVI/tJX7fd9CAMScCFm5OavZl5PcKrD04EJnnI9Ef4GKAC/Y4u6dAjC9Bv7gdvj/VZG5OhIw3XXPVtxeIfGsvx4GVhu3AzWqQE2LePuu/FHJ1Ga/N8r8JCgE8DPoNPI422VHrJdwjgb+mdvX6N/JG/P+g3COA7fubnX8lfNW+O+SVfQX8XCUBGApCRAGQkABkJQEYCkJEAZCQAGQlARgKQkQBkJAAZCUBGApCRAGQkABkJQEYCkJEAZCQAGQlARgKQkQBkJACV2+0HImEfdtax+UEAAAAASUVORK5CYII=",
					128,
					64,
					"click to upload",
					function (e) {
						let myself = this;
						let id = this.sourceBlock_.id.toUpperCase();
						const dialogOptions = {
							filters: [{ name: "Images PNG", extensions: ["png"] }],
							properties: ["openFile"]
						};
						dialog.showOpenDialog(dialogOptions, imageFileName => {
							console.log(imageFileName);
							if (imageFileName != undefined) {
								imageFileName = imageFileName[0];
								//--- resize image ---//
								let image = nativeImage.createFromPath(imageFileName);
								let size = image.getSize();
								if (size.width > 240) {
									image = image.resize({ width: 240 });
									size = image.getSize();
								}
								if (size.height > 180) {
									image = image.resize({ height: 180 });
									size = image.getSize();
								}
								var buff = image.getBitmap();
								//---- dithering image ----//
								//floyd_steinberg(buff,size.width);
								//---- display image ----//
								myself.sourceBlock_.inputList[2].fieldRow[0].setValue(`image size is ${size.width} x ${size.height}`);
								myself.sourceBlock_.inputList[2].fieldRow[0].init();
								myself.setValue(image.toDataURL());
								myself.init();
							}
						});
					},
					true));
			this.appendDummyInput().appendField("image size is 320 x 240");

			this.setOutput(true, "std::vector<uint16_t>");
			this.setColour(basic_colour);
			this.setTooltip(
				"create image from PNG file (for best quality result please use size within 128x64 pixel otherwise, it'll resize)");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks["i2c128x64_take_a_photo"] = {
		init: function () {
			this.appendDummyInput().appendField("take a photo");
			this.appendDummyInput().appendField(
				new Blockly.FieldImage(
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABACAIAAABdtOgoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ/SURBVHhe7ZbbdQIxDES3LgraeqiGZiiG2JLWHhmbx08Gkrk/kWU9GR/IdhNUJAAZCUBGApCRAGQkABkJQEYCkJEAZCQAGQlARgKQkQBkJAAZCUBGApCRAGQkABkJQEYCkJEAZCQAGQlARgKQkQBkJACZFwW47Nu2nc7XOP4ZbK9tv8SRgASQAP+bhQDX86k+jYo9jxDgbA+mAG/GH5GDEs393dtLQLNRZL9qTnwHs/oeHpUh18xjfHzvkBAxF/NUirf16DnQts+KsxTiwos7PXZgKkDesxrRweZw20dCGxZe+aHw9bzH33obC9p92A4WhfRF/VTszj+UrkBCxKT4sVfxm+s+8a492pO9GjMB+p6N5OqHHOk96/Ghv18U0pzTSWfdVvVTte5GMwMJKSYVyt2CPAymQbW2iUW3EzIRYMg10gztkGaGi5X/MB3rAOfGMGiqalWW9dPoEJX8CFykoikBxh/m7cUH65W9nKUA0TDAGeCQ3DD1yn/QW+TIORaznU5tu2X91Kk3mUwQwAWEDwmtG3r7CO4NjqFe2cuYfQWlUeA3YFIc/fPx0F+s8PV7s45VF7QVI/tJX7fd9CAMScCFm5OavZl5PcKrD04EJnnI9Ef4GKAC/Y4u6dAjC9Bv7gdvj/VZG5OhIw3XXPVtxeIfGsvx4GVhu3AzWqQE2LePuu/FHJ1Ga/N8r8JCgE8DPoNPI422VHrJdwjgb+mdvX6N/JG/P+g3COA7fubnX8lfNW+O+SVfQX8XCUBGApCRAGQkABkJQEYCkJEAZCQAGQlARgKQkQBkJAAZCUBGApCRAGQkABkJQEYCkJEAZCQAGQlARgKQkQBkJACV2+0HImEfdtax+UEAAAAASUVORK5CYII=",
					128,
					64,
					"click to take a photo",
					function (e) {
						let myself = this;
						let id = this.sourceBlock_.id.toUpperCase();
						Blockly.camera(res => {
							//--- resize image ---//
							let image = nativeImage.createFromDataURL(res);
							let size = image.getSize();
							if (size.width > 256) {
								image = image.resize({ width: 256 });
								size = image.getSize();
							}
							if (size.height > 192) {
								image = image.resize({ height: 192 });
								size = image.getSize();
							}
							var buff = image.getBitmap();
							//---- dithering image ----//
							//floyd_steinberg(buff,size.width);
							//---- display image ----//
							myself.sourceBlock_.inputList[2].fieldRow[0].setValue(
								`image size ${size.width} x ${size.height}`
							);
							myself.sourceBlock_.inputList[2].fieldRow[0].init();
							myself.setValue(image.toDataURL());
							myself.init();
						});
					},
					true
				)
			);
			this.appendDummyInput().appendField("image size is 320 x 240");

			this.setOutput(true, "std::vector<uint16_t>");
			this.setColour(basic_colour);
			this.setTooltip(
				"create image from camera (for best quality result please use size within 320x240 pixel otherwise, it'll resize)"
			);
		}
	};

	Blockly.Blocks["i2c128x64_display_image"] = {
		init: function () {
			this.appendValueInput("img")
				.setCheck("std::vector<uint16_t>")
				.appendField("TFT draw image");
			this.appendValueInput("x")
				.setCheck("Number")
				.appendField(" at (X");
			this.appendValueInput("y")
				.setCheck("Number")
				.appendField(",Y");
			this.appendValueInput("width")
				.setCheck("Number")
				.appendField(") width");
			this.appendValueInput("height")
				.setCheck("Number")
				.appendField("height");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(basic_colour);
			this.setTooltip("display image to display");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks["display_led16x8"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(Blockly.Msg.BASIC_LED16X8_TITLE)
				.appendField("                                ")
				.appendField(new Blockly.FieldImage("/static/block_icons/shift_left_24px.svg", 24, 24, "*", function (e) {
					for (var y = 0; y < 8; y++) {
						for (var x = 0; x < 16; x++) {
							if (x != 15) {
								var val = e.sourceBlock_.getFieldValue('POS_X' + (x + 1) + '_Y' + y);
								e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
							} else {
								e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
							}
						}
					}
				}, true))
				.appendField(new Blockly.FieldImage("/static/block_icons/shift_right_24px.svg", 24, 24, "*", function (e) {
					for (var y = 0; y < 8; y++) {
						for (var x = 15; x >= 0; x--) {
							if (x != 0) {
								var val = e.sourceBlock_.getFieldValue('POS_X' + (x - 1) + '_Y' + y);
								e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
							} else {
								e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
							}
						}
					}
				}, true))
				.appendField(new Blockly.FieldImage("/static/block_icons/shift_up_24px.svg", 24, 24, "*", function (e) {
					for (var y = 7; y >= 0; y--) {
						for (var x = 0; x < 16; x++) {
							if (y != 0) {
								var val = e.sourceBlock_.getFieldValue('POS_X' + x + '_Y' + (y - 1));
								e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
							} else {
								e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
							}
						}
					}
				}, true))
				.appendField(new Blockly.FieldImage("/static/block_icons/shift_down_24px.svg", 24, 24, "*", function (e) {
					for (var y = 0; y < 8; y++) {
						for (var x = 0; x < 16; x++) {
							if (y != 7) {
								var val = e.sourceBlock_.getFieldValue('POS_X' + x + '_Y' + (y + 1));
								e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
							} else {
								e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
							}
						}
					}
				}, true));

			for (var y = 7; y >= 0; y--) {
				var line = this.appendDummyInput();
				for (var x = 0; x < 16; x++) {
					line.appendField(new Blockly.FieldCheckbox('false', null, true), 'POS_X' + x + '_Y' + y);
				}
			}
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(basic_colour);
			this.setTooltip(Blockly.Msg.BASIC_LED16X8_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_HELPURL);
		}
	};

	Blockly.Blocks["display_led16x8_clr"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(Blockly.Msg.BASIC_LED16X8_CLR_TITLE);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(basic_colour);
			this.setTooltip(Blockly.Msg.BASIC_LED16X8_CLR_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_CLR_HELPURL);
		}
	};

	Blockly.Blocks["display_led16x8_print"] = {
		init: function () {
			this.appendValueInput('VALUE')
				.appendField("LED 16x8 print");
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(basic_colour);
			this.setTooltip(Blockly.Msg.BASIC_LED16X8_2CHARS_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_2CHARS_HELPURL);
		}
	};

	Blockly.Blocks["display_led16x8_scroll"] = {
		init: function () {
			this.appendValueInput('VALUE')
				.appendField(Blockly.Msg.BASIC_LED16X8_SCROLL_TITLE)
			this.appendValueInput("SPEED")
				.setCheck("Number")
				.appendField("speed");
			this.setInputsInline(true);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(basic_colour);
			this.setTooltip(Blockly.Msg.BASIC_LED16X8_SCROLL_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_SCROLL_HELPURL);
		}
	};

	Blockly.Blocks["display_led16x8_scroll_when_ready"] = {
		init: function () {
			this.appendValueInput('VALUE')
				.appendField(Blockly.Msg.BASIC_LED16X8_SCROLL_WHEN_READY_TITLE);
			this.setPreviousStatement(true);
			this.setNextStatement(true);
			this.setColour(basic_colour);
			this.setTooltip(Blockly.Msg.BASIC_LED16X8_SCROLL_WHEN_READY_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.BASIC_LED16X8_SCROLL_WHEN_READY_HELPURL);
		}
	};

	Blockly.Blocks['basic_TFT_setRotation'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("TFT set Rotaion")
				.appendField(new Blockly.FieldDropdown([
					["TOP", "0"],
					["RIGHT", "1"],
					["DOWN", "2"],
					["LEFT", "3"]]),
					"rotation");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(160);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['basic_TFT_fillScreen'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("TFT set fillScreen:")
				.appendField(new Blockly.FieldColour('#000000'), 'COLOR')
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(160);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['basic_TFT_setTextColor'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("TFT Text Color:")
				.appendField(new Blockly.FieldColour('#000000'), 'tColor')
				.appendField("set Background Color:")
				.appendField(new Blockly.FieldColour('#ffffff'), 'bColor');
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(160);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['basic_TFT_setFonts'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("TFT Fonts:")
				.appendField(new Blockly.FieldDropdown([
					["Kanit09pt", "09"],
					["Kanit12pt", "12"],
					["Kanit18pt", "18"],
					["Kanit24pt", "24"]]),
					"sText");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(160);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['basic_TFT_print'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("TFT print x:")
			this.appendValueInput('X')
				.setCheck("Number")
			this.appendDummyInput()
				.appendField("y:")
			this.appendValueInput('Y')
				.setCheck("Number")
			this.appendValueInput('TEXT')
				.appendField("message:")
				.setCheck(["Number", "String"])
			this.appendDummyInput()
				.appendField("TFT Fonts:")
				.appendField(new Blockly.FieldDropdown([
					["Kanit09pt", "09"],
					["Kanit12pt", "12"],
					["Kanit18pt", "18"],
					["Kanit24pt", "24"]]),
					"sText")
				.appendField("Text Color:")
				.appendField(new Blockly.FieldColour('#ffffff'), 'tColor')
				.appendField("Background Color:")
				.appendField(new Blockly.FieldColour('#000000'), 'bColor');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(160);
			this.setTooltip("display thai fonts");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['basic_TFT_print_TH'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("TFT print fonts Thai x:")
			this.appendValueInput('X')
				.setCheck("Number")
			this.appendDummyInput()
				.appendField("y:")
			this.appendValueInput('Y')
				.setCheck("Number")
			this.appendValueInput('TEXT')
				.appendField("message:")
				.setCheck("String")
			this.appendDummyInput()
				.appendField("fonts:")
				.appendField(new Blockly.FieldDropdown([
					["Kanit09pt", "09"],
					["Kanit12pt", "12"],
					["Kanit18pt", "18"],
					["Kanit24pt", "24"]]),
					"sText")
				.appendField("Text Color:")
				.appendField(new Blockly.FieldColour('#ffffff'), 'tColor')
				.appendField("Background Color:")
				.appendField(new Blockly.FieldColour('#000000'), 'bColor');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(160);
			this.setTooltip("display thai fonts");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['basic_TFT_clearPixel'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("TFT clear position x:")
			this.appendValueInput('X')
				.setCheck("Number")
			this.appendDummyInput()
				.appendField("y:")
			this.appendValueInput('Y')
				.setCheck("Number")
			this.appendDummyInput()
				.appendField("width:")
			this.appendValueInput('W')
				.setCheck("Number")
			this.appendDummyInput()
				.appendField("hight:")
			this.appendValueInput('H')
				.setCheck("Number")
			this.appendDummyInput()
				.appendField("color:")
				.appendField(new Blockly.FieldColour('#000000'), 'tColor')
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(160);
			this.setTooltip("clear display");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks["basic_string_TH"] = {
		init: function () {
			this.appendDummyInput()
				.appendField(new Blockly.FieldImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC', 12, 12, '*'))
				.appendField(new Blockly.FieldTextInput('สวัสดี KB-IDE'), 'TEXT')
				.appendField(new Blockly.FieldImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==', 12, 12, '*'));
			this.setOutput(true, "String");
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setColour(basic_colour);
			this.setTooltip(Blockly.Msg.BASIC_STRING_TOOLTIP);
			this.setHelpUrl(Blockly.Msg.BASIC_STRING_HELPURL);
		}
	};

	// ########################### TFT Display ###################################
	Blockly.Blocks["tft_display_setRotation"] = {
		init: function () {
			this.appendDummyInput()
				.appendField("TFT setRotation")
				.appendField(new Blockly.FieldDropdown([
					["RIGHT", "0"],
					["TOP", "1"],
					["LEFT", "2"],
					["DOWN", "3"]
				]),
					"rotation");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(basic_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks["tft_display_draw_line"] = {
		init: function () {
			this.appendValueInput("x0")
				.setCheck("Number")
				.appendField("TFT draw line from x1:");
			this.appendValueInput("y0")
				.setCheck("Number")
				.appendField("y1:");
			this.appendValueInput("x1")
				.setCheck("Number")
				.appendField(" to x2:");
			this.appendValueInput("y1")
				.setCheck("Number")
				.appendField("y2:");
			this.appendDummyInput()
				.appendField("color")
				.appendField(new Blockly.FieldColour("#ff0000"), "COLOR");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(basic_colour);
			this.setTooltip("draw line from (x0,y0) to (x1,y1)");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks["tft_display_draw_rect"] = {
		init: function () {
			this.appendValueInput("x")
				.setCheck("Number")
				.appendField("TFT draw rectangle x:");
			this.appendValueInput("y")
				.setCheck("Number")
				.appendField("y:");
			this.appendValueInput("width")
				.setCheck("Number")
				.appendField("width:");
			this.appendValueInput("height")
				.setCheck("Number")
				.appendField("height:");
			this.appendDummyInput()
				.appendField("color:")
				.appendField(new Blockly.FieldColour("#00ff00"), "COLOR");
			this.appendDummyInput()
				.appendField(" fill ")
				.appendField(new Blockly.FieldCheckbox("FALSE"), "fill");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(basic_colour);
			this.setTooltip("draw rectangle to display");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks["tft_display_draw_circle"] = {
		init: function () {
			this.appendValueInput("x")
				.setCheck("Number")
				.appendField("TFT draw circle x:");
			this.appendValueInput("y")
				.setCheck("Number")
				.appendField("y:");
			this.appendValueInput("r")
				.setCheck("Number")
				.appendField("radius:");
			this.appendDummyInput()
				.appendField("color:")
				.appendField(new Blockly.FieldColour("#0000ff"), "COLOR");
			this.appendDummyInput()
				.appendField(" fill")
				.appendField(new Blockly.FieldCheckbox("FALSE"), "fill");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(basic_colour);
			this.setTooltip("draw circle on screen");
			this.setHelpUrl("");
		}
	};

	// ########################### TFT Touch screen ###################################
	Blockly.Blocks["touch_begin"] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Touch begin");
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(basic_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks["touch_condition"] = {
		init: function () {
			this.appendDummyInput()
				.appendField("isTouch threshold")
			this.appendValueInput("touch")
				.setCheck("Number")
			this.appendStatementInput("TOUCH_STATEMENT")
				.setCheck(null);
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(basic_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['touch_get_position_x'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("get toucher X");
			this.setOutput(true, null);
			this.setColour(basic_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['touch_get_position_y'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("get toucher Y");
			this.setOutput(true, null);
			this.setColour(basic_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	Blockly.Blocks['touch_get_position_z'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("get toucher Z");
			this.setOutput(true, null);
			this.setColour(basic_colour);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};
}
