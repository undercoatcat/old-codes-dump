const Discord = require("discord.js");
const db = require("quick.db");
let client = new Discord.Client();

module.exports = {
  name: "help",

  async execute(message) {
     let embed = new Discord.MessageEmbed()
   .setTitle(`Help`)
  
   .setColor(`#14f6fa`)
   .setImage(`https://media1.tenor.com/images/2e5c6b482704619e79e3b2a3ef8c6e25/tenor.gif?itemid=17422882`)
   .addField(`Help 1`, `Currency commands`)
   .addField(`Help 2`, `Trading, shop, robbing and gambling commands`)
   .addField(`Help 3`, `Miscellaneous commands`)
   .addField(`\u200b`, `[Invite me](https://discord.com/oauth2/authorize?client_id=838307248324608011&permissions=3557682393&scope=bot) • [Support server](https://discord.gg/4abXQkVYqd)`)
   .setFooter(`Use prefix before every command`)
   try { 
     var playingMessage = await message.channel.send(embed);
      await playingMessage.react("1️⃣");
      await playingMessage.react("2️⃣")
      await playingMessage.react("3️⃣").then(msg =>{
setTimeout(async function(){
  await playingMessage.reactions.removeAll()
},30000)
}) 
   } catch (err) {
     console.log(err)
   }

 
    
    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: 30000
      });
      
      collector.on("collect", (reaction, user) => {
        if (reaction.emoji.name === "1️⃣") {
          if (user.id !== message.author.id) return;
          reaction.users.remove(user).catch(console.error);
          let embed1 = new Discord.MessageEmbed()
         .setColor(`#14f6fa`)
   .setTitle(`Currency help`)
   .setImage(`https://media1.tenor.com/images/2e5c6b482704619e79e3b2a3ef8c6e25/tenor.gif?itemid=17422882`)
   .addField('balance', 'Shows the current balance of the user!', true)
   .addField('work', 'Earn Coins by working!', true)
   .addField('beg', 'Earn Coins by Begging!', true)
   .addField('daily','Get your Daily Coins!', true)
   .addField('withdraw','Withdraw coins from your bank!', true)
   .addField('deposit','Deposit coins to you bank!', true)
   .addField(`weekly`, `Get weekly coins!`, true)
   .addField(`\u200b`, `[Invite me](https://discord.com/oauth2/authorize?client_id=838307248324608011&permissions=3557682393&scope=bot) • [Support server](https://discord.gg/4abXQkVYqd)`)
   .setFooter(`Use prefix before every command`)
         playingMessage.edit(embed1)
        } else if (reaction.emoji.name === "2️⃣" ) {
          if (user.id !== message.author.id) return;
          reaction.users.remove(user).catch(console.error);
          let embed2 = new Discord.MessageEmbed()
    .setColor(`#14f6fa`)
    .setImage(`https://media1.tenor.com/images/2e5c6b482704619e79e3b2a3ef8c6e25/tenor.gif?itemid=17422882`)
    .setTitle(`Trading, shop, robiing and gambling help`)
    .addField(`Trading`, `\`give\``)
    .addField(`Gambling`, `\`gamble, bet, slots, slot\``)
    .addField(`Shop`, `\`shop, buy\``)
    .addField(`Rob`, `\`rob, steal, heist, bankrob\``)
    .addField(`\u200b`, `[Invite me](https://discord.com/oauth2/authorize?client_id=838307248324608011&permissions=3557682393&scope=bot) • [Support server](https://discord.gg/4abXQkVYqd)`)
    .setFooter(`Use prefix before every command`)
          playingMessage.edit(embed2)
        } else if  (reaction.emoji.name === "3️⃣" ) {
          if (user.id !== message.author.id) return;
          reaction.users.remove(user).catch(console.error);
          let embed3 = new Discord.MessageEmbed()
    .setColor(`#14f6fa`)
    .setImage(`https://media1.tenor.com/images/2e5c6b482704619e79e3b2a3ef8c6e25/tenor.gif?itemid=17422882`)
    .setTitle(`Miscellaneous commands`)
    .addField(`stats`, `shows stats of the bot`, true)
    .addField(`help`, `get some help`, true)
    .addField(`ping`, `shows the latency of the bot`, true)
    .addField(`uptime`, `shows the uptime of the bot`, true)
    .addField(`feedback`, `Give a nice feedback to the devs ;)`, true)
    .addField(`\u200b`, `[Invite me](https://discord.com/oauth2/authorize?client_id=838307248324608011&permissions=3557682393&scope=bot) • [Support server](https://discord.gg/4abXQkVYqd)`)
    .setFooter(`Use prefix before every command`);
    playingMessage.edit(embed3)
} else {
        collector.on('end', collected => {
          playingMessage.reactions.removeAll();
        })
        }
         
          
      })
    }
      
  }