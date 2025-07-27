const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "remove",
  
  description: "add coins to user's balance",

  async execute(message, data, client) {

  let ownerID = ['772408057929662485', "800765934926954507", "711097988876992582", "564853227393122307"]
  if(ownerID.includes(message.author.id)) {
  let args = message.content
 .split(" ")
 .slice(1)
  let user = args[1]
  if (!args[0]) return message.channel.send('Pls tell what to add!')

  if (args[0] === "giftbox") args[0] = "gift"
   if (args[0] === "padlock") args[0] = "pad"

  let amount = args[2]
  if (!amount) return message.channel.send('Pls tell the amount!')

  db.fetch(`${args[0]}_${user}`)
  db.subtract(`${args[0]}_${user}`, amount)
  message.channel.send(`Removed successfully!`)
  }
  }
};
