const Discord = require('discord.js')
const db = require('quick.db')


module.exports = {
  name: "prefixset",

  async execute(message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:x: You dont have permissions to do this`)
    const gprefix = db.fetch(`gprefix_${message.guild.id}`)
    if (!args[0]) return message.channel.send(':x: Invalid prefix ') 
   db.set(`gprefix_${message.guild.id}`, args[0].toLowerCase())
   message.channel.send("set the prefix for " + message.guild.name + " to " + args[0])
}
}