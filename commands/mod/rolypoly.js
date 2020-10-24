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
          type: "string",
          prompt: "What is the Roblox username?",
          key: "username"
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
  async run(msgObject, { username, reason }) {
    let target = await request({
      uri: `https://api.roblox.com/users/get-by-username?username=${username}`,
      json: true,
      simple: false
    });
    let msg = await msgObject.reply(
      `Coolio!! Let's get on with this and get \`${
        /*target.Username*/ username
      }\`Info`
    );
    

           
    if (target.errorMessage) {
      return msg.edit("Sorry 😣! You haven't entered a valid Roblox username!");
    } else {
      msg.edit(`Wowzers, We got the information on ${target.Username}!`)
    }
  }
};
