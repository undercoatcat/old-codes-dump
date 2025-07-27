const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();


module.exports = {
  name: "testtrade",
  aliases: ["t"],

  async execute(message, args) {
    let user1 = message.author;
    let user2 = message.mentions.users.first();
    if (!user2) {
       return message.channel.send('Mention a correct user to trade with');
    } else if (user2.bot) {
       return message.channel.send(`You cant trade with bots!`)
     } else try {
      var playingMessage = await message.channel.send(`${user2}, ${user1.username} has invited you in trade`);
      await playingMessage.react("✅");
      await playingMessage.react("❌").then(msg =>{
setTimeout(async function(){
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
      
      collector.on("collect", async (reaction, user) => {

      switch (reaction.emoji.name) {
        case "✅": {
         reaction.users.remove(user).catch(console.error);
         if (user !== user2) return;
         playingMessage.reactions.removeAll()
         let embed = new Discord.MessageEmbed()
         .setColor('#14f6fa')
         .setTitle(`Trade between ${user1.username} and ${user2.username}`)
         .addField(`${message.author.username} is Offering:`,`\`\`\`Empty\`\`\``)
         .addField(`${user2.username} is Offering:`,`\`\`\`Empty\`\`\``)
         let msg = await message.channel.send(embed)
        }
          collector.stop();
         
          break;

        case "❌": {
          reaction.users.remove(user).catch(console.error);
          if (user !== user2) return;
          playingMessage.reactions.removeAll()
          message.channel.send(`Trade request declined`)
        }
        
          collector.stop();
          break;
        
        default:
          reaction.users.remove(user).catch(console.error);
          break;
      } 
    })

  }
}