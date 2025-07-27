const Discord = require("discord.js");
const db = require("quick.db");


module.exports = {
  name: "withdraw",
  aliases: ["with"],
  
  description: "Deposit your coins to Bank!",

  async execute(message) {

  let user = message.author;

  let member = db.fetch(`money_${user.id}`)
  let member2 = db.fetch(`bank_${user.id}`)

  let args = message.content
 .split(" ")
 .slice(1)

  if (args[0] == 'all') {
    let money = await db.fetch(`bank_${user.id}`)
    
    db.subtract(`bank_${user.id}`, money)
    db.add(`money_${user.id}`, money)
  message.channel.send(`You have withdrawn <a:ecocoins:833545755934457866>**${money}** from your bank!`)
  
  } else {
  if (!args[0]) {
      return message.channel.send(`Specify an amount to withdraw!`)
      .catch(err => console.log(err))
  }
  if (message.content.includes('-')) { 
      return message.channel.send(`You can't withdraw negative money!`)
  }
  if (member2 < args[0]) {
      return message.channel.send(`You don't have that much money in your bank!`)
  }
  message.channel.send(` You have withdrawed <a:ecocoins:833545755934457866>**${args[0]}** from your bank!`)
   db.subtract(`bank_${user.id}`, args[0])
  db.add(`money_${user.id}`, args[0])
  }
}
};