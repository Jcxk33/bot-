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
      "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_B8F70B9F6C5D46892D7F77B6F92C288A3D0957247294C1A707532D216A4BDD1483318460006C3DF53CC250F418A20289D51A673751EF60E4C8FB1FF19802A756AC86EC0535FCB3C1463CD94BCA11DCA40081F8CB4920EE4CC822CDEFE564A6D1255C662773511874F4E2AB4E4F85FF19A0D05B62A331B0EE743AFDC861063C3A2B2C714A8AAC33594B093842E2746D5147388FC9052890F9B11E214EF4703A6361419BDE3D6C20462D94E1EE5CB0749D87C2B21902028ECC4238954D85053E116372A9D1CBC2DCD602E36B4490A4BEFC607ED82BF01B27BECF00525EE40EEDE5D64BDDA22B97B71B8FFE6E595A4F4C9CA6C1EE9F31BC8E1CECA7860F0BC2F338D8A5244ECDC685F6AC47A2180D4935D6E09CB4959F3AAA87F93887F82F8992EFEAEBCA5E";

    let sentMessage = await message.reply(
      `Allow me to work my magic.. :sleeping:`
    );

    let groupID = 8141418;

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
