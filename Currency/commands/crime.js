const Discord = require("discord.js");
const db = require("quick.db");
const moment = require('moment');


module.exports = {
  name: "crime",
  description: "get coins by commiting crime!",

  async execute(message) {

let user = message.author;
let money = db.fetch(`money_${user.id}`)
 if (money < 500) return message.channel.send('You should have 500 coins in your wallet to commit a crime!')

let persons = ["robbed a bank", "killed few people for the dealer","robbed a couple on the road","sold someone's kidneys","went into area51 and told their secrets to the dealer", "black marketed games like minecraft", "robbed your relatives","nothing"]
   let person = persons[Math.floor(Math.random() * persons.length)];

  let timeout = 1800000;
   let amount = Math.floor(Math.random() * 500) + 1;

  let beg = await db.fetch(`crime_${user.id}`);
{
  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = (timeout - (Date.now() - beg));
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
    

    seconds %= 60;
    minutes %= 60;
    let Time = `${minutes} Minutes and ${seconds} Seconds`
   
    message.channel.send(`You've already commited a crime \n\ncrime again in **${Time}** !`)
  
  } else if (person === "nothing") {
     message.channel.send('You were caught and fined <a:ecocoins:833545755934457866>**500** for committing a crime!')
   db.subtract(`money_${user.id}`, 500)
   
   } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#14f6fa")
  .setDescription(`You **${person}** and got <a:ecocoins:833545755934457866>**${amount}**`);
  message.channel.send(moneyEmbed)
  db.add(`money_${user.id}`, amount)
  db.set(`crime_${user.id}`, Date.now())
    }
  }
}
}; 