const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  category: "Utility",
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(`Help`)
      .setDescription("List of all commands")
      .setColor("#14f6fa")
      .setFooter(`Bot made by Serena and Real.Ritesh`);

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};