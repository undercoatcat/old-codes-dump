const Discord = require('discord.js');

module.exports = {
  name: "say",
  aliases: "echo",

   async execute(message, args) {
     if (!args[0]) return message.channel.send('What do you want to echo?')
     message.channel.send(`${args.join(' ')}\n\n- **${message.author.tag}**`)
   }
}