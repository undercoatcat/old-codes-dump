const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')
const { capitalize } = require("../../functions.js");

module.exports = {
  name: "weak",
  description: "gives move Info",
  category: "Pokemon",
  args: false,
  usage: ["weak <pokemon name>"],
  cooldown: 3,
  permissions: [],
  aliases: [],
  execute: async (client, message, args, prefix, guild, color, channel) => {

    

    	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")

  if(!args[0]) return message.channel.send(`pls give a pokemon name`)


    let Name = args.join('-').toLowerCase()

   

    const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${Name}`,
      json: true
    }

   

    try {
      await get(options).then(t => {

        let embed = new Discord.MessageEmbed()
        .setTitle(`${Name} Moves`)
        .addField("Moves", `${t.weakness}`)

        message.channel.send(embed)
      })
    }catch (error) {
      console.log(error);
      if (error.message.includes(`404 - "Not Found"`)) return message.channel.send(`This Pokémon doesn't seem to appear in the Pokedex or maybe you spelled it wrong!`)
    }
  }
}