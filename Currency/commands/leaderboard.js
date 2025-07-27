const Discord = require("discord.js");
const db = require('quick.db');
const client = new Discord.Client();
client.login(process.env.token);

module.exports = {
   name: 'leaderboard',
   aliases: ['lb'],
 
  async execute( message, args, functions) {

    if (!args[0]) {
    let embed1 = new Discord.MessageEmbed()
    .setTitle('LeaderBoards')
    .addField('Coins Leaderboard','`.leaderboard coins`')
    .addField('Redeem Leaderboard','`.leaderboard redeem`')
    message.channel.send(embed1)

  } else if (args[0].toLowerCase() === "coins") {

let money = await db.all().filter(a => a.ID.startsWith("money_"))
money.sort((a, b) => (a.data < b.data) ? 1 : -1);
money.length = 10;
let data = "";
for(let i=0;i<money.length;i++){
  let op = money[i].ID.split('_')[1]
  let opp = await client.users.fetch(op)
  data += `\`${i+1}.\` ${opp.username} **・**     <a:ecocoins:833545755934457866>**${money[i].data}**\n`
}

let embed = new Discord.MessageEmbed()
.setTitle('Leaderboard')
.setColor(`#14f6fa`)
.setDescription(data)
return message.channel.send(embed)

  } else if (args[0].toLowerCase() === "redeem") {
    let redeem = await db.all().filter(a => a.ID.startsWith("redeem_"))
redeem.sort((a, b) => (a.data < b.data) ? 1 : -1);
redeem.length = 10;
let data = "";
for(let i=0;i<redeem.length;i++){
  let op = redeem[i].ID.split('_')[1]
  let opp = await client.users.fetch(op)
  data += `\`${i+1}.\` ${opp.username} **・**     **${redeem[i].data}**\n`
}

let embed2 = new Discord.MessageEmbed()
.setTitle('Leaderboard')
.setColor(`#14f6fa`)
.setDescription(data1)
return message.channel.send(embed2)
  }
}
}