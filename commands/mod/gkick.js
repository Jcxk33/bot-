const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const Trello = require("trello");
const request = require("request-promise");
var trello = new Trello(
  "1c29d4f8d0ca29591d3b38ce675d85a8",
  "65211bcf92cecf0baa5c222b2c139bcb27d589d4bcfdcecc342f39a32ae43e75"
);

module.exports = class gkick extends Command {
  constructor(client) {
    super(client, {
      name: "gkick",
      aliases: ["gamekick", "remotekick"],
      group: "mod",
      memberName: "gkick",
      description: "Kicks a user from the game",
      guildOnly: true,
      args: [
        {
          type: "string",
          prompt: "What is the Roblox username?",
          key: "username"
        },
        {
          type: "string",
          prompt: "What is the reason for kicking this user?",
          key: "reason"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("753560739935158312");
    if (msgObject.guild.id == 753560739935158312) {
      if (msgObject.member.roles.find(role => role.name === "Moderator")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      }
      return "Sorry 😣! You must be a Moderator or Admin!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the " +
        MainServer.name +
        "!"
      );
    }
  }
  async run(msgObject, { username, reason }) {
    const editMessage = await msgObject.reply(
      `Coolio!! Let's get on with this and kick \`${username}\``
    );
    let data = await request({
      uri: `https://api.roblox.com/users/get-by-username?username=${username}`,
      json: true,
      simple: false
    });
    if (data.errorMessage) {
      return editMessage.edit(
        "Sorry 😣! You haven't entered a valid Roblox username!"
      );
    } else {
      editMessage.edit(`Ooooh, we've got their UserID as \`${data.Id}\`!`);
      let authorData = await request({
        uri: `https://verify.eryn.io/api/user/${msgObject.author.id}`,
        json: true,
        simple: false
      });
      editMessage.edit(
        `Ooooh, we've also got your UserID as \`${authorData.robloxId}\`!`
      );
      editMessage.edit(
        `Congrats 🙌! Your command will be executed in-game shortly!`
      );
      trello.addCard(
        `${editMessage.channel.id} ${editMessage.id} ${authorData.robloxId} kick ${data.Id} ${reason}`,
        "",
        "5f755c20ae36457f7ca1fde5"
      );
    }
  }
};
