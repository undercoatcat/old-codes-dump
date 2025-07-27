const Discord = require("discord.js");
const User = require('../user.js')

module.exports = {
  name: "withdraw",
  aliases: ["with"],

  async execute(message, args) {
   let user = await User.findOne({id: message.author.id})

   if (args[0].toLowerCase() === 'all') {
     if (user.bank === 0) return message.channel.send('You dont have money in your bank kiddo!')
     let bal = user.bank
     user.balance = user.balance + user.bank
     user.bank = user.bank - user.bank
     user.save();
     return message.channel.send(`Withdrew :coin:**${bal}** in your bank!`)
    } if (args[0].toLowerCase() === 'max') {
     if (user.bank === 0) return message.channel.send('You dont have money in your bank kiddo!')
     let bal = user.bank
     user.balance = user.balance + user.bank
     user.bank = user.bank - user.bank
     user.save();
     return message.channel.send(`Withdrew :coin:**${bal}** in your bank!`)
    } if (!args[0]) {
      return message.channel.send('Specify a number to withdraw')
    } if (isNaN(args[0])) {
      return message.channel.send('That doesnt seem like a number')
    } if (args[0] > user.bank) {
      return message.channel.send('You don\'t have that much money')
    }
     user.balance = user.balance + args[0]
     user.bank = user.bank - args[0]
     user.save()
     message.channel.send(`Withdrew :coin:**${args[0]}** from your bank`)
  }
}