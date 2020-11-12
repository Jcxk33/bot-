const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class suggest extends Command {
  constructor(client) {
    super(client, {
      name: "suggest",
      aliases: ["sg"],
      group: "miscellaneous",
      memberName: "suggest",
      description: "Suggests something to be added into the game",
      ownerOnly: true,
                        throttling: {
        usages: 1,
        duration: 100
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
      if (msgObject.member.roles.find(role => role.name === "Moderator")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Verified")) {
        return true;
      }
    return "Sorry 😣! You must be Verified!";
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("729884219701985420")
      .channels.find("id", "769368824352735232");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Game Suggestion")
      .setDescription(description)
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setTimestamp();
    channel.send(Embed).then(Embed => {
        Embed.react("✅")
      Embed.react("❎")
          msgObject.reply(
        "**Congratulations, **Suggestion Sucsessfully Made!:smile: "
      );
    });
  }
};