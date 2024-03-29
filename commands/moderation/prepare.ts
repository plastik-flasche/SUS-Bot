import { ProcessedCommands, Commands } from "../../types/command";
import Client from "../../types/client";
import { CommandInteraction, Message } from "discord.js";
import permissionStrings from "../../enums/permissionStrings";

const { EmbedBuilder } = require("discord.js");

const registering = (client: Client<true>, message: CommandInteraction | Message) => {
	const embed = new EmbedBuilder()
		.setTitle("Success");

	client.commands.forEach((command: ProcessedCommands) => {
		if (command.name === "prepare") return;
		// @ts-expect-error // cause name can't be undefined, look at index.ts
		message.guild?.commands?.create(command).catch((error: Error) => {
			return new EmbedBuilder()
				.setTitle("Failed to create slash-commands")
				.setDescription(error.toString());
		});
	});

	return embed;
};

module.exports = {
	description: "Creates slash commands in server",

	default_member_permissions: permissionStrings.Administrator,

	async run(client, message, _args, _guildData, _userData, _isSlashCommand) {
		const embed = registering(client, message);
		return { embeds: [embed] };
	}
} as Commands;
