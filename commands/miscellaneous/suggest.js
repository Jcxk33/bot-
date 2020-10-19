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
        usages: 2,
        duration: 10
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
      if (msgObject.member.roles.find(role => role.name === "Owner")) {
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
      .get("760707893027667979")
      .channels.find("id", "760707893027667982");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Game Suggestion")
      .setDescription(description)
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setTimestamp();
      channel.send("a", Embed);
  }
};
