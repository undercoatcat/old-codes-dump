const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')
const { capitalize, getlength } = require("../../functions.js");

module.exports = {
  name: "pokemon-add",
  description: "adds item to mentioned user's data",
  category: "dev",
  args: true,
  usage: ["pokemon-add <user> <pokemon name>"],
  cooldown: 3,
  permissions: [],
  aliases: [],
  execute: async (client, message, args, prefix, guild, color, channel) => {
    let usera = message.mentions.users.first()
    if (!usera) return message.channel.send('Pls mention a user!')

    let user = await User.findOne({ id: usera.id });

    if (!args[1]) return message.channel.send('Pls name a pokemon!')

    let Name = args[1]
    name = Name
    

   

    

    let options = {
      url: `https://pokeapi.co/api/v2/pokemon/${args[1]}`, // bohot bdha nub hai, args[0] isme mention hai and args[1] se pokemon ka naam shru hota hai
      json: true // args slice(1) use krna tha , my mistake :(( 
    }


    let t; // abh try
    let type; //aur bhai kya haal
    try {
      await get(options).then(async t1 => {
      //await get(options).then(async (_t) => {
        t = t1; //ezzz
        let re;
        type = t.types.map(r => {
          if (r !== r) re = r ;
          if (re == r) return;
          return `${r.type.name}`
        }).join(" | ")

        let check = t1.id.toString().length

    let url;
    if (check === 1) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t1.id}.png`
    } else if (check === 2) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t1.id}.png`
    } else if (check === 3) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t1.id}.png`
    }

      

    let lvl = Math.floor(Math.random() * 100);

    let hp = Math.floor(Math.random() * 31);
    atk = Math.floor(Math.random() * 31);
    def = Math.floor(Math.random() * 31);
    spatk = Math.floor(Math.random() * 31);
    spdef = Math.floor(Math.random() * 31);
      speed = Math.floor(Math.random() * 31);

      let xp = Math.floor(1.2 * lvl ^ 3 ) - (15 * lvl ^ 2) + (100 * lvl) - 140 + 52

       let totaliv = ((hp + atk + def + spatk + spdef + speed) / 186) * 100
      
   
    let shiny = false;

   

   if (args[2] === "--s") {
    shiny = true
    url = `https://assets.poketwo.net/shiny/${t1.id}.png?v=26`
  } else if (!args[2]) {
    shiny = false
    
  }

   if(shiny === true) namex = `✨ ${name}`

    let embed = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setTitle(`Level ${lvl} ${capitalize(namex)}`)
    .setImage(url)
    .setThumbnail(message.author.displayAvatarURL({size: 1024, dynamic: true}))
    .addField(`Xp`, `0/${xp}`)
    .addField(`Nature`, `Hasty`)
    .addField(`Stats`, `**Hp:** ${hp}/31\n**Atk:** ${atk}/31\n**Def:** ${def}/31\n**Sp. Atk:** ${spatk}/31\n**Sp. Def:** ${spdef}/31\n**Speed:** ${speed}/31`)
    .addField(`Total IV%`, `**${totaliv.toString().substr(0,5)}%**`)
    let a = await message.channel.send(embed)
    await a.react("✅")
    await a.react("❌")
    const collector = a.createReactionCollector((reaction, xuser) => ['✅', '❌'].includes(reaction.emoji.name) && xuser.id === message.author.id, { time: 60000 });
    
    //collector
    collector.on('collect', async (reaction, sexyuser) => {
          if (reaction.emoji.name === "✅") {
            collector.stop();
             a.reactions.removeAll();
           
    user.pokemons.push({
      level: lvl,
      xp: 0,
      name: name,
      hp: hp,
      atk: atk,
      def: def,
      spatk: spatk,
      spdef: spdef,
      speed: speed,
      moves: [],
      shiny: shiny,
      rarity: type,
      nature: 'Hasty',
      url: url,
    })
    await user.markModified(`pokemons`)
    await user.save();
    return message.channel.send(`Added Successfully!`)
          } else if (reaction.emoji.name === "❌") {
            collector.stop("aborted");
            a.reactions.removeAll();
            return message.channel.send("ABORTED!")
          }
        });
        collector.on('end', collected => {
          return
        });


    
    })
    }catch (err) {
    console.log(err);
    return message.channel.send(err)
    }
  }
}

