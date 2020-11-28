const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const roblox = require("noblox.js");
module.exports = class credits extends Command {
  constructor(client) {
    super(client, {
      name: "cappeal",
      description: "Handles specified target's citizenship appeal",
      group: "mod",
      guildOnly: true,
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
    const MainServer = msgObject.client.guilds.get("774306549640200223");
    if (msgObject.guild.id == 774306549640200223) {
      if (msgObject.member.roles.find(role => role.name === "ICF")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "ICF Director")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Senior Admin")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a ICF Agent Member!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the " +
        MainServer.name +
        "!"
      );
    }
  }
  async run(message, args) {
    var webhook = new Discord.WebhookClient(
      "781564781152436244",
      "lTIRoUHCBN0_QGutonMO_T6jwsgKMu12bh65oS1-HNjCdUc5eaXJL1KfAx8Gv6k0CSi2"
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

    let playerName = args.person
    if (choice == "Accepted") {
      let robloxToken =
        "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_B8F70B9F6C5D46892D7F77B6F92C288A3D0957247294C1A707532D216A4BDD1483318460006C3DF53CC250F418A20289D51A673751EF60E4C8FB1FF19802A756AC86EC0535FCB3C1463CD94BCA11DCA40081F8CB4920EE4CC822CDEFE564A6D1255C662773511874F4E2AB4E4F85FF19A0D05B62A331B0EE743AFDC861063C3A2B2C714A8AAC33594B093842E2746D5147388FC9052890F9B11E214EF4703A6361419BDE3D6C20462D94E1EE5CB0749D87C2B21902028ECC4238954D85053E116372A9D1CBC2DCD602E36B4490A4BEFC607ED82BF01B27BECF00525EE40EEDE5D64BDDA22B97B71B8FFE6E595A4F4C9CA6C1EE9F31BC8E1CECA7860F0BC2F338D8A5244ECDC685F6AC47A2180D4935D6E09CB4959F3AAA87F93887F82F8992EFEAEBCA5E";

      await roblox.setCookie(robloxToken);

      let groupID = 8141418;
      let playerID = await roblox.getIdFromUsername(args.person);
      playerName = await roblox.getUsernameFromId(playerID)
      
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
    message.reply("Successfully sent your appeal message! 🤗");
  }
};
