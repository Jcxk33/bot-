const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const roblox = require("noblox.js");

module.exports = class denyreq extends Command {
  constructor(client) {
    super(client, {
      name: "denyreq",
      description: "Deny people from the group.",

      memberName: "denyreq",
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
      } else if (msgObject.member.roles.find(role => role.name == "Developer")) {
        return true;
         } else if (msgObject.member.roles.find(role => role.name == "ICF Director")) {
        return true;
        } else if (msgObject.member.roles.find(role => role.name == "ICF")) {
        return true;
          } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
        return true;
      }
       return "Sorry, :persevere:! You must be a Mayflower Administrator! :grimacing:";
    }
}


  async run(message, { desiredPlayer }) {
    let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_B5DD000E8BF6B90D2118B871133CE43AD0B64C44FB845AC3A2F9D21F720D31ECDB336340184671FE86F9BFEDA95700E6091B4427AB456B9977106B5E0C8EB4528528BA2F8E82561CBCCCC7776033974BD0904B0714147D77CE499DDD79D281B3736363B9E2BBCA2A8A349ABDE1DAFDDC96E68D89EA6564FAD0EAA450F8CB15702340CAAAC4739E7EA9B54983D3E135AE9B6906D82F0A3AB769AFFE1F5995471DDB493D0CB78029F16CEB0CC06D09380C1AAF58F85D83663080342C8F2A9152957F33182013489ADE3CA8812CEFAF099810EC54A0E86AF9AD37BB9DCF11A92CDA6CA1DABF2DE79657C8516A9809608F9403C3222766E3C0535AC09559B121B36364F32A520D842108D0B1478B3988FBE98ECA48EA8B8DFEE7A8384CC98083471BC5C4B537"
    let sentMessage = await message.reply(
      `Allow me to work my magic.. :sleeping:`
    );

    let groupID = 7900529;

    let playerName;
    let playerID;
    let playerRank;

    // Detection System
    await roblox.setCookie(robloxToken);

    try {
      playerID = await roblox.getIdFromUsername(desiredPlayer);
      playerName = await roblox.getUsernameFromId(playerID);
      playerRank = await roblox.getRankNameInGroup(groupID, playerID);
    } catch (error) {
      sentMessage.edit(
        `${message.author}, :construction: There has been an error! \`\`\`js\n${error}\`\`\``
      );
      return;
    }

    try {
      await roblox
        .handleJoinRequest(groupID, playerID, false)
        .then(() => {
          sentMessage.edit(
            `${message.author}, :raised_hands: Successfully denied **${playerName}**!`
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
