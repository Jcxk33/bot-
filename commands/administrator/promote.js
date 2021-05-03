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
  if(msgObject.guild.id == 832707053243727912 || msgObject.guild.id == 832707053243727912){
     if (msgObject.member.roles.find(role => role.name === "Senior Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Moderator")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Admin")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a Moderator or Admin!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }



  async run(message, { desiredPlayer }) {
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_4B230049994D2594747489F066E5B0C1B87532E9CAA1CBFF2AFCF1E6B083E1654220388E58418B81229BCA85D95D42A4FD5F8DB7D7345770059484B9D41E19739819B4955C8855F108CB863041C9DDEBF0DFB9D05342663C9C0C734E8EB790F5E8BD2CC1CDDA5A66F5409C76B94864FA7DFAFB542E68512A3F31BF7EB4F64A9A45FCD0E445C10DE128B5E1D8B183FF424BF29F95613F700188287BDEFE230A3422E24989CDFDDFAFE17A521BA6FED4A3D734918EC5D70E94DCB668696CF550950BFC4C352D69400656E5E71827BFCF6E9449A00CFB7DCB428DE57821F375345FF670B2BB9823E71296F7D75AA82F771ACA2EAD0F2A3417A974366B1D039C2C8265E835C760E2AD561DCD2644EA017DFCB2CD8B1F37C1C4C98A0CD8220442B685B03078BA1F5240D78F103563012BE5198DDB5422"
        let sentMessage = await message.reply(
      `Allow me to work my magic.. :sleeping:`
    );
    
    let groupID = 8725427;

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
         const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${message.author} has Promoted **${desiredPlayer}**!`);
    log.setFooter(
    `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`832707054590361684`).send(log);
        });
    } catch (error) {
      sentMessage.edit(
        `${message.author}, :construction: There has been an error! \`\`\`js\n${error}\`\`\``
      );
      return;
    }
  }
};
