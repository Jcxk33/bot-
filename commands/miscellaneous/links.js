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
      .addField("Discord", "[Discord Link](https://discord.gg/Mt8XnrmvMA)", true)
      .addField(
        "Group",
        "[Roblox Link](https://www.roblox.com/groups/8725427/State-of-Mayflower#!/about)",
        true
      )
      .addField(
        "Game",
        "[Roblox Link **N/A**]( https://www.roblox.com/games/1/New-Haven-County )",
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
