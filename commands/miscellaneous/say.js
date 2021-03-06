const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class say extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      group: "miscellaneous",
      memberName: "say",
      description: "Posts a raw message",
      ownerOnly: false,
                              throttling: {
        usages: 1,
        duration: 100
      },
      args: [
        {
          type: "string",
          prompt: "What channel do you want to send it in? (channel name like `general` not `#general`)",
          key: "channel"
        },
        {
          type: "string",
          prompt: "What do you want the content to be?",
          key: "content"
        }
      ]
    });
  }
hasPermission(msgObject) {
  if(msgObject.guild.id == 946202898218487898 || msgObject.guild.id == 946202898218487898){
     if (msgObject.member.roles.find(role => role.name === "Moderator")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("454046618589593620")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Admin")
      ) {
        return true;    
      }
      return "Sorry 😣! You must be an Admin!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }
  async run(msgObject, { channel, content }) {
    
    try {
      msgObject.guild.channels.find("name", channel).send(content)
      
    } catch(error){
       const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${msgObject.user} has ran the say command and said ${content}`);
  log.setFooter(
     `Warzone Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`964310595929264149`).send(log);
      msgObject.reply(`Sorry 😣! There has been an error while running this command!\n\n\`\`\`js\n${error}\`\`\``)
    
    }
  }
};
