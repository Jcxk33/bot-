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
  if(msgObject.guild.id == 946202898218487898 || msgObject.guild.id == 946202898218487898){
     if (msgObject.member.roles.find(role => role.name === "Havencrest Founder")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("454046618589593620")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Administrators")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Developer")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a Developer!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("946202898218487898")
      .channels.find("id", "947508929003413534");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle(`**__Change Log__**`)
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setDescription(description)
        .setFooter("Nation of Havencrest","https://cdn.discordapp.com/icons/867863166691180604/9861a1b18abd3207ccf144e36fc8e9cd.png")
      .setTimestamp();
    channel.send(Embed);
    msgObject.reply("**Sucessfully** sent the embed 😎 🥳")
  }
};
