const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
  name: "ui",
  aliases: ["userinfo", "user info", "user-info"],

  async execute(message, args) {
    let memberx = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    let membera = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
    let creation = moment(membera.createdAt).format('DD MMM YYYY')
    const join = moment(memberx.joinedTimestamp).format('DD MMM YYYY')
    let embed = new Discord.MessageEmbed()
    .setColor('#ae86')
       .setTitle(`User infomation of ${membera.tag}`)
       .setThumbnail(membera.displayAvatarURL({dynamic: true}))
       .addField('Username', `${membera.username}`, true)
       .addField('Download user avatar', `[Click here](${membera.displayAvatarURL({dynamic: true})})`, true)
       .addField('User ID', `${membera.id}`, true)
       .addField('The user is a bot',`${membera.bot}`, true)
       .addField('Account Creation time', `${creation}`, true)
       .addField('Server joined time', `${join}`, true)
       .addField(`Status`, `${membera.presence.status}`, true)
       message.channel.send(embed)
  }
}