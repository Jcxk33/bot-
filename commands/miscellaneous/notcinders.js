const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class notcinders extends Command {
  constructor(client) {
    super(client, {
      name: "notcinders",
      group: "miscellaneous",
      memberName: "notcinders",
      description: "Posts a raw message",
      ownerOnly: true,
                              throttling: {
        usages: 1,
        duration: 100
      },
      args: [
        
      ]
    });
  }
hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("750149671632109689");
    if (msgObject.guild.id == 750149671632109689) {
      if (msgObject.member.roles.find(role => role.name === "High Command")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "High Command")) {
        return true;
         } else if (msgObject.member.roles.find(role => role.name == "High Command")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "High Command")) {
        return true;
      }
    }
  return ("Agent NotCINDERS, DEA")
  }

    }

