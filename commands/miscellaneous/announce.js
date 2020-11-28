const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "announce",
      aliases: ["an"],
      group: "miscellaneous",
      memberName: "announce",
      description: "Posts an announcement needed by Staff / Government",
      ownerOnly: false,
      throttling: {
        usages: 1,
        duration: 500
      },
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
      if (msgObject.member.roles.find(role => role.name === "Developer")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Server Management")) {
        return true;
   } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
        return true;
     } else if (msgObject.member.roles.find(role => role.name == "Governor")) {
        return true;
            } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
        return true;
       } else if (msgObject.member.roles.find(role => role.name == "Lieutenant Governor")) {
        return true;
            } else if (msgObject.member.roles.find(role => role.name == "Cabinet")) {
        return true;
   }
    return "Sorry 😣! You must be a Mayflower Moderator!!";
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("774306549640200223")
      .channels.find("id", "774316712082145323");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("**Mayflower**")
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setDescription(description)
      .setFooter('State of Mayflower', 'https://cdn.discordapp.com/icons/774306549640200223/0daa343074d9e9dc924ed598a841b01e.jpg')
      .setTimestamp();
    channel.send(Embed);
        msgObject.reply(`**Congrats** :sunglasses:! You have announced your Announcement!`);
  }
};
