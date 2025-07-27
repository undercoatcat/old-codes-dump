const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const config = require('../config.js')
const { get } = require('request-promise-native')
const fs = require("fs");
const { classToPlain } = require("class-transformer");
const { getlength, log } = require("../functions");
const Pokemon = require("./../Classes/Pokemon");
let scool = new Set();
let Guild = require('../models/guild.js');
let User = require("../models/user.js");
let Pokemons = require("../models/pokemons");
let levelUp = require("../db/levelup.js");
let Spawn = require("../models/spawn.js");
let pokemon = require("../db/pokemon.js");
let forms = require("../db/forms.js");
let primal = require("../db/primal.js");
let shinyDb = require("../db/shiny");
let Gen8 = require('../db/gen8.js')
let Galarian = require('../db/galarians.js')
let Shadow = require('../db/shadow.js')
let altnames = require("../db/altnames.js");
const spawn = require("../models/spawn.js");
const { set } = require("mongoose");
let color = '#92edff';

const common = fs.readFileSync("./db/common.txt").toString().trim().split("\n").map(r => r.trim());
const alolan = fs.readFileSync("./db/alolans.txt").toString().trim().split("\n").map(r => r.trim());
const mythic = fs.readFileSync("./db/mythics.txt").toString().trim().split("\n").map(r => r.trim());
const legend = fs.readFileSync("./db/legends.txt").toString().trim().split("\n").map(r => r.trim());
const ub = fs.readFileSync("./db/ub.txt").toString().trim().split("\n").map(r => r.trim());
const galarian = fs.readFileSync("./db/galarians.txt").toString().trim().split("\n").map(r => r.trim());

