const { Client, Collection } = require("discord.js");
const Discord = require('discord.js')
const db = require('quick.db');
const { readdirSync } = require("fs");
const { join } = require("path");
const {PREFIX} = require('./config.json')
const DBL = require('dbl-api')
const dbl = new DBL(process.env.top);

const webhook = new Discord.WebhookClient("851311143753875526","oRGYOdRKaWaATustunxmJpg19ea2godeScyLC1Arogruv1S3oKtEgPMyroFpKOJOUmOD")

//https://discord.com/api/webhooks//

const client = new Client({ disableMentions: "everyone" });
const canvas = require('canvas');


client.login(process.env.token);
client.commands = new Collection();

client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const mongoose = require("mongoose");

client.config = require('./config.json')

 mongoose.connect(`mongodb://${client.config.mongo_atlas.username}:${client.config.mongo_atlas.password}@${client.config.mongo_atlas.shard.one},${client.config.mongo_atlas.shard.two},${client.config.mongo_atlas.shard.three}/${client.config.mongo_atlas.cluster}?ssl=true&replicaSet=${client.config.mongo_atlas.cluster}-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true, useUnifiedTopology: true })

.then(async mon => {
        await console.log(`Connected to the database!`);
    }).catch((err) => {
        console.log("Unable to connect to the Mongodb Database. Error:" + err, "error")
    });

client.once('ready', () => {
  console.log('Ready!');
  let statuses = [
        `https://dsc.gg/ecoclyde`,
        
        `${PREFIX}help | @Ecoclyde`,
        `Ritesh and Serena`,
        
      ];
      

      setInterval(function () {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, { type: "LISTENING" });
     }, 7000);
});

client.on("warn", (info) => console.log(info));
client.on("error", console.error);


client.on('message', async (message) => {
  if (message.content.toLowerCase() === PREFIX + 'vote') {
  let votes1 = await db.fetch(`vote_${message.author.id}`)
  if (votes1 === null) votes1 = 0
  let voted = dbl.hasVoted(message.author.id)
  if (!voted) {
    let embed1 = new Discord.MessageEmbed()
  .setTitle('Vote')
  .setDescription(`Click [here](https://top.gg/bot/838307248324608011/vote) to vote me on top.gg!`)
  message.channel.send(embed1)
  }
}
})
  
 client.on('message', message => {
    let gprefix = db.fetch(`gprefix_${message.guild.id}`) 
  if (gprefix === null) gprefix = PREFIX
  if (message.content.toLowerCase().startsWith(`${gprefix}start`)) {
 let user = message.author;
   let blacktest = db.fetch(`suspended_${message.author.id}`)
      if(blacktest === null) {
        blacktest === false
      }
    if(blacktest === true ) { return message.channel.send("You are banned from using the bot! If you think it is mistake pls contact our staff!") }
    let start = db.fetch(`start_${user.id}`)
    if (start === true) { return message.channel.send("You have already started!");
    } else {
       let embed = new Discord.MessageEmbed()
    
    .setTitle('Welcome To Ecoclyde!')
    .setDescription(`Hey ${user}! Welcome to Ecoclyde! Here you an exciting journey with us!\nYou have been given  <a:ecocoins:833545755934457866>**500** for start bonus! To earn more type \`.help\`!`)
    .setColor('#14f6fa')
    db.add(`money_${user.id}`, 500)
    db.set(`start_${user.id}`, true)
    db.set (`st_${user.id}`, Date.now())
    message.channel.send(embed)
    }
  }
})

client.on('message', async (message) => {
  let gprefix = db.fetch(`gprefix_${message.guild.id}`) 
  if (gprefix === null) gprefix = PREFIX
  if (message.content.toLowerCase().startsWith(`${gprefix}eval`)) {
    const owner = ["772408057929662485", "800765934926954507", "564853227393122307", "711097988876992582"] 
  if (!owner.includes(message.author.id)) return;
  try {
  let result = message.content.split(" ").slice(1).join(" ")
   let evalved = await eval(`(async() => { ${result} })()`);
  message.channel.send(evalved)
  } catch (err) {
    let embed = new Discord.MessageEmbed()
    .setTitle('Error!')
    .setDescription(`\`\`\`js\n${err}\`\`\``)
    message.channel.send(embed)
  }
  }
});

client.on(`clickButton`, async(button) => {
 
      if(button.id === 'yes') {
       await  button.defer()

         return button.channel.send('success!')
      }

      if(button.id === 'no') { 
        await button.defer()

        return button.channel.send('op!')
      }
      
    })

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  let gprefix = db.fetch(`gprefix_${message.guild.id}`) 
  if (gprefix === null) gprefix = PREFIX.toLowerCase()
  let serverprefix = gprefix.toLowerCase()
  
   if (message.content.toLowerCase().indexOf(serverprefix) !== 0) return;

    const args = message.content.slice(serverprefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase(); 

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    

  if (!command) return;
  let blacktest = db.fetch(`suspended_${message.author.id}`)
      if(blacktest === null) {
        blacktest === false
      }
    if(blacktest === true ) { return message.channel.send("You are banned from using the bot! If you think it is mistake pls contact our staff!") }
 let start = db.fetch(`start_${message.author.id}`)
  if (start === null) {return message.channel.send("You haven't started yet! Type`.start` to start!")}

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(
        `Pls wait ${timeLeft.toFixed(1)} more minute(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.channel.send(`There was an error executing that command.\n Type of err: ${error.message}`).catch(console.error);
  }
});

client.on("message", async message => {
  
  let Message = message.content;
  
if(Message.startsWith(`<@!${client.user.id}>`)) return message.channel.send(`My prefix is \`${PREFIX}\`
Type \`${PREFIX}help\` for more information`)
});

client.on('message', message => {
  if (message.content.toLowerCase() === PREFIX + `uptime`) {
  let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;

let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
message.channel.send(`Bot's uptime: \`${uptime}\``)
  }
});

client.on('message', message => {
   if(message.content.toLowerCase().startsWith(PREFIX + `feedback`)) {
     let args = message.content
 .split(" ")
 .slice(1)
 if(!args[0]) return message.channel.send("the command has to be `.feedback <comment>`")

 let embed = new Discord.MessageEmbed()
 .setColor('#14f6fa')
 .setTitle(`New feedback!`)
 .setDescription(`**Given by:** ${message.author.tag}\n**User ID:** ${message.author.id}\n**From Server:** ${message.guild.name}\n**Server ID:** ${message.guild.id}`)
 .addField('Given feedback',`${args.join(" ")}`)

     client.channels.cache.get('839075879107035157').send(embed)
     message.channel.send(`📧 | Sent feedback to the staffs!`);
   }
});



var http = require('http');
http
	.createServer(function(req, res) {
		res.write("I'm online");
		res.end();
	})
	.listen(8080);