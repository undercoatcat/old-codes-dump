const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "balance",
  aliases: ["bal"],
  description: "shows balance of the user!",

 async execute(message, data, client) {
    let member = message.mentions.users.first() || message.author;

    let ban = db.fetch(`balance_${message.channel.id}`)

  if(ban === true) { return message.channel.send("This command is disabled for this channel!")
  } else {


  let bal = db.fetch(`money_${member.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${member.id}`)
  if (bank === null) bank = 0;

  let op =  Math.floor(bal + bank);

 
  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#14f6fa")
  .setThumbnail("https://i.imgur.com/1P0NRVg.png")
  .setDescription(`**${member.username}'s Balance**`)
  .addField('<a:ecocoins:833545755934457866>**Wallet**',`\`${bal}\``, true)
  .addField('<a:ecocoins:833545755934457866>**Bank**',`\`${bank}\``, true)
  .addField('<a:ecocoins:833545755934457866>**Net Worth**',`\`${op}\``, true)
  message.channel.send(moneyEmbed)
  }
}
};