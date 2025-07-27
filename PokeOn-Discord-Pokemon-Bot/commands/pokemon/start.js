const Discord = require('discord.js')

module.exports = {
	name: "start",
	description: "start embed",
	category: "pokemon",
	args: false,
	usage: ["start"],
	cooldown: 3,
	permissions: [],
	execute: async (client, message, args, prefix, guild, color, channel) => {

let embed = new Discord.MessageEmbed()
embed.setTitle(`Start your pokémon journey in ${client.user.username} now!`)
embed.setDescription(`Pick a pokémon from the below list.\nType \`${guild.prefix}pick <pokémon name>\` to pick a starter pokémon!`)
.setColor('YELLOW')
.addField(`Gen 1`, `Bulbasaur・ Charmander・ Squirtle`)
.addField(`Gen 2`, `Chikorita・ Cyndaquil・ Totodile`)
.addField(`Gen 3`, `Treecko・ Torchic・ Mudkip`)
.addField(`Gen 4`, `Turtwig・ Chimchar・ Piplup`)
.addField(`Gen 5`, `Snivy・ Tepig・ Oshawott`)
.addField(`Gen 6`, `Chespin・ Fennekin・ Froakie`)
.addField(`Gen 7`, `Rowlet・ Litten・ Popplio`)
.addField(`Gen 8`, `Grookey・ Scorbunny・ Sobble`)
.setImage('https://cdn.discordapp.com/attachments/836193769589702686/855819593259941928/PicsArt_06-19-08.07.27.jpg')

message.channel.send(embed)
  }
}