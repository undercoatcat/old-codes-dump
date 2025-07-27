const Discord = require('discord.js')
const client = new Discord.Client()
client.login(process.env.TOKEN)

module.exports = {
  name: "ping",
  aliases: ['latency', 'ms'],

  async execute(message) {
    message.channel.send(`Pong! :ping_pong: Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${client.ws.ping}ms`)
  }
}