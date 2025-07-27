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
const { capitalize } = require("../../functions.js");


module.exports = {
  name: "info",
  description: "Shows your pokemon info",
  category: "pokemon",
  args: false,
  usage: ["info [pokemon number]"],
  cooldown: 3,
  permissions: [],
  aliases: ["i"],

  execute: async (client, message, args, prefix, guild, color, channel) => {

let user = await User.findOne({id: message.author.id})
if(!user) return message.channel.send("You haven't started yet!")
if(!args[0]) args[0] = user.selected + 1
let af = args[0] - 1
if (args[0] === "latest" || args[0] === "l") af = user.pokemons.length - 1
if(isNaN(af)) return message.channel.send(`Thats not a valid pokemon number!`)
if((af + 1) > user.pokemons.length) return message.channel.send(`You dont have that much pokemons!`)
let name = user.pokemons[af].name
if(user.pokemons[af].shiny === true) name = `✨ ${user.pokemons[af].name}`

let iv = (user.pokemons[af].hp + user.pokemons[af].atk + user.pokemons[af].def + user.pokemons[af].spatk + user.pokemons[af].spdef + user.pokemons[af].speed)/186 * 100

let xp = Math.floor(1.2* user.pokemons[af].level ^ 3 ) - (15 * user.pokemons[af].level ^ 2) + (100 * user.pokemons[af].level) - 140 + 52



let embed = new MessageEmbed()
.setTitle(`Level ${user.pokemons[af].level} ${capitalize(name)}`)
.setColor('YELLOW')
.setImage(user.pokemons[af].url)
.setThumbnail(message.author.displayAvatarURL({size: 1024, dynamic: true}))

.addField(`Xp`, `${user.pokemons[af].xp}/${xp}`)

.addField(`Nature`, `${user.pokemons[af].nature}`)

.addField(`Stats`, `**Hp:** ${user.pokemons[af].hp}/31\n**Atk:** ${user.pokemons[af].atk}/31\n**Def:** ${user.pokemons[af].def}/31\n**Sp. Atk:** ${user.pokemons[af].spatk}/31\n**Sp. Def:** ${user.pokemons[af].spdef}/31\n**Speed:** ${user.pokemons[af].speed}/31`)

.addField(`Total IV%`, `**${iv.toString().substr(0,5)}%**`)

.setFooter(`Displaying pokemon: ${af + 1}/${user.pokemons.length}`)

 message.channel.send(embed)
  }
}








