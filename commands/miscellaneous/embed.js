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
      ownerOnly: false,
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
  if(msgObject.guild.id == 832707053243727912 || msgObject.guild.id == 832707053243727912){
     if (msgObject.member.roles.find(role => role.name === "Developer")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "asd")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "asdasd")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a Developer";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
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
