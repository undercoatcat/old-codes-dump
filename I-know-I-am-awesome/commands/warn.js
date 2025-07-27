const Discord = require('discord.js')


module.exports = {
  name: "warn",
  
  
  description: "Warns a user!",
  async execute(message) {
    if(message.member.hasPermission("MANAGE_MESSAGES")) {
 let args = message.content
 .split(" ")
 .slice(1)

 let victim = message.mentions.users.first()
 if(!victim) return message.channel.send(`mention a user!`)
 if(!args[0]) return message.channel.send("the command has to be `x!warn @user (reason)`")
 
 let embed = new Discord.MessageEmbed()
 .setTitle(`Warned ${victim.tag}` )
 .setDescription(args.slice(1).join(" "))
 .setColor("#ae86")
 .setFooter(`Moderator : ${message.author.username}`)
 .setTimestamp()
 
 message.channel.send(embed)
 
 let warnEmbed = new Discord.MessageEmbed()
 .setTitle(`You were warned by ${message.author.tag} in ${message.guild.name} server!`)
 .setColor('#ae86')
 .addField(`Warn reason`, args.slice(1).join(" "))
 .setTimestamp();

 victim.send(warnEmbed)

}else {
 message.reply("You don't have permission to do that!")
  }
}
}