module.exports = async (client, message) => {
  if (message.author.bot || !message.guild) return;
  let channel = client.channels.cache.get(client.config.channel);
  let prefix = [client.config.prefix, `<@${client.user.id}>`, `<@!${client.user.id}>`]
  let guild = await Guild.findOne({ id: message.guild.id });
  if (!guild) await new Guild({ id: message.guild.id }).save();
  guild = await Guild.findOne({ id: message.guild.id })
  prefix = [guild.prefix, `<@${client.user.id}>`, `<@!${client.user.id}>`]
  let prefixs = prefix;

  let user = await User.findOne({ id: message.author.id });

  if (!message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return;
  if (!message.channel.permissionsFor(client.user.id).has("VIEW_CHANNEL")) return;
  if (!message.channel.permissionsFor(client.user.id).has("EMBED_LINKS")) return;
  if (!message.channel.permissionsFor(client.user.id).has("ATTACH_FILES")) return;


  let spawn = Spawn.findOne({ id: message.channel.id })
  if (guild.spawnbtn && !message.content.toLowerCase().startsWith(prefix[0].toLowerCase())) {
    if (!scool.has(message.channel.id)) await spawnPokemon(message, client)
    if (user) await leveling(message, client).catch(err => {
      if (err.message.toLowerCase().startsWith(`VersionError`)) return;
    })
  }

  if (message.content.startsWith(prefix[1])) prefix = prefix[1];
  else if (message.content.startsWith(prefix[2])) prefix = prefix[2];
  else prefix = prefix[0];




//Mention and respond




  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  if ([`<@${client.user.id}>`, `<@!${client.user.id}>`].includes(message.content) && !args[0]) {
    let embed = new MessageEmbed()
      .addField("Bot Prefix", `The current prefix for this server is \`${prefixs[0]}\``)
      .addField("Invite The Bot", `**[Click Here!](https://discord.com/api/oauth2/authorize?client_id=928676583298977802&permissions=8&scope=bot%20applications.commands)**`)
      .addField("Support Server:", `**[Click Here!](https://discord.gg/QS89kRJTTy)**`)
      .setColor(color)
    return message.channel.send(embed)
  }





//Blacklist and Suspend







  if (!args[0]) return;
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));



  if (message.content.startsWith(guild.prefix.toLowerCase()) && guild.blacklist == true) return message.channel.send(">  **This server has been blacklisted. Join support server to appeal. https://discord.gg/QS89kRJTTy**");



  if (user && user.blacklist == true && message.content.toLowerCase().startsWith(guild.prefix)) return message.channel.send(">  **You have been blacklisted. Join support server to appeal. https://discord.gg/QS89kRJTTy**");

  if (!message.content.toLowerCase().startsWith(guild.prefix.toLowerCase())) return;






  



  // Owner Command Respond -----------------------------  Logs 




  



  if (cmd) {
    prefix = prefixs[0]
    if ((cmd.category.toLowerCase() == "dev" || cmd.category.toLowerCase() == "developer") && !client.config.owners.includes(message.author.id)) return message.reply(`>  **Only ${client.user.username} Owner/Developers can use this Command!**`)


    if ((cmd.category.toLowerCase() === "special") && (!client.config.special.includes(message.author.id)) && (!client.config.owners.includes(message.author.id))) return message.reply(`>  **This command can only be used by ${client.user.username} Bot Administrators.**`);

    if (cmd.category == "testing" && !client.config.owners.includes(message.author.id)) return message.reply(">  **This Command in under Testing! Try again later.**");




   // Logs ---------------------------------------------------------------------

  

    if (cmd.category.toLowerCase() == "dev" || cmd.category.toLowerCase() == "developer" ){
      const hook = new Discord.WebhookClient('980429229613273118','_jTWlJJspuly_GHqLoRgXCO4hH4eXTjqc--cx7luli2FxWbybtxkVgPoZHOGEalHGX09');

      const DevEmbed = new Discord.MessageEmbed()
      .setTitle(`Developer Command Logs`)
      .setDescription(`\`\`\`Guild - ${message.guild.name}\nChannel - #${message.channel.name}\nUser - ${message.author.username} / ${message.author.id}\nCommand - ${prefix}${command} ${args.join(" ")}\`\`\``)
      .setTimestamp()
      .setColor(color)
      hook.send(DevEmbed)
    }

    if (cmd.category.toLowerCase() == "special" || cmd.category.toLowerCase() == "admin" ){
      const hook = new Discord.WebhookClient('980429229613273118','_jTWlJJspuly_GHqLoRgXCO4hH4eXTjqc--cx7luli2FxWbybtxkVgPoZHOGEalHGX09');
      const DevEmbed = new Discord.MessageEmbed()
      .setTitle(`Bot Admins Command Logs`)
      .setDescription(`\`\`\`Guild - ${message.guild.name}\nChannel - #${message.channel.name}\nUser - ${message.author.username} / ${message.author.id}\nCommand - ${prefix}${command} ${args.join(" ")}\`\`\``)
      .setTimestamp()
      .setColor(color)
      hook.send(DevEmbed)
    }


    //const logEmbed = new MessageEmbed()
    log(`\`\`\`Guild - ${message.guild.name}\nChannel - #${message.channel.name}\nUser - ${message.author.username} / ${message.author.id}\nCommand - ${prefix}${command} ${args.join(" ")}\`\`\``)


    //log(`**Guild - ** ${message.guild.name}\n**Channel - ** #${message.channel.name}\n**User - **${message.author.username} / ${message.author.id}\n**Command - ** ${prefix}${command} ${args.join(" ")}`)






    // Errors -------------------------------------------------------------------------------




    cmd.execute(client, message, args, prefix, guild, color, channel).catch(err => {
      if ([`versionerror`, `no matching document`, `missing permissions`].includes(err.message.toLowerCase())) return;
      if (err.message.includes(`404 - "Not Found"`)) return message.channel.send("This Pokémon doesn't seem to appear in the Pokedex or maybe you spelled it wrong!");
      return console.log(err.stack)

    

    if (cmd.args && !args.length) return message.channel.send(`See \`${prefix}help ${cmd.name}\` for more information on how to use the **${capitalize(cmd.name)}** Command.`);




    //if (cmd.permissions[0] && !message.channel.permissionsFor(message.author.id).has(cmd.permissions)) return message.channel.send(`You don't have enough permissions to use this command.`);


    

      // message.reply('There Was An Error While Trying To Execute ' + command + ' Command!```xl\n' + err.stack + '\n```**Report This Error To Devs**\nhttps://discord.gg/QS89kRJTTy');
    })
  }
}




