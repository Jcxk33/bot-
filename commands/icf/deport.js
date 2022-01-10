const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const roblox = require("noblox.js");
module.exports = class credits extends Command {
  constructor(client) {
    super(client, {
      name: "deport",
      description: "ICF Uses this to Deport Someone",
      group: "icf",
      guildOnly: true,
      memberName: "deport",
      args: [
        {
          prompt: "Who's Deportion do you wish to handle?",
          type: "string",
          key: "person"
        }
      ]
    });
  }

 hasPermission(msgObject) {
  if(msgObject.guild.id == 930029180467421215 || msgObject.guild.id == 930029180467421215){
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
        msgObject.member.roles.find(role => role.name == "ICF")
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
    var webhook = new Discord.WebhookClient("", ""); // webhook stuff here
    var nickname;
    if (message.member.nickname) {
      nickname = message.member.nickname;
    } else {
      nickname = message.author.username;
    }

    let playerName = args.person;
      let robloxToken = ""
    await roblox.setCookie(robloxToken);

    let groupID = 9559573;
    let playerID = await roblox.getIdFromUsername(args.person);
    playerName = await roblox.getUsernameFromId(playerID);
    await roblox.setRank(groupID, playerID, 1);

    const log = new Discord.RichEmbed();
    log.setTitle(`Citizenship Management`);
    log.setColor(`1D37D9`);
    log.setDescription(`${message.author} has deported **${args.person}**!`);
     log.setFooter(
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`930029181704749059`).send(log);

    
    
    message.reply(`**Done,** :raised_hands:  Successfully Deported`);
  }
};
