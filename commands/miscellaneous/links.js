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
        duration: 80
      },
      guildOnly: false
      
    });
  }
  async run(msgObject, {}) {
    const embed = new Discord.RichEmbed()
      .setTitle("Informational Links")
      .setDescription(
        "The following will provide a list of all current links relating to Mayflower"
      )
      .addField("Discord", "[Discord Link](https://discord.gg/4KVQkzSBT5)", true)
      .addField(
        "Group",
        "[Roblox Link](https://www.roblox.com/groups/7563230/State-of-Mayflower#!/about)",
        true
      )
      .addField(
        "Game",
        "[Roblox Link]( https://www.roblox.com/games/6178625025/New-Haven-County )",
        true
      )
         .addField(
        "RoVer Website",
        "[RoVer Website](https://rover.link)",
        true
      );

    msgObject.reply(embed);
  }
};
