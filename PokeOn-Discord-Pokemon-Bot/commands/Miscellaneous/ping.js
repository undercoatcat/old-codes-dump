const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
	name: "ping",
    description: "gives bot's average latency",
    category: "Miscellaneous",
    args: false,
    usage: ["ping"],
    cooldown: 3,
    permissions: [],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let days = Math.floor(client.uptime / 86400000),
		hours = Math.floor(client.uptime / 3600000) % 24,
		minutes = Math.floor(client.uptime / 60000) % 60,
		seconds = Math.floor(client.uptime / 1000) % 60;
		let time = Date.now()
 let ping = time - message.createdTimestamp
 let start = Date.now();
let user = await User.findOne({id: message.author.id})
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

	}
}