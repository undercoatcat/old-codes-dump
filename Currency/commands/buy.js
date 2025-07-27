const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: "buy",
  
  description: "get coins by working!",

  async execute(message) {

    let user = message.author;

    let author = db.fetch(`money_${user.id}`)
    let args = message.content
 .split(" ")
 .slice(1)
let reply = `Go get some more money kiddo`
let reply2 = `Bought ${args[0]} for <a:ecocoins:833545755934457866>`
    if (args[0] == 'trophy') {
        if (author < 1000000) return message.channel.send(reply)
        
        db.fetch(`trophy_${user.id}`);
        db.add(`trophy_${user.id}`, 1)

        db.subtract(`money_${user.id}`, 1000000)
        message.channel.send(`${reply2}**1 million**!`)
    } else if(args[0] == 'padlock') {

        if (author < 12000) return message.channel.send(reply)
       
        db.fetch(`pad_${user.id}`)
        db.add(`pad_${user.id}`, 1)
        db.subtract(`money_${user.id}`, 12000)
        message.channel.send(`${reply2}**12k!**`)
    } else if (args[0] == 'flex-trophy') {
        if (author < 1000000) return message.channel.send(reply)
        
        db.fetch(`trophy_${user.id}`);
        db.add(`trophy_${user.id}`, 1)

        db.subtract(`money_${user.id}`, 1000000)
        message.channel.send(`${reply2}**1 million**!`)
         } else if (args[0] == 'flex-trophy') {
        if (author < 1000000) return message.channel.send(reply)
        
        db.fetch(`trophy_${user.id}`);
        db.add(`trophy_${user.id}`, 1)

        db.subtract(`money_${user.id}`, 1000000)
        message.channel.send(`${reply2}**1 million**!`)
        } else if (args[0] == 'huntingrifle') {
        if (author < 15000) return message.channel.send("You don't have enough money to purchase a hunting rifle!")
        
        db.fetch(`huntingrifle_${user.id}`);
        db.add(`huntingrifle_${user.id}`, 1)

        db.subtract(`money_${user.id}`, 15000)
        message.channel.send(`${reply2}**15000!**`)
    
    } else if (args[0].toLowerCase() == 'fishingrod') {
        if (author < 12000) return message.channel.send("You don't have enough money to purchase a Fishing Rod!")
        
        db.fetch(`fishingrod_${user.id}`);
        db.add(`fishingrod_${user.id}`, 1)

        db.subtract(`money_${user.id}`, 12000)
        message.channel.send(`${reply2}**12000!**`)
    
    } else {
        message.channel.send(`Tell the name of the item you want to buy!`)
    }

}
};