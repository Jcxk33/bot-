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
      if (msgObject.member.roles.find(role => role.name === "Owner")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Developer")) {
        return true;
        } else if (msgObject.member.roles.find(role => role.name == "asdas")) {
        return true;
      }
  return("Sorry You must be a Virgina Moderator")
  }



  async run(message, { desiredPlayer }) {
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_879734FAEA807830811CA157225453FE4B75EDE93E4E624A7CB7A53EEFC29B0778B517185199457CC8D1F8E9279E97BEB3B0634D5A8B930C344B539F36729868103FBD2B7692AD39D5834700D8A416D659DA20F6E52F462AB195A8D981089B5271B2C5864F5D12C11274803EC3FBE9F27F7136B4ACB9DA60B26DCF8C3D3A5019B09272BFBABBF8F0671DDDCD538D55FDB717879AFCEB2A8F14B3407BDDBAF258502F4B155DB3C21EEC0A972C87BE284EFD01EB7C49A6D9F268EF9584899E564A2BB69290DFCB1F3ACE6CD890849DAB8EB4D9975F41679A47BAC282E05C9FAC7A144C00BFE084290D68180F76D415249ACE065EB5FEEA61718B803A9E4BD208E0D835401C618A5CF2F6B5F941BA1F284B5089BEA195EF8B3B0048EE54ED9EFDE7FDD13CF0CCAFB67A6244C719B9E355C4F67CC082"
    let sentMessage = await message.reply(
      `Allow me to work my magic.. :sleeping:`
    );

    let groupID = 7900529;

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
      `RedHaven Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`803326837786148944`).send(log);
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
