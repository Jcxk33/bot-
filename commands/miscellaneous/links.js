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
      .addField("Discord", "[Discord Link](https://discord.gg/DDfp7tC)", true)
      .addField(
        "Group",
        "[Roblox Link](https://www.roblox.com/groups/6103396/The-State-of-Charleston#!/about)",
        true
      )
      .addField(
        "Game",
        "[Roblox Link]( https://www.roblox.com/games/5866088106/Jackson-County-NEW-RELEASE?refPageId=7b0a11c9-ecd6-45b7-8f77-ab540f5c63ff )",
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
