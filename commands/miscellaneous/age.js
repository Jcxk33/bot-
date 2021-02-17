const Discord = require("discord.js");
const { Command } = require("discord.js-commando");;


module.exports = class AgeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'age',
			group: 'miscellaneous',
			memberName: 'age',
			description: 'Responds with how old someone born in a certain year is.',
			args: [
				{
					key: 'year',
					prompt: 'What year would you like to get the age for?',
					type: 'integer',
					min: 1
				}  
			]
		});
	}

	run(msg, { year }) {
		const currentYear = new Date().getFullYear();
		return msg.say(`Someone born in ${year} would be ${currentYear - year} years old.`);
	}
};