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
                              throttling: {
        usages: 1,
        duration: 100
      },
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
    const MainServer = msgObject.client.guilds.get("780139458020114432");
    if (msgObject.guild.id == 780139458020114432) {
      if (msgObject.member.roles.find(role => role.name === "Moderator")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Senior Admin")) {
        return true;
         } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
        return true;
             } else if (msgObject.member.roles.find(role => role.name == "letiVERSITY Overlord")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Head Moderator")) {
        return true;
      }
    }
    return "Sorry 😣! You must be a letiVERSITY Moderator!!";
  }
  async run(msgObject, { channel, content }) {
    try {
      msgObject.guild.channels.find("name", channel).send(content)
    } catch(error){
      msgObject.reply(`Sorry 😣! There has been an error while running this command!\n\n\`\`\`js\n${error}\`\`\``)
    }
  }
};
