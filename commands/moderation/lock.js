const { ManageChannels, SendMessages } = require("../../enums/permissionBitField");
const { ManageChannels: ManageChannel } = require("../../enums/permissionStrings");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'lock',
    description: 'Lock down a channel',
    aliases: ['lockdown'],

    default_member_permissions: ManageChannel,

    run(client, message, args, slash) {
        if (!slash) {
            if (!message.member.permissions.has(ManageChannels)) {
                message.delete();
                return message.channel.send("You don't the required permissions to use this command.");
            }
        } else {
            message.reply({ content: 'ok', ephemeral: true });
        }

        if(!message.channel.permissionsFor(message.guild.roles.everyone).has(SendMessages))
            return message.channel.send("Channel is already locked.");
        
        message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES:false });
        
        const embed = new MessageEmbed()
            .setTitle("Channel Updates")
            .setDescription(`<#${message.channel.id}> in now locked.`)
            .setColor("ORANGE")
            .setFooter(client.config.embedFooter(client))
            .setTimestamp(new Date())
        
        message.channel.send({ embeds:[embed] });
    }
}