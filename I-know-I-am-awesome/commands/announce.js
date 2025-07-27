const Discord = require('discord.js');

module.exports = {
  name: "announce",
  
    async execute(message, args) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send(`You are not so powerful to do that it requires manage messages permission!`)
      }
       let channel =
        message.mentions.channels.first()
      if (!channel)
        return message.channel.send(
          `You did not mention a channel!`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("You did not specify your message");
        channel
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send("I dont have permissions to send something on that channel!"))
        .then(() => message.channel.send(`Announced a message to **${channel.name}**`));
    }
}