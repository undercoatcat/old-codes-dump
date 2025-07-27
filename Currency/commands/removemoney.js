const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "remove-bal",
  
  description: "remove coins from user's balance",

  async execute(message) {

  let owner = ['772408057929662485','800765934926954507', '564853227393122307', "711097988876992582"]
 if (owner.includes(message.author.id)) {
  let args = message.content
 .split(" ")
 .slice(1)

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
     let bal = await db.fetch(`money_${user.id}`)
    db.subtract(`money_${user.id}`, args[1])
   let bal1 = [Math.floor(bal - args[1])]

    let moneyEmbed = new Discord.MessageEmbed()
    .setColor("#14f6fa")
    .setDescription(`Removed <a:ecocoins:833545755934457866>**${args[1]}** from ${user}'s balance!\n\nNew Balance: <a:ecocoins:833545755934457866>**${bal1}**`);
    message.channel.send(moneyEmbed)

} else {
  if (message.author.id !== owner)
      return message.channel.send(`you are not the owner of the bot!`)
    }
}
};