const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");
const button = require('discord-buttons')


module.exports = {
	name: "support",
    description: "Get support server link.",
    category: "Miscellaneous",
    args: false,
    usage: ["support"],
    cooldown: 3,
    permissions: [],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let embed = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setTitle('Support')
    .setDescription('Click the button below to join the [Support Server](https://discord.gg/NnWUJkbAed)!')


  
let support = new button.MessageButton()
.setLabel('PokéOn Support')
.setStyle('url')
.setURL(`https://discord.gg/NnWUJkbAed`)
message.channel.send({embed: embed, button: support})
  }
}