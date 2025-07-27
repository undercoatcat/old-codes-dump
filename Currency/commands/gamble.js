const Discord = require("discord.js");
const db = require("quick.db");
const moment = require('moment');


module.exports = {
  name: "gamble",
  aliases: ["bet"],
  description: "get coins by gambling users!",

  async execute(message) {
    let args = message.content
 .split(" ")
 .slice(1)
    
let sender = message.author;
let user = message.mentions.users.first()
if (!user) return message.channel.send(`mention a user to gamble with!`)
let money = db.fetch(`money_${sender.id}`)
let money2 = db.fetch(`money_${user.id}`)

let wins = ["win", "lose"]
   let win = wins[Math.floor(Math.random() * wins.length)];
if (!args[1]) { return message.channel.send("Tell the amount to gamble!")
} if (args[1] > money) {
  return message.channel.send(`You don't have that much balance`)
} if (args[1] > money2) {
  return message.channel.send(`That user don't have that much balance`)
} if (isNaN(args[1])) {
    return message.channel.send(`Thats not a valid number`)
  } else try {
      var playingMessage = await message.channel.send(`${user}, ${sender.username} has invited you in <a:ecocoins:833545755934457866>**${args[1]}** gamble. accept or reject it!`);
      await playingMessage.react("✅");
      await playingMessage.react("❌")
  } catch (error) {
      console.error(error);
    }
    
    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: 30000
      });

      collector.on("collect", (reaction, user) => {

      switch (reaction.emoji.name) {
        case "✅":
         reaction.users.remove(user).catch(console.error);
         if (user !== message.mentions.users.first()) return;
         playingMessage.reactions.removeAll()
     {
    if (win === "win") {
     message.channel.send(`You joined ${sender}'s gamble!`).then(msg =>{
setTimeout(async function(){
  await msg.edit(`${sender} won <a:ecocoins:833545755934457866>**${args[1]}**`)
},2000)
db.add(`money_${sender.id}`, args[1])
  db.subtract(`money_${user.id}`, args[1])
})
   } else if (win === "lose") {
    message.channel.send(`You joined ${sender}'s gamble!`).then(msg =>{
setTimeout(async function(){
  await msg.edit(`${user} won <a:ecocoins:833545755934457866>**${args[1]}**`)

},2000)
})
  db.add(`money_${user.id}`, args[1])
  db.subtract(`money_${sender.id}`, args[1])
    }
  }

          collector.stop();
         
          break;

        case "❌": {
          reaction.users.remove(user).catch(console.error);
          if (user !== message.mentions.users.first()) return;
          playingMessage.reactions.removeAll()
          message.channel.send(`Gamble request declined!`)
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
}; 