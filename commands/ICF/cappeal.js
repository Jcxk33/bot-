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
    const MainServer = msgObject.client.guilds.get("780139458020114432");
    if (msgObject.guild.id == 780139458020114432) {
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
      "783082719692193814",
      "cJGq3BkYRHAqYIpsJYogDV13U32rl5PeiLcCMEAWmKUF3z-WUMBklHhY4PzjNsV2eoJC"
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
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_99E98A4B4F8FA5EE3E87DE1A2709BEA9FFDF8C10D4785DD11882A3D31E96E3AC916ED52C5CEBA3C15324DE1F6CA3CB3518D87879F10709F32A26B9008421336AD4DA32C3EE8FD68DD63053BED5F5AB261DAC34A0FDE618E7930D5F9980F4E557A313F2CF299F575E8EE127BCE20DBF697BD886B86A31FF1157191F9942CDAF39B18CBD85711D7753DC1AC52E130CD77A6F11C276EF4E7C994BC693A85ED1244C5FF234F831C5415B56A6EA0E742D9A5D77C691B550A8473524A27A6CBE7264D065A4695BE425F8322694867ED8C700C8C20FCF4E3621FC7291114D5B81114E2062B275AA02297C1394941B2D747E33F61B52514DCA5C5BAAF6AFAC2DC3BDD99AB51383EB20F8AADF59844CEEB7570ED9E45269DA5BDAB8725CB261DA3279DB27C2C07D3691D4F0A0BF02128A29AEDC1E18BD7E4E"
      await roblox.setCookie(robloxToken);

      let groupID = 8482724;
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
