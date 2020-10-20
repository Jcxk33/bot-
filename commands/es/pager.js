const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class suggest extends Command {
  constructor(client) {
    super(client, {
      name: "pager",
      aliases: ["pg"],
      group: "miscellaneous",
      memberName: "pager",
      description: "Creates a Pager",
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
      if (msgObject.member.roles.find(role => role.name === "LPD")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "PPD")) {
        return true;
            } else if (msgObject.member.roles.find(role => role.name == "NHCSO")) {
        return true;
                } else if (msgObject.member.roles.find(role => role.name == "MSP")) {
        return true;
                    } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
        return true;
                          } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
        return true;
      }
    return "Sorry 😣! You must be ES!";
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("706999196124840009")
      .channels.find("id", "740496274175819777");
    let Embed = new Discord.RichEmbed()
      .setColor("")
      .setTitle("Pager!")
      .setDescription(description)
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setTimestamp();
      channel.send("@her", Embed);
  }
};
