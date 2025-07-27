const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");
const os = require('os')

module.exports = {
	name: "stats",
    description: "Get bot stats.",
    category: "Miscellaneous",
    args: false,
    usage: ["stats"],
    cooldown: 3,
    permissions: [],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let users = await User.find();


 let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;


let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

let RITESH = message.client.users.cache.get('800765934926954507')
let UNKNOWNX = message.client.users.cache.get('564853227393122307')


    let embed = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setAuthor(`Statistics of PokéOn`, message.client.user.displayAvatarURL())
    .setThumbnail(message.client.user.displayAvatarURL())
    .addField(`:crown:Owners`, `\`${RITESH.tag}\`\n\`${UNKNOWNX.tag}\``, true)
    
    .addField(`:writing_hand:Default prefix`, `\`p!\``, true)
    .addField(':frame_photo:Logo Credits','`ARYAN#2452`', true)
    .addField(`:robot:Bot Count`,`\`Total Servers: ${message.client.guilds.cache.size}\`\n\`Total Channels: ${message.client.channels.cache.size}\`\n\`Total Users: ${message.client.users.cache.size}\`\n\`Players: ${users.length}\``, true)
    
    .addField(':timer:Uptime',`\`${uptime}\``, true)
    .addField(`:books:Library`, `\`Discord.js v${Discord.version}\``, true)
    
    message.channel.send(embed)
  }
}