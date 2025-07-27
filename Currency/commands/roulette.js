const Discord = require("discord.js");
const db = require("quick.db");


module.exports = {
  name: "roulette",
  
  description: "Shows bot shop",

  async execute(message, args) {

  let user = message.author;

  function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}
    
let colour = args[0];
let money = parseInt(args[1]);
let moneydb = db.fetch(`money_${user.id}`)

let random = Math.floor(Math.random() * 37);

let moneyhelp = new Discord.MessageEmbed()
.setColor("#14f6fa")
.setDescription(`Specify an amount to gamble | .roulette <color> <amount>`);

let moneymore = new Discord.MessageEmbed()
.setColor("=#14f6fa")
.setDescription(`You are betting more than you have`);

let colorbad = new Discord.MessageEmbed()
.setColor("#14f6fa")
.setDescription(`Specify a color | Red [1.5x] Black [2x] Green [15x]`);


    if (!colour)  return message.channel.send(colorbad);
    colour = colour.toLowerCase()
    if (!money) return message.channel.send(moneyhelp); 
    if (money > moneydb) return message.channel.send(moneymore);
    
    if (colour == "b" || colour.includes("black")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(colorbad);
    
    
    
    if (random == 0 && colour == 2) { // Green
        money *= 15
        db.add(`money_${user.id}`, money)
        let moneyEmbed1 = new Discord.MessageEmbed()
        .setColor("#14f6fa")
        .setDescription(`<:Green:618767721361833995> You won ${money} coins\n\nMultiplier: 15x`);
        message.channel.send(moneyEmbed1)
        console.log(`${message.author.tag} Won ${money} on green`)
        db.set(`roul_${user.id}`, Date.now())
    } else if (isOdd(random) && colour == 1) { // Red
        money = parseInt(money * 1.5)
        db.add(`money_${user.id}`, money)
        let moneyEmbed2 = new Discord.MessageEmbed()
        .setColor("#14f6fa")
        .setDescription(`:red_square: You won <a:ecocoins:833545755934457866>**${money}**\n\nMultiplier: **1.5x**`);
        message.channel.send(moneyEmbed2)
        db.set(`roul_${user.id}`, Date.now())
    } else if (!isOdd(random) && colour == 0) { // Black
        money = parseInt(money * 2)
        db.add(`money_${user.id}`, money)
        let moneyEmbed3 = new Discord.MessageEmbed()
        .setColor("#14f6fa")
        .setDescription(`:black_large_square: You won <a:ecocoins:833545755934457866>**${money}**\n\nMultiplier: **2x**`);
        db.set(`roul_${user.id}`, Date.now())
        message.channel.send(moneyEmbed3)
    } else { // Wrong
        db.subtract(`money_${user.id}`, money)
        let moneyEmbed4 = new Discord.MessageEmbed()
        .setColor("#14f6fa")
        .setDescription(`:x: You lost <a:ecocoins:833545755934457866>**${money}** \n\nMultiplier: **0x**`);
        db.set(`roul_${user.id}`, Date.now())
        message.channel.send(moneyEmbed4)
    }
}
}

  
  