const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const Trello = require("trello");
const request = require("request-promise");
var trello = new Trello(
  "",
  ""
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
    const MainServer = msgObject.client.guilds.get("800898562786590771");
    if (msgObject.guild.id == 800898562786590771) {
      if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("242876771387572224")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
        return true;
      }
      return "Sorry :persevere:! You must be a Admin or Moderator Member!";
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
        "",
        "-OJp"
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
      editMessage.edit(`**Wowzers,** Your command has been executed in-game`);
  const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${msgObject.member} has Gamebanned **${username}** for **${reason}**! `);
     log.setFooter(
      `GunFights Command Logging`,
      `https://cdn.discordapp.com/icons/729884219701985420/ed159f1ba6b46d1ad5529c42ffb4b68e.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`799567798900490280`).send(log);
trello.addCard(
        `${data.Username}`,
        `Moderator: ${authorData.robloxUsername}\nReason: ${reason}`,
        "5f93cf66f83aa15a57bf5747"
  
      );
    }
  }
};
