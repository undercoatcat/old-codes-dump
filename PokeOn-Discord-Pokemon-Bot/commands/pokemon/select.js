const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const { capitalize } = require('../../functions.js');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");

module.exports = {
    name: "select",
    description: "Select a different pokemon.",
    category: "Pokemon Commands",
    args: false,
    usage: ["select <pokemonID>"],
    cooldown: 3,
    permissions: [],
    aliases: ["s"],
    execute: async (client, message, args, prefix, guild, color, channel) => {
        let user = await User.findOne({ id: message.author.id });
        if(!user) return message.channel.send("You haven't started yet!")
        
        if (!args[0]) return message.channel.send("You don't have a pokémon with this number!");
        if (args[0].toLowerCase() === "latest") args[0] = parseInt(user.pokemons.length);
        if (args[0].toLowerCase() === "l") args[0] = parseInt(user.pokemons.length);
        if (!args[0] || isNaN(args[0])) return message.channel.send("You don't have a pokémon with this number!");
        if (!user.pokemons[parseInt(args[0]) - 1]) return message.channel.send("You don't have a pokémon with this number!");

        user.selected = parseInt(args[0]) - 1;
        var selected = user.selected || 0;
        await user.save();
        return message.channel.send(`You selected your Level ${user.pokemons[user.selected].level}${user.pokemons[selected].shiny ? " ✨" :""} **${capitalize(user.pokemons[user.selected].name)}**.`)
    }
}





