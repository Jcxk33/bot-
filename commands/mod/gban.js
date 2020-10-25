const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const Trello = require("trello");
const request = require("request-promise");
var trello = new Trello(
  "c9e52d011d3d704bd452fced273f2d43", // Key
  "f5d12ed1404cc5d144690ea480a1a640e879dd3cd79ff5801db849d6df0092cc" // Token
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
  
  // Checks for Permission
  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("706999196124840009");
    if (msgObject.guild.id == 706999196124840009) {
      if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
        return true;
      return "Sorry 😣! You must be a Mayflower Moderator or Admin!";
      };
    }
  }
  async run(msgObject, { username, reason }) {
    const editMessage = await msgObject.reply(
      `Coolio!! Let's get on with this and ban \`${username}\``
    );
    
    // Get's users username
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
      // Checks it on rover
      editMessage.edit(`Ooooh, we've got their UserID as \`${data.Id}\`!`);
      let authorData = await request({
        uri: `https://verify.eryn.io/api/user/${msgObject.author.id}`,
        json: true,
        simple: false
      });
      
      // Sends webhook to moderation-logs
      const webhook = new Discord.WebhookClient(
        "765510011451211776",
        "cw3hfPDKfvMpS_zOWiNd-Mwn-rTOip8-kgngj8ZZ4CRH5n6G7974pKf-g_nWevP7XqQw"
      );

      editMessage.edit(
        `Congrats 🙌! Your command will be executed in-game shortly!`
      );
      editMessage.edit(`Wowzers, Your command has been executed in-game`);
      
// Add's card to trello
      trello.addCard(
        `${data.Username}`,
        `Moderator: ${authorData.robloxUsername}\nReason: ${reason}`,
        "",
        "5f95c2870f084f8a82054106"
      );
    }
  }
};
