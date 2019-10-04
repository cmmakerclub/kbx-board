module.exports = {
    name: "Display",
    index: 20,
    color: "230",
    icon: "/static/icons/icons8_picture_96px_1.png",
    blocks: [
        {
            xml: `<sep gap="32"></sep><label text="KidBright 16x8 Display" web-class="headline"></label>`
        },
        "display_led16x8",
        "display_led16x8_clr",
        {
            xml: `<block type="display_led16x8_print">
              <value name="VALUE">
                  <block type = "basic_string"></block>>
              </value>
            </block>` },
        {
            xml: `<block type="display_led16x8_scroll">
              <value name="VALUE">
                <block type = "basic_string"></block>>
              </value>
              <value name="SPEED">
                <block type = "math_number">
                    <field name="NUM">50</field>
                </block>
              </value>
            </block>`
        },
        'basic_string',
        {
            xml: `<sep gap="32"></sep><label text="KBX-UI TFT 320x240 Display" web-class="headline"></label>`
        },
        {
            xml: `<block type="variables_set">
                                   <field name="VAR">img1</field>
                                   <value name="VALUE">
                                       <block type="i2c128x64_create_image" inline="false"></block>
                                   </value>
                               </block>`
        },
        "basic_TFT_setRotation",
        "basic_TFT_fillScreen",
        // "basic_TFT_setFonts",
        // "basic_TFT_setTextColor",
        {
            xml:
                `<block type="basic_TFT_print">
                    <value name="X">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                    <value name="Y">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                    <value name="TEXT">
                    <block type="basic_string"></block>
                    </value>
                </block>`
        },
        {
            xml:
                `<block type="basic_TFT_print_TH">
                    <value name="X">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                    <value name="Y">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                    <value name="TEXT">
                    <block type="basic_string_TH"></block>
                    </value>
                </block>`
        },
        'basic_string_TH',
        "basic_TFT_clearPixel"
    ]
};