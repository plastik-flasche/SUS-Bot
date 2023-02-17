import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import { StringUtil } from "sussy-util";
import Client from "../../types/client";
import { ProcessedCommands, Component } from "../../types/command";
const convertTime = require("../../functions/convertTime");

// TODO: edit the help menu instead of sending a new one every time to keep the chat clean

module.exports = {
	run(client, _interaction, args, _guildData, _userData) {
		const commandName = args[0];

		const command = isCommand(commandName, client);
		const category = isCategory(commandName, client);

		if (commandName === undefined || commandName.length === 0) {
			return helpMenuDefault(client);
		} else if (command) {
			return helpMenuCommand(client, command);
		} else if (category) {
			return helpMenuCategory(client, category);
		} else {
			console.error("No command found for: `" + commandName + "`");
			return "No command found for: `" + commandName + "`";
		}
	}
} as Component;

function isCommand(commandName: string, client: Client<true>): ProcessedCommands | false {
	const cmd = client.commands.get(`command:${commandName}`) ||
		// @ts-expect-error // it won't trigger if it's undefined
		client.commands.find(cmd => cmd.aliases && cmd.aliases?.includes(commandName));
	if (cmd === undefined) return false;
	return cmd;
}

function isCategory(categoryName: string, client: Client<true>): Collection<string, ProcessedCommands> | false {
	const commands = client.commands.filter(cmd => cmd.category === "command:" + categoryName);
	if (commands.size === 0) return false;
	return commands;
}

function helpMenuDefault(client: Client<true>) {
	const menu = new StringSelectMenuBuilder()
		.setCustomId("help")
		.setPlaceholder("Select a category");
	const component = new ActionRowBuilder();
	const embed = new EmbedBuilder()
		.setTimestamp(new Date())
		.setTitle("Help panel")

		.setFooter(client.config.embedFooter(client));

	embed
		.setDescription(`To see more information type **${client.config.prefix}help {command name}**`);

	const commands = client.commands.filter(cmd => cmd.category?.startsWith("command:"));

	const categories: string[] = [];

	commands.forEach((cmd) => {
		if (!categories.includes(cmd.category?.replace("command:", "") ?? "")) {
			categories.push(cmd.category?.replace("command:", "") ?? "");
		}
	});

	categories.forEach((d) => {
		embed.addFields({
			name: StringUtil.capitalize(d),
			value: "Type `" + client.config.prefix + "help " + d + "` to see more information",
		});
		menu.addOptions({ label: StringUtil.capitalize(d), value: d });
	});

	component.addComponents([menu]);

	return { embeds: [embed], components: [component] };
}

function helpMenuCommand(client: Client<true>, commandName: ProcessedCommands | string) {
	let cmd: ProcessedCommands | false;
	if (typeof commandName === "string") {
		cmd = isCommand(commandName, client);
		if (cmd === false) return "No command found for: `" + commandName + "`";
	} else {
		cmd = commandName;
	}
	cmd = cmd as ProcessedCommands;

	if (cmd.name === undefined) return "No command found for: `" + commandName + "`";

	const backButton = new ButtonBuilder()
		.setCustomId("selectMenu:help")
		.setLabel("<< Back")
		.setStyle(ButtonStyle.Primary);
	const component = new ActionRowBuilder()
		.addComponents([backButton]);

	const embed = new EmbedBuilder()
		.setTimestamp(new Date())
		.setTitle("Help panel")

		.setFooter(client.config.embedFooter(client));

	embed
		.setDescription(`To see more information type **${client.config.prefix}help {command name}**`);

	embed.addFields(
		{
			name: "Name",
			value: cmd.name.replace("command:", ""),
			inline: true
		},
		{
			name: "Description",
			// @ts-expect-error // I am checking if it's undefined
			value: cmd.description ? cmd.description : "None",
			inline: true
		},
		{
			name: "Aliases",
			// @ts-expect-error // I am checking if it's undefined
			value: cmd.aliases ? cmd.aliases.join(", ") : "None",
			inline: true
		},
		{
			name: "Cooldown",
			value: cmd.commandOptions?.cooldown ? convertTime(cmd.commandOptions.cooldown) : "None",
			inline: true
		},
		{
			name: "Category",
			value: cmd.category ? cmd.category.replace("command:", "") : "None",
			inline: true
		},
		{
			name: "Guild only",
			value: cmd.commandOptions?.guildOnly ? "Yes" : "No",
			inline: true
		},
		{
			name: "Usage",
			value: cmd.usage ? cmd.usage : "None",
			inline: true
		}
	);

	return { embeds: [embed], components: [component] };
}

