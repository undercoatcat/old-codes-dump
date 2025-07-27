const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "open",

  async execute(message, args) {

   
    let user = message.author;
    let gift = await db.fetch(`gift_${user.id}`)
    let money = [Math.floor(Math.random() * 10000) + 1];
    if (!args[0]) return message.channel.send(`What to open?`)

    if (args[0].toLowerCase() === "giftbox") {
      if (gift < 1) return message.channel.send(`You don't have giftboxes to open`)
      message.channel.send(`Opening giftbox...`).then(msg =>{
setTimeout(async function(){
  await msg.edit(`You recieved <a:ecocoins:833545755934457866>**${money}**!`)

},3000)
})
      db.add(`money_${user.id}`, money)
      db.subtract(`gift_${user.id}`, 1)
    }
  }
}