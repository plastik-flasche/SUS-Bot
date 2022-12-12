const { ManageChannels } = require("../../enums/permissionBitField");
const { ManageChannels: ManageChannel } = require("../../enums/permissionStrings");
const getChannelFromMention = require("../../functions/getChannelFromMention");
const guilds = require("../../schemas/guild");

module.exports = {
    name: "set-counter-channel",
    description: "Sets the counter channel",
    aliases: ["scc"],

    options: [
        {
            name: "channel",
            type: "CHANNEL",
            description: "The channel you want to set as counter channel.",
            required: true
        }
    ],

    default_member_permissions: ManageChannel,

    run: async (client, message, args, guildInfo, userData, slash) => {
        if (slash) {
            message.reply({ content: "ok", ephemeral: true });
        } else {
            if (!message.member.permissions.has(ManageChannels)) {
                message.delete();
                return "You don't the required permissions to use this command.";
            }
        }

        const channel = getChannelFromMention(message.guild, args[0]);
        if (channel === undefined) return "Please specify the counter channel.";
        const current = guildInfo.channels;
        current.counter = channel.id;

        guilds.findByIdAndUpdate(guildInfo._id, { channels: current }, (err, data) => { });
        return `Set counter channel to ${channel.toString()}`;
    }
}