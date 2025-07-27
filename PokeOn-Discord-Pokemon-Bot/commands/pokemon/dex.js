const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')
const { capitalize } = require("../../functions.js");
 const shadow = require('../../db/shadow.js')
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
//see discord 
module.exports = {
  name: "dex",
  description: "gives pokemon Info",
  category: "Pokemon",
  args: true,
  usage: ["dex <pokemon name>"],
  cooldown: 3,
  permissions: [],
  aliases: ["pokedex"],
  execute: async (client, message, args, prefix, guild, color, channel) => {

    

    	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")


    let Name = args.join("-").toLowerCase()

    

          let response = await P.getPokemonSpeciesByName(Name)
    const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${Name}`,
      json: true
    }

    try {
      await get(options).then(async t => {

       

    
        
       
        let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${t.id}.png`

        if(args[0] === `shiny`) {
         url = `https://assets.poketwo.net/shiny/${t.id}.png?v=26`
        }
     
        let caught = user.caught.filter(r=>r.name.toLowerCase() == Name).length;

         let footer = ``

         if (caught === 0) footer = "You haven't caught this specie yet!"

           if (caught > 0) footer = `You have caught ${caught} of this specie!`
           
           
           
          

        let embed = new Discord.MessageEmbed()
          .setTitle(`#${t.id} ${capitalize(t.name.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()))}`)
          .setDescription(`${response.flavor_text_entries.filter(r => r.language.name == "en")[0].flavor_text.replace('\n'," ")}`)
          .setColor('YELLOW')
          .setImage(url)
          .addField("Base Stats", `${t.stats.map(r => `**${r.stat.name.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()).replace(`Special`, `Sp.`).replace(`Attack`, `Atk`).replace(`Defense`, `Def`)}**` + ": " + r.base_stat).join("\n")}`)
           .addField("Appearance", `**Weight**: ${t.weight / 10}kg\n**Height**: ${t.height / 10}m`, true)
          .addField("Types", `${t.types.map(r => r.type.name.replace(/\b\w/g, l => l.toUpperCase())).join(" | ")}`,true)
           .addField("Abilities", `${t.abilities.map(r => r.ability.name.replace(/\b\w/g, l => l.toUpperCase())).join(`\n`)}`,true)
           
         
       
          
          .setFooter(footer)
         

        message.channel.send(embed)
      })
    } catch (error) {
      console.log(error);
      if (error.message.includes(`404 - "Not Found"`)) return message.channel.send(`This Pokémon doesn't seem to appear in the Pokedex or maybe you spelled it wrong!`)
    }
    
  }
}



