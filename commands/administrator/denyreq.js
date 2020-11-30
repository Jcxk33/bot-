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
    const MainServer = msgObject.client.guilds.get("780139458020114432");
    if (msgObject.guild.id == 780139458020114432) {
      if (msgObject.member.roles.find(role => role.name === "¬_¬")) {
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
          } else if (msgObject.member.roles.find(role => role.name == "Administrator")) {
        return true;
      }
       return "Sorry, :persevere:! You must be a letiVERSITY Administrator! :grimacing:";
    }
}


  async run(message, { desiredPlayer }) {
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_6AEDC6762769A6FE2A4D9D12DA787CCE03D2BC0FDA929FDC67290E55014D14617FE23666340AF020763C32B14E62717FA2CA894B80511536728F4261E2269D42BC6DD5119846000B8EA1F3680373AC1A3C2EC05A26FDC8615467A632F9E79A83F5F03CB341F84F0A31192CDEBF61EC8EDFFC14B8FD52FE1D5899984EFD0C910E8BFB20A9B9566CA6836295892EA2C7BDE9580B5403D4213531EE97A6B33EA147285ADF4F1DD6E61AA2A49C087B3A1BB006BB105987DCCF199AD4E698F2021CE3062788917307FC27F7034DFD3CEC89651F48634F852B3F14EE7713590F15935547AB3836F8148907C5C2E3D540A96BA98043EF689B58D3271BFBBD7DB6783BE3A4FC5197BDDC608233E3392148C7FEB814AEE519F50CD15E17AB572D8A2B34869A38862D3B16EEF1530F6A4C89E953BEAC04F87D"
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
