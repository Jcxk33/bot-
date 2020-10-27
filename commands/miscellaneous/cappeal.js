const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class suggest extends Command {
  constructor(client) {
    super(client, {
      name: "cappeal",
      aliases: ["cappeal"],
      group: "miscellaneous",
      memberName: "cappeal",
      description: "Accepts / Declines citizenship",
      ownerOnly: true,
                        throttling: {
        usages: 1,
        duration: 100
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
 const webhook = new Discord.WebhookClient(
        "729909303149854741",
        "SZVzBmXYKfDjKU8uPPNE4T2IRkFs2YkNZC7eUnDuClD72UVqF6JhPWAWLLuJFISf-OJp"
      );
      webhook.send("", {
        embeds: [
          {
            author: {
              name: `${authorData.robloxUsername}`
            },
            title: `Banned ${data.Username}`,
            description: `"${reason}"`
          }
        ]
      });
      )
  }
};