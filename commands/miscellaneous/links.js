const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
module.exports = class links extends Command {
  constructor(client) {
    super(client, {
      name: "links",
      group: "miscellaneous",
      memberName: "links",
      description: "Provides informational links",
      guildOnly: false
    });
  }
  async run(msgObject, { }) {
    const embed = new Discord.RichEmbed() 
    .setTitle("Informational Links")
    .setDescription("Th")
  }
};
