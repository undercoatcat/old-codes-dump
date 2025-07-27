const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const { classToPlain } = require("class-transformer");
const Pokemon = require("../../Classes/Pokemon.js");
const Guild = require('../../models/guild.js');
const ms = require("ms");
const { capitalize } = require('../../functions.js')
let Spawn = require("../../models/spawn.js");
const shadow = require('../../db/shadow.js')

module.exports = {
	name: "redeem",
	description: "Display your credit balance.",
	category: "pokemon",
	args: false,
	usage: ["redeem"],
	cooldown: 3,
	permissions: [],
	aliases: ["r"],
	execute: async (client, message, args, prefix, guild, color, channel) => {
	
	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")
  
  const embed = new MessageEmbed()
	.setTitle(`Your Redeem(s): ${user.redeems.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
	.setDescription(`\`${guild.prefix}redeem <Pokemon>:\` To claim Pokémon directly.\n\`${guild.prefix}redeem spawn <Pokémon>:\` To spawn a Pokémon.\n\`${guild.prefix}redeem coins:\` To claim 15,000 PokeOn Coins.`)
  .setColor('YELLOW')

  if (!args[0]) return message.channel.send(embed)

  if (args[0].toLowerCase() === "coins"){
    if(user.redeems === 0) return message.reply("You dont have enough Redeems!")
    user.redeems = user.redeems - 1
    user.balance = user.balance + 15000
    await user.save()
    return message.reply("You redeemed 15,000 Coins!")
  } else if (args[0].toLowerCase() === "spawn") {

    if (user.redeems === 0) return message.channel.send(`You don't have enough redeems to do that!`)

    let Name = args[1]
    // console.log(Name) 
    name = Name
      let url;
      
      if (name.startsWith("shadow")) {
        name = name.replace("shadow-", "");
        var shadows = shadow.find(r => r.name.toLowerCase() === name.toLowerCase());
      };


      if (shadows) {
        url = shadow.url;
      }
      
      
      const options = {
        url: `https://pokeapi.co/api/v2/pokemon/${Name}`,
        json: true
      }
       
      let embed2;
      await get(options).then(async t => {
        let check = t.id.toString().length

         if (check === 1) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t.id}.png`
    } else if (check === 2) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t.id}.png`
    } else if (check === 3) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t.id}.png`
    }
    
    
     

         let lvl = Math.floor(Math.random() * 100)
      let poke = new Pokemon({ name: Name, id: t.id, url: url }, lvl);
      // console.log(poke.name)
      poke = await classToPlain(poke);
      let imgname = `Pokemon.png`
      let spawn = await Spawn.findOne({ id: message.channel.id });
        if (!spawn) await new Spawn({ id: message.channel.id }).save();
        spawn = await Spawn.findOne({ id: message.channel.id })
        spawn.pokemon = []
        spawn.pokemon.push(poke)
        spawn.time = Date.now() + 259200000
        await spawn.save()
        
        embed2 = new MessageEmbed()
          .setAuthor(`A wild pokémon has appeared!`)
          .setDescription(`Guess the pokemon and type \`${guild.prefix}catch <pokémon name>\` to catch it!`)
           
          .setColor("YELLOW").attachFiles([{ name: imgname, attachment: poke.url }])
            .setImage("attachment://"
          + imgname)
          
         user.redeems = user.redeems - 1
        await user.save();
      });
        return message.channel.send(embed2);



  } else { 
    
    if (user.redeems === 0) return message.channel.send("You don't have enough redeems to do that!")
    let Name = args[0].toLowerCase()
    // console.log(Name) 
    name = Name
      let url;
      const options = {
        url: `https://pokeapi.co/api/v2/pokemon/${Name}`,
        json: true
      }
       
      await get(options).then(async t => {
        let check = t.id.toString().length

        
         if (check === 1) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t.id}.png`
    } else if (check === 2) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t.id}.png`
    } else if (check === 3) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t.id}.png`
    }
     
        
  
   
      let lvl = Math.floor(Math.random() * 100)
      let poke = new Pokemon({ name: Name, id: t.id, url: url }, lvl);
      // console.log(poke.name)
      poke = await classToPlain(poke);
      user.pokemons.push(poke)
      await user.markModified("pokemons")
      user.redeems = user.redeems - 1
      await user.save()
  })
  return message.channel.send("redeemed")
  }
  }
}