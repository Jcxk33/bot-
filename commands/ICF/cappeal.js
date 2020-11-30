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
        msgObject.author == this.client.users.get("675794471065092161")
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
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_6AEDC6762769A6FE2A4D9D12DA787CCE03D2BC0FDA929FDC67290E55014D14617FE23666340AF020763C32B14E62717FA2CA894B80511536728F4261E2269D42BC6DD5119846000B8EA1F3680373AC1A3C2EC05A26FDC8615467A632F9E79A83F5F03CB341F84F0A31192CDEBF61EC8EDFFC14B8FD52FE1D5899984EFD0C910E8BFB20A9B9566CA6836295892EA2C7BDE9580B5403D4213531EE97A6B33EA147285ADF4F1DD6E61AA2A49C087B3A1BB006BB105987DCCF199AD4E698F2021CE3062788917307FC27F7034DFD3CEC89651F48634F852B3F14EE7713590F15935547AB3836F8148907C5C2E3D540A96BA98043EF689B58D3271BFBBD7DB6783BE3A4FC5197BDDC608233E3392148C7FEB814AEE519F50CD15E17AB572D8A2B34869A38862D3B16EEF1530F6A4C89E953BEAC04F87D"
      await roblox.setCookie(robloxToken);

      let groupID = 8482724;
      let playerID = await roblox.getIdFromUsername(args.person);
      playerName = await roblox.getUsernameFromId(playerID)
      
      await roblox.setRank(groupID, playerID, 242);
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
