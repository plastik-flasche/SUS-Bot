import guildModel from "../../schemas/guild";

import { Guild, ApplicationCommandDataResolvable } from "discord.js";
import Client from "../../types/client";

module.exports = async (client: Client<boolean>, guild: Guild) => {
	const sus = await guildModel.findOne({ guildId: guild.id });
	if (sus) return;

	console.info("Creating MongoDB entry for guild " + guild.name);

	global.functions.addGuildDocument(guild.id);

	client.commands.forEach(command => {
		if (command.name === "prepare") return;
		guild.commands?.create(command as ApplicationCommandDataResolvable).catch(e => e);
	});
};
