const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { PREFIX } = require("./config.json");
const client = new Client({ disableMentions: "everyone" });
const Discord = require("discord.js");

const SUSPENDED = ['']

client.on('message', message => {
   if(message.content.toLowerCase().startsWith(PREFIX + `hug`)) {
      if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
     let gifs = [ `https://media.giphy.com/media/ViKfjpmrS8Cf6/giphy.gif`, `https://media1.tenor.com/images/164411c98cd8af37d85cc1f0a7e79117/tenor.gif?itemid=4556488`, `https://media1.tenor.com/images/8a4db61a1017d08731713cb112288926/tenor.gif?itemid=16247270`, `https://media1.tenor.com/images/9eacf2912610418519fcb673e2499f47/tenor.gif?itemid=17969662`]
  let gif = gifs[Math.floor(Math.random() * gifs.length)];

      let user =
        message.mentions.users.first() 
        {
        if(!user) return message.channel.send(`You cant give hug to nothingness!`)
        if(user.id === message.author.id) return message.channel.send('There There feeling lonely?')
        }
          let embed = new Discord.MessageEmbed()
          .setTitle(`${message.author.username} gives a hug to ${user.username}`)
          .setColor('ae86')
          .setImage(gif)
          .setTimestamp();

          message.channel.send(embed);
   }
});

client.on('message', message => {
   if(message.content.toLowerCase().startsWith(PREFIX + `feedback`)) {
      if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
     let args = message.content
 .split(" ")
 .slice(1)
 if(!args[0]) return message.channel.send("the command has to be `x!feedback <comment>`")

 let embed = new Discord.MessageEmbed()
 .setColor('#ae86')
 .setTitle(`NEW FEEDBACK!`)
 .setDescription(`**Given by:** ${message.author.username}#${message.author.discriminator}\n**User ID:** ${message.author.id}\n**From Server:** ${message.guild.name}\n**Server ID:** ${message.guild.id}`)
 .addField('GIVEN FEEDBACK',`${args.join(" ")}`)

     client.channels.cache.get('833605522791989309').send(embed)
     message.channel.send(`📧 | Sent feedback to the staffs!`);
   }
});

client.on('message', message => {
   if(message.content.toLowerCase().startsWith(PREFIX + `shoot`)) {
      if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
     let gifs = [ `https://cdn.discordapp.com/attachments/713915333295210516/713937860671176764/a1U0VTfiLd.gif`, `https://cdn.discordapp.com/attachments/713915333295210516/713937853054189568/amauzB0g6DH.gif`]
  let gif = gifs[Math.floor(Math.random() * gifs.length)];

      let user =
        message.mentions.users.first() 
        {
        if(!user) return message.channel.send(`You cant shoot nothingness!`)
        if(user.id === message.author.id) return message.channel.send('trying to suicide or what?')
        }
          let embed = new Discord.MessageEmbed()
          .setTitle(`${message.author.username} is shooting ${user.username}`)
          .setColor('ae86')
          .setImage(gif)
          .setTimestamp();

          message.channel.send(embed);
   }
});

client.on('message', message => {
   if(message.content.toLowerCase().startsWith(PREFIX + `wave`)) {
      if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
     let gifs = [ `https://cdn.weeb.sh/images/HJDgSihAb.gif`, `https://cdn.discordapp.com/attachments/713915564476596374/713939427927392266/ZwHR81esyzP.gif`, `https://cdn.discordapp.com/attachments/713915564476596374/713939372634013747/5BvZ090RZXS.gif`, `https://cdn.discordapp.com/attachments/713915564476596374/713939390795350078/M-WmH_EUhy8.gif`, `https://media.tenor.com/images/6ed6c00826f75f1a24921663581576cd/tenor.gif`, `https://media.tenor.com/images/e11cf33597c89e958bb6f635d0909647/tenor.gif`]
  let gif = gifs[Math.floor(Math.random() * gifs.length)];

      let user =
        message.mentions.users.first()
        {
        if(!user) return message.channel.send(`You cant wave to nothingness!`)
        if(user.id === message.author.id) return message.channel.send('waving at yourself? madness!')
        }

          let embed = new Discord.MessageEmbed()
          .setTitle(`${message.author.username} is waving at ${user.username}`)
          .setColor('ae86')
          .setImage(gif)
          .setTimestamp();

          message.channel.send(embed);
   }
});

