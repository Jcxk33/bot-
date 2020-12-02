const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "poll",
      aliases: ["poll"],
      group: "miscellaneous",
      memberName: "poll",
      description: "Posts an Poll needed by Server Moderators",
      ownerOnly: false,
      throttling: {
        usages: 1,
        duration: 300
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
    const MainServer = msgObject.client.guilds.get("780139458020114432");
    if (msgObject.guild.id == 780139458020114432) {
      if (msgObject.member.roles.find(role => role.name === "Moderator")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Senior Admin")) {
        return true;
         } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
        return true;
             } else if (msgObject.member.roles.find(role => role.name == "letiVERSITY Overlord")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Head Moderator")) {
        return true;
      }
    }
    return "Sorry 😣! You must be a letiVERSITY Moderator!!";
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("780139458020114432")
      .channels.find("id", "780141377832615977");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("**LETIVERSITY POLL**")
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setDescription(description)
      .setFooter('State of letiVERSITY', 'https://cdn.discordapp.com/icons/780139458020114432/01dabdfb0142c431b901b0df70695fc4.jpg')
      .setTimestamp(1522);
    channel.send(Embed).then(Embed => {
        Embed.react("✅")
      Embed.react("❎")
    });
  }
};                    