// SPAWN -------------------------------------------------------------------------




async function spawnPokemon(message, client) {

    let guild = await Guild.findOne({ id: message.guild.id });
    let channel = client.channels.cache.get(message.channel.id);
    if (!guild) await new Guild({ id: message.guild.id }).save();
    guild = await Guild.findOne({ id: message.guild.id })

    if (!guild.spawnbtn) return;
    if (guild.disabledChannels.includes(message.channel.id)) return;
    if (guild.spawnchannel !== null) channel = client.channels.cache.get(guild.spawnchannel);
    if (!channel) return;


    let spawn = await Spawn.findOne({ id: channel.id });
    if (!spawn) await new Spawn({ id: channel.id }).save();
    spawn = await Spawn.findOne({ id: channel.id })

    
    if (guild.spawnchannel && scool.has(message.channel.id)) return;
    if (!guild.spawnchannel && scool.has(message.channel.id)) return;

    var gen = pickRandom();
    var type = common;
    if (gen == "common") type = common;
    if (gen == "alolan") type = alolan;
    if (gen == "mythic") type = mythic;
    if (gen == "legend") type = legend;
    if (gen == "ub") type = ub;
    if (gen == "galarian") type = galarian;
    var shiny = false
    //type = galarian
    gen = Math.floor(Math.random() * 100000) + 1;
    if (gen <= 10) shiny = true;
    const random = type[Math.floor(Math.random() * type.length)];
    var name = random.trim().split(/ +/g).join("-").toLowerCase();
    var findGen8 = Gen8.find(r => r.name === name);
    var Name = name;
    if (name.startsWith("alolan-")) {
        name = name.replace("alolan-", "");
        Name = `${name}-alola`
        name = random;
    };
    const options = {
        url: `https://pokeapi.co/api/v2/pokemon/${Name}`,
        json: true
    };
    if (name.toLowerCase().startsWith("giratina")) options.url = "https://pokeapi.co/api/v2/pokemon/giratina-altered";
    if (name.toLowerCase().startsWith("deoxys")) options.url = "https://pokeapi.co/api/v2/pokemon/deoxys-normal";
    if (name.toLowerCase().startsWith("shaymin")) options.url = "https://pokeapi.co/api/v2/pokemon/shaymin-land";
    if (name.toLowerCase() === "nidoran") options.url = "https://pokeapi.co/api/v2/pokemon/nidoran-m";
    if (name.toLowerCase().startsWith("nidoran-m")) options.url = "https://pokeapi.co/api/v2/pokemon/nidoran-m";
    if (name.toLowerCase().startsWith("nidoran-f")) options.url = "https://pokeapi.co/api/v2/pokemon/nidoran-f";
    if (name.toLowerCase().startsWith(("porygon-z"))) options.url = "https://pokeapi.co/api/v2/pokemon/porygon-z";
    if (name.toLowerCase().startsWith("landorus")) options.url = "https://pokeapi.co/api/v2/pokemon/landorus-incarnate";
    if (name.toLowerCase().startsWith("thundurus")) options.url = "https://pokeapi.co/api/v2/pokemon/thundurus-incarnate";
    if (name.toLowerCase().startsWith("tornadus")) options.url = "https://pokeapi.co/api/v2/pokemon/tornadus-incarnate";
    if (name.toLowerCase().startsWith("mr.mime")) options.url = "https://pokeapi.co/api/v2/pokemon/mr-rime";
    if (name.toLowerCase().startsWith("pumpkaboo")) options.url = "https://pokeapi.co/api/v2/pokemon/pumpkaboo-average";
    if (name.toLowerCase().startsWith("meowstic")) options.url = "https://pokeapi.co/api/v2/pokemon/meowstic-male";
    if (name.toLowerCase().startsWith("toxtricity")) options.url = "https://pokeapi.co/api/v2/pokemon/toxtricity-amped";
    if (name.toLowerCase().startsWith("mimikyu")) options.url = "https://pokeapi.co/api/v2/pokemon/mimikyu-disguised  ";
    await get(options).then(async t => {
        let check = t.id.toString().length
        let url;

        if (!shiny) {
            if (check === 1) {
                url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t.id}.png`
            } else if (check === 2) {
                url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t.id}.png`
            } else if (check === 3 && !Name.endsWith("-alola")) {
                url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t.id}.png`
            } else if (check > 3 && Name.endsWith("-alola")) {

                let t2 = await get({
                    url: `https://pokeapi.co/api/v2/pokemon/${Name.replace("-alola", "")}`,
                    json: true
                })

                let check2 = t2.id.toString().length
                url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t2.id}_f2.png`

                if (check2 === 1) {
                    url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t2.id}_f2.png`
                } else if (check2 === 2) {
                    url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t2.id}_f2.png`
                } else if (check2 === 3) {
                    url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t2.id}_f2.png`
                }
            }
        } else {
            let get = shinyDb.find(r => r.name === Name);
            if (get) url = get.url;
            if (!get) url = `https://play.pokemonshowdown.com/sprites/xyani-shiny/${random.toLowerCase()}.gif`;
        }
        if (findGen8) uri = findGen8.url;

        var re;
        const Type = t.types.map(r => {
            if (r !== r) re = r;
            if (re == r) return;
            return `${capitalize(r.type.name)}`
        }).join(" | ");
        let lvl = Math.floor(Math.random() * 50)
        let poke = new Pokemon({ name: random, id: t.id, shiny: shiny, rarity: Type, url: url }, lvl);
        poke = await classToPlain(poke);
        if (shiny == true && Name.endsWith("alola")) {
            if (shinyDb.find(r => r.name.toLowerCase() === Name.toLowerCase())) url = shinyDb.find(r => r.name === Name).url;
        }
    let bg = "https://media.discordapp.net/attachments/860885842359615559/861204903753678858/pokemon_swsh___route_2__night__by_phoenixoflight92_de2smhz-pre.jpg";
    if (Type.toLowerCase().startsWith("bug")) bg = "https://media.discordapp.net/attachments/885742378424631296/898575749177561098/background-hero.png?width=823&height=512"
    if (Type.toLowerCase().startsWith("water")) bg = "https://media.discordapp.net/attachments/898480563810361424/898507893920370698/d87700j-41e3e246-6716-46bf-820e-fb7b9e17d66d.png?width=720&height=432"
    if (Type.toLowerCase().startsWith("water")) bg = "https://media.discordapp.net/attachments/885742378424631296/898561236646653992/underwater-blue-background-in-sea-ocean-with-volume-light-3d-picture-id538593530.png?width=374&height=374"
    if (Type.toLowerCase().startsWith("rock")) bg = "https://media.discordapp.net/attachments/898480563810361424/898508252298502154/d83tnmo-b19278a2-4c9e-40ed-a230-4f7a00435824.png?width=720&height=432"
    if (Type.toLowerCase().startsWith("flying")) bg = "https://media.discordapp.net/attachments/893456122051186708/898531101159616512/th.png?width=313&height=169"
    if (Type.toLowerCase().startsWith("grass")) bg = "https://media.discordapp.net/attachments/893456122051186708/898527502392250400/d83htw0-ec490c3b-f7dd-4570-a698-8404a8a12f99.png?width=461&height=259"
    if (Type.toLowerCase().startsWith("normal")) bg = "https://media.discordapp.net/attachments/893456122051186708/898526198592835594/d83vmn4-183b6b84-c533-4179-a19d-6db284f8f971.png?width=720&height=432"
    if (Type.toLowerCase().startsWith("steel")) bg = "https://media.discordapp.net/attachments/898480563810361424/898508084996108358/d88efs2-42c3bad7-0b8d-4854-b900-f2445d81b56e.png?width=720&height=432"
    if (Type.toLowerCase().startsWith("ice")) bg = "https://media.discordapp.net/attachments/898480563810361424/898508443034464266/d85jk85-38ec6987-8e11-49f8-a6af-8cf85bf53e17.png?width=720&height=432"
    if (Type.toLowerCase().startsWith("electric")) bg = "https://media.discordapp.net/attachments/893456122051186708/898527502392250400/d83htw0-ec490c3b-f7dd-4570-a698-8404a8a12f99.png?width=461&height=259"
    if (Type.toLowerCase().startsWith("ground")) bg = "https://media.discordapp.net/attachments/898480563810361424/898508252298502154/d83tnmo-b19278a2-4c9e-40ed-a230-4f7a00435824.png?width=720&height=432"
    if (Type.toLowerCase().startsWith("fairy")) bg = "https://media.discordapp.net/attachments/893456122051186708/898527502392250400/d83htw0-ec490c3b-f7dd-4570-a698-8404a8a12f99.png?width=461&height=259"
    if (Type.toLowerCase().startsWith("ghost")) bg = "https://media.discordapp.net/attachments/898480563810361424/898508084996108358/d88efs2-42c3bad7-0b8d-4854-b900-f2445d81b56e.png?width=720&height=432"
    if (Type.toLowerCase().startsWith("fire")) bg = "https://media.discordapp.net/attachments/898480563810361424/898508084996108358/d88efs2-42c3bad7-0b8d-4854-b900-f2445d81b56e.png?width=720&height=432"
    if (Type.toLowerCase().startsWith("psychic")) bg = "https://media.discordapp.net/attachments/885742378424631296/898575749177561098/background-hero.png?width=823&height=512"
    if (Type.toLowerCase().startsWith("figthing")) bg = "https://media.discordapp.net/attachments/893456122051186708/898526198592835594/d83vmn4-183b6b84-c533-4179-a19d-6db284f8f971.png?width=720&height=432"
    if (Type.toLowerCase().startsWith("dark")) bg = "https://media.discordapp.net/attachments/893456122051186708/898527502392250400/d83htw0-ec490c3b-f7dd-4570-a698-8404a8a12f99.png?width=461&height=259"
    if (Type.toLowerCase().startsWith("dragon")) bg = "https://media.discordapp.net/attachments/893456122051186708/898513207356977162/aif3y8.png?width=911&height=512"
    if (Type.toLowerCase().startsWith("poison")) bg = "https://media.discordapp.net/attachments/885742378424631296/898575749177561098/background-hero.png?width=823&height=512"
      
        const Canvas = require('canvas')
        const canvas = Canvas.createCanvas(1192,670);
          const ctx = canvas.getContext('2d')
          const background = await Canvas.loadImage(bg)
          ctx.drawImage(background,0,0,canvas.width,canvas.height)
          const pk = await Canvas.loadImage(poke.url)
         ctx.drawImage(pk,300,100,550,550)
        const embed = new MessageEmbed()
            .setAuthor(`A Wild Pokémon has appeared!`)
            .setDescription(`Guess the Pokémon аnd type \`${guild.prefix}catch <pokémon name>\` to cаtch it!`)
            .attachFiles([{ name: "new.png", attachment: canvas.toBuffer() }])
            .setImage("attachment://" + "new.png")
            .setColor('#ffb6c2')
        
        let time = 120000 - Math.floor(Math.random() * 30000)
        if (scool.has(message.channel.id)) return;
        await channel.send(embed);
        spawn.pokemon = []
        spawn.pokemon.push(poke)
        scool.add(message.channel.id)
        spawn.time = Date.now() + 259200000
        await spawn.save()
        setTimeout(async () => {
          if (guild.incense == true && guild.incenseamount >= 1) {
        guild.incenseamount = guild.incenseamount - 1
        await guild.save()
      }
      if (guild.incense == true && guild.incenseamount <= 0) {
        guild.incense = false
        await guild.save()
      }
            await scool.delete(message.channel.id)
        }, time)

    }).catch(err => {
        if (err.message.includes(`404 - "Not Found"`)) return; channel.send(`This pokemon couldn't be spawned because of high bot latency (too much of lag).\nName: ${random}`);
        if (err.message.toLowerCase().startsWith(`VersionError`)) return;
    });
}