client.on('message', message => {
   if(message.content.toLowerCase().startsWith(PREFIX + "8ball")) {
      if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
  let answers = [ `Yes`, `No`, `Surely yes`, `Obiously no!`, `IDK`]
  let answer = answers[Math.floor(Math.random() * answers.length)];
 let args = message.content
 .split(" ")
 .slice(1)
 if(!args[0]) return message.channel.send("the command has to be `x!8ball <question>`")
 
 message.channel.send(`🎱 | **${message.author.username} asked** - ${args.join(" ")}
 
   | **Answer** - ${answer}`)
 }
});

client.on('message', message => {
   if(message.content.toLowerCase().startsWith(PREFIX + "coinflip")) {
      if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
  let answers = [ `Heads`, `Tails`]
  let answer = answers[Math.floor(Math.random() * answers.length)];
 
 message.channel.send(`Flipping the coin....`).then(msg =>{
setTimeout(async function(){
  await msg.delete()
  await msg.channel.send(`You flipped the coin and its **${answer}**!`)
},1000)
})
 }
});

client.on('message', message => {
    if (message.content.toLowerCase() === PREFIX + 'server-info' || message.content.toLowerCase() === PREFIX + 'si') {
       if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
       const SERVERINFOEMBED = new Discord.MessageEmbed()
       .setColor('#ae86')
       .setTitle(`Server infomation for ${message.guild.name}`)
       .setThumbnail(message.guild.iconURL({dynamic: true}))
       .addField('Server Name', `${message.guild.name}`, true)
       .addField('Server Owner', `${message.guild.owner}`, true)
       .addField('Server Creation time', `${message.guild.createdAt}`)
       .addField('channels', `${message.guild.channels.cache.size}`, true)
       .addField('Member Count', `${message.guild.memberCount}`, true)
       .addField('Region', `${message.guild.region}`, true)
       message.channel.send(SERVERINFOEMBED);
    }
});

client.on('message', message => {
	if (message.content.toLowerCase().startsWith(`${PREFIX}user info`) || message.content.toLowerCase().startsWith(`${PREFIX}ui`)) {
     if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
    const user = message.mentions.users.first() || message.author
    const INFOEMBED = new Discord.MessageEmbed()
       .setColor('#ae86')
       .setTitle(`User infomation of ${user.tag}`)
       .setThumbnail(user.displayAvatarURL({dynamic: true}))
       .addField('Username', `${user.username}`, true)
       .addField('Download user avatar', `[Click here](${user.displayAvatarURL({dynamic: true})})`, true)
       .addField('User ID', `${user.id}`, true)
       .addField('The user is a bot',`${user.bot}`, true)
       .addField('Account Creation time', `${user.createdAt}`)
       message.channel.send(INFOEMBED);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === PREFIX + 'help') {
     if (SUSPENDED.includes(message.author.id)) return;
    message.react('822534628018487307');
  }
});


client.on('message', message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(`${PREFIX}ban`)) {
     if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)

     let args = message.content
 .split(" ")
 .slice(1)
 let reason = args.slice(1).join(" ")
 if(!args[0]) reason = `Not specified`

		const user = message.mentions.users.first();
		if (user) {
			const member = message.guild.members.resolve(user);
			if (member) {
				if (!message.member.hasPermission('BAN_MEMBERS')) {
					return message.reply(
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
			} else {
				message.channel.send("That user isn't in this guild! Silly!");
			}
		} else {
			message.reply("Silly! You didn't mention the user to ban!");
		}
	}
});

client.on('message', message => {
	if (message.content.toLowerCase().startsWith(`${PREFIX}av`)) {
     if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
    const user = message.mentions.users.first() || message.author
    const Avembed = new Discord.MessageEmbed()
			.setColor('#ae86')
			.setTitle(`${user.username}\'s avatar`)
			.setImage(user.displayAvatarURL({dynamic: true, size: 256}))
		message.channel.send(Avembed);
	}
});

