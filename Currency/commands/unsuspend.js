const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();
client.login(process.env.token)

module.exports = {
  name: "unsuspend",

  async execute(message, args) {

    const owner = ["772408057929662485","800765934926954507", "564853227393122307", "711097988876992582"]
    if (!owner.includes(message.author.id)) return;

let target = message.mentions.users.first() || client.users.cache.get(args[0])

    if(!target) { return message.channel.send("Please mention the user you want to unsuspend!") }
    db.delete(`suspended_${target.id}`, true)
       message.channel.send(`**${target.tag}** is now unsuspended!`)
  }
}