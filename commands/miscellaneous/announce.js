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
      if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
        return true;
      }
  return("Sorry :frown: You must be a Red Haven Moderator or admin!")
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("800898562786590771")
      .channels.find("id", "800909968794189835");
    let Embed = new Discord.RichEmbed()
     .setColor("RANDOM")
      .setTitle("**Red Haven Announcement**")
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setDescription(description)
      .setFooter('State of RedHaven', 'https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg')
      .setTimestamp();
    channel.send(Embed);
        msgObject.reply(`**Congrats** :sunglasses:! You have announced your Announcement!`);
  }
};
