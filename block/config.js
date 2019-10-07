
let gpio = require("./menu/config.group.gpio");
let display = require("./menu/config.group.display");
let sensor = require("./menu/config.group.sensor");
let buzzer = require("./menu/config.group.buzzer");
let time = require("./menu/config.group.time");
let kbx = require("./menu/config.group.kbxio");
// let common = require("./menu/config.group.common");

module.exports = {
  blocks: [
    gpio,
    display,
    sensor,
    buzzer,
    time,
    kbx
  ],
};
