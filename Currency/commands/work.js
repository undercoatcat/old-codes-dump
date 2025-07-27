const db = require('quick.db')
const Discord = require('discord.js')


module.exports = {
  name: "work",
  
  description: "get coins by working!",

  async execute(message) {
    let user = message.author;
    let author = await db.fetch(`work_${user.id}`)

    let timeout = 1800000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = (timeout - (Date.now() - author));
       
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
    

    seconds %= 60;
    minutes %= 60;
    let Time = `${minutes} Minutes and ${seconds} Seconds`
        message.channel.send(`You have already worked try again in **${Time}**`)
      } else {

        let replies = ['Labour','Builder','Chef','Conductor','Police','Good Hacker','Piolet']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 500) + 1;
        let embed1 = new Discord.MessageEmbed()
        .setColor("#14f6fa")
        .setDescription(`You worked as a **${replies[result]}** and earned <a:ecocoins:833545755934457866>**${amount}**!`);
        message.channel.send(embed1)
        
        db.add(`money_${user.id}`, amount)
        db.set(`work_${user.id}`, Date.now())
    }
  }
};
