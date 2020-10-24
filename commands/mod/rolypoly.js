const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class id extends Command {
  constructor(client) {
    super(client, {
      name: "rolypoly",
      group: "mod",
      memberName: "rolypoly",
      description: "Checks for possible alt accounts.",
      guildOnly: true,
      args: [
        {
          type: "user",
          prompt: "What is the user you want to search?",
          key: "userArg1"
        }
      ]
    });
  }
    hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("706999196124840009");
    if (msgObject.guild.id == 706999196124840009) {
      if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
        return true;
      return "Sorry 😣! You must be a Mayflower Moderator or Admin!";
    } else 
      return (
        "Sorry :persevere:! You must use this command in the " +
        MainServer.name +
        "!"
      );
    }
  }
  async run(msgObject, { userArg1 }) {
      let target = await request({
      uri: `https://verify.eryn.io/api/user/${userArg1.id}`,
      json: true,
      simple: false
    });
    

    const msg = msgObject.reply(
      `Coolio!! Let's get on with this and get \`${
        /*target.Username*/ userArg1
      }\`Info`
    );
           
    if (target.errorMessage) {
      return msg.edit("Sorry 😣! No accounts linked!");
      } else {
    msgObject.channel.send(`Wow we found a discord account linked to a roblox account! Discord User: ${userArg1}`)
    const newem = new Discord.RichEmbed()
    .setAuthor(msgObject.member.displayName)
    .setTitle(`${target.Username}'s Information!`)
    .addField(
    "Profile Link",
    `[Roblox Profile](https://www.roblox.com/users/${target.robloxId}/profile)`
    )
    .addField(
    "ID",
    `${target.Id}`)
    .setTimestamp()
    .setColor("RED");
    msgObject.channel.send(newem)
      }
    }
  };
