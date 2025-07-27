const Discord = require('discord.js')
const db = require('quick.db');

module.exports = {
  name: "sell",
  
  description: "Shows bot shop",

  async execute(message, args) {

  let user = message.author;

if (args[0].toLowerCase() === "deer") {
  let deer = db.fetch(`deer_${user.id}`)
  if (deer < 1) return message.channel.send("You don't have a deer to sell!")
  
  db.fetch(`deer_${user.id}`)
  db.subtract(`deer_${user.id}`, 1)

   db.add(`money_${user.id}`, 75)
   message.channel.send("You sold a deer for <a:ecocoins:833545755934457866>**75**!")
} else if (args[0].toLowerCase() === "rabbit") {
let rabbit = db.fetch(`rabbit_${user.id}`)
  if (rabbit < 1) return message.channel.send("You don't have a rabbit to sell!")
  
  db.fetch(`rabbit_${user.id}`)
  db.subtract(`rabbit_${user.id}`, 1)

   db.add(`money_${user.id}`, 50)
   message.channel.send("You sold a Rabbit for <a:ecocoins:833545755934457866>**50**!")
  } else if (args[0].toLowerCase() === "fish") {
    let fish = db.fetch(`fish_${user.id}`)
  if (fish < 1) return message.channel.send("You don't have a fish to sell!")
  
  db.fetch(`fish_${user.id}`)
  db.subtract(`fish_${user.id}`, 1)

   db.add(`money_${user.id}`, 10)
   message.channel.send("You sold a Fish for <a:ecocoins:833545755934457866>**10**!")
  }
  }
}