const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");
const button = require('discord-buttons')


module.exports = {
	name: "invite",
    description: "Get bot invite link.",
    category: "Miscellaneous",
    args: false,
    usage: ["invite"],
    cooldown: 3,
    permissions: [],
    aliases: ["inv"],
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let embed = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setTitle('Invite!')
    .setDescription('Click the button below to [Invite PokéOn](https://discord.com/api/oauth2/authorize?client_id=836076205719289876&permissions=388160&scope=bot)!')


  
let invite = new button.MessageButton()
.setLabel('Invite PokéOn')
.setStyle('url')
.setURL(`https://discord.com/api/oauth2/authorize?client_id=836076205719289876&permissions=388160&scope=bot`)
message.channel.send({embed: embed, button: invite})
  }
}