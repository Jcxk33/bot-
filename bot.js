// Const

const http = require("http");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const commando = require("discord.js-commando");
const request = require("request-promise");``
const path = require("path");
const config = require(path.join(__dirname, "config", "config.json"));
const oneLine = require('common-tags').oneLine;


// Client
const client = new commando.CommandoClient({
  owner: ["669518615199875082", "675794471065092161"],
  commandPrefix: ";",
  unknownCommandResponse: false,
  selfbot: false,
  commandEditableDuration: 60
});

// Status
client.oce("ready", () => {
  client.user.setPresence({
    game: { name: "With Cleo" },
  });
});


// CONSOLE LOGGERS FOR ANY ERRORS ETC
client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('ready', () => {
		console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
	})
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	});


// Registrys
client.registry
  .registerGroups([
    ["mod", "Moderation Commands"],
    ["miscellaneous", "Miscellaneous Commands"],
    ["administrator", "Administrator Commands"],
    ["es", "ES commands"],
    ["icf", "ICF commands"],
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, "commands"));


// Client Login
client.login(config.token);