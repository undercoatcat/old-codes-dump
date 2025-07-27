const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "inventory",
  aliases: ["inv"],
  description: "shows inventory of the user!",

 async execute(message, data, client) {
    let user = message.author;

  let pad = db.fetch(`pad_${user.id}`)

  if (pad === null) pad = 0;

  let trophy = await db.fetch(`trophy_${user.id}`)
  if (trophy === null) trophy = 0;

  let giftbox = db.fetch(`gift_${user.id}`)
  if(giftbox === null) giftbox = 0;

   let deer = db.fetch(`deer_${user.id}`)
  if(deer === null) deer = 0;

    let fish = db.fetch(`fish_${user.id}`)
  if(fish === null) fish = 0;

   let rabbit = db.fetch(`rabbit_${user.id}`)
  if(rabbit === null) rabbit = 0;

  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#14f6fa")
  .setTitle(`Inventory of ${user.username}`)
  .setDescription(`**Padlocks:** ${pad}\n**Flex Trophies:** ${trophy}\n**Giftboxs:** ${giftbox}\n**Deers:** ${deer}\n**Rabbits:** ${rabbit}\n**Fishes:** ${fish}`);
  message.channel.send(moneyEmbed)
}
};