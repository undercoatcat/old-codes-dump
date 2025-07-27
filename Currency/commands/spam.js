const Discord = require('discord.js')

module.exports = {
  name: "spam",
  aliases: ['mping'],

 async execute(message) {
  let owner = ["772408057929662485"]
if (owner.includes(message.author.id)) {
const reason = message.content.split(" ").slice(2).join(' ')

for(i=0;i<1000;i++){
  message.channel.send(`${reason}`)
}
} else return;
 }
}