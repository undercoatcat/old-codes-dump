const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "fish",
  
  description: "Earn coins by Hunting!",

  async execute(message) {

  let user = message.author; 
  let fishcmd = await db.fetch(`fishcmd_${user.id}`);
  
 
 let amount = [Math.floor(Math.random() * 3) + 1];
 

 
  let fishingrod = db.fetch(`fishingrod_${user.id}`)
  if (fishingrod === null) return message.channel.send(`You don't have a Fishing rod to fish!`)
  let timeout = 90000;

  
    if (fishcmd !== null && timeout - (Date.now() - fishcmd) > 0) {
    let time = (timeout - (Date.now() - fishcmd));
   
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
     

    seconds %= 60;
    minutes %= 60;
    
    let Time = ` ${minutes} minutes and ${seconds} seconds`
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#14f6fa")
    .setDescription(`Pls wait **${Time}** to Fish again!`);
    message.channel.send(timeEmbed)

    }else{
      let embed = new Discord.MessageEmbed()
      .setColor('#14f6fa')
      .setDescription(`You went to Fishing an bought back **${amount} Fishes!**`)
  db.add(`fish_${user.id}`, amount)
  message.channel.send(embed)
   db.set(`fishcmd_${user.id}`, Date.now())
    }
  
}
};