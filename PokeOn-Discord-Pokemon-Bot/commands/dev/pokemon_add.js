const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const { capitalize, getlength } = require("../../functions.js");
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const { classToPlain } = require("class-transformer");
const ms = require("ms");
const Pokemon = require("../../Classes/Pokemon.js");
module.exports = {
  name: "pokemon_add",
  description: "Dev",
  category: "dev",
  args: false,
  usage: ["pokemon_add <user> <pokemon>"],
  cooldown: 3,
  permissions: [],
  aliases: [],
  execute: async (client, message, args, prefix, guild, color, channel) => {
  let user = message.mentions.members.first() || client.users.cache.get(args[0]);
  if (!user) return message.reply("Mention/Provide an User!")
  let user1 = await User.findOne({ id: user.id });
  if (!user1) return message.channel.send("That User did not Start yet!")
  const Name = args[1].toLowerCase()
  console.log(Name)
  let name = Name
  let url

  const options = {
        url: `https://pokeapi.co/api/v2/pokemon/${Name}`,
        json: true
      };
  await get(options).then(async x => {
    let check = x.id.toString().length
    // console.log(check)
    let url;
    if (check === 1) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${x.id}.png`
    } else if (check === 2) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${x.id}.png`
    } else if (check === 3) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${x.id}.png`
    }
    let level = Math.floor(Math.random() * 100)
    // console.log(level)
    let pokemon = new Pokemon({ name: Name, shiny: false, url: url }, level);
    // console.log(poke.name)
    let xp = Math.floor(1.2 * level ^ 3 ) - (15 * level ^ 2) + (100 * level) - 140 + 52

    pokemon = await classToPlain(pokemon);



    let a = await message.channel.send("Confirm?")
    await a.react("✅")
    await a.react("❌")
    const collector = a.createReactionCollector((reaction, sexyuser) => ['✅', '❌'].includes(reaction.emoji.name) && sexyuser.id === message.author.id, { time: 60000 });
    
    //collector
    collector.on('collect', async (reaction, sexyuser) => {
          if (reaction.emoji.name === "✅") {
            collector.stop();
            await user1.pokemons.push(pokemon);
            a.reactions.removeAll();
            await user1.markModified("pokemons")
            await user1.save();
            return message.channel.send(`Success!`)
          } else if (reaction.emoji.name === "❌") {
            collector.stop("aborted");
            a.reactions.removeAll();
            return message.channel.send("hudd hurr.")
          }
        });
        collector.on('end', collected => {
          return
        });

  }).catch(err => {
        if (err.message.includes(`404 - "Not Found"`)) return message.channel.send(`That pokémon doesn't seem to exist in the Pokedex or maybe you spelled it wrong?`);
      });

  }
}