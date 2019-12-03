module.exports = {
    name: "KBxIO",
    index: 40,
    color: "230",
    icon: "/static/icons/icons8_module_96px.png",
    blocks: [
        {
            xml: `<sep gap="32"></sep><label text="KBX-IO Extension" web-class="headline"></label>`
        },
        "kbx_usb_loop",
        {
            xml: `<sep gap="32"></sep><label text="Keyboard" web-class="headline"></label>`
        },
        "kbx_keyboard_1_char",
        "kbx_keyboard_2_char",
        {
            xml: `<sep gap="32"></sep><label text="Joystick" web-class="headline"></label>`
        },
        "kbx_joystick_left_x",
        "kbx_joystick_left_y",
        "kbx_joystick_right_x",
        "kbx_joystick_right_y",
        "kbx_joystick_x",
        "kbx_joystick_y",
        "kbx_joystick_a",
        "kbx_joystick_b",
        "kbx_joystick_select",
        "kbx_joystick_start",
        "kbx_joystick_paddle",
        {
            xml: `<sep gap="32"></sep><label text="I/O" web-class="headline"></label>`
        },
        "kbx_gpio_begin",
        "kbx_output_write",
        "kbx_pwm_digitalRead",
        "kbx_pwm_analogRead",
        "kbx_pwm_setup",
        {
            xml:
                `<block type="kbx_pwm_write">
                    <value name="VALUE">
                        <shadow type="math_number">
                            <field name="NUM">200</field>
                        </shadow>
                    </value>
                </block>`
        }
    ]
};
