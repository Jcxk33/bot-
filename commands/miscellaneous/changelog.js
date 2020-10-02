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
      .get("746921954803581008")
      .channels.find("id", "748410042046480475");
    channel.send("@here");
    let Embed = new Discord.RichEmbed()
      .setColor("#00FFFF")
      .setTitle("Change Log")
      .setDescription(description)
      .setTimestamp();
    channel.send(Embed);
  }
};
