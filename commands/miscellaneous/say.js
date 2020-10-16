const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      group: "miscellaneous",
      memberName: "say",
      description: "Posts a raw message",
      ownerOnly: true,
      args: [
        {
          type: "string",
          prompt: "What channel do you want to send it in? (channel name like `general` not `#general`)",
          key: "channel"
        },
        {
          type: "string",
          prompt: "What do you want the content to be?",
          key: "content"
        }
      ]
    });
  }
  hasPermission(msgObject) {
      if (msgObject.member.roles.find(role => role.name === "Bots")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("242876771387572224")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Staff")) {
        return true;
      }
    return "Sorry 😣! You must be a Staff Member!";
  }
  async run(msgObject, { channel, content }) {
    try {
      msgObject.guild.channels.find("name", channel).send(content)
    } catch(error){
      msgObject.reply(`Sorry 😣! There has been an error while running this command!\n\n\`\`\`js\n${error}\`\`\``)
    }
  }
};