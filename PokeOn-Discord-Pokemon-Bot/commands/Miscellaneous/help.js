const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");
const os = require('os')

module.exports = {
	name: "help",
    description: "Get help.",
    category: "Miscellaneous",
    args: false,
    usage: ["help <page>"],
    cooldown: 3,
    permissions: [],
    aliases: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {

    if (!args[0]) {
      let embed = new Discord.MessageEmbed()
      .setColor('YELLOW')
      .setTitle('PokéOn Commands')
      .setDescription(`To see a page just type the page number after \`${guild.prefix}help\`!\n\n**Support:** https://discord.gg/rh8Y5jBZ6R`)
      .addField('Page 1 | Getting Started!',"What you'll need to know to start using PokéOn.")
      .addField('Page 2 | PokéOn Commands!','The core commands of the bot.')
      .addField('Page 3 | Shop, Market, Auction & Trading!','Commands to do with the shop and buying items/pokemon.')
      .addField('Page 4 | Settings','Help configuring PokéOn in your server.')

      return message.channel.send(embed)
    } else if (args[0] === "1") {
      let embed1 = new Discord.MessageEmbed()
      .setColor('YELLOW')
      .setTitle('PokéOn Help | Getting Started')
      .setDescription("If you haven't started yet. This page will help you with getting started!\n\n**Support:** https://discord.gg/rh8Y5jBZ6R")
      .addField(`${guild.prefix}start`,"Find out how to get your first Pokémon!")
      .addField(`${guild.prefix}pick <pokemon name>`,'Pick your starter Pokémon!')
      .addField(`${guild.prefix}help [command]`,'Displays the help message.')
      .setFooter(`<argument>: This means argument is required.\n[argument]: This means argument is optional.`)
      return message.channel.send(embed1)
      
    } else if (args[0] === "2") {
      let embed2 = new Discord.MessageEmbed()
      .setColor('YELLOW')
      .setTitle('PokéOn Help | PokéOn Commands')
      .setDescription(`If you need more information about a specific command, type \`${guild.prefix}help <command>\`\n\n**Support:** https://discord.gg/rh8Y5jBZ6R`)
       .addField(`${guild.prefix}info [Pokémon no.]`,"View info of your Pokémon!")
       .addField(`${guild.prefix}select <Pokémon no.>`,"selects a different Pokémon!")
       .addField(`${guild.prefix}catch <Pokémon name>`,"Catch spawned Pokémon.")
       .addField(`${guild.prefix}pokemon`,"Displays your Pokémon collection.")
        .addField(`${guild.prefix}pokédex <pokemon name>`,"Gives base stats of Pokémon.")
         .addField(`${guild.prefix}gamble <member> <amount>`,"Gamble your PokéOn Coins!")
          .setFooter(`<argument>: This means argument is required.\n[argument]: This means argument is optional.`)
         return message.channel.send(embed2)

    } else if (args[0] === "3") { return message.channel.send('Coming Soon!')

    } else if (args[0] === "4") {
      let embed4 = new Discord.MessageEmbed()
      .setColor('YELLOW')
       .setTitle('PokéOn Help | Settings')
       .setDescription(`If you need more information about a specific command, type \`${guild.prefix}help <command>\`\n\n**Support:** https://discord.gg/rh8Y5jBZ6R`)
       .addField(`${guild.prefix}redirect <channel>`,'Redirect spawns to selected channels.')
       .addField(`${guild.prefix}setprefix <new prefix>`,'Change prefix of bot commands for this server.')
        .setFooter(`<argument>: This means argument is required.\n[argument]: This means argument is optional.`)
      return message.channel.send(embed4)

    } else {
      return message.channel.send("That's not a valid page number!")
    }
  }
}