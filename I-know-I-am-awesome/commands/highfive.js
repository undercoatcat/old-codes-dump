const Discord = require('discord.js');

module.exports = {
  name: "highfive",
  aliases: "hf",

  async execute(message, args) {

    let gifs = [ `https://cdn.weeb.sh/images/r1FWFyQob.gif`, `https://cdn.weeb.sh/images/rJzn5kms-.gif`, `https://cdn.weeb.sh/images/r1MMK1msb.gif`, `https://i.pinimg.com/originals/5d/ef/be/5defbe81dc43fe590cd2d6d9a9284ae4.gif`, `https://media1.tenor.com/images/3b3b09da02749d108d425b079e173e66/tenor.gif?itemid=16832624`, `https://cdn.weeb.sh/images/HkYzKyXjW.gif`, `https://media1.tenor.com/images/943ca4571573fbbc5e0e5217e29f1785/tenor.gif?itemid=20400552`, `https://cdn.weeb.sh/images/rJenY1XsW.gif`, `https://cdn.weeb.sh/images/BJnxKJXsZ.gif`]

  let gif = gifs[Math.floor(Math.random() * gifs.length)];

      let member =
        message.mentions.users.first() || message.guild.members.cache.get(args[0])
        {
        if(!member) return message.channel.send(`You cant give highfive to nothingness!`)
        if(member.id === message.author.id) return message.channel.send('you cant give highfive to yourself')
        }
          let embed = new Discord.MessageEmbed()
          .setTitle(`${message.author.username} gives a highfive to ${member.username}`)
          .setColor('ae86')
          .setImage(gif)
          .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
          .setTimestamp();

          message.channel.send(embed);
  }
}