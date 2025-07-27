const db = require("quick.db");
const Discord = require('discord.js');

module.exports = {
  name: "slot",
 aliases: ["slots"],
  description: "no thing",
  async execute(message) {

let user = message.author;
let author = await db.fetch(`slot_${user.id}`)
    let moneydb = await db.fetch(`money_${user.id}`)
    let bank = await db.fetch(`bank_${user.id}`)
    let total = [Math.floor(bank + moneydb)]
    let args = message.content
 .split(" ")
 .slice(1)

const slotItems = [":grapes:", ":watermelon:", ":apple:", ":strawberry:", ":cherries:"];

    let money = parseInt(args[0]);
    let win = false;


let timeout = 10000;

    let slot = await db.fetch(`slot_${user.id}`);
  if (!args[0]) { return message.channel.send("Tell the amount!")
  } else if (slot !== null && timeout - (Date.now() - slot) > 0) {
    let time = (timeout - (Date.now() - slot));
   
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
    

    seconds %= 60;
    minutes %= 60;
   
    let Time = `${seconds} seconds`

    return message.channel.send(`Pls wait **${Time}** to use slot command again!`)
  } else {
  
  if (total > 10000000) {
    return message.channel.send(`:x: You are too rich, the gamblers are jealous of you so no gamble for you sorry`);
  } if (!money) {
    return message.channel.send(`Specify an amount to insert in slot machine!`);
  } if (money > moneydb) {
    return message.channel.send(`:x: You are betting more than you have`);
  } if (money > 500000) {
    return message.channel.send(`:x: You can only bet till 500k`);
  }
  }
        db.set(`slot_${user.id}`, Date.now())

  let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    let slotsEmbed2 = new Discord.MessageEmbed()
            .setDescription(` <a:slots:843034363942666241> | <a:slots:843034363942666241> | <a:slots:843034363942666241>`)
            .setColor("#14f6fa")
  
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won  <a:ecocoins:833545755934457866> **${money}** coins`)
            .setColor("#14f6fa")
        message.channel.send(slotsEmbed2).then(msg =>{
setTimeout(async function(){
  await msg.edit(slotsEmbed1)

},3000)
})
        db.add(`money_${user.id}`, money)
        db.set(`slot_${user.id}`, Date.now())
       
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost <a:ecocoins:833545755934457866>**${money}**`)
            .setColor("#14f6fa")
        message.channel.send(slotsEmbed2).then(msg =>{
setTimeout(async function(){
  await msg.edit(slotsEmbed)

},3000)
})
        db.subtract(`money_${user.id}`, money)
        db.set(`slot_${user.id}`, Date.now())
        
      
    } 
     
}
};