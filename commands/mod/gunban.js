const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const Trello = require("trello");
const request = require("request-promise");
var trello = new Trello(
  "33c4644733ac7670dc1f0378911c3716",
  "9a224ecff7ece350dd6a38cbaf8d20575807691b8e745a494628537a8f84b5dc"
);

module.exports = class gban extends Command {
  constructor(client) {
    super(client, {
      name: "gunban",
      group: "mod",
      memberName: "gunban",
      description: "Unbans a user from the game",
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
          prompt: "What is the reason for unbanning this user?",
          key: "reason"
        }
      ]
    });
  }
     hasPermission(msgObject) {
  if(msgObject.guild.id == 867863166691180604 || msgObject.guild.id == 867863166691180604){
     if (msgObject.member.roles.find(role => role.name === "Developer")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("871981356773699584")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Moderator")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Admin")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a Moderator!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
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
        "871907168109101076",
        "0I_r6YRFISsGsyx1n2sngysEODb0MAVCML7krTi_wpD0hrQ2hH-o0mj5oT2xaqbPFesn"
      );
      webhook.send("", {
        embeds: [
          {
            author: {
              name: `${authorData.robloxUsername}`
            },
            title: `unbanned ${data.Username}`,
            description: `"${reason}"`
          }
        ]
      });

      editMessage.edit(
        `Congrats 🙌! Your command will be executed in-game shortly!`
      );
      editMessage.edit("Insane, your command has been executed in-game!");
trello.addCard(
        `${username}:${data.Id}`,
        `Moderator: ${authorData.robloxUsername}\nReason: ${reason}`,
        "61106cb151f4dc2307ee9554"
  
      );
    }
  }
};
//no