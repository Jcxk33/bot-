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
      if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "aasdasd")) {
        return true;
        } else if (msgObject.member.roles.find(role => role.name == "asdasdas")) {
        return true;
      }
  return("Sorry You must be a Red Haven Admin")
  }

  async run(message, { desiredPlayer }) {
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_6A5AE15C875C03F8320FD6E8119CBCD1FA5B4F402B3ECFF5D5C48061E2296DF93871694C3B7ABF07EA4EEC2284888BE8217B295C679E3F2EA23975A6371857FD6480373B084E6A4D112435FA5EA142F801867F8AE99B1AFE3434160CC212B1D2380641753F27862C08034A2EE9FCD90A42526EB220B4C24CED2A7FF4772D70F1A03992B2C735B29FD71E172285A5DD92435E0BA0CE523EB57E2B4211F91881FFAFE24B318713E51062AF41A50DFC2E2E0F24C16452714A34B9C1023042FE0A0B758EE328B3C42EFC60E4C446235B59C6DB6F5D67F11E388EBE4BE6807FF48ED3C46570DF859BDBC130D8353EFFBDA0804F5811FAB963AFAA6FB5A09108A09308D6A005548F7E2E3A028FC3A80C099D9E56F6ADB62EECEF9E26407AE691F978779B18D769A9FDE285F96A77FCE248AED45B1E932C"
        let sentMessage = await message.reply(
      `Allow me to work my magic.. :sleeping:`
    );
  const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${message.author} has Promoted **${desiredPlayer}**!`);
    log.setFooter(
     `National Guard Command Logging`,
      `https://cdn.discordapp.com/attachments/768153252733779998/795735743418073138/ec227276d45b21c33ba037c1012cbccd.png`
    );
    log.setTimestamp();
    this.client.channels.get(`795735978764402688`).send(log);
    
    let groupID = 6366045;

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
