const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class blacklist extends Command {
  constructor(client) {
    super(client, {
      name: "blacklist",
      aliases: ["bl"],
      group: "icf",
      memberName: "blacklist",
      description: "ICF Uses this to blacklist a user",
      ownerOnly: false,
                        throttling: {
        usages: 1,
        duration: 100
      },
      args: [
        {
          type: "string",
          prompt: "Roblox username?",
          key: "title"
            },
        {
          type: "string",
          prompt: "What is the Reason?",
          key: "reason"
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

  async run(msgObject, { title }) {
    let channel = this.client.guilds
    
      .get("790148683097571338")
      .channels.find("id", "807014389596684328");
    let Embed = new Discord.RichEmbed()
      .setColor("")
      .setTitle("**Citizenship Blacklist**")
      .setDescription(`${title} has been Blacklisted from obtaining Citizenship by ${msgObject.member.displayName}`)
      .setFooter("ICF Management", "https://cdn.discordapp.com/attachments/784521929348349978/786638482650562630/ICFJDN.png")
      .setTimestamp();
    channel.send(Embed).then(Embed => {
          msgObject.reply(
        "**Congratulations,** :grin: This user has been blacklisted!"
      );
    });
  }
};