import { Command } from "../../types/command";

import userList from "../../schemas/user";
import messages from "../../resources/messages.json";
import { UserData } from "../../types/data";

module.exports = {
	ignore: true, // the messages is kinda broken
	//TODO: fix the messages

	description: "Beg to earn money",
	cooldown: 60,

	run(_client, message, _args, _guildData, userData, _isSlashCommand) {
		if (userData.economy?.wallet < 200)
			return "Not enough money to risk on losing";
		const earned = Math.round(Math.random() * 400) - 200;
		userData.economy.wallet += earned;
		userList.findByIdAndUpdate(userData._id, { economy: userData.economy }, (err: Error, data: UserData) => {
			if (err) console.error(err);
			if (!data) return "Error: User not found.";
		});
		userData.level.xp += 2;
		userList.findByIdAndUpdate(userData._id, { level: userData.level }, (err: Error, data: UserData) => {
			if (err) console.error(err);
			if (!data) return "Error: User not found.";
		});
		if (!(Math.floor(userData.level.xp / 50 /*0.5*/) === (Math.floor((userData.level.xp - 5) / 50) /*0.6*/))) {
			message.channel?.send(`<@${userData.userId}>` + " just levelled up!");
		}

		let valueRange = Math.ceil(Math.abs(earned / 100));
		if (earned < 0) valueRange *= -1;

		switch (valueRange) {
			case -2:
				return pickRandomAndReplace(messages.beg.veryBad, Math.abs(earned));
			case -1:
				return pickRandomAndReplace(messages.beg.bad, Math.abs(earned));
			case 0:
				return pickRandomAndReplace(messages.beg.neutral, 0);
			case 1:
				return pickRandomAndReplace(messages.beg.good, earned);
			case 2:
				return pickRandomAndReplace(messages.beg.veryGood, earned);
		}
	}
} as Command;

function pickRandomAndReplace(messages: string[], replace: number) {
	return messages[Math.floor(Math.random() * messages.length)].replace("{amount}", "" + replace);
}