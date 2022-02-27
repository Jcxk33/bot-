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
        "The following will provide a list of all current links relating to the Nation of Havencrest"
      )
      .addField("Discord", "[Discord Link](https://discord.gg/NkwQsqP86k)", true)
      .addField(
        "Group",
        "[Roblox Link](https://www.roblox.com/groups/12393339/State-Of-PIymouth)",
        true
      )
      .addField(
        "Game",
        "[Roblox Link](https://www.roblox.com/games/8894808113/Muskoka-County)",
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
