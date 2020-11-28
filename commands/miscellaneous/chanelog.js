const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "changelog",
      aliases: ["cl"],
      group: "miscellaneous",
      memberName: "changelog",
      description: "Posts a change log to the change log channel",
      ownerOnly: false,
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
    const MainServer = msgObject.client.guilds.get("774306549640200223");
    if (msgObject.guild.id == 774306549640200223) {
      if (msgObject.member.roles.find(role => role.name === "Developer")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("1")
      ) {
      }
    }
    return "Sorry 😣! You must be a Myflower Developer!!";
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("774306549640200223")
      .channels.find("id", "774318080565706752");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle(":arrow_up: **__Change Log__**")
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setDescription(description)
      .setTimestamp(1911);
    channel.send(Embed);
    msgObject.reply("**Sucessfully** sent the embed 😎 🥳")
  }
};
