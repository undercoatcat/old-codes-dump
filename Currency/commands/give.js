const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "give",
  
  description: "Give coins to user from your wallet!",

  async execute(message) {

  let userx = message.mentions.members.first() 
  let usera = message.mentions.users.first()
  let user2 = message.author;
  let args = message.content
 .split(" ")
 .slice(1)
 let tax = 10
   let tax1 = Math.floor(tax / 100 * args[1])
  let ok = Math.floor(args[1] - tax1)

  let member = db.fetch(`money_${message.author.id}`)

  if (!userx) {
      return message.channel.send(`Mention someone to give money!`)
  }
  if (!args[1]) {
      return message.channel.send(`Specify an amount to give`)
  }
  if (isNaN(args[1])) {
      return message.channel.send(`Thats not a number`)
  } 
  if (message.content.includes('-')) { 
      return message.channel.send(`You can't give negative money!`)
  }
  if (member < args[1]) {
      return message.channel.send(`You don't have that much money!`)
  }
  if (10000 > args[1]) { tax =  0;
  }
  if (10000 < args[1] ) { tax =  Math.floor(Math.random() * 5) + 1;
  }
   if (25000 < args[1] ) { tax =  Math.floor(Math.random() * 15) + 1;
  }
   if (50000 < args[1] ) { tax =  Math.floor(Math.random() * 20) + 1;
  } 
  if (100000 < args[1] ) { tax =  Math.floor(Math.random() * 25) + 1;
  } 
  if (10000000000000 < args[1] ) { tax =  Math.floor(Math.random() * 50) + 1;
  }
  else try {
      var playingMessage = await message.channel.send(`Are you sure to give ${args[1]} to ${usera.username}?`);
      await playingMessage.react("✅");
      await playingMessage.react("❌").then(msg =>{
setTimeout(async function() {
  await playingMessage.reactions.removeAll()
},30000)
})

  } catch (error) {
      console.error(error);
    }
 
    
    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: 30000
      });
      
    

  collector.on("collect", (reaction, user) => {

      switch (reaction.emoji.name) {
        case "✅": {
         reaction.users.remove(user).catch(console.error);
         if (user !== message.author) return;
         playingMessage.reactions.removeAll()
let okk = Math.floor(args[1] - ok)

        db.add(`money_${userx.id}`, ok)
  db.subtract(`money_${message.author.id}`, args[1])
  db.add("money_474529598504304641", okk)
   message.channel.send(`You gave ${args[1]} to ${usera.username} at the tax rate of **${tax}%**!`)
        }
          collector.stop();
          break;
      

        case "❌": {
          reaction.users.remove(user).catch(console.error);
          if (user !== message.author) return;
          playingMessage.reactions.removeAll()
          message.channel.send(`Canceled!`)
        }
          collector.stop();
          break;
        
        default:
          reaction.users.remove(user).catch(console.error);
          break;
          playingMessage.reactions.removeAll()
      } 
    })
  }
}
//db.add(`money_${user.id}`, ok)
  //db.subtract(`money_${message.author.id}`, args[1])
   //message.channel.send(`You gave ${args[1]} to ${user} at the tax rate of **${tax}%**!`)