const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const roblox = require("noblox.js");
module.exports = class credits extends Command {
  constructor(client) {
    super(client, {
      name: "cappeal",
      description: "Handles specified target's citizenship appeal",
      group: "icf",
      memberName: "cappeal",
      args: [
        {
          prompt: "Who's citizenship appeal do you wish to handle?",
          type: "string",
          key: "person"
        },
        {
          key: "option",
          prompt:
            "Do you wish to `accept`/`deny`/`invprivate` this citizenship appeal?",
          type: "string",
          validate: text => {
            if (text == "accept" || text == "deny" || text == "invprivate")
              return true;
          }
        }
      ]
    });
  }


   hasPermission(msgObject) {
  if(msgObject.guild.id == 832707053243727912 || msgObject.guild.id == 832707053243727912){
     if (msgObject.member.roles.find(role => role.name === "ICF")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("ICF Director")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Admin")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "sd")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a member of the ICF";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }

  async run(message, args) {
    var webhook = new Discord.WebhookClient(
      "838872567225516162",
      "PWWWGLmWrWFTn0AdXkJ1fZUrgNmU16G3jKtB9zqOwodnC1YK39e6MmwjQcGGdh5o9-lW"
    );
    var nickname;
    if (message.member.nickname) {
      nickname = message.member.nickname;
    } else {
      nickname = message.author.username;
    }
    var choice;
    if (args.option == "accept") {
      choice = "Accepted";
    }
    if (args.option == "deny") {
      choice = "Denied";
    }
    if (args.option == "invprivate") {
      choice = "Inventory Private";
    }

    let playerName = args.person;
    if (choice == "Accepted") {
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_5B8378EE2D8168BC8D7054231FB12BCAA50D7364E1F8C7985CA31AE556B9C11E2B3CA6CF54C64869F52D0F66A4D3CFCA1362312AC6A1BBC3C8E6C06F575243D246F19AD7C78B11D7F836813EA86F371EBBCA5D991940F9F8D9DABF95C9D4ED086119B6FBC4C8517B00BCC758A773C818C6B8FF54C130F26EA2F2DAAC9C6F1346216CECE089894368DCE3C411647C7B7796BBCC859E6290F73F382175A4BB7AECDBC86954C475DD572B889E5A675DD1124EAB4E9433AA0E80776FE30BBABDAF88EEDDCDB208D3DFC3B1D15D8C2BBC28BAC284237D733C344EA6B0E728E96433322404306B4FEA93B7D2887CA66B6A674BF0E24F16B1FAD7CA3AE3A0D31B3D67E8C4462AC1B35B9D6B2AF0FB62393A5970039BE306149285FEFFD62DACE7B9D1D949069A74"
      await roblox.setCookie(robloxToken);
 let sentMessage = await message.reply(
      `Allow me to work my magic.. :sleeping:`
    );
      let groupID = 8725427;
      let playerID = await roblox.getIdFromUsername(args.person);
      playerName = await roblox.getUsernameFromId(playerID);

      await roblox.setRank(groupID, playerID, 2);
    }

    const embed = new Discord.RichEmbed()
      .setTimestamp()
      .setTitle(`${playerName}'s Citizenship Appeal`)
      .setDescription(choice);
    webhook.send("", {
      username: "Citizenship",
      embeds: [embed]
    });

    const log = new Discord.RichEmbed();
    log.setTitle(`Citizenship Management`);
    log.setColor(`1D37D9`);
    log.setDescription(
      `${message.author} has set **${
        args.person
      }**'s appeal to \`${choice.toLowerCase()}\`!`
    );
      log.setFooter(
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`832707054590361684`).send(log);

    

    message.reply("Successfully sent your appeal message! 🤗");
  }
};
