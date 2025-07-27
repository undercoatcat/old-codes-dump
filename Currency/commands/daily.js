 const Discord = require('discord.js')
 const db = require('quick.db')

 module.exports = {
  name: "daily",
  
  description: "get Daily Coins",

  async execute(message) {
 
  let author = message.author.id;
  let user = message.author;

  let timeout = 86400000;
  let amount = 500;

  let daily = await db.fetch(`daily_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = (timeout - (Date.now() - daily));
   
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
     let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    let Time = `${hours} hours, ${minutes} minutes and ${seconds} seconds`

    message.channel.send(`You've already collected your daily reward\n\nCollect it again in **${Time}** `)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#14f6fa")
  .setDescription(`<a:ecocoins:833545755934457866>**${amount}** was added to your Wallet!`);
  message.channel.send(moneyEmbed)
  db.add(`money_${user.id}`, amount)
  db.set(`daily_${user.id}`, Date.now())
    }
  }
};

//https://www.patreon.com/user?u=55018363