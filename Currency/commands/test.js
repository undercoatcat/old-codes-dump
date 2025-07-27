const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "test",
  description: "L",

  async execute(message) {
    message.channel.send(`<a:emoji_23:991382007970021446>`)
  }
}