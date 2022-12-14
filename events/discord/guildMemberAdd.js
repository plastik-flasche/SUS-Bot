const fetchData = require("../../config.js").fetchData;
const welcomeMessages = fetchData.get("messages").welcome;
const guilds = require("../../schemas/guild");
const replaceUser = require("../../functions/replaceUser.js");

module.exports = async (client, member) => {
    const guild = await guilds.findOne({ guildId: member.guild.id });
    if (guild?.channels?.welcome === undefined) return;
    const channel = client.channels.cache.get(guild.channels.welcome);
    channel.send(replaceUser(welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)], member));
}
