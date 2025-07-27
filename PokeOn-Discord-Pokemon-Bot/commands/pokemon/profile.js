const discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const hastebin = require("hastebin-gen");
const { uptime } = require('process');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const Spawn = require('../../models/spawn.js')
const ms = require("ms");
const moment = require('moment')


module.exports = {
  name: "profile",
  description: "Shows your trainer info",
  category: "pokemon",
  args: false,
  usage: ["profile"],
  cooldown: 3,
  permissions: [],
  aliases: ["pf"],

  execute: async (client, message, args, prefix, guild, color, channel) => {

let user = await User.findOne({id: message.author.id})
if(!user) return message.channel.send(`You haven't started yet! Type \`${guild.prefix}start\` to start!`)

let name = user.pokemons[user.selected].name
if(user.pokemons[user.selected].shiny === true) name = `✨ ${user.pokemons[user.selected].name}`

let started = moment(parseInt(user.creation)).format(' DD MMM YYYY')

let embed = new MessageEmbed()
.setTitle(`Profile of ${message.author.username}`)
.setColor('YELLOW')
.setThumbnail(message.author.displayAvatarURL())
.setDescription(`**Balance:** ${user.balance}\n**Redeems:** ${user.redeems}\n**Shards:** ${user.shards}\n**Total Pokemons:** ${user.pokemons.length}\n**Shinies Caught:** ${user.shinyCaught}\n**Caught:** ${user.caught.length}\n**Released:** ${user.released}\n**Selected:** Level ${user.pokemons[user.selected].level} ${name}\n**Badges** ${user.badges}`)
.setFooter(`Started on • ${started}`)
return message.channel.send(embed)

  }
}