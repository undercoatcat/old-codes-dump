const Discord = require('discord.js')
const client = new Discord.Client()
client.login(process.env.token)

module.exports = {
  name: "ping",

 execute(message) {
      message.channel.send(`Pong! Api latency is **${Math.round(message.client.ws.ping)}ms**`).catch(console.error);
    }
  };