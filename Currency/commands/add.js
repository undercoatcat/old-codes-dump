const Discord = require("discord.js");
const db = require("quick.db");


module.exports = {
  name: "add",
  
  description: "add coins to user's balance",

  async execute(message, data, client) {

  let ownerID = ['772408057929662485', "800765934926954507", "711097988876992582", "564853227393122307"]
  if(ownerID.includes(message.author.id)) {
  let args = message.content
 .split(" ")
 .slice(1)
  let user = args[1]
  let user2 = message.author;
  if (!args[0]) return message.channel.send('Pls tell what to add!')
  let amount = args[2]
  if (!amount)  return message.channel.send('Pls tell the amount!')
  let op = message.client.users.cache.get(user)

  if (message.content.includes('-')) { return message.channel.send("You can't add negave amount!")
  }

  if (args[0].toLowerCase() === "redeem") {
    db.add(`redeem_${user}`, amount)
    message.channel.send(`Added ${amount} Redeem to **${op.username}'s** account!`)

  } else if (args[0].toLowerCase() === "padlock") {
  db.add(`pad_${user.id}`, amount)
    message.channel.send(`Added ${amount} Padlock to **${op.username}'s** account!'`) 

  } else if (args[0].toLowerCase() === "huntingrifle") {
  db.add(`huntingrifle_${user}`, amount)
    message.channel.send(`Added ${amount} Hunting Rifle to **${op.username}'s** account!`) 

  } else if (args[0].toLowerCase() === "fishingrod") {
  db.add(`fishingrod_${user}`, amount)
    message.channel.send(`Added ${amount} Fishing Rod to **${op.username}'s** account!`) 

 } else if (args[0].toLowerCase() === "giftbox") {
  db.add(`gift_${user}`, amount)
    message.channel.send(`Added ${amount} Gift Box to **${op.username}'s** account!`) 

    } else if (args[0].toLowerCase() === "money") {
  db.add(`money_${user}`, amount)
    message.channel.send(`Added ${amount} Money to **${op.username}'s** account!`) 
    }
  }
  }
}
    
  
  
  

  
  

 


  