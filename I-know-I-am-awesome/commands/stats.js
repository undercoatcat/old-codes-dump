const Discord = require("discord.js");
const { Client, MessageEmbed, MessageCollector, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });
client.login(process.env.TOKEN)

module.exports = {
  name: "stats",
  aliases: [],

  async execute(message) {
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;


let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

let UNKNOWNX = message.client.users.cache.get('564853227393122307')


    let embed = new Discord.MessageEmbed()
    .setColor('AQUA')
    .setAuthor(`Statistics of I know I am awesome`, message.client.user.displayAvatarURL())
    .setThumbnail(message.client.user.displayAvatarURL())
    .addField(`:crown:Owners`, `\`${UNKNOWNX.tag}\``, true)
    
    .addField(`:writing_hand:Default prefix`, `\`x!\``, true)
    .addField(`:robot:Bot Count`,`\`Total Servers: ${message.client.guilds.cache.size}\`\n\`Total Channels: ${message.client.channels.cache.size}\`\n\`Total Users: ${message.client.users.cache.size}\``, true)
    
    .addField(':timer:Uptime',`\`${uptime}\``, true)
    .addField(`:books:Library`, `\`Discord.js v${Discord.version}\``, true)
    
    message.channel.send(embed)
  } 
}