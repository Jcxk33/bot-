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
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D7D70CF53F2D28B522E947EA6CAF9FDCDB966016B9FBC56EC00DF1E10FE110FC6CBC0414DFE41E134603F71D42D2AAF53ADDFF24EA39C577EF53C40123F8305BC60B6F0B4CF01290880C50E615AF8A88C7F73ABE8582E49FFA97223C7FC79098BE02CB67C26319CEA4D513E8805A81667973571AF7AD18DF02AD483F60724AFA74929894D7FE740E467AFF786EC28664A2BC89ED5672D553E5E56E5B2909073F44E0144DD0B7366FA5B60598396FEE82ADA77944A41E920161C0690EFECC89EFC6235607C8F0C7B1BB67F15A5E1D091A445F19E9219574ECC84C554D2DB8BF5273101CE91260B6DA31B9A20100A191925022FA7AF665CB99821B7EB2885220F2D94F6B718388A6EB61DB96FCA8A97DC0C90A978738D094A5341D820CC4F024F065FC1A0CFA76BFFE25A74FD6D2E907577E0A4AC0"
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
