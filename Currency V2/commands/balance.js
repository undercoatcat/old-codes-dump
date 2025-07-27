let User = require('../user.js');
let Discord = require('discord.js');

module.exports = {
  name: "balance",
  aliases: "bal",
  description: "Shows balance of a user",

  async execute(message, args) {
    let mem = message.mentions.users.first() || message.author;
     let user = await User.findOne({id: mem.id})
    let embed = new Discord.MessageEmbed()
    .setTitle(`${mem.username}'s balance`)
    .setThumbnail(mem.displayAvatarURL({size: 1024, dynamic: true}))
    .setColor('#14f6fa')
    .setDescription(`User's balance: **${user.balance}**\nUser's bank: **${user.bank}**`)
    message.channel.send(embed)
  }
}