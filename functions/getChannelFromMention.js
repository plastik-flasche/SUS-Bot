module.exports = (guild, mention) => {
    if (!mention) return;
    return guild.channels.cache.get(mention.substring(2, mention.length - 1));
}
