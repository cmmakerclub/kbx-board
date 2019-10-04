module.exports = {
    name: "Sensor",
    index: 25,
    color: "230",
    icon: "/static/icons/icons8_thermometer_96px.png",
    blocks: [
        {
            xml: `<sep gap="32"></sep><label text="on Board sensor" web-class="headline"></label>`
        },
        "sensor_ldr",
        "sensor_lm73",
        "sensor_switch1",
        "sensor_switch2",
        {
            xml: `<sep gap="32"></sep><label text="KBX-UI Extension" web-class="headline"></label>`
        },
        "tft_switch1",
        "tft_switch2",
        "tft_switch3"
    ]
};
