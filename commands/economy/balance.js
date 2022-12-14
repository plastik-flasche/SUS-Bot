module.exports = {
    name: "balance",
    description: "Shows the balance of your money",
    aliases: ["bal"],

    run(client, message, args, guildData, userData, isSlashCommand) {
        message.channel.send("You have " + userData.economy.wallet + " gold in your wallet and " + userData.economy.bank + " gold in your bank");
    }

}
