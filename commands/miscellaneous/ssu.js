const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "ssu",
      aliases: ["startup"],
      group: "miscellaneous",
      memberName: "ssu",
      description: "Posts a server startup to the #ssu channel",
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
      .channels.find("id", "746923991339630682");
    channel.send("@mention");
    let Embed = new Discord.RichEmbed()
      .setColor("#e58049")
      .setAuthor(`${msgObject.member.displayName}`)
      .setDescription(`no`)
      .setTimestamp();
    channel.send(Embed);
  }
};
