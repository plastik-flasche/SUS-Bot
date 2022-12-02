module.exports = {
    name: 'resume',
    aliases: ["unpause"],
    description: "Resumes playing the paused track.",

    run(client, message, args, a, slash) {
        if(slash) message.reply("ok");
        client.player.resume(message);
    }
}