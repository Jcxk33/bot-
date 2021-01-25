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
        "The following will provide a list of all current links relating to Red Havem"
      )
      .addField("Discord", "[Discord Link](https://discord.gg/8np84asnpp)", true)
      .addField(
        "Group",
        "[Roblox Link](https://www.roblox.com/my/groups)",
        true
      )
      .addField(
        "Game",
        "[Roblox Link](  https://web.roblox.com/games/5049349655/Red-Haven-County?refPageId=fe976df8-88f6-4b26-ad6d-78328cfb844a )",
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
