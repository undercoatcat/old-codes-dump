const Discord = require("discord.js");
const User = require('../user.js')

module.exports = {
  name: "deposit",
  aliases: ["dep"],

  async execute(message, args) {
   let user = await User.findOne({id: message.author.id})

   if (args[0].toLowerCase() === 'all') {
     if (user.balance === 0) return message.channel.send('You dont have money in your wallet kiddo!')
     let bal = user.balance
     user.bank = user.bank + user.balance
     user.balance = user.balance - user.balance
     user.save();
     return message.channel.send(`Deposited :coin:**${bal}** in your bank!`)
   } else if (args[0].toLowerCase() === 'max') {
     if (user.balance === 0) return message.channel.send('You dont have money in your wallet kiddo!')
     let bal = user.balance
     user.bank = user.bank + user.balance
     user.balance = user.balance - user.balance
     user.save();
     return message.channel.send(`Deposited :coin:**${bal}** in your bank!`)
    } else if (!args[0]) {
      return message.channel.send('Specify a number to deposit')
    } else if (isNaN(args[0])) {
      return message.channel.send('That doesnt seem like a number')
    } else if (args[0] > user.balance) {
      return message.channel.send('You don\'t have that much money')
    } 
     user.bank = user.bank + args[0]
     user.balance = user.balance - args[0]
     user.save()
     message.channel.send(`Deposited :coin:**${args[0]}** in your bank`)
  }
}