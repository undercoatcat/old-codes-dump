const Discord = require("discord.js");
const db = require("quick.db");
const moment = require('moment');


module.exports = {
  name: "beg",
  
  description: "get coins by begging!",

  async execute(message) {

let user = message.author;

let gift = await db.fetch(`gift_${user.id}`)

let persons = ["Begger", "Jhonny","Mukesh Ambani","Bill Gates","God", "Creeper", "Your mommy", "nothing","Vian"]
   let person = persons[Math.floor(Math.random() * persons.length)];
    {
   if (person === "nothing") return message.channel.send('No begger get away')
  }

let oks = ["gift", "no gift", "no gifts", "no gifts sry", "no nothing"]
   let ok = oks[Math.floor(Math.random() * oks.length)];

  let timeout = 30000;
   let amount = Math.floor(Math.random() * 200) + 1;

  let beg = await db.fetch(`beg_${user.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = (timeout - (Date.now() - beg));
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
    

    seconds %= 60;
    minutes %= 60;
    let Time = `${minutes} Minutes and ${seconds} Seconds`
   
    message.channel.send(`You've already begged \n\nBeg again in **${Time}** !`)
  } else {
    if (ok === "gift") {
     sentence = "and a giftbox"
      db.add(`gift_${user.id}`, 1)
    }
    if (ok !== "gift") sentence = "and nothing"
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#14f6fa")
  .setDescription(`**${person}** donated you <a:ecocoins:833545755934457866>**${amount}** ${sentence}`);
  message.channel.send(moneyEmbed)
  db.add(`money_${user.id}`, amount)
  db.set(`beg_${user.id}`, Date.now())
  }
}
}