const Discord = require('discord.js');
const client = new Discord.Client()

module.exports = {
  name: "restart",

  async execute(message) {
    
    const owner = ["772408057929662485","800765934926954507", "564853227393122307", "711097988876992582"]
    if (!owner.includes(message.author.id)) return;

    message.channel.send('Restarting...')
    client.destroy();
    client.login(process.env.token)
    message.channel.send("Restarted!")
  }
}