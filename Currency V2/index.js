const { Client, Collection } = require("discord.js");
const Discord = require('discord.js');
const mongoose = require('mongoose');
const { readdirSync } = require("fs");
const { join } = require("path");
const client = new Client({ disableMentions: "everyone" });
const {PREFIX} = require('./config.json')
const Usera = require('./user.js')

client.config = require('./config.json')
client.commands = new Collection();
const cooldowns = new Collection();

 mongoose.connect(`mongodb://${client.config.mongo_atlas.username}:${process.env.pass}@${client.config.mongo_atlas.shard.one},${client.config.mongo_atlas.shard.two},${client.config.mongo_atlas.shard.three}/${client.config.mongo_atlas.cluster}?ssl=true&replicaSet=${client.config.mongo_atlas.cluster}-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true, useUnifiedTopology: true })

.then(async mon => {
        await console.log(`Connected to the database!`);
    }).catch((err) => {
        console.log("Unable to connect to the Mongodb Database. Error:" + err, "error")
    });

client.once('ready', () => {
  console.log('Ready!');
});
client.on("error", console.error);

client.on('message', async (message) => {
  if (message.content.toLowerCase().startsWith(`${PREFIX}eval`)) {
    const owner = ["772408057929662485", "800765934926954507", "564853227393122307", "711097988876992582", "602829045956083733"] 
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

client.on('message', async (message) => {
  if (message.content.toLowerCase().startsWith(`${PREFIX}start`)) {

let user = await Usera.findOne({id: message.author.id})
if (user) return message.channel.send('You have started already!')
await new Usera({id: message.author.id}).save();
user = await Usera.findOne({id: message.author.id});
user.balance = user.balance + 69
user.save();

message.channel.send('You have started and got **69** coins as starting balance')
  }
});

client.on('message', async (message) => {
  if (message.content.toLowerCase().startsWith(`${PREFIX}test`)) {

const user = await Usera.findOne({id: message.author.id})
if (user) return message.channel.send('You have started already!')
new Usera({id: message.author.id}).save();
user.balance = user.balance + 69
user.save();

message.channel.send('You have started and got **69** coins as starting balance')
  }
});

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  
   if (message.content.toLowerCase().indexOf(PREFIX) !== 0) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase(); 

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    

  if (!command) return;
  const user = await Usera.findOne({id: message.author.id})
  if (!user) return message.channel.send('You havent started yet type `.start` to start the journey!')

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
        `${message.author} calm down a little you are sending commands too fast`
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

client.login(process.env.token);