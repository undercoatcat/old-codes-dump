const Discord = require("discord.js");
const db = require("quick.db");


module.exports = {
  name: "deposit",
  aliases: ["dep"],
  
  description: "Deposit your coins to Bank!",

  async execute(message) {
let gprefix = await db.fetch(`gprefix_${message.guild.id}`)
  let user = message.author;

  let member = db.fetch(`money_${user.id}`)
  let member2 = db.fetch(`bank_${user.id}`)

  let args = message.content
 .split(" ")
 .slice(1)

 let i = 0

  if (args[0] == 'all') {
    let money = await db.fetch(`money_${user.id}`)
    let bank = await db.fetch(`bank_${user.id}`)

    if(money === 0) return message.channel.send(`You dont have money kiddo`)

    db.add(`bank_${user.id}`, money)
    db.subtract(`money_${user.id}`, money)
    
  message.channel.send(`You deposited  <a:ecocoins:833545755934457866>**${money}** into your bank!`)
  
  } else if (args[i] == 'max') {
    let money = await db.fetch(`money_${user.id}`)
    let bank = await db.fetch(`bank_${user.id}`)

    if(money === 0) return message.channel.send(`You dont have money kiddo`)

    db.add(`bank_${user.id}`, money)
    db.subtract(`money_${user.id}`, money)
    
  message.channel.send(`You have deposited <a:ecocoins:833545755934457866>**${money}** into your bank!`)
  
  } else {
  
  if (!args[i]) {
      return message.channel.send(`Specify an amount to deposit!`)
      .catch(err => console.log(err))
  } if (isNaN(args[i])) {
      return message.channel.send(`Thats not a number!`)
      .catch(err => console.log(err))
  }


  if (message.content.includes('-')) { 
      return message.channel.send(`You can't deposit negative money!`)
  }
  if (member < args[i]) {
      return message.channel.send(`You don't have that much money!`)
  }
   message.channel.send(`You have deposited <a:ecocoins:833545755934457866>**${args[i]}** into your bank!`)

  db.add(`bank_${user.id}`, args[i])
  db.subtract(`money_${user.id}`, args[i])
  }
}
};