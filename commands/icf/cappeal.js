const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const roblox = require("noblox.js");
module.exports = class credits extends Command {
  constructor(client) {
    super(client, {
      name: "cappeal",
      description: "Handles specified target's immigration appeal",
      group: "icf",
      memberName: "cappeal",
      args: [
        {
          prompt: "Who's immigration appeal do you wish to handle?",
          type: "string",
          key: "person"
        },
        {
          key: "option",
          prompt:
            "Do you wish to `accept`/`deny`/`invprivate` this immigration appeal?",
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
  if(msgObject.guild.id == 874071911225765988 || msgObject.guild.id == 874071911225765988){
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
      "874071911225765988", //numbers here
      "arYBD3PWp7Qjri1PL-TMq0igoxUYIOjPs8e4EOJzGby4mjziO6Wg7OP2YVa3c30oIO5N" //random letters here
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
      let robloxToken = ""
      await roblox.setCookie(robloxToken);

      let groupID = 9559573;
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
      
    this.client.channels.get(`867863167853133824`).send(log);

    

    message.reply("Successfully sent your appeal message! 🤗");
  }
};
