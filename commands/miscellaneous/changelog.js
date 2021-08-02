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
  if(msgObject.guild.id == 871166263945216040 || msgObject.guild.id == 871166263945216040){
     if (msgObject.member.roles.find(role => role.name === "Founder")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Command Team")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Staff")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a Staff Member!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("832707053243727912")
      .channels.find("id", "832707053494730806");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle(`**__Change Log__**`)
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setDescription(description)
      .setFooter("State of Mayflower","https://cdn.discordapp.com/icons/760507778476277831/c3919375525fddc15592d839d70587b6.png")
      .setTimestamp();
    channel.send(Embed);
    msgObject.reply("**Sucessfully** sent the embed 😎 🥳")
  }
};
