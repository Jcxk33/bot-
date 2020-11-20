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
   }
    return "Sorry 😣! You must be a Charleston Moderator!!";
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("754201074935529553")
      .channels.find("id", "754201808897048588");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("**Charleston Announcement**")
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setDescription(description)
      .setFooter('State of Charleston', 'https://cdn.discordapp.com/icons/754201074935529553/f4802d09280ac81f7955c478de30ec2c.jpg')
      .setTimestamp();
    channel.send(Embed);
        msgObject.reply(`**Congrats** :sunglasses:! You have announced your Announcement!`);
  }
};
