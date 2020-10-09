const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "embed",
      aliases: ["sayembed"],
      group: "miscellaneous",
      memberName: "embed",
      description: "Posts an embed with desired content",
      ownerOnly: true,
      args: [
        {
          type: "string",
          prompt: "What do you want the title to be?",
          key: "title"
        },
        {
          type: "string",
          prompt: "What do you want to post ?",
          key: "content"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    if (msgObject.member.roles.find(role => role.name === "Bot Developer")) {
      return true;
    } else if (
      msgObject.author == this.client.users.get("242876771387572224")
    ) {
      return true;
    } else if (msgObject.member.roles.find(role => role.name === "Admin")) {
      return true;
    } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
      return true;
    }
    return "Sorry 😣! You must be a Moderator or Admin!";
  }
  async run(msgObject, { title, content }) {
    let embed = new Discord.RichEmbed().setTitle(title).setDescription(content);
    
    msgObject.channel.send(embed)
  }
};
