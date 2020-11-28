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

  hasPermission(message) {
    const validRole = "🎄 | Christmas";
    if (message.member.roles.some(role => role.name == validRole)) {
      return true;
    } else {
      return "Sorry, :persevere:! You must be a Mayflower Administrator! :grimacing:";
    }
  }

  async run(message, { desiredPlayer }) {
    let robloxToken =
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
