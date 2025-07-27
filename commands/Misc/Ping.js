const Discord = require("discord.js");
const { Client, MessageEmbed, version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require("os");
let cpuStat = require("cpu-stat");
const ms = require("ms");
const v = require("./../../package.json");

module.exports = {
  name: "ping",
  category: "Information",
  description: "Know about the bot and bot developers",
  aliases: ["pg", "png"],
  execute: async (client, message, args, prefix, guild, color, channel) => {
      let days = Math.floor(client.uptime / 86400000),
		hours = Math.floor(client.uptime / 3600000) % 24,
		minutes = Math.floor(client.uptime / 60000) % 60,
		seconds = Math.floor(client.uptime / 1000) % 60;
		let time = Date.now()
 let ping = time - message.createdTimestamp
 let start = Date.now();
let end = Date.now();
let ping2 = end - start;

let apiping = message.client.ws.ping

let emoji = "<:PokeOnOnline:857471878620643348>"
let emoji2 = "<:pokeOnoff:857472048817635349> "

if (apiping < 200) emoji2 = "<:PokeOnOnline:857471878620643348>"
if (apiping > 200) emoji2 = "<:PokeOnstable:857471990193848342> "
if (apiping > 500) emoji2 = "<:pokeOnoff:857472048817635349> "

if (ping < 200) emoji = "<:PokeOnOnline:857471878620643348>"
if (ping > 200) emoji = "<:PokeOnstable:857471990193848342> "
if (ping > 500) emoji = "<:pokeOnoff:857472048817635349> "

let embed = new Discord.MessageEmbed()
.setColor('YELLOW')
.setTitle('Ping')
.setDescription(`${emoji}**Bot Ping:** ${ping}\n${emoji2}**API Ping:** ${apiping}\n\n<:PokeOnOnline:857471878620643348> = Good Ping\n<:PokeOnstable:857471990193848342> = Medium Ping\n<:pokeOnoff:857472048817635349> = High Ping`)


    return message.channel.send(embed);
  }}