const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "hunt",
  
  description: "Earn coins by Hunting!",

  async execute(message) {

  let user = message.author; 
  let hunt = await db.fetch(`hunt_${user.id}`);
  let animals = ["deer","rabbit","nothing"]
  let animal = animals[Math.floor(Math.random() * animals.length)];
 
 
  let huntingrifle = db.fetch(`huntingrifle_${user.id}`)
  if (huntingrifle === null) return message.channel.send(`You don't have a hunting rifle to hunt!`)
  let timeout = 60000;

  
    if (hunt !== null && timeout - (Date.now() - hunt) > 0) {
    let time = (timeout - (Date.now() - hunt));
   
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
     

    seconds %= 60;
    minutes %= 60;
    
    let Time = ` ${minutes} minutes and ${seconds} seconds`
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#14f6fa")
    .setDescription(`Pls wait **${Time}** to hunt again!`);
    message.channel.send(timeEmbed)
    } else if (animal === "nothing") {
    let embed = new Discord.MessageEmbed()
      .setColor('#14f6fa')
      .setDescription(`You went hunting in woods and bought nothing!`)
    
    message.channel.send(embed)
  } else{
      let embed = new Discord.MessageEmbed()
      .setColor('#14f6fa')
      .setDescription(`You went to hunting in the wood and bought back a **${animal}**!`)
  db.add(`${animal}_${user.id}`, 1)
  message.channel.send(embed)
   db.set(`hunt_${user.id}`, Date.now())
    }
  
}
};