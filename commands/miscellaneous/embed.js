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
                              throttling: {
        usages: 2,
        duration: 100
      },
      args: [
        {
          type: "string",
          prompt: "What channel do you want to send this in?",
          key: "channel",
        },
        {
          type: "string",
          prompt: "What do you want the title to be?",
          key: "title"
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
    const MainServer = msgObject.client.guilds.get("774306549640200223");
    if (msgObject.guild.id == 774306549640200223) {
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
      } else if (msgObject.member.roles.find(role => role.name == "Head Moderator")) {
        return true;
      }
    }
    return "Sorry 😣! You must be a Charleston Moderator!!";
  }
  async run(msgObject, { channel, title, content }) {
    let embed = new Discord.RichEmbed()
      .setTitle(title)
      .setDescription(content)
      .setColor("RANDOM");

    try {
      msgObject.guild.channels.find("name", channel).send(embed)
    } catch(error){
      msgObject.reply(`Sorry 😣! There has been an error while running this command!\n\n\`\`\`js\n${error}\`\`\``)
    }
  }
};
