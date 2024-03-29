import { CommandInteraction, ApplicationCommandOption, CacheType, Message, InteractionReplyOptions, MessageReplyOptions } from "discord.js";
import Client from "./client";
import { UserData, GuildData } from "./data";

export interface Command {
	ignore?: boolean;
	aliases?: string[];
	description: string;
	options?: ApplicationCommandOption[];
	default_member_permissions?: string;
	commandOptions?: CommandOptions;
	category?: string;
	usage?: string;
	run: (client: Client<true>, message: CommandInteraction<CacheType> | Message<boolean>, args: string[], guildData: GuildData, userData: UserData, isInteraction: boolean) => CommandReturns;
}

interface CommandOptions {
	connectedToVC?: boolean;
	connectedToSameVC?: boolean;
	guildOnly?: boolean;
	defaultReturn?: CommandReturn;
	cooldown?: number;
}

interface extensionWithoutDMOrEdit {
	announce?: boolean;
	success?: boolean;
	setCooldown?: Commands[];
	disableOriginal?: boolean;
	deleteMessage?: boolean | number;
	deleteReply?: boolean | number;
	disable?: number | boolean;
	disableMentions?: boolean;
	timeout?: number;
}


interface MessageExtensionsWithoutDMorEditMessage extends MessageReplyOptions, extensionWithoutDMOrEdit { }

interface MessageExtensionsWithoutEditMessage extends MessageExtensionsWithoutDMorEditMessage {
	DM?: MessageExtensionsWithoutDMorEditMessage;
}

interface MessageExtensionWithoutDMMessage extends MessageExtensionsWithoutDMorEditMessage {
	edit?: MessageExtensionsWithoutEditMessage;
}

interface MessageExtensionsMessage extends MessageExtensionWithoutDMMessage, MessageExtensionsWithoutEditMessage { }


// interface MessageExtensionsWithoutDMInteraction extends InteractionReplyOptions, extensionWithoutDMOrEdit { }

// interface MessageExtensionsInteraction extends MessageExtensionsWithoutDMInteraction {
// 	DM?: MessageExtensionsWithoutDMInteraction;
// }

interface MessageExtensionsWithoutDMorEditInteraction extends InteractionReplyOptions, extensionWithoutDMOrEdit { }

interface MessageExtensionsWithoutEditInteraction extends MessageExtensionsWithoutDMorEditInteraction {
	DM?: MessageExtensionsWithoutDMorEditInteraction;
}

interface MessageExtensionWithoutDMInteraction extends MessageExtensionsWithoutDMorEditInteraction {
	edit?: MessageExtensionsWithoutEditInteraction;
}

interface MessageExtensionsInteraction extends MessageExtensionWithoutDMInteraction, MessageExtensionsWithoutEditInteraction { }


type MessageExtensions = MessageExtensionsMessage | MessageExtensionsInteraction;

export type CommandReturn = MessageExtensions | string | null;

export type CommandReturnWithoutString = MessageExtensions | null;

export type AsyncCommandReturn = Promise<CommandReturn>;

export type CommandReturns = CommandReturn | AsyncCommandReturn;

// type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type Component = Omit<Command, "description" | "aliases" | "options">;

export type CommandRedirect = Omit<Command, "run"> & { redirect: string };

export type ProcessedCommand = Command & { name: string };

export type ProcessedCommandRedirect = CommandRedirect & { name: string };

export type ComponentRedirect = Omit<Component, "run"> & { redirect: string };

export type ProcessedComponentRedirect = ComponentRedirect & { name: string };

export type ProcessedComponent = Component & { name: string };

export type ProcessedCommands = ProcessedCommand | ProcessedCommandRedirect | ProcessedComponent | ProcessedComponentRedirect;

export type ProcessedRunnableCommands = ProcessedCommand;

export type Commands = Command | CommandRedirect | Component | ComponentRedirect;