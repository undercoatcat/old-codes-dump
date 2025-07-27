const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const { capitalize } = require("../../functions.js");
const { readFileSync } = require('fs')
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const legends = readFileSync("./db/legends.txt").toString().trim().split("\n").map(r => r.trim());
const legends2 = readFileSync("./db/legends2.txt").toString().trim().split("\n").map(r => r.trim());
const mythics = readFileSync("./db/mythics.txt").toString().trim().split("\n").map(r => r.trim());
const alolans = readFileSync("./db/alolans.txt").toString().trim().split("\n").map(r => r.trim());
const starters = readFileSync("./db/starters.txt").toString().trim().split("\n").map(r => r.trim());
const ub = readFileSync("./db/ub.txt").toString().trim().split("\n").map(r => r.trim());
const galarians = readFileSync("./db/galarians.txt").toString().trim().split("\n").map(r => r.trim());
const gmax = readFileSync("./db/gmax.txt").toString().trim().split("\n").map(r => r.trim());
const shadow = readFileSync("./db/shadow.txt").toString().trim().split("\n").map(r => r.trim());
const Shiny = require('../../db/shiny.js');
const Gen8 = require('../../db/gen8.js');
const Forms = require('../../db/forms.js');
const Galarians = require('../../db/galarians.js');
const Mega = require('../../db/mega.js');
const Gmax = require('../../db/gmax.js');
const ShinyMega = require('../../db/mega-shiny.js');
const Shadow = require('../../db/shadow.js');
const Primal = require('../../db/primal.js');
const Pokemon = require('../../db/pokemon.js');
const ms = require("ms");

