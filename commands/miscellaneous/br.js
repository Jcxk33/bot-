const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class suggest extends Command {
  constructor(client) {
    super(client, {
      name: "br",
      aliases: ["bugreport"],
      group: "miscellaneous",
      memberName: "br",
      description: "Reports a bug to the developer",
      ownerOnly: true,
      args: [
        {
          type: "string",
          prompt: "What is the Description?",
          key: "description"
        }
      ]
    });
  }
  hasPermission(msgObject) {
      if (msgObject.member.roles.find(role => role.name === "Owner")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Verified")) {
        return true;
      }
    return "Sorry 😣! You must be Verified!";
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("746921954803581008")
      .channels.find("id", "765087980833734686");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Bug Report")
      .setDescription(description)
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setTimestamp();
      channel.send("@752658669316997210", Embed);
  }
};
