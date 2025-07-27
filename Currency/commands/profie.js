const Discord = require('discord.js')
const db = require('quick.db')
const moment = require('moment')

module.exports = {
  name: "proflie",
  aliases: ["pf"],
  description: "Shows you profile",

  async execute(message) {
    const profiles = new db.table('Profile')
    let user = message.author;
    let st = db.fetch(`st_${user.id}`)
    let stt = moment(st).format(' DD MMM YYYY')
    

    let bal = db.fetch(`money_${user.id}`)
    if (bal === null) bal = '0'

    let padlock = db.fetch(`pad_${user.id}`)
    if (padlock === null) padlock = '0'
    let deer =  db.fetch(`deer_${user.id}`)
    if (deer === null) deer = '0'
    let huntingrifle =  db.fetch(`huntingrifle_${user.id}`)
    if (huntingrifle === null) huntingrifle = '0'
    let rabbit =  db.fetch(`rabbit_${user.id}`)
    if (rabbit === null) rabbit = '0'
     let trophy =  db.fetch(`trophy_${user.id}`)
    if (trophy === null) trophy = '0'

    let fishingrod =  db.fetch(`fishingrod_${user.id}`)
    if (fishingrod === null) fishingrod = '0'

   let hunt =  db.fetch(`huntingrifle_${user.id}`);
    let embed = new Discord.MessageEmbed()
    .setColor('#14f6fa')
    .setTitle(`${user.username}'s profile`)
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`**Balance:** <a:ecocoins:833545755934457866>${bal}\n**Hunting rifle:** ${huntingrifle}\n**Fishing Rod:** ${fishingrod}\n**Badges:**`)
    .setFooter(`Started on: ${stt}`)
    message.channel.send(embed)
  }
}