module.exports = {
  name: "pokemon",
  description: "Display a list of the pokemon you own.",
  category: "Pokemon Commands",
  args: false,
  usage: ["p!pokemon <page>"],
  cooldown: 3,
  aliases: ["pk"],
  execute: async (client, message, args, prefix, guild, color, channel) => {
    if (message.content.toLowerCase().startsWith((`${prefix.toLowerCase()}pk add` || `${prefix.toLowerCase()}pk remove`))) return;

    let user = await User.findOne({ id: message.author.id });
    if (!user) return message.channel.send("> <:x_mark:868344397211787275> **You need to pick a starter pokémon using the \`" + prefix + "start\` command before using this command!**");


    let e = message,
      n = args.join(" "),
      a = user,
      s = a.pokemons.map((r, i) => { r.num = i + 1; return r }),
      zbc = {};
    n.split(/--|—/gmi).map(x => {
      if (x && (x = x.split(" "))) zbc[x.splice(0, 1)] = x.join(" ").replace(/\s$/, '') || true;
    })

    if (zbc["legendary"] || zbc["legend"] || zbc["l"]) {
      s = s.filter(e => legends.includes(capitalize(e.name.replace(/-+/g, " "))) || legends2.includes(capitalize(e.name.replace(/-+/g, " "))))
    }
    if (zbc["mythical"] || zbc["myth"] || zbc["m"]) {
      s = s.filter(e => mythics.includes(capitalize(e.name.replace(/-+/g, " "))) || mythics.includes(capitalize(e.name.replace(/-+/g, " "))))
    }
    if (zbc["ultrabeast"] || zbc["ub"]) {
      s = s.filter(e => ub.includes(capitalize(e.name.replace(/-+/g, " "))) || ub.includes(capitalize(e.name.replace(/-+/g, " "))))
    }
    if (zbc["starter"] || zbc["starters"]) {
      s = s.filter(e => starters.includes(capitalize(e.name.replace(/-+/g, " "))) || starters.includes(capitalize(e.name.replace(/-+/g, " "))))
    }
     if (zbc["alolan"] || zbc["a"]) {
      s = s.filter(e => alolans.includes(capitalize(e.name.replace(/-+/g, " "))) || alolans.includes(capitalize(e.name.replace(/-+/g, " "))))
    }
     if (zbc["galarian"] || zbc["g"]) {
      s = s.filter(e => galarians.includes(capitalize(e.name.replace(/-+/g, " "))) || galarians.includes(capitalize(e.name.replace(/-+/g, " "))))
    }
    if (zbc["gmax"] || zbc["gigantamax"]) {
      s = s.filter(e => gmax.includes(capitalize(e.name.replace(/-+/g, " "))) || gmax.includes(capitalize(e.name.replace(/-+/g, " "))))
    }
    if (zbc["shadow"] || zbc["shad"]) {
      s = s.filter(e => shadow.includes(capitalize(e.name.replace(/-+/g, " "))) || shadow.includes(capitalize(e.name.replace(/-+/g, " "))))
    }
    if (zbc["shiny"] || zbc["s"]) s = s.filter(e => {
       if (e.shiny) return e;
     });
     if (zbc["mega"]) s = s.filter(e => {
       if ((e.name.toLowerCase().replace(/ +/g, "-")).startsWith("mega-")) return e;
     });
    if (zbc["name"] || zbc["n"]) s = s.filter(e => {
      if (e && (zbc['name']) == e.name.toLowerCase().replace(/-+/g, ' ')) return e;
     });
     if (zbc["nick"] || zbc["nickname"]) s = s.filter(e => {
       if (e.nick && (zbc['nick'] || zbc["nickname"]) == e.nick.toLowerCase().replace(/-+/g, ' ')) return e;
     });
 

    if (user.orderIV === true) s = s.sort((a, b) => {
      return b.totalIV - a.totalIV;
    })
    if (user.orderLevel === true) s = s.sort((a, b) => {
      return b.level - a.level;
    })
    if (user.orderAlphabet == true) s = s.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })

    let txt,
      chunks = chunk(s, 20),
      index = 0,
      embed = new MessageEmbed();

    if (Number(args[0])) index = parseInt(args[0]) - 1;
    let ix = ((index % chunks.length) + chunks.length) % chunks.length;
    let actualpage = index + 1
    index = ((index % chunks.length) + chunks.length) % chunks.length;
    if (isNaN(e[0])) txt = s.map((item, i) => `\`${item.num}\` ${item.shiny ? "⭐ " : ""}**${item.name.replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}**　•　Level: ${item.level}　•　IV: ${item.totalIV}%${(item.nick != null ? `　•　Nickname: ${item.nick}` : "")}`).slice(0, 20).join("\n")
    if (Number(args[0])) {
      if (txt == "") return message.channel.send("Found no pokémon matching this search.");
      if (chunks.length == 0) chunks.length = 1;
      embed
        .setTitle(`${message.author.username} Pokémons`)
        .setColor(color)
        .setDescription((chunks[index].map((item, i) => { return `\`${item.num}\` ${item.shiny ? "⭐ " : ""}**${item.name.replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}**　•　Level: ${item.level}　•　IV: ${item.totalIV}%${(item.nick != null ? `　•　Nickname: ${item.nick}` : "")}` }).join("\n")))
      if (args[0] > chunks.length) return message.channel.send("Found no Pokémon matching this search.") 

      embed.setFooter(`Displaying ( Page ${args[0]} of ${chunks.length} ) of total Pokémons: ${s.length}`);
      return e.channel.send(embed)


    } else {
      if (txt == "") return message.channel.send("Found no pokémon matching this search.");
      if (chunks.length == 0) chunks.length = 1;
      embed
        .setTitle(`${message.author.username} Pokémons`)
        .setColor(color)
        .setDescription(txt)
        .setFooter(`Displaying ( Page 1 of ${chunks.length} ) of total Pokémons: ${s.length}`);
      return e.channel.send(embed)
    }

  }
}

function chunk(array, chunkSize) {
  const temp = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    temp.push(array.slice(i, i + chunkSize));
  }
  return temp;
}