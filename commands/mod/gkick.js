const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const Trello = require("trello");
const request = require("request-promise");
var trello = new Trello(
  "b3e86d17c55b6dc170e3e426e4e1a491",
  "f2ef765f0ae529428cafc0f675d6da19273c2a3c4b9bd32efba2e7c9ad649cc9"
);

module.exports = class gkick extends Command {
  constructor(client) {
    super(client, {
      name: "gkick",
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
    const MainServer = msgObject.client.guilds.get("746921954803581008");
    if (msgObject.guild.id == 746921954803581008) {
      if (msgObject.member.roles.find(role => role.name === "Mod")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      
            } else if (msgObject.member.roles.find(role => role.name === "Junior Moderator")) {
        return true;
            } else if(msgObject.author == this.client.users.get("675794471065092161")){
      return true;
    } else if (msgObject.member.roles.find(role => role.name === " Bot Developer")) {
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
        `${data.Username}`,
        `Moderator: ${authorData.robloxUsername}\nReason: ${reason}`,
        "5f7571edd9a18d44fa202708"
      );
    }
  }
};
