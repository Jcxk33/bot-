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
        "The following will provide a list of all current links relating to gunFIGHTS"
      )
      .addField("Discord", "[Discord Link](https://discord.gg/HQcJqtD)", true)
      .addField(
        "Group",
        "[Roblox Link](https://www.roblox.com/my/groups)",
        true
      )
      .addField(
        "Game",
        "[Roblox Link]( https://www.roblox.com/games/5604561827/NHC-Gunfights-WP?refPageId=337cfa23-275e-450a-a080-232f69a520a0 )",
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
