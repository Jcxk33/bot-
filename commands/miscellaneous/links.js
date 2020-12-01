const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
module.exports = class links extends Command {
  constructor(client) {
    super(client, {
      name: "links",
      group: "miscellaneous",
      memberName: "links",
      description: "Provides informational links",
                              throttling: {
        usages: 1,
        duration: 1000
      },
      guildOnly: false
      
    });
  }
  async run(msgObject, {}) {
    const embed = new Discord.RichEmbed()
      .setTitle("Informational Links")
      .setDescription(
        "The following will provide a list of all current links relating to State of letiVERSITY"
      )
      .addField("Discord", "[Discord Link](https://discord.gg/9n6e3A6J)", true)
      .addField(
        "Group",
        "[Roblox Link](https://www.roblox.com/groups/8482724/letiVERSlTY#!/about)",
        true
      )
      .addField(
        "Game",
        "[Roblox Link]( soon )",
        true
      )
         .addField(
        "Bloxlink Website",
        "[Bloxlink Site]https://blox.link/verify/)",
        true
      )
         .addField(
        "Citizenship Appeal",
        "[Google Docs](https://docs.google.com/forms/d/e/1FAIpQLSd6nT8MV3KrxsN8XHNc9jhi8Vs0pk0jbGO3cFV3hillnIt1wQ/viewform)",
        true
      );

    msgObject.reply(embed);
  }
};
