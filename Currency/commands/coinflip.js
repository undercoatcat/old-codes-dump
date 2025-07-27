const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "coinflip",
  aliases: ["cf"],

  async execute(message, args) {
    let results = ["win", "lose", "ok"]
    let result = results[Math.floor(Math.random() * results.length)]
    let results1 = ["heads", "tails"]
    let result1 = results1[Math.floor(Math.random() * results1.length)]
    let user = message.author;
    let bal = await db.fetch(`money_${user.id}`)
    let bank = await db.fetch(`bank_${user.id}`)
    let bal2 = [Math.floor(bal + bank)]
    if (!args[0]) {
      return message.channel.send(`Tell an amount of coins to flip!`)
    } else if (isNaN(args[0])) {
      return message.channel.send('Thats not a valid number!')
    } else if (args[0] > 100000) {
      return message.channel.send(`You cannot coinflip more than 100k!`)
    } else if (args[0] < 1) {
      return message.channel.send(`Atleast coinflip 1 bal`)
    } else if (bal < args[0]) {
      return message.channel.send(`You don't have that much moni kiddo!`)
    } else if (bal2 > 1000000) {
      return message.channel.send(`You have too much moni everyone is jealous and will cheat and make u lose so better not coinflip!!!`)
    } else { if (result === "win") {
      let winner1 = args[0]
       db.add(`money_${user.id}`, winner1)
      return message.channel.send(`You flipped the coin and it is **${result1}** You won <a:ecocoins:833545755934457866>**${winner1}**`) 
      } else if(result !== "win") {
      let winner = args[0]
       db.subtract(`money_${user.id}`, winner)
      return message.channel.send(`You flipped the coin and it is **${result1}** You lost <a:ecocoins:833545755934457866>**${winner}**`)
      }
    } 
  }
}