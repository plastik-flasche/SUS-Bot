const { Random } = require("sussy-util");
const { EmbedBuilder, Colors } = require("discord.js");
const userList = require("../../schemas/user");

module.exports = {
    description: "Search in a few places for money.",
    cooldown: 60,

    run: (_client, message, _args, _guildData, userData) => {
        const places = ["bank", "river", "pocket"];
        const collector = message.channel.createMessageCollector({ filter: msg => msg.author.id === message.author.id, time: 30000 });

        collector.on("collect", async msg => {
            if (places.includes(msg.content)) {
                const amount = Random.randomInt(900, 1600);
                const current = userData.economy;
                current.wallet += amount;
                userList.findByIdAndUpdate(userData._id, { economy: current }, (err, data) => { });
                userData.level.xp += 2;
                userList.findByIdAndUpdate(userData._id, { level: userData.level }, (err, data) => { });
                message.followUp(`You found ${amount} gold in the ${msg.content}.`);
                collector.stop("success");
            }
        });

        collector.on("end", async (_ignore, error) => {
            if (error && error !== 'success') {
                return message.followUp({ embeds: [new EmbedBuilder().setTitle("Timed Out").setColor(Colors.Red)] });
            }
            collector.stop("success");
        });
        return "Please tell me where you want to search.\n" + places.map(e => "`" + e + "`").join(", ");
    }
}