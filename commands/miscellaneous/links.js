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
        "RoVer Website",
        "[RoVer Website](https://rover.link)",
        true
      );

    msgObject.reply(embed);
  }
};
