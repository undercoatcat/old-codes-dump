const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");
const os = require('os')

module.exports = {
	name: "redirect",
    description: "redirect spawns to selected channel.",
    category: "Miscellaneous",
    args: false,
    usage: ["redirect <channel>"],
    cooldown: 3,
    permissions: ['MANAGE_CHANNEL'],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {

    let schannel = message.mentions.channels.first()
    

    let user = User.findOne({id: message.author.id})
    if(!user) { return message.channel.send(`You haven't started yet! Type \`${guild.prefix}start\` to start!`)
    } else if (!schannel) { return message.channel.send('Mention a channel to redirect spawns!')
    } else {
  

    guild.spawnchannel = schannel.id
    await guild.save();

    message.channel.send(`The spawn channel of the server has been set to ${schannel}. Spawns will now redirect to ${schannel}!`)
    }
  }
}