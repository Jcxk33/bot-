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
  if(msgObject.guild.id == 790148683097571338 || msgObject.guild.id == 790148683097571338){
     if (msgObject.member.roles.find(role => role.name === "asd")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("sadasd")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "asd")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "sd")
      ) {
        return true;
      }
      return "Sorry 😣! ICF Commands are disabled";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }

  async run(message, args) {
    var webhook = new Discord.WebhookClient(
      "799035539013107764",
      "TpwvV8iWKqsuyrmvBJTLCVqHpDU08lPubs6aal2OCszOV9usSbXYFNwJ12lB1DzTPzEn"
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
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_610E4DFDE859056F21079F9F5FD48BF586B95275DC0FAAB55DED89DD78A54AE0C652530CC641F264232330F7AFC24E6945A0DFE5147E96E8C238211B424504D25E1FA9A8BB57EDB1B6C798C26CE41CCA1BFA752865DC738CE79F711D8DC271220F60D91EF74B4ED19F710D945F6C38DACD06C59157BEE950FFCBEAE4C94C124AEB62EE6E56A53AF1DF4E30A95DB5F30961100E16155F7F8A5B21F9E18FDBFB465256A564A2E3FE8F8F72DB06A7F686D8C67779DBCDAE890BB20BB09831330A4D477450149E575429BF435875C817F3F7331D15807BE39355FA290E37D1E521672921B3F172876308F082BDDE6FC8446C8B93E881BE1570412366DEB65EE673D5018185FDE7FE21A8D1FB8EB00126F5B6754B056F091D4EF2B369783C36C58441884939CC"
      await roblox.setCookie(robloxToken);

      let groupID = 7563230;
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
      
    this.client.channels.get(`813967149017071627`).send(log);

    

    message.reply("Successfully sent your appeal message! 🤗");
  }
};
