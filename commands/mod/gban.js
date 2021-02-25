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
    const MainServer = msgObject.client.guilds.get("801647258386300978");
    if (msgObject.guild.id == 801647258386300978) {
      if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("Owner")
      ) {
          } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
        return true;
      }
      return "Sorry :persevere:! You must be an Admin or a Moderator! ";
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
      const webhook = new Discord.WebhookClient(
        "814324400324739083",
        "X46sDp0N8Qr7wFCWAVQnj24CoNjeHIGBCuf53Sdhv3QrPcceVNpCmUa1e-7pBOz-X0xE"
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
      editMessage.edit("**Wowzers,** Your command has been executed in-game on server `7dccd8c9-6a6b-4d7d-b2fc-df3cfa650e98`");
  const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${msgObject.member} has Gamebanned **${username}** for **${reason}**! `);
      log.setFooter(
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`813967149017071627`).send(log);
trello.addCard(
        `${data.Username}`,
        `Moderator: ${authorData.robloxUsername}\nReason: ${reason}`,
        "603704bf495af939209503cd"
  
      );
    }
  }
};
