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
      "759963799213572146"
    );
    if ((msgObject.guild.id == 759963799213572146)) {
      if (msgObject.member.roles.find(role => role.name === "Colonel")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Major General")) {
        return true;
          } else if (msgObject.member.roles.find(role => role.name == "Brigadier General")) {
        return true;
                } else if (msgObject.member.roles.find(role => role.name == "Command Sergeant Major")) {
        return true;
                     } else if (msgObject.member.roles.find(role => role.name == "Major General's Aid")) {
        return true;
                      } else if (msgObject.member.roles.find(role => role.name == "Deputy Command Sergeant Major")) {
        return true;
      }
     return "Sorry 😣! You must be a Colonel+ to run this command";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the National Guard Server Server!"
      );
    }
  }


  async run(message, { desiredPlayer }) {
    let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D9BD4E4384E948FAD6895C9F8010B2B6FBCB7447E5B4B10287663D0A84117DB87F71EB925363FB8F8283CD942116A89D819F1D4C72FF60DDAD715BCC9B8A20832B177160F424153F152FCEC3A2B8A5E8AB2CADF0DCA1C1D581D911B1F9A5A400D3DDD0CAB6D31543FA69B5FAA94F0FA55C54B8BFE492CE1AF4F212F1EC0016D69836ECC92170EEB65E8C6A1995C66B169E41679865E81E03FBF6304A79B9EFBCC1B37133FF1529AD15002151D8E55CB6940DC81E4716E651A4BC6CEE2CFFC8A3D391B1CE4248F4E8B1F665DA8C9E2B91C32C53D9B8404CF9B8A258BD8FCB9FABE2A882DC664BF3CE2E25E56BF8E524890A11BB813401F08EB97CDEFAA2D36188FEEBC7B62BF81A28ABF8D0E8E9CDEA8D277441D1F2E921349E3551DBE93F56A56E9B5BAE"
        let sentMessage = await message.reply(
      `Allow me to work my magic.. :sleeping:`
    );
  const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${message.author} has Promoted **${desiredPlayer}**!`);
    log.setFooter(
      `RedHaven Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`803326837786148944`).send(log);
    
    let groupID = 5282563;

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
