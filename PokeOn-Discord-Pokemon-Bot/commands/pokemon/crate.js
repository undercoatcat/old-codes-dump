const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')

module.exports = {
  name: "crate",
  description: "gives pokemon Info",
  category: "Pokemon",
  args: false,
  usage: ["crate"],
  cooldown: 3,
  permissions: [],
  aliases: ["pokedex"],
  execute: async (client, message, args, prefix, guild, color, channel) => {

    

    	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")

  let embed = new Discord.MessageEmbed()
  .setTitle(`Your Crates`)
  .setDescription(`**Legendary Crate:** ${user.lcrate}\n**Mythical Crate:** ${user.mcrate}`)
  .setColor('YELLOW')

  message.channel.send(embed)
  }
}