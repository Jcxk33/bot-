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
  if(msgObject.guild.id == 800898562786590771 || msgObject.guild.id == 800898562786590771){
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
        msgObject.member.roles.find(role => role.name == "Admin")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a ICF Agent Member!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Red Haven!"
      );
    }
  }

  async run(msgObject, { title }) {
    let channel = this.client.guilds
    
      .get("798271839217778689")
      .channels.find("id", "799788766432067595");
    let Embed = new Discord.RichEmbed()
      .setColor("")
      .setTitle("**Citizenship Blacklist**")
      .setDescription(`${title} has been Blacklisted from obtaining Citizenship by ${msgObject.member.displayName}`)
      .setFooter("ICF Management", "https://cdn.discordapp.com/attachments/784521929348349978/786638482650562630/ICFJDN.png")
      .setTimestamp();
    channel.send(Embed).then(Embed => {
          msgObject.reply(
        "**Congratulations,** :grin:This user has been blacklisted!"
      );
    });
  }
};