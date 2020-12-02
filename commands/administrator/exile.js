const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const roblox = require("noblox.js");

module.exports = class exile extends Command {
  constructor(client) {
    super(client, {
      name: "exile",
      description: "Exile people within the group.",

      memberName: "exile",
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
    const MainServer = msgObject.client.guilds.get("780139458020114432");
    if (msgObject.guild.id == 780139458020114432) {
      if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Senior Admin")) {
        return true;
              } else if (msgObject.member.roles.find(role => role.name == "letiVERSITY Overlord")) {
        return true;
      }
    }
    return "Sorry 😣! You must be a letiVERSITY Admin!";
  }


  async run(message, { desiredPlayer }) {
    let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_83C28CF0EA15CF7DB76881D256BFBC449688BB765D99A54A4CEDEF4C5674B4937AF39BF4D8FD2A75241D20D21AA249A4CF9DF3DC10766BFE0434032959CDA475D765B04B04942DAE44C1A663F5D9C6161702222C1FA9E6B33098CC01738D6B54763B5F7D8093E2297B79FE342611557180283C1D4811772122A5530310E41A3925A7BFA4A5EDA6F34CFB9B03D2F92D7993432321C0154C3427B8A89330BC2E5F74FC90CB7A527CD2CFA0345E4A0F345297018AAB4A988F28E1C57B221D4FE4D1BA05CC4F79740DFBAFF2DD73C1260104A262F662FFEF2937AD94FF5EA8D47590E54DCDA53AB6F8AB4B6617DC5F42C9E47CF5EC92415C90AF57F001949259F7E398CC369DB1B5BFFC5E21E2BC108AE9684A45A0F8640A1BF023E1B3A8D82F21956DB76A1FA6491B41AB170C33F9784E256C28660E"
    let sentMessage = await message.reply(
      `Allow me to work my magic.. :sleeping:`
    );

    let groupID = 8482724;

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
        .exile(groupID, playerID)
        .then(() => {
          sentMessage.edit(
            `${message.author}, :raised_hands: Successfully exiled **${playerName}**!`
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
