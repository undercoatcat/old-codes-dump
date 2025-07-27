const Discord = require('discord.js');

module.exports = {
  name: "ban",
  aliases: "suspend",

  async execute(message, args) {
    let reason = args.slice(1).join(" ")
 if(!args[0]) reason = `Not specified`

		const user = message.mentions.users.first();
		if (user) {
			const member = message.guild.members.resolve(user);
			if (member) {
				if (!message.member.hasPermission('BAN_MEMBERS')) {
					return message.channel.send(
						"What are you thinking? You don't have permission to do that."
					);
				}
				member
					.ban({
						reason: `${reason}`
					})
					.then(() => {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Banned ${user.username}`)
            .setColor('#ae86')
            .setDescription(`<a:tick:810040940730908694> Successfully banned **${user.tag}**\n\n**Reason -**\n${reason}`)
            .setFooter(`User id - ${member.id} • Moderator id - ${message.author.id}`)
						message.channel.send(embed);
					})
					.catch(err => {
						message.channel.send('Sorry but I was unable to ban the member');
						console.error(err);
					});
		} else if (!user) return message.channel.send('mention a user!')
	  	}
    }
  }