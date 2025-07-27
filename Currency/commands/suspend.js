const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client()
client.login(process.env.token)

module.exports = {
  name: "suspend",
  
  async execute(message, args) {
    const owner = ["772408057929662485","800765934926954507", "564853227393122307", "711097988876992582"]
    if (!owner.includes(message.author.id)) return;

let target = message.mentions.users.first() || client.users.cache.get(args[0])

if (owner.includes(message.author.id)) {
    if(!target) { return message.channel.send("Please mention or enter valid id of the user you want to suspend!") }
    db.set(`suspended_${target.id}`, true)
       message.channel.send(`**${target.tag}** is now suspended!`)
    }
  }
}