
const Discord = require('discord.js');

module.exports = {
  name: "stats",
 
  description: "no thing",
  async execute(message) {
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;


let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;


    let embed = new Discord.MessageEmbed()
    .setColor(`#14f6fa`)
    .setAuthor(`Statistics of Ecoclyde`, message.client.user.displayAvatarURL())
    .setThumbnail(message.client.user.displayAvatarURL())
    .addField(`Owners`, `\`Rítesh#2047\`\n\`Serena#8767\``, true)
    .addField(`Library  :books:`, `\`Discord.js v${Discord.version}\``, true)
    .addField(`Default prefix`, `\`.\``, true)
    .addField(`Bot Count`,`\`Total Servers: ${message.client.guilds.cache.size}\`\n\`Total Users: ${message.client.users.cache.size}\`\n\`Total Channels: ${message.client.channels.cache.size}\``, true)
    
    .addField('Uptime',`\`${uptime}\``, true)
    
    message.channel.send(embed)
  }
}
