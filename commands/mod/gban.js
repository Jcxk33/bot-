const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const Trello = require("trello");
const request = require("request-promise");
var trello = new Trello(
  "518a844f03a7b166f21a19d62a2b3da8",
  "bd175d77a563fdcf48e4c9cb5d65ac405e89cb9d36ccd50d530345996b398522"
);

module.exports = class gban extends Command {
  constructor(client) {
    super(client, {
      name: "gban",
      aliases: ["gameban", "remoteban"],
      group: "mod",
      memberName: "gban",
      description: "Bans a user from the game",
      guildOnly: true,
      args: [
        {
          type: "string",
          label: "username",
          prompt: "What is the Roblox username?",
          key: "username"
        },
        {
          type: "string",
          prompt: "What is the reason for moderating this user?",
          key: "reason"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("719627673839861830");
    if (msgObject.guild.id == 719627673839861830) {
      if (msgObject.member.roles.find(role => role.name === "Mod")) {
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
      `Coolio!! Let's get on with this and ban \`${username}\``
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
        `${data.Id}`,
        "",
        "5ee960e547fae818225edf58"
      );
    }
  }
};