function helpMenuCategory(client: Client<true>, commandName: Collection<string, ProcessedCommands> | string) {
	let cmd: Collection<string, ProcessedCommands> | false;
	if (typeof commandName === "string") {
		cmd = isCategory(commandName, client);
		if (cmd === false) return "No category found for: `" + commandName + "`";
	} else {
		cmd = commandName;
	}
	cmd = cmd as Collection<string, ProcessedCommands>;

	const backButton = new ButtonBuilder()
		.setCustomId("selectMenu:help")
		.setLabel("<< Back")
		.setStyle(ButtonStyle.Primary);
	const component = new ActionRowBuilder()
		.addComponents([backButton]);

	const menu = new StringSelectMenuBuilder()
		.setCustomId("help")
		.setPlaceholder("Select a command");

	const embed = new EmbedBuilder()
		.setTimestamp(new Date())
		.setTitle("Help panel")

		.setFooter(client.config.embedFooter(client));

	embed
		.setDescription(`To see more information type **${client.config.prefix}help {command name}**`);

	cmd.forEach((command) => {
		if (command.name === undefined) return;
		const name = command.name.replace("command:", "");
		embed.addFields({
			name: name,
			// @ts-expect-error // I am checking if it's undefined
			value: command.description ? command.description : "None",
		});
		menu.addOptions({ label: name, value: name });
	});

	const component2 = new ActionRowBuilder()
		.addComponents([menu]);

	return { embeds: [embed], components: [component2, component], menu };
}



// const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } = require("discord.js");

// const { StringUtil } = require("sussy-util");
// const fs = require("fs");

// module.exports = {
// 	description: "Displays all commands / more information about one command",
// 	aliases: ["h"],

// 	options: [
// 		{
// 			name: "query",
// 			description: "name of the command",
// 			type: "STRING",
// 			required: false,
// 		}
// 	],

// 	run(client, message, args, guildData, userData, isSlashCommand) {
// 		const menu = new StringSelectMenuBuilder()
// 			.setCustomId("help")
// 			.setPlaceholder("Select a category");
// 		const component = new ActionRowBuilder();
// 		const commandName = args[0];
// 		const embed = new EmbedBuilder()
// 			.setTimestamp(new Date())
// 			.setTitle("Help panel")
// 			.setFooter(client.config.embedFooter(client));

// 		if (commandName === undefined || commandName.length === 0) {
// 			embed
// 				.setDescription(`To see more information type **${client.config.prefix}help {command name}**`);

// 			fs.readdirSync(`${__dirname}/../`).forEach((d) => {
// 				embed.addFields({
// 					name: StringUtil.capitalize(d),
// 					value: "Type `" + client.config.prefix + "help " + d + "` to see more information",
// 				})
// 				menu.addOptions({ label: StringUtil.capitalize(d), value: d });
// 			});;
// 		} else {
// 			const cmd = client.commands.get(`command:${commandName}`) ||
// 				client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

// 			if (cmd === undefined) {
// 				return "No command found for: `" + commandName + "`";
// 			}

// 			// TODO: Add more information

// 			embed.addFields(
// 				{
// 					name: "Name",
// 					value: cmd.name,
// 					inline: true
// 				},
// 				{
// 					name: "Description",
// 					value: cmd.description,
// 					inline: true
// 				},
// 				{
// 					name: "Category",
// 					value: cmd.category,
// 					inline: true
// 				},
// 				{
// 					name: cmd.aliases?.length > 1 ? "Aliases" : "Alias",
// 					value: cmd.aliases?.length > 0 ? cmd.aliases.join(", ") : "None",
// 					inline: true
// 				},
// 				{
// 					name: "Cooldown",
// 					value: cmd.cooldown ? `${cmd.cooldown}seconds` : "None",
// 					inline: true
// 				}
// 			);
// 		}
// 		if (menu.options.length > 0) {
// 			component.addComponents(menu);
// 			return { embeds: [embed], components: [component] };
// 		} else {
// 			return { embeds: [embed] };
// 		}
// 	}
// }