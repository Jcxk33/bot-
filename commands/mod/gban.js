const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const Trello = require("trello");
const request = require("request-promise");
var trello = new Trello(
  "b3e86d17c55b6dc170e3e426e4e1a491",
  "f2ef765f0ae529428cafc0f675d6da19273c2a3c4b9bd32efba2e7c9ad649cc9"
);

module.exports = class gban extends Command {
  constructor(client) {
    super(client, {
      name: "gban",
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
    const MainServer = msgObject.client.guilds.get("754201074935529553");
    if (msgObject.guild.id == 754201074935529553) {
      if (msgObject.member.roles.find(role => role.name === "Senior Management")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Developer")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
        return true;
      }
      return "*Yikes* 😣! You must be a Staff Member!";
    } else {
      return (
        "*Sorry* :persevere:! You must use this command in the " +
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
      const webhook = new Discord.WebhookClient(
        "754203008983891988",
        "XqROd4pyt9bZdvi4HFloma8ULY857v0whJ20a0NiRCfc7zezFg7W8hMXlAzhrrrWqSu-"
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

      editMessage.edit(
        `Congrats 🙌! Your command will be executed in-game shortly!`
      );
      editMessage.edit(`**Wowzers, **:flushed: Your command has been executed in-game`);

trello.addCard(
        `${data.Username}`,
        `Moderator: ${authorData.robloxUsername}\nReason: ${reason}`,
        "5fb5c9b5edf6ff298cd8c762"
      );
    }
  }
};
