const Discord = require("discord.js");
const { Command } = require("discord.js-commando");;
const roasts = require('../../assets/json/roast');

module.exports = class RoastCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'roast',
			aliases: ['insult'],
			group: 'miscellaneous',
			memberName: 'roast',
			description: 'Roasts a user.',
      throttling: {
        usages: 1,
        duration: 10
      },
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to roast?',
					type: 'user',
					default: msg => msg.author
				}
			]
		});
	}

	run(msg, { user }) {
		return msg.say(`${user.username}, ${roasts[Math.floor(Math.random() * roasts.length)]}`);
	}
};