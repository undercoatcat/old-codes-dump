const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "add-money",
  
  description: "add coins to user's balance",

  async execute(message, data, client) {

  let ownerID = ['772408057929662485', "800765934926954507", '564853227393122307', "711097988876992582"]
  if(ownerID.includes(message.author.id)) {
  let args = message.content
 .split(" ")
 .slice(1)
  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.add(`money_${user.id}`, args[1])
    let bal = await db.fetch(`money_${user.id}`)

    let moneyEmbed = new Discord.MessageEmbed()
    .setColor("#14f6fa")
    .setDescription(`<@${message.author.id}> Added <a:ecocoins:833545755934457866> **${args[1]}** to ${user}'s balance!\n\nNew Balance: :coin: **${bal}**`);
    message.channel.send(moneyEmbed)
  } else {
    if (message.author.id !== ownerID) return;
  }

}
};