client.on('message', message => {
if(message.mentions.users.has(client.user.id)){
return message.channel.send(`My prefix is \`${PREFIX}\`
Type \`${PREFIX}help\` for more information`)}
});


client.on('message', message => {
	if (message.content.toLowerCase() === `${PREFIX}inv`) {
     if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
		const AEMBED = new Discord.MessageEmbed()
			.setColor('#ae86')
      .addField("Invite me", "Add me to your server! [Click here](https://discord.com/api/oauth2/authorize?client_id=796418100449902642&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D796418100449902642%26permissions%3D8%26scope%3Dbot&scope=bot)")
      .setTimestamp();

		message.channel.send(AEMBED);
	}
});

client.on('message', message => {
	if (!message.guild) return;
	if (message.content.toLowerCase().startsWith(`${PREFIX}kick`)) {
    if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
		const user = message.mentions.users.first();
		if (user) {
			const member = message.guild.member(user);
			if (member) {
				if (!message.member.hasPermission('KICK_MEMBERS')) {
					return message.reply(
						"What were you thinking? You don't have permission to do that."
					);
				}
				member
					.kick('Optional reason that will display in the audit logs')
					.then(() => {
						message.channel.send(`<a:tick:810040940730908694> Successfully kicked ${user.tag}`);
					})
					.catch(err => {
						message.reply('Sorry but I was unable to kick the member');
						console.error(err);
					});
			} else {
				message.reply("That user isn't in this guild! Silly!");
			}
		} else {
			message.reply("Whom to kick? You didn't mention anyone!");
		}
	}
});
client.on('message', message => {
  if (message.content.toLowerCase() === PREFIX + `uptime`) {
     if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

message.channel.send(`:chart_with_upwards_trend: Uptime for this bot is \`${uptime}\``);
  }
});


