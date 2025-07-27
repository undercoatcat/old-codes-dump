const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "item",
  aliases: ["info"],
  description: "shows inventory of the user!",

 async execute(message, args) {
    
    let items = ["trophy","padlock","huntingrifle"]
    let op = "ok"
    let trophy = "A flex material used to flex over normies who can\'t afford this."
    let padlock = "An item used to save your money from pesky robbers, buy them and be saved from robbers."
    let giftbox = "Open it and get random coins!"
    if(args[0].toLowerCase() === "trophy" || args[0] === "Trophy") { op = trophy
     } else if (args[0].toLowerCase() === "padlock" || args[0] === "Padlock") { op = padlock
     } else if (args[0].toLowerCase() === "Giftbox" || args[0] === "giftbox") { op = giftbox
     }
     if(args[0].toLowerCase() === "trophy" || args[0] === "Trophy") { op1 = `**<a:ecocoins:833545755934457866>1 mil**`
     } else if (args[0].toLowerCase() === "padlock" || args[0] === "Padlock") { op1 = '<a:ecocoins:833545755934457866>**12k**'
     } else if (args[0].toLowerCase() === "Giftbox" || args[0] === "giftbox") { op1 = '**Get this item while begging**'
     }

    if(!args[0]) {
      return message.channel.send('Name an item to info!')
    }
      let embed = new Discord.MessageEmbed()
      .setTitle(args[0])
      .setColor('#14f6fa')
      .setDescription(op + '\n\nPrice: ' + op1);
      return message.channel.send(embed);
     
  }
};