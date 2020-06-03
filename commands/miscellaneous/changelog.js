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
      ownerOnly: true,
      args: [
        {
          type: "string",
          prompt: "What is the Description?",
          key: "description"
        }
      ]
    });
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("673619643533099027")
      .channels.find("id", "698148840296939610");
    channel.send("@here");
    let Embed = new Discord.RichEmbed()
      .setColor("#2F3137")
      .setTitle("Change Log")
      .setDescription(description)
      .setTimestamp();
    channel.send(Embed);
  }
};
