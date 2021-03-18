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
  if(msgObject.guild.id == 808115419842871346 || msgObject.guild.id == 808115419842871346){
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
      "819763301462048768",
      "PDDW65tixtk4Mc49pyhG0novbeutUh3kB5dpSopTMm7E6qB9pVULaR9FMRL7ZKIfGsem"
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
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_4B230049994D2594747489F066E5B0C1B87532E9CAA1CBFF2AFCF1E6B083E1654220388E58418B81229BCA85D95D42A4FD5F8DB7D7345770059484B9D41E19739819B4955C8855F108CB863041C9DDEBF0DFB9D05342663C9C0C734E8EB790F5E8BD2CC1CDDA5A66F5409C76B94864FA7DFAFB542E68512A3F31BF7EB4F64A9A45FCD0E445C10DE128B5E1D8B183FF424BF29F95613F700188287BDEFE230A3422E24989CDFDDFAFE17A521BA6FED4A3D734918EC5D70E94DCB668696CF550950BFC4C352D69400656E5E71827BFCF6E9449A00CFB7DCB428DE57821F375345FF670B2BB9823E71296F7D75AA82F771ACA2EAD0F2A3417A974366B1D039C2C8265E835C760E2AD561DCD2644EA017DFCB2CD8B1F37C1C4C98A0CD8220442B685B03078BA1F5240D78F103563012BE5198DDB5422"
      await roblox.setCookie(robloxToken);

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
      
    this.client.channels.get(`813967149017071627`).send(log);

    

    message.reply("Successfully sent your appeal message! 🤗");
  }
};
