module.exports = {
    name: "troll",
    aliases: ["t"],
    category: "Music",
    description: "A wild troll appeared.",
    connectedToVoiceChannel: true,

    run(client, message, args, guildData, userData, isSlashCommand) {
        if (!isSlashCommand) message.delete();

        return client.player.troll(message);
    }
}
