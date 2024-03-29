import { CommandInteraction } from "discord.js";
import { Command } from "../../types/command";

module.exports = {
	ignore: true,
	aliases: ["t"],
	category: "Music",
	description: "A wild troll appeared.",
	commandOptions: {
		connectedToSameVC: true,
		guildOnly: true
	},

	run(client, message, _args, _guildData, _userData, _isSlashCommand) {
		if (!(message instanceof CommandInteraction)) message.delete();

		// @ts-expect-error // Log the user using the command cause roteKlaue
		console.log(`${message.author.username} used the troll command.`);
		client.player.troll(message);
		return null;
	}
} as Command;
