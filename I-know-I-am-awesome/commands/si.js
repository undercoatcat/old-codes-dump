const Discord = require('discord.js');
const moment = require('moment')

module.exports = {
  name: "si",
  aliases: ["serverinfo", "server info", "server-info", "s i"],

  async execute(message) {
    let creation = moment(message.guild.createdAt).format('DD MMM YYYY')
    let rolecount = message.guild.roles.cache.size - 1
    let embed = new Discord.MessageEmbed()
      .setTitle(`Server Info of ${message.guild.name}`)
      .setThumbnail(message.guild.iconURL({dynamic: true}))
      .setColor('#ae86')
      .addField('Server Name', `${message.guild.name}`, true)
      .addField('Server Owner', `${message.guild.owner}`, true)
      .addField('Server Creation time', `${creation}`, true)
      .addField('Channel Count', `${message.guild.channels.cache.size}`, true)
      .addField('Member Count', `${message.guild.memberCount}`, true)
      .addField('Role Count', `${rolecount}`, true)
      .addField('Server Region', `${message.guild.region}`, true)  
      message.channel.send(embed)
  }
}