const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const roblox = require("noblox.js");

module.exports = class demote extends Command {
  constructor(client) {
    super(client, {
      name: "demote",
      description: "Demote people within the group.",

      memberName: "demote",
      group: "administrator",

      args: [
        {
          type: "string",
          prompt: "What is their Roblox username?",
          key: "desiredPlayer",
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
      return "Sorry 😣! You must be an Admin!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }


  async run(message, { desiredPlayer }) {
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_5B8378EE2D8168BC8D7054231FB12BCAA50D7364E1F8C7985CA31AE556B9C11E2B3CA6CF54C64869F52D0F66A4D3CFCA1362312AC6A1BBC3C8E6C06F575243D246F19AD7C78B11D7F836813EA86F371EBBCA5D991940F9F8D9DABF95C9D4ED086119B6FBC4C8517B00BCC758A773C818C6B8FF54C130F26EA2F2DAAC9C6F1346216CECE089894368DCE3C411647C7B7796BBCC859E6290F73F382175A4BB7AECDBC86954C475DD572B889E5A675DD1124EAB4E9433AA0E80776FE30BBABDAF88EEDDCDB208D3DFC3B1D15D8C2BBC28BAC284237D733C344EA6B0E728E96433322404306B4FEA93B7D2887CA66B6A674BF0E24F16B1FAD7CA3AE3A0D31B3D67E8C4462AC1B35B9D6B2AF0FB62393A5970039BE306149285FEFFD62DACE7B9D1D949069A74"
    let sentMessage = await message.reply(
      `Allow me to work my magic.. :sleeping:`
    );

    let groupID = 8725427;

    let playerName;
    let playerID;

    let playerRank;
    let playerOldRank;
    let playerNewRank;

    // Detection System
    await roblox.setCookie(robloxToken);

    try {
      playerID = await roblox.getIdFromUsername(desiredPlayer);
      playerName = await roblox.getUsernameFromId(playerID);
      playerRank = await roblox.getRankNameInGroup(groupID, playerID);
      playerOldRank = playerRank;
    } catch (error) {
      sentMessage.edit(
        `${message.author}, :construction: There has been an error! \`\`\`js\n${error}\`\`\``
      );
      return;
    }
    const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${message.author} has demoted **${desiredPlayer}**!`);
    log.setFooter(
      `Warzone Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`871166806193225728`).send(log);
    try {
      await roblox
        .demote(groupID, playerID)
        .then(() => {
          async function getData() {
            playerNewRank = await roblox.getRankNameInGroup(groupID, playerID);
          }

          setTimeout(() => {
            getData().then(() => {
              sentMessage.edit(
                `${message.author}, :raised_hands: Successfully demoted **${playerName}** from **${playerOldRank}** to **${playerNewRank}**!`
              );
            });
          }, 500);
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
