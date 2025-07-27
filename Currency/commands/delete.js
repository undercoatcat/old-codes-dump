const Discord = require("discord.js");
const db = require("quick.db");


module.exports = {
  name: "delete",
  aliases: ["del"],
  
  description: "Deposit your coins to Bank!",

  async execute(client, message, args) {

   
    let userx = message.mentions.members.first() 
    let deeramount = db.fetch(`deer_${userx.id}`)
    let moneyamount = db.fetch(`money_${userx.id}`)
    let bankamount = db.fetch(`bank_${userx.id}`)
    let huntamount = db.fetch(`huntingrifle_${userx.id}`)
    let fishamount = db.fetch(`fishingrod_${userx.id}`)
    let rabbitamount = db.fetch(`rabbit_${userx.id}`)
    let fish = db.fetch(`fish_${userx.id}`)
    let padlockamount = db.fetch(`pad_${userx.id}`)
    let giftamount = db.fetch(`gift_${userx.id}`)
    let trophyamount = db.fetch(`trophy_${userx.id}`)
   


     try {
      var playingMessage = await message.channel.send(`Are you sure to delete ${userx}'s account?`);
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

        db.subract(`deer_${userx.id}`, deeramount)
  db.subtract(`money_${userx.id}`, moneyamount)
  db.subract(`bank_${userx.id}`, bankamount)
  db.subract(`deer_${userx.id}`, deeramount)
   db.subract(`rabbit_${userx.id}`, rabbitamount)
   db.subract(`huntingrifle_${userx.id}`, huntamount)
   db.subtract(`fishingrod_${userx.id}`, fishamount)
   db.subtract(`fish_${userx.id}`, fish)
   db.subtract(`pad_${userx.id}`, padlockamount)
   db.subtract(`gift_${userx.id}`, giftamount)
   db.subtract(`trophy_${userx.id}`, trophyamount)
   db.delete(`start_${userx.id}`, true)



   message.channel.send(`Successfully deleted ${userx}'s account!'`)
        }
          collector.stop();
          break;
      

        case "❌": {
          reaction.users.remove(user).catch(console.error);
          if (user !== message.author) return;
          playingMessage.reactions.removeAll()
          message.channel.send(`Aborted!`)
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