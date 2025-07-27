const User = require('../user.js')
const Discord = require('discord.js')


module.exports = {
  name: "work",
  description: "Get coins by working",

  async execute(message) {
    let user = message.author;
    let author = await User.findOne({id: message.author.id})

        let replies = ['gamer', 'coder', 'cosplayer', 'youtuber', 'labour', 'farmer']

        let result = Math.floor(Math.random() * replies.length);
        let amount = Math.floor(Math.random() * 1000) + 1;
        let embed1 = new Discord.MessageEmbed()
        .setColor("#14f6fa")
        .setDescription(`You worked as a **${replies[result]}** and earned :coin:**${amount}**!`);
        message.channel.send(embed1)
        
        author.balance = author.balance + amount
        author.save();
  }
};
