
let gpio = require("./menu/config.group.gpio");
let display = require("./menu/config.group.display");
let sensor = require("./menu/config.group.sensor");
let music = require("./menu/config.group.music");
let time = require("./menu/config.group.time");
let kbx = require("./menu/config.group.kbxio");

module.exports = {
  blocks: [
    gpio,
    display,
    sensor,
    music,
    time,
    kbx
  ],
};
