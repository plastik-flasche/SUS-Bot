module.exports = {
    name: "skip",
    description: "skip current track",

    run: (client, message, args, slash) => {
        if (slash) {
            slash.reply("ok");
        }
        client.player.skip(message);                                        // call the skip function from the player
    }
}