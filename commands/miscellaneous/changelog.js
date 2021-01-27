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
      if (msgObject.member.roles.find(role => role.name === "Developer")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Bot Developer")) {
        return true;
      }
  return("Sorry :frown: You must be a Gunfights Development Member")
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("729884219701985420")
      .channels.find("id", "729890778469498941");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle(`:arrow_up:   **__Change Log__**`)
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setDescription(description)
      .setFooter("Red Haven")
      .setTimestamp(1911);
    channel.send(Embed);
    msgObject.reply("**Sucessfully** sent the embed 😎 🥳")
  }
};
