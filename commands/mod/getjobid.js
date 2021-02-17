const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
require('dotenv').config();

const allowedRanks = process.env.allowedRanks.split(",");
module.exports = class getjobid extends Command {
  constructor(client) {
    super(client, {
      name: "getjobid",
      aliases: ["getidofmonkey", "idserver", "gplr"],
      group: "mod",
      memberName: "getjobid",
      description: "Retrieves given players jobid",
      guildOnly: true,
      ownerOnly: true,
      args: [
        {
          type: "string",
          prompt: "User?",
          key: "username",
          default: ""
        }
      ]
    });
  }




/**
* @param {Discord.Message} message
* @param {Discord.Client} client
* @param {String[]} args
*/

  async run(msgObject, username, { message, client, args }) {
    
    let isAllowed = false;
    for(let i = 0; i < allowedRanks.length; i++) {
        if(msgObject.member.roles.exists(role => [allowedRanks[i]].includes(role.name))) {
            isAllowed = true;
        }
    }

    if(isAllowed == false) {
        return msgObject.channel.sendFileFilesCodeEmbedMessage(client.embedMaker(msgObject.author, "No Permission", "You don't have permission to run this command"));
    }

    if(!username) {
        return msgObject.channel.sendFileFilesCodeEmbedMessage('You didnt provide a username')
    }

    let newRequest = {
        userToCheck: username,

        type: "GetPlayerJobId",
        channelID: msgObject.channel.id,
        authorID: msgObject.author.id
    }

    client.request = newRequest;

    msgObject.channel.sendFileFilesCodeEmbedMessage(client.embedMaker(msgObject.author, "Sent Request", `I have successfully sent the request over for Roblox to read! If there is no response, it's most likely that the server is down or the player that you supplied isn't in the game`));
}

}