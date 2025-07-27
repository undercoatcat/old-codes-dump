const Discord = require('discord.js')
const db = require('quick.db')


module.exports = {
  name: "redeem",
  aliases: ["r"],
  description: "redeem anything of you choice!",
  async execute(message, args) {
    let user = message.author;
    let redeem = db.fetch(`redeem_${user.id}`)
    if (redeem === null) redeem = 0

    if (!args[0]) {
      let embed = new Discord.MessageEmbed()
      .setColor('#14f6fa')
      .setTitle(`You Redeems: ${redeem}`)
      .setDescription("`.redeem <item>`: Redeem any item of you choice! You use your 1 redeem for redeeming an item.\n`.redeem money`: To redeem 5000 Coins!")
      message.channel.send(embed)
    } else if (args[0].toLowerCase() === "padlock") {
      if (redeem === 0) return message.channel.send("You don't have enough redeems to do that!")
      db.subtract(`redeem_${user.id}`, 1)
      db.add(`pad_${user.id}`, 1)

      message.channel.send(`Congratulations <@${message.author.id}>! You used your 1 Redeem and got a **Padlock!**`)

    }  else if (args[0].toLowerCase() === "huntingrifle") {
      if (redeem === 0) return message.channel.send("You don't have enough redeems to do that!")
      db.subract(`redeem_${user.id}`, 1)
      db.add(`huntingrifle_${user.id}`, 1)
      message.channel.send(`Congratulations <@${message.author.id}>! You used your 1 Redeem and got a **Hunting Rifle!**`)

    }  else if (args[0].toLowerCase() === "fishingrod") {
      if (redeem === 0) return message.channel.send("You don't have enough redeems to do that!")
      db.subtract(`redeem_${user.id}`, 1)
      db.add(`huntingrifle_${user.id}`, 1)
      message.channel.send(`Congratulations <@${message.author.id}>! You used your 1 Redeem and got a **Fishing Rod!**`)

    }  else if (args[0].toLowerCase() === "giftbox") {
      if (redeem === 0) return message.channel.send("You don't have enough redeems to do that!")
      db.subtract(`redeem_${user.id}`, 1)
      db.add(`gift_${user.id}`, 1)
      message.channel.send(`Congratulations <@${message.author.id}>! You used your 1 Redeem and got a **Gift Box!**`)

    }  else if (args[0].toLowerCase() === "flex trophy") {
      if (redeem === 0) return message.channel.send("You don't have enough redeems to do that!")
      db.subtract(`redeem_${user.id}`, 1)
      db.add(`trophy_${user.id}`, 1)
      message.channel.send(`Congratulations <@${message.author.id}>! You used your 1 Redeem and got a **Flex Trophy!**`)

    }  else if (args[0].toLowerCase() === "deer") {
      if (redeem === 0) return message.channel.send("You don't have enough redeems to do that!")
      db.subtract(`redeem_${user.id}`, 1)
      db.add(`deer_${user.id}`, 1)
      message.channel.send(`congratulations <@${message.author.id}>! You used your 1 Redeem and got a **Deer!**`)

    } else if (args[0].toLowerCase() === "fish") {
      if (redeem === 0) return message.channel.send("You don't have enough redeems to do that!")
      db.subtract(`redeem_${user.id}`, 1)
      db.add(`fish_${user.id}`, 1)
      message.channel.send(`Congratulations <@${message.author.id}>! You used your 1 Redeem and got a **Fish!**`)

    } else if (args[0].toLowerCase() === "rabbit") {
      if (redeem === 0) return message.channel.send("You don't have enough redeems to do that!")
      db.subtract(`redeem_${user.id}`, 1)
      db.add(`fish_${user.id}`, 1)
      message.channel.send(`Congratulations <@${message.author.id}>! You used your 1 Redeem and got a **Rabbit!**`)
    } else if (args[0].toLowerCase() === "money") {
      if (redeem === 0) return message.channel.send("You don't have enough redeems to do that!")
      db.subtract(`redeem_${user.id}`, 1)
      db.add(`money_${user.id}`, 5000)
      message.channel.send(`Congratulations <@${message.author.id}>! You used your 1 Redeem and got **5000 money!00**`)
    }
  }
}
      



