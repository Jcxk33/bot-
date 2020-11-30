const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const roblox = require("noblox.js");

module.exports = class promote extends Command {
  constructor(client) {
    super(client, {
      name: "promote",
      description: "Promote people within the group.",

      memberName: "promote",
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
    const MainServer = msgObject.client.guilds.get("754146784892157982");
    if (msgObject.guild.id == 754146784892157982) {
      if (msgObject.member.roles.find(role => role.name === "Moderator")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Senior Admin")) {
        return true;
         } else if (msgObject.member.roles.find(role => role.name == "Head Moderator")) {
        return true;
          } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
        return true;
      }
       return "Sorry, :persevere:! You must be a Mayflower Administrator! :grimacing:";
    }
}

  async run(message, { desiredPlayer }) {
    let robloxToken =
"_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will--someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_FEAAC5E627C5D4AAA0FB2582725B1FC558E1CDB960E203997515458B518B8BAF27E19C12D4A26659678FF5E6A76BC1B6B89CA936F0212E459569E720AAD36A5752159EEFD7916642464269E1266963400790180C417FA57455000D836DB440563FB62960080C39013E5565D6471BD9C61F289B024E5A21139204AE9057AC079BFEA87E11D2105D364855BBB6A5FC1F64015ACC8764203AD702D3935A077770A26CEDE1762917D07549ED7F37134C9D823C147613D5D4679DEE14F33355393FA5367F654FBB70EA4F5DD0F0D55130189B180DD0CCF4E0BD5A5D6ACB5117305A5F2AE3993EEFB98CC0F1D88352CDF3273161950A193F3EDCB151E4F793329F4D91E9F11E560979F0B3EB97BEC3CFDECA427991B9C0B43AC4FB5110FDE23E4762C24EE4B031"
    let sentMessage = await message.reply(
      `Allow me to work my magic.. :sleeping:`
    );

    let groupID = 8141418;

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

    try {
      await roblox
        .promote(groupID, playerID)
        .then(() => {
          async function getData() {
            playerNewRank = await roblox.getRankNameInGroup(groupID, playerID);
          }

          setTimeout(() => {
            getData().then(() => {
              sentMessage.edit(
                `${message.author}, :raised_hands: Successfully promoted **${playerName}** from **${playerOldRank}** to **${playerNewRank}**!`
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
