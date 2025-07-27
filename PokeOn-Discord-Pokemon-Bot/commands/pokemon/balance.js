const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");
const { capitalize } = require('../../functions.js')

module.exports = {
	name: "balance",
	description: "Display your credit balance.",
	category: "pokemon",
	args: false,
	usage: ["balance"],
	cooldown: 3,
	permissions: [],
	aliases: ["bal"],
	execute: async (client, message, args, prefix, guild, color, channel) => {
	
	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")

  if (!args[0]) {
	let embed = new MessageEmbed()
	.setAuthor(message.member.displayName + "'s Balance")
	.setDescription(`You currently have ${user.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} PokeOn Coins.`)
	.setColor('YELLOW')
  return message.channel.send(embed)
  } else if (args[0].toLowerCase() === "shards") {
    let embed1 = new Discord.MessageEmbed()
    .setAuthor(message.member.displayName + "'s Shards")
	.setDescription(`You currently have ${user.shards} Shards.`)
	.setColor('YELLOW')
  return message.channel.send(embed1)
  } else {
    return message.channel.send('Thats not a valid balance option!')
  }
  }
}