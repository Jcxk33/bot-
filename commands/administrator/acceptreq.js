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
         key: "Username",
          label: "username"
        }
      ]
    });
  } 

 hasPermission(msgObject) {
  if(msgObject.guild.id == 801647258386300978 || msgObject.guild.id == 801647258386300978){
     if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Owner")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "asdsad")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a Moderator or Admin!";
    } else {
      return (
        "Sorry :persevere:! This command is disabled in this server"
      );
    }
  }


  async run(message, { Username }) {
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D7D70CF53F2D28B522E947EA6CAF9FDCDB966016B9FBC56EC00DF1E10FE110FC6CBC0414DFE41E134603F71D42D2AAF53ADDFF24EA39C577EF53C40123F8305BC60B6F0B4CF01290880C50E615AF8A88C7F73ABE8582E49FFA97223C7FC79098BE02CB67C26319CEA4D513E8805A81667973571AF7AD18DF02AD483F60724AFA74929894D7FE740E467AFF786EC28664A2BC89ED5672D553E5E56E5B2909073F44E0144DD0B7366FA5B60598396FEE82ADA77944A41E920161C0690EFECC89EFC6235607C8F0C7B1BB67F15A5E1D091A445F19E9219574ECC84C554D2DB8BF5273101CE91260B6DA31B9A20100A191925022FA7AF665CB99821B7EB2885220F2D94F6B718388A6EB61DB96FCA8A97DC0C90A978738D094A5341D820CC4F024F065FC1A0CFA76BFFE25A74FD6D2E907577E0A4AC0"
    let sentMessage = await message.reply(
      `Allow me to work my magic.. :sleeping:`
    );

    let groupID = 8725427;

    let playerName;
    let playerID;
    let playerRank;

    // Detection System
    await roblox.setCookie(robloxToken);

    try {
      playerID = await roblox.getIdFromUsername(Username);
      playerName = await roblox.getUsernameFromId(playerID);
      playerRank = await roblox.getRankNameInGroup(groupID, playerID);
    } catch (error) {
      sentMessage.edit(
        `${message.author}, :construction: There has been an error! \`\`\`js\n${error}\`\`\``
      );
      return;
    }
    const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${message.author} has accepted  **${Username}'s** Group Request!!`);
  log.setFooter(
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`813967149017071627`).send(log);

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
