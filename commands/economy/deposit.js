const { IsSomething } = require("sussyutilbyraphaelbader");
const userList = require("../../schemas/user");
module.exports = {
    name: "deposit",
    description: "Deposit money into your bank account",
    aliases: ["dep", "dept"],
    options: {
        name: "what shall be deposited into the bank",
        type: "number",
        description: "number of money that will be deposited into the bank",
        required: true,
    },

    run(client, message, args, guildData, userData, isSlashCommand) {
        let amount = args[0];
        if (amount && IsSomething.isNumber(amount)) {
            if (amount > userData.economy.wallet) amount = userData.economy.wallet;
            userData.economy.wallet -= +amount;
            userData.economy.bank += +amount;
            userList.findByIdAndUpdate(userData._id, { economy: userData.economy }, (err, data) => { });
            message.channel.send(amount + " deposited. You now have " + userData.economy.wallet + " gold in your wallet and " + userData.economy.bank + " gold in your bank");
        }
        else {
            message.channel.send("Please specify an amount");
        }
    }
}