 const Discord = require('discord.js')
 const db = require('quick.db')

 module.exports = {
  name: "weekly",
  
  description: "get weekly Coins",

  async execute(message) {
 
  let author = message.author.id;
  let user = message.author;

  let timeout = 604800000;
  let amount = 1000;

  let weekly = await db.fetch(`weekly_${user.id}`);

  if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = (timeout - (Date.now() - weekly));
   
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
     let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let weeks = Math.floor(days / 7);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    days %= 7;

    let Time = `${days} days ${hours} hours, ${minutes} minutes and ${seconds} seconds`

    message.channel.send(`You've already collected your weekly reward\n\nCollect it again in **${Time}** `)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#14f6fa")
  .setDescription(`<a:ecocoins:833545755934457866>**${amount}** was added to your Wallet!`);
  message.channel.send(moneyEmbed)
  db.add(`money_${user.id}`, amount)
  db.set(`weekly_${user.id}`, Date.now())
    }
  }
};