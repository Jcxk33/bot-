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
    const MainServer = msgObject.client.guilds.get(
      "784521928659959860"
    );
    if ((msgObject.guild.id == 706999196124840009)) {
      if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
        return true;
          } else if (msgObject.member.roles.find(role => role.name == "ICF Director")) {
        return true;
      }
    }
    return "Sorry 😣! You must be a Mayflower Admin!";
  }

  async run(message, { desiredPlayer }) {
    let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_98F7DC21CF1D0268C39533C7192F20FF26FEC6315A408E4900F7CE61C676674FD9AC93221C5F5ABF62BFE71B45FC601C24774A85F04EE5F6C9B1AA0039D7FFB7A10BABD6BD090EBA5B8E9800EFEBDD74216D28F84FB74F433DB844FAA89BD647F4F7A74520FEE270EE8BBDB5068153DEA30749D06F6168A9254CB10F65CF6B4155EF2C3A5572D4C0FD0F3EA807044B3FA1AF1D3DC4342B608B4835ACB1B035FB1682231FABFB9E61FBBAC9877FD06995E1241269BE0D03D29BEB08D5545FEB2AC3BCF81C2524AA27060A9937AACD78594A37D29943F0058169C957AC834A0E5376A3D2887B9E43E26BCAF257D0170B7DACE9655A7D44E76F36952BD5EE071E4AFD172C162F026476FBA4170E5B5254B50BE5BC2027BF53F0463AB96F7A4AF0797A0295A1F056EFF8FA4AFC74B327C4B59E0605BD"
        let sentMessage = await message.reply(
      `Allow me to work my magic.. :sleeping:`
    );

    let groupID = 5837961;

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
