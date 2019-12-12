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
        {
            xml: `<block type="variables_set">
                  <field name="VAR">cam1</field>
                    <value name="VALUE">
                        <block type="i2c128x64_take_a_photo" inline="false"></block>
                    </value>
                  </block>`
        },
        {
            xml:
                `<block type="i2c128x64_display_image">
                             <value name="img">
                                 <block type="variables_get">
                                     <field name="VAR">img1</field>
                                 </block>
                             </value>
                             <value name="x">
                                 <shadow type="math_number">
                                     <field name="NUM">0</field>
                                 </shadow>
                             </value>
                             <value name="x">
                                 <shadow type="math_number">
                                     <field name="NUM">0</field>
                                 </shadow>
                             </value>
                             <value name="y">
                                 <shadow type="math_number">
                                     <field name="NUM">0</field>
                                 </shadow>
                             </value>
                             <value name="width">
                                 <shadow type="math_number">
                                     <field name="NUM">240</field>
                                 </shadow>
                             </value>
                             <value name="height">
                                 <shadow type="math_number">
                                     <field name="NUM">180</field>
                                 </shadow>
                             </value>
                         </block>`
        },
        {
            xml:
                `<block type="i2c128x64_display_image">
                             <value name="img">
                                 <block type="variables_get">
                                     <field name="VAR">cam1</field>
                                 </block>
                             </value>
                             <value name="x">
                                 <shadow type="math_number">
                                     <field name="NUM">0</field>
                                 </shadow>
                             </value>
                             <value name="x">
                                 <shadow type="math_number">
                                     <field name="NUM">0</field>
                                 </shadow>
                             </value>
                             <value name="y">
                                 <shadow type="math_number">
                                     <field name="NUM">0</field>
                                 </shadow>
                             </value>
                             <value name="width">
                                 <shadow type="math_number">
                                     <field name="NUM">256</field>
                                 </shadow>
                             </value>
                             <value name="height">
                                 <shadow type="math_number">
                                     <field name="NUM">192</field>
                                 </shadow>
                             </value>
                         </block>`
        },
        "basic_TFT_setRotation",
        "basic_TFT_fillScreen",
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
        {
            xml:
                `<block type = "basic_TFT_clearPixel">
                    <value name = "X">
                        <shadow type = "math_number">
                            <field name = "NUM">0</field>
                        </shadow>
                    </value>
                    <value name = "Y">
                        <shadow type = "math_number">
                            <field name = "NUM">0</field>
                        </shadow>
                    </value>
                    <value name = "W">
                        <shadow type = "math_number">
                            <field name = "NUM">50</field>
                        </shadow>
                    </value>
                    <value name = "H">
                        <shadow type = "math_number">
                            <field name = "NUM">50</field>
                        </shadow>
                    </value>

                </block>`
        },
        {
            xml:
                `<block type="tft_display_draw_line">
                            <value name="x0">
                                <shadow type="math_number">
                                    <field name="NUM">10</field>
                                </shadow>
                            </value>
                            <value name="y0">
                                <shadow type="math_number">
                                    <field name="NUM">10</field>
                                </shadow>
                            </value>
                            <value name="x1">
                                <shadow type="math_number">
                                    <field name="NUM">100</field>
                                </shadow>
                            </value>
                            <value name="y1">
                                <shadow type="math_number">
                                    <field name="NUM">50</field>
                                </shadow>
                            </value>
                        </block>`
        },
        {
            xml:
                `<block type="tft_display_draw_rect">
                            <value name="x">
                                <shadow type="math_number">
                                    <field name="NUM">10</field>
                                </shadow>
                            </value>
                            <value name="y">
                                <shadow type="math_number">
                                    <field name="NUM">10</field>
                                </shadow>
                            </value>
                            <value name="width">
                                <shadow type="math_number">
                                    <field name="NUM">50</field>
                                </shadow>
                            </value>
                            <value name="height">
                                <shadow type="math_number">
                                    <field name="NUM">30</field>
                                </shadow>
                            </value>
                        </block>`
        },
        {
            xml:
                `<block type="tft_display_draw_circle">
                            <value name="x">
                                <shadow type="math_number">
                                    <field name="NUM">64</field>
                                </shadow>
                            </value>
                            <value name="y">
                                <shadow type="math_number">
                                    <field name="NUM">32</field>
                                </shadow>
                            </value>
                            <value name="r">
                                <shadow type="math_number">
                                    <field name="NUM">20</field>
                                </shadow>
                            </value>
                        </block>`
        },
        {
            xml: `<sep gap="32"></sep><label text="KBX-UI Touch Screen" web-class="headline"></label>`
        },
        'touch_begin',
        {
            xml:
                `<block type="touch_condition">
                <value name="touch">
                <shadow type="math_number">
                    <field name="NUM">1000</field>
                </shadow>
                </value>
            </block>`
        },
        'touch_get_position_x',
        'touch_get_position_y',
        'touch_get_position_z'
    ]
};