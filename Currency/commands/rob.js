const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "rob",
  description: "get coins by robbing someone!",

  async execute(message) {

    let conditions = ["You robbed", "failed", "Sucessfully robbed"];
    let condition = conditions[Math.floor(Math.random() * conditions.length)]; 
    let sender = message.author
let user = message.mentions.members.first()
if(!user) return message.channel.send('Pls mention a user to rob!') 
let targetuser = await db.fetch(`money_${user.id}`)
let author = await db.fetch(`rob_${sender.id}`)
let author2 = await db.fetch(`money_${sender.id}`)
let pad = await db.fetch(`pad_${user.id}`)


let timeout = 300000; 
  if (author !== null && timeout - (Date.now() - author) > 0) {
    let time = (timeout - (Date.now() - author));
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
    
    seconds %= 60;
    minutes %= 60;
    let Time = `${minutes} Minutes and ${seconds} Seconds`

    message.channel.send(`You have already robbed someone! Pls try again in **${Time}**`)
  } else {
    if (author2 < 1500) {
    return message.channel.send(`You need atleast <a:ecocoins:833545755934457866>**1500** in your wallet to rob someone!`)

}
if (targetuser < 500) {
    return message.channel.send(`The user has less than <a:ecocoins:833545755934457866>**500** with them so no use of robbing.`)
} else if (pad > 0) {
  let random1 = Math.floor(Math.random() * author2) + 1;
  let sender1 = message.author
let user1 = message.mentions.members.first()
    message.channel.send(`The user knew you were gonna rob so they setted up padlock mwahahah u were fined <a:ecocoins:833545755934457866>**${random1}** for attempting rob`)
   db.subtract(`money_${sender1.id}`, random1)
db.add(`money_${user1.id}`, random1)
   db.subtract(`pad_${user1.id}`, 1)

}  else if (condition === "failed") {
  let fine = Math.floor(Math.random() * author2) + 1;
     message.channel.send(`You were caught while robbing and was fined <a:ecocoins:833545755934457866>**${fine}** for robbing!!`)
   db.subtract(`money_${sender.id}`, fine)
   db.add(`money_${user.id}`, fine)

} else {
 let random = Math.floor(Math.random() * targetuser) + 1; 

let embed = new Discord.MessageEmbed()
.setDescription(`${condition} ${user} and got away with <a:ecocoins:833545755934457866>**${random}**`)
.setColor("#14f6fa")
message.channel.send(embed)

db.subtract(`money_${user.id}`, random)
db.add(`money_${sender.id}`, random)
db.set(`rob_${sender.id}`, Date.now())
}
}
}
};