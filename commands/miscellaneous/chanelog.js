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
    const MainServer = msgObject.client.guilds.get("780139458020114432");
    if (msgObject.guild.id == 780139458020114432) {
      if (msgObject.member.roles.find(role => role.name === "Developer")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("1")
      ) {
      }
    }
    return "Sorry 😣! You must be a letiVERSITY Developer!!";
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("780139458020114432")
      .channels.find("id", "783099970412347402");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle(":arrow_up: **__Change Log__**")
      .setFooter('State of letiVERSITY', 'https://cdn.discordapp.com/icons/780139458020114432/01dabdfb0142c431b901b0df70695fc4.jpg')
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
