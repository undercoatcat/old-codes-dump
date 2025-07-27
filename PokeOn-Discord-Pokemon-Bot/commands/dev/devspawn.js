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
	name: "devspawn",
	description: "Display your credit balance.",
	category: "dev",
	args: false,
	usage: [""],
	cooldown: 3,
	permissions: [],
	aliases: ["ds"],
	execute: async (client, message, args, prefix, guild, color, channel) => {
	
	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")
  


let Name = args[0]
    // console.log(Name) 
    name = Name
      
      
      
      
      
      const options = {
        url: `https://pokeapi.co/api/v2/pokemon/${Name}`,
        json: true
      }
       
      let embed2;
      await get(options).then(async t => {
        let check = t.id.toString().length
        
        let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${t.id}.png`
        
      

         
    
    
     

         let lvl = Math.floor(Math.random() * 100)
      let poke = new Pokemon({ name: Name, id: t.id, shiny: true,  url: url }, lvl);
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
          
         
      });
        return message.channel.send(embed2);



  }
}
