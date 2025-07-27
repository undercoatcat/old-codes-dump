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
  name: "pokemon",
  description: "Shows your pokemons",
  category: "pokemon",
  args: false,
  usage: ["pokemon [page number]"],
  cooldown: 3,
  permissions: [],
  aliases: ["pk"],

  execute: async (client, message, args, prefix, guild, color, channel) => {

let user = await User.findOne({id: message.author.id})
if(!user) return message.channel.send("You haven't started yet!")

let length = 20;
if (user.pokemons.length < 20) length = 19
if (user.pokemons.length < 19) length = 18
if (user.pokemons.length < 18) length = 17
if (user.pokemons.length < 17) length = 16
if (user.pokemons.length < 16) length = 15
if (user.pokemons.length < 15) length = 14
if (user.pokemons.length < 14) length = 13
if (user.pokemons.length < 13) length = 12
if (user.pokemons.length < 12) length = 11
if (user.pokemons.length < 11) length = 10
if (user.pokemons.length < 10) length = 9
if (user.pokemons.length < 9) length = 8
if (user.pokemons.length < 8) length = 7
if (user.pokemons.length < 7) length = 6
if (user.pokemons.length < 6) length = 5
if (user.pokemons.length < 5) length = 4
if (user.pokemons.length < 4) length = 3
if (user.pokemons.length < 3) length = 2
if (user.pokemons.length < 2) length = 1
if (user.pokemons.length < 1) return message.channel.send(`You dont have any pokemons ;-;`)
let data = "";
if(!args[0]) {
for(let i=0;i<length;i++){
  let name = user.pokemons[i].name
  if (user.pokemons[i].shiny === true) name = `✨ ${user.pokemons[i].name}`
  let iv = (user.pokemons[i].hp + user.pokemons[i].atk + user.pokemons[i].def + user.pokemons[i].spatk + user.pokemons[i].spdef + user.pokemons[i].speed)/186 * 100
  data += `\`${i+1}.\`  **・** ${capitalize(name)}  **・**  Level: ${user.pokemons[i].level}  **・**  IV: ${iv.toString().substr(0,5)}%\n`
}

  let embed = new MessageEmbed()
  .setTitle(`${message.author.username}'s Pokemons`)
  .setColor('YELLOW')
  .setDescription(data)

message.channel.send(embed)
} else if (args[0] === `--shiny`) {
  for(let i=0;i<length;i++){
  let shinies = await user.pokemons.filter(a => a.shiny)
  let name = `✨ ${user.pokemons[i].name}`
  let iv = (user.pokemons[i].hp + user.pokemons[i].atk + user.pokemons[i].def + user.pokemons[i].spatk + user.pokemons[i].spdef + user.pokemons[i].speed)/186 * 100
  data += `\`${i+1}.\`  **・** ${name}  **・**  Level: ${user.pokemons[i].level}  **・**  IV: ${iv.toString().substr(0,5)}%\n`
}

  let embed = new MessageEmbed()
  .setTitle(`${message.author.username}'s Pokemons`)
  .setColor('YELLOW')
  .setDescription(data)

message.channel.send(embed)
}

  }
}