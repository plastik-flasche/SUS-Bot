const { ManageChannels } = require("../../enums/permissionBitField");
const { ManageChannels: ManageChannel } = require("../../enums/permissionStrings");
const getChannelFromMention = require("../../functions/getChannelFromMention");
const guilds = require("../../schemas/guild");

module.exports = {
    name: "set-goodbye-channel",
    description: "Sets the goodbye channel",
    aliases: ["sgc"],

    options: [
        {
            name: "channel",
            type: "CHANNEL",
            description: "The channel you want to set as goodbye channel.",
            required: true
        }
    ],

    default_member_permissions: ManageChannel,

    async run(client, message, args, guildData, userData, isSlashCommand) {
        if (isSlashCommand) {
        } else {
            if (!message.member.permissions.has(ManageChannels)) {
                message.delete();
                return "You don't the required permissions to use this command.";
            }
        }

        const channel = getChannelFromMention(message.guild, args[0]);
        if (channel === void 0) return "Please specify the welcome channel.";
        const current = guildData.channels;
        current.goodbye = channel.id;

        guilds.findByIdAndUpdate(guildData._id, { channels: current }, (err, data) => { });
        message.channel.send(`Set goodbye channel to ${channel.toString()}`);
    }
}