client.on('message', message => {
	if (message.content.toLowerCase() === `${PREFIX}help`) {
     if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
		const Xembed = new Discord.MessageEmbed()
			.setColor('#ae86')
			.setTitle('Help')
      .setAuthor('I Know I Am Awesome', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.com/api/oauth2/authorize?client_id=796418100449902642&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D796418100449902642%26permissions%3D8%26scope%3Dbot&scope=bot')
      .setThumbnail('https://cdn.discordapp.com/avatars/796418100449902642/7073264c921931586114b51b3b4c2982.png?size=256')
			.setDescription('I hope that these will help u enough!')
      .addField('help 1', `get help for moderation commands.`)
      .addField('help 2', `get help for music commands.`)
      .addField('help 3', `get help for fun commands`)
      .addField('help 4', `get help for miscellaneous commands.`)
      .addField(`\u200b`, `[Invite me](https://discord.com/api/oauth2/authorize?client_id=796418100449902642&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D796418100449902642%26permissions%3D8%26scope%3Dbot&scope=bot) • [Support Server](https://discord.gg/ep2nDnQn42) • [Vote me on top.gg](https://top.gg/bot/796418100449902642/vote)`)
      .setImage('https://media1.tenor.com/images/2e5c6b482704619e79e3b2a3ef8c6e25/tenor.gif?itemid=17422882')
			.setTimestamp();

		message.channel.send(Xembed);
	}
});

client.on('message', message => {
    if (message.content.toLowerCase() === `${PREFIX}help 1`) {
       if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
        const Xembed = new Discord.MessageEmbed()
            .setColor('#ae86')
            .setTitle('Help')
      .setAuthor('I Know I Am Awesome', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.com/api/oauth2/authorize?client_id=796418100449902642&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D796418100449902642%26permissions%3D8%26scope%3Dbot&scope=bot')
      .setThumbnail('https://cdn.discordapp.com/avatars/796418100449902642/7073264c921931586114b51b3b4c2982.png?size=256')
            .setDescription('I hope that these will help u enough!')
            .addField('Ban', `bans a user`,
                true)
            .addField('Kick', `kicks a user`, true)
      .addField(`Nuke`, `nukes a channel`, true)
      .addField('Warn', `warns a user`, true)
      .addField('Dm', `dms a user`, true)
      .addField('Announce', `announces a message`, true)
      .addField('Purge', `clears ammount of messages supplied`, true)
      .addField(`\u200b`, `[Invite me](https://discord.com/api/oauth2/authorize?client_id=796418100449902642&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D796418100449902642%26permissions%3D8%26scope%3Dbot&scope=bot) • [Support Server](https://discord.gg/ep2nDnQn42) • [Vote me on top.gg](https://top.gg/bot/796418100449902642/vote)`)
      .setImage('https://media1.tenor.com/images/2e5c6b482704619e79e3b2a3ef8c6e25/tenor.gif?itemid=17422882')
            .setTimestamp();

        message.channel.send(Xembed);
    }
});

client.on('message', message => {
	if (message.content.toLowerCase() === `${PREFIX}help 2`) {
     if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
		const Hembed = new Discord.MessageEmbed()
			.setColor('#ae86')
			.setTitle('Help for music')
      .setAuthor('I Know I Am Awesome', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.com/api/oauth2/authorize?client_id=796418100449902642&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D796418100449902642%26permissions%3D8%26scope%3Dbot&scope=bot')
      .setThumbnail('https://cdn.discordapp.com/avatars/796418100449902642/7073264c921931586114b51b3b4c2982.png?size=256')
			.setDescription('I hope that these will help u enough!')
			.addField('Play', `plays a song.`,
				true)
        .addField(`stop`, `stops the current queue`, true)
			.addField('skip', `skips the current song`, true)
			.addField(
				'pause',
				`pauses the current song`, true
			)
			.addField('resume', `resumes the current song`, true)
      .addField('volume', `sets the volume`, true)
      .addField(`shuffle`, `shuffles the queue.`, true)
      .addField('loop', `loops the song`, true)
      .addField('lyrics', `shows the lyrics of the song`, true)
      .addField('nowplaying', `shows status of the current song`, true)
      .addField('move', `moves a song in the queue`, true)
      .addField(`\u200b`, `[Invite me](https://discord.com/api/oauth2/authorize?client_id=796418100449902642&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D796418100449902642%26permissions%3D8%26scope%3Dbot&scope=bot) • [Support Server](https://discord.gg/ep2nDnQn42) • [Vote me on top.gg](https://top.gg/bot/796418100449902642/vote)`)
      .setImage('https://media1.tenor.com/images/2e5c6b482704619e79e3b2a3ef8c6e25/tenor.gif?itemid=17422882')
			.setTimestamp()
			.setFooter('Hope it helped you!');

		message.channel.send(Hembed);
	}
});

client.on('message', message => {
    if (message.content.toLowerCase() === `${PREFIX}help 3`) {
       if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
        const Xembed = new Discord.MessageEmbed()
            .setColor('#ae86')
            .setTitle('Help')
      .setAuthor('I Know I Am Awesome', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.com/api/oauth2/authorize?client_id=796418100449902642&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D796418100449902642%26permissions%3D8%26scope%3Dbot&scope=bot')
      .setThumbnail('https://cdn.discordapp.com/avatars/796418100449902642/7073264c921931586114b51b3b4c2982.png?size=256')
            .setDescription('I hope that these will help u enough!')
            .addField('8ball', `ask a question to the magical 8ball!`, true)
            .addField('say', `repeats a users statement!`, true)
      .addField(`meme`, `shows a random meme!`, true)
      .addField(`rps`, `rock paper scissors let's go!`, true)
      .addField(`fact`, `shows a random fact!`, true)
      .addField(`coinflip`, `flips a coin!`, true)
      .addField('highfive', `give a highfive to someone ;)`, true)
      .addField('shoot', `shoots someone`, true)
      .addField('wave', `say hi say bye!`, true)
      .addField('hug', `hug a user`, true)
      .addField(`\u200b`, `[Invite me](https://discord.com/api/oauth2/authorize?client_id=796418100449902642&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D796418100449902642%26permissions%3D8%26scope%3Dbot&scope=bot) • [Support Server](https://discord.gg/ep2nDnQn42) • [Vote me on top.gg](https://top.gg/bot/796418100449902642/vote)`)
      .setImage('https://media1.tenor.com/images/2e5c6b482704619e79e3b2a3ef8c6e25/tenor.gif?itemid=17422882')
            .setTimestamp();

        message.channel.send(Xembed);
    }
});

client.on('message', message => {
    if (message.content.toLowerCase() === `${PREFIX}help 4`) {
       if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
        const Xembed = new Discord.MessageEmbed()
            .setColor('#ae86')
            .setTitle('Help')
      .setAuthor('I Know I Am Awesome', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.com/api/oauth2/authorize?client_id=796418100449902642&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D796418100449902642%26permissions%3D8%26scope%3Dbot&scope=bot')
      .setThumbnail('https://cdn.discordapp.com/avatars/796418100449902642/7073264c921931586114b51b3b4c2982.png?size=256')
            .setDescription('I hope that these will help u enough!')
            .addField('stats', `shows stats of the bot`,
                true)
            .addField('user info', `shows user info`, true)
      .addField(`server-info`, `shows server info`, true)
      .addField('av', `shows avatar of a user`, true)
      .addField('ping', `shows bot's ping`, true)
      .addField('uptime', `shows uptime of the bot`, true)
      .addField('vote', `shows vote link of the bot go vote now!`, true)
      .addField('feedback', `give a nice feedback to the bot`, true)
      .addField(`\u200b`, `[Invite me](https://discord.com/api/oauth2/authorize?client_id=796418100449902642&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D796418100449902642%26permissions%3D8%26scope%3Dbot&scope=bot) • [Support Server](https://discord.gg/ep2nDnQn42) • [Vote me on top.gg](https://top.gg/bot/796418100449902642/vote)`)
      .setImage('https://media1.tenor.com/images/2e5c6b482704619e79e3b2a3ef8c6e25/tenor.gif?itemid=17422882')
            .setTimestamp();

        message.channel.send(Xembed);
    }
});

client.on('message', message => {
	if (message.content.toLowerCase() === `${PREFIX}stats`) {
     if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
    let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
	const STATSEMBED = new Discord.MessageEmbed()
  .setColor('#ae86')
  .setAuthor(`I Know I Am Awesome`, `https://cdn.discordapp.com/avatars/796418100449902642/7073264c921931586114b51b3b4c2982.png?size=256`)
  .setThumbnail('https://cdn.discordapp.com/avatars/796418100449902642/7073264c921931586114b51b3b4c2982.png?size=256')
  .setTitle('Statistics Of I Know I Am Awesome')
  .addField(`Owners`, `\`Unknown X#9645\``, true)
  .addField(`Default prefix`, `\`x!\``, true)
  .addField(`Ping`, `\`${Date.now() -
				message.createdTimestamp}ms.\``, true)
  .addField(`Total servers`, `\`${client.guilds.cache.size} Servers\``, true)
  .addField(`Users`, `\`${client.users.cache.size} users\``, true)
  .addField(`Library :books:`, `\`Discord.js v12.5.1\``, true)
  .addField(`Total Channels watching`, `\`${client.channels.cache.size} channels\``, true)
  .addField('Uptime', `\`${uptime}\``, true)
  .setTimestamp()
  message.channel.send(STATSEMBED);
}
});

client.on('message', message => {
	if (message.content.toLowerCase() === PREFIX + `vote`) {
     if (SUSPENDED.includes(message.author.id)) return message.channel.send(`You are banned from using this bot!`)
	const VOTEEMBED = new Discord.MessageEmbed()
  .setColor('#ae86')
  .setTitle('Vote our bot')
  .addField("Vote on top.gg", "To vote our bot on top.gg click on [vote!](https://top.gg/bot/796418100449902642/vote)")
  .setTimestamp()
  message.channel.send(VOTEEMBED);
}
});

var http = require('http');
http
	.createServer(function(req, res) {
		res.write("I'm alive");
		res.end();
	})
	.listen(8080);

client.login(process.env.TOKEN);