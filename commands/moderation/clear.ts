import { Command } from "../../types/command";
import { ApplicationCommandOptionType, CommandInteraction, Message } from "discord.js";

import permissionStrings from "../../enums/permissionStrings";

module.exports = {
	description: "Clears the last n messages",

	options: [
		{
			name: "query",
			type: ApplicationCommandOptionType.Integer,
			description: "amount of messages to clear",
			required: true,
		}
	],

	commandOptions: {
		guildOnly: true,
	},

	default_member_permissions: permissionStrings.ManageMessages,

	async run(_client, message, args, _guildData, _userData, isSlashCommand) {
		const amount = parseInt(args[0]);
		if (message.channel === undefined) throw new Error("Channel is undefined");
		if (message.channel === null) throw new Error("Channel is null");
		if (!message.channel) throw new Error("Channel is falsy");

		if (args[0] === "all") {
			clearAllMessages(message, isSlashCommand).then(deletedMessagesCount => {
				if (message.channel === null) throw new Error("Channel is null");
				if (message instanceof CommandInteraction)
					message.followUp(`Deleted ${deletedMessagesCount} messages from <#${message.channel.id}>. Please keep in mind, I can't delete messages older than two weeks!`).then(msg => setTimeout(() => msg.delete(), 5000));
				else
					message.channel.send(`Deleted ${deletedMessagesCount} messages from <#${message.channel.id}>. Please keep in mind, I can't delete messages older than two weeks!`).then(msg => setTimeout(() => msg.delete(), 5000));
			}).catch((err: string) => {
				if (message.channel === null) throw new Error("Channel is null");
				if (message instanceof CommandInteraction)
					message.followUp(err);
				else
					message.channel.send(err);
			});

			return null;
		} else if (isNaN(amount)) return "Please provide a number as the first argument.";

		if (amount <= 0) return "Number must be at least 1.";

		clearMessages(message, amount, isSlashCommand).then(deletedMessagesCount => {
			// FIXME: isSlashCommand is kinda unnecessary here when working with TypeScript cause we can check if message is a CommandInteraction
			if (message.channel === null) throw new Error("Channel is null");
			if (message instanceof CommandInteraction)
				message.followUp(`Deleted ${deletedMessagesCount} messages from <#${message.channel.id}>. Please keep in mind, I can't delete messages older than two weeks!`).then(msg => setTimeout(() => msg.delete(), 5000));
			else
				message.channel.send(`Deleted ${deletedMessagesCount} messages from <#${message.channel.id}>. Please keep in mind, I can't delete messages older than two weeks!`).then(msg => setTimeout(() => msg.delete(), 5000));
		}).catch(err => {
			if (message.channel === null) throw new Error("Channel is null");
			if (message instanceof CommandInteraction)
				message.followUp(err);
			else
				message.channel.send(err);
		});

		return null;
	}
} as Command;

function clearMessages(message: Message | CommandInteraction, amount: number, isSlashCommand = false) {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
		let deletedMessagesCount = isSlashCommand ? 0 : -1;
		while (deletedMessagesCount < amount) {
			const deleteThisTime = Math.min(...[100, amount - deletedMessagesCount]);
			// @ts-expect-error // I just can't be bothered to fix this, rn at least
			const deletedMessages = await message.channel.bulkDelete(deleteThisTime, true)
				.catch((_err: Error) => reject("Cannot delete messages older than two weeks."));
			if (deletedMessages === undefined || deletedMessages.size === 0) break;
			deletedMessagesCount += deletedMessages.size;
		}
		resolve(deletedMessagesCount);
	});
}

function clearAllMessages(message: Message | CommandInteraction, isSlashCommand = false) {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
		let deletedMessagesCount = isSlashCommand ? 0 : -1;
		// eslint-disable-next-line no-constant-condition
		while (true) {
			// @ts-expect-error // I just can't be bothered to fix this
			const deletedMessages = await message.channel.bulkDelete(100, true)
				.catch((_err: Error) => reject("Cannot delete messages older than two weeks."));
			if (deletedMessages === undefined || deletedMessages.size === 0) break;
			deletedMessagesCount += deletedMessages.size;
		}
		resolve(deletedMessagesCount);
	});
}