const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: "shop",
  
  description: "Shows bot shop",

  async execute(message, args) {
    let user = message.author;
    let items = ["1","2"]

    let embed = new Discord.MessageEmbed()
    .setTitle(`Shop`)
    .setDescription("**Padlock:** <a:ecocoins:833545755934457866>12000\n`.buy padlock`\n\n**Flex trophy:** <a:ecocoins:833545755934457866>1000000\n`.buy flex-trophy`\n\n**Hunting Rifle:** <a:ecocoins:833545755934457866>15000\n`.buy huntingrifle`")
    .setColor("#14f6fa")

    if (args[0] === (items)) { return message.channel.send('wrong!')
    } else if (user.bot) {return message.channel.send('You are a bot!')
    } else try{

    

  var playingMessage = await message.channel.send(embed);
      await playingMessage.react("⬅");
      await playingMessage.react("➡").then(msg =>{
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
      
      collector.on("collect", (reaction, user) => {
        if (reaction.emoji.name === "➡") {
          reaction.users.remove(user).catch(console.error);


          

         let embed1 = new Discord.MessageEmbed()
         .setColor('#14f6fa')
         .setTitle(`Shop`)
         .setDescription("**Fishing Rod:** <a:ecocoins:833545755934457866>12000\n`.buy fishingrod` ")

         
        
    
         playingMessage.edit(embed1)
        } else if (reaction.emoji.name === "⬅" ) {

  
          reaction.users.remove(user).catch(console.error);

           
         
          playingMessage.edit(embed)
        } else {
      
        
      
        collector.on('end', collected => {
          playingMessage.reactions.removeAll();
        })
        }
         
          
      })
    }
      
  }