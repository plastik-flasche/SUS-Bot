const { BanMembers } = require("../../enums/permissionBitField");
const { BanMembers: banMbs } = require("../../enums/permissionStrings");
// TODO: write temp ban command

module.exports = {
    ignore: true,
    description: "",
    aliases: ["tempban", "temp-ban"],

    options: [
        {
            name: "user",
            type: "USER",
            description: "User you want to tempban",
            required: true,
        },
        {
            name: "days",
            type: "NUMBER",
            description: "The amount of days you want to ban the user",
            required: true
        }
    ],

    default_member_permissions: banMbs,

    run(client, message, args, guildData, userData, isSlashCommand) {


    }
}
