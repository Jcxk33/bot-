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
      .get("754201074935529553")
      .channels.find("id", "767226133082013716");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("**__Charleston Announcement__**")
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setDescription(description)
      .setFooter('State of Charleston', 'https://cdn.discordapp.com/icons/754201074935529553/f4802d09280ac81f7955c478de30ec2c.jpg')
      .setTimestamp();
    channel.send(Embed);
  }
};
