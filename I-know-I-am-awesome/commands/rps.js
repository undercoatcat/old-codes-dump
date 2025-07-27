const Discord = require('discord.js');

module.exports = {
  name: "rps",

  async execute(message, args) {

        const acceptedReplies = ['rock', 'paper', 'scissors'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];

        const choice = args[0];
        if (!choice) return message.channel.send(`How to play: \`x!rps <rock|paper|scissors>\``);
        if (!acceptedReplies.includes(choice)) return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
        if (result === choice) {
          let embed = new Discord.MessageEmbed()
        .setTitle('RPS result')
        .setColor('#14f6fa')
        .setDescription(`You chose **${args.join(" ")}**\nI chose **${result}**\n\n**Winner**\nIt was a tie`)
        return message.channel.send(embed)
        }
      
        switch (choice) {
            case 'rock': {
                if (result === 'paper') {
          let embed = new Discord.MessageEmbed()
        .setTitle('RPS result')
        .setColor('#14f6fa')
        .setDescription(`You chose **${args.join(" ")}**\nI chose **${result}**\n\n**Winner**\nI won`)
        return message.channel.send(embed)
        } else {
          let embed = new Discord.MessageEmbed()
        .setTitle('RPS result')
        .setColor('#14f6fa')
        .setDescription(`You chose **${args.join(" ")}**\nI chose **${result}**\n\n**Winner**\nYou won`)
        return message.channel.send(embed)
        }
            }
            case 'paper': {
                if (result === 'scissors') {
          let embed = new Discord.MessageEmbed()
        .setTitle('RPS result')
        .setColor('#14f6fa')
        .setDescription(`You chose **${args.join(" ")}**\nI chose **${result}**\n\n**Winner**\nI won`)
        return message.channel.send(embed)
        } else {
          let embed = new Discord.MessageEmbed()
        .setTitle('RPS result')
        .setColor('#14f6fa')
        .setDescription(`You chose **${args.join(" ")}**\nI chose **${result}**\n\n**Winner**\nYou won`)
        return message.channel.send(embed)
        }        
            }
            case 'scissors': {
                if (result === 'rock') {
          let embed = new Discord.MessageEmbed()
        .setTitle('RPS result')
        .setColor('#14f6fa')
        .setDescription(`You chose **${args.join(" ")}**\nI chose **${result}**\n\n**Winner**\nI won`)
        return message.channel.send(embed)
        } else {
          let embed = new Discord.MessageEmbed()
        .setTitle('RPS result')
        .setColor('#14f6fa')
        .setDescription(`You chose **${args.join(" ")}**\nI chose **${result}**\n\n**Winner**\nYou won`)
        return message.channel.send(embed)
        }
            }
            default: {
                return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
            }
        }
    }
  }