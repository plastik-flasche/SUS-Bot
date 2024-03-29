import { Component } from "../../types/command";

import userList from "../../schemas/user";

module.exports = {
	name: "search",
	commandOptions: {
		cooldown: 60
	},
	async run(_client, _interaction, args, _guildData, userData) {
		const amount = Math.floor(Math.random() * 700) + 900;
		const current = userData.economy;
		current.wallet += amount;
		userList.findByIdAndUpdate(userData._id, { economy: current }, (_err: Error, _data: unknown) => { });
		userData.level.xp += 2;
		userList.findByIdAndUpdate(userData._id, { level: userData.level }, (_err: Error, _data: unknown) => { });
		return { content: `You found ${amount} gold in the ${args[0]}.`, disableOriginal: true, success: ["command:search", this] };
	}
} as Component;