/*------------------------------ OTHER FUNCS ------------------------------*/


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function pickRandom() {
  if ((Math.floor(Math.random() * 10000) + 1) <= 7) return 'ub';
  if ((Math.floor(Math.random() * 10000) + 1) <= 5) return 'legends';
  if ((Math.floor(Math.random() * 10000) + 1) <= 10) return 'mythics';
  if ((Math.floor(Math.random() * 10000) + 1) <= 100) return 'galarian';
  if ((Math.floor(Math.random() * 1000) + 1) <= 10) return 'alolans';

  return 'common';

}


async function leveling(message, client) {
  let user = await User.findOne({ id: message.author.id });
  if (!user) return;
  if (user.blacklist) return;
  let selected = user.selected;
  let poke = user.pokemons[selected];
  if (!poke) return console.log("No poke found");
  //if (xpCooldown.has(message.author.id)) return;
  const guild = await Guild.findOne({ id: message.guild.id });
  let prefix = guild.prefix;
  if (message.content.startsWith(`${prefix}`)) return;
  if (poke.level == 100) return;
  let curxp = poke.xp;
  if (poke.level < 20) {
    x = Math.floor((Math.random() * 10)) + 20
  }
  if (poke.level > 10 && poke.level < 50) {
    x = Math.floor((Math.random() * 200)) + 50
  }
  if (poke.level > 51) {
    x = Math.floor((Math.random() * 300)) + 50
  }
  let newXp = curxp + x;
  let lvl = poke.level;
  let embed9 = new MessageEmbed()
    .setAuthor(`Congratulations ${message.author.username}!`)
    .setDescription(`Your ${user.pokemons[selected].shiny ? "✨" : ""} ${capitalize(user.pokemons[user.selected].name)} has Leveled up to ${poke.level + 1}.`)
    .setThumbnail(user.pokemons[selected].url)
    .setColor(color)

  var n = parseInt(poke.level)
  let neededXp = (1.2 * n ^ 3) - (15 * n ^ 2) + (100 * n) - 140;
  if (user.blacklist) return;
  if (newXp > neededXp) {
    poke.level = lvl + 1;
    poke.xp = 0;
    user.pokemons[selected] = poke;
    await user.markModified(`pokemons`);
    await user.save();



    for (var i = 0; i < levelUp.length; i++) {
      if (poke.name.toLowerCase() == levelUp[i].name.toLowerCase() && poke.level > levelUp[i].levelup) {
        msg = `Congratulations ${message.author}! Your \`${capitalize(poke.name)}\` has just Leveled up to ${poke.level + 1} and Evolved into ${capitalize(levelUp[i].evo)}`;
        poke.name = capitalize(levelUp[i].evo);
        poke.xp = newXp;
        user.pokemons[selected] = poke;
        await user.markModified(`pokemons`);
        await user.save();
      }
    }
    //   setTimeout(() => xpCooldown.delete(message.author.id), 30000)
    return message.channel.send(embed9)
  } else {
    poke.xp = newXp;
    user.pokemons[selected] = poke;
    await user.markModified(`pokemons`);
    await user.save();
  }
}

