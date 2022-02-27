const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const roblox = require("noblox.js");

module.exports = class acceptreq extends Command {
  constructor(client) {
    super(client, {
      name: "acceptreq",
      description: "Accept people within the group.",

      memberName: "acceptreq",
      group: "administrator",

      args: [
        {
          type: "string",
          prompt: "What is their Roblox username?",
         key: "Username",
          label: "username"
        }
      ]
    });
  } 

 hasPermission(msgObject) {
  if(msgObject.guild.id == 930029180467421215 || msgObject.guild.id == 930029180467421215){
     if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("454046618589593620")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Co-Founder")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Head Administrator")
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

  async run(message, { Username }) {
      let robloxToken = ""
    let sentMessage = await message.reply(
      `Allow me to work my magic.. :sleeping:`
    );

    let groupID = 8725427;

    let playerName;
    let playerID;
    let playerRank;

    // Detection System
    await roblox.setCookie(robloxToken);

    try {
      playerID = await roblox.getIdFromUsername(Username);
      playerName = await roblox.getUsernameFromId(playerID);
      playerRank = await roblox.getRankNameInGroup(groupID, playerID);
    } catch (error) {
      sentMessage.edit(
        `${message.author}, :construction: There has been an error! \`\`\`js\n${error}\`\`\``
      );
      return;
    }
    const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${message.author} has accepted  **${Username}'s** Group Request!!`);
  log.setFooter(
     `Warzone Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`871166806193225728`).send(log);

    try {
      await roblox
        .handleJoinRequest(groupID, playerID, true)
        .then(() => {
          sentMessage.edit(
            `${message.author}, :raised_hands: Successfully accepted **${playerName}**!`
          );
        })
        .catch(error => {
          sentMessage.edit(
            `${message.author}, :construction: There has been an error! \`\`\`js\n${error}\`\`\``
          );
          return;
        });
    } catch (error) {
      sentMessage.edit(
        `${message.author}, :construction: There has been an error! \`\`\`js\n${error}\`\`\``
      );
      return;
    }
  }
};
