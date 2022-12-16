const { IsSomething } = require("sussyutilbyraphaelbader");
const userList = require("../../schemas/user");
module.exports = {
    name: "withdraw",
    description: "Withdraw money from your bank account",
    aliases: ["with", "wth"],
    options: {
        name: "what shall be withdrawn from the bank",
        type: "number",
        description: "number of money that will be withdrawn from the bank",
        required: true,
    },

    run(client, message, args, guildData, userData, isSlashCommand) {
        let amount = args[0];
        if (amount && IsSomething.isNumber(amount)) {
            if (amount > userData.economy.bank) amount = userData.economy.bank;
            userData.economy.bank -= +amount;
            userData.economy.wallet += +amount;
            userList.findByIdAndUpdate(userData._id, { economy: userData.economy }, (err, data) => { });
            message.channel.send(amount + " withdrawn. You now have " + userData.economy.wallet + " gold in your wallet and " + userData.economy.bank + " gold in your bank");
        }
        else {
            message.channel.send("Please specify an amount");
        }
    }
}
