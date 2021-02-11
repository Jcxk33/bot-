const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class test extends Command {
  constructor(client) {
    super(client, {
      name: "tesy",
      aliases: ["test"],
      group: "miscellaneous",
      memberName: "test",
      description: "Posts a server startup to the #ssu channel",
      ownerOnly: true,
      throttling: {
        usages: 1,
        duration: 400
      },
      args: [
      ]
    });
  }
  hasPermission(msgObject) {
    if (
      msgObject.guild.id == 790148683097571338 ||
      msgObject.guild.id == 790148683097571338
    ) {
      if (msgObject.member.roles.find(role => role.name === "kjgasdkjasnd")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Moderator")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
        return true;
      }
      return "Sorry 😣! You must be a Moderator or Admin!";
    } else {
      return "Sorry :persevere:! You must use this command in the State of Mayflower!";
    }
  }

  async run(msgObject, { notes }) {
    let channel = this.client.guilds
      .get("790148683097571338")
      .channels.find("id", "790148683390910472");
    let Embed = new Discord.RichEmbed()
      .setColor("#0099ff")
      .setTitle("Official Links")
      .setURL("/")
      .setAuthor(
        "State of Mayflower",
        "https://i.imgur.com/wSTFkRM.png",
        ""
      )
      .setDescription("The links will lead to official sites maintained by the owners")
      .setThumbnail("https://i.imgur.com/wSTFkRM.png")
      .addFields(
        { name: "Group 1 Test", value: "Group 2 Test" },
        { name: "\u200B", value: "\u200B" },
        { name: "Cock and Ball torture", value: "Some value here", inline: true },
        { name: "Inline field title", value: "Some value here", inline: true }
      )
      .addField("Oh Yeah", "Some value here", true)
      .setImage("https://i.imgur.com/wSTFkRM.png")
      .setTimestamp()
      .setFooter("State of Mayflower", "https://i.imgur.com/wSTFkRM.png");
  }
}

