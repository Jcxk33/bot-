const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class id extends Command {
  constructor(client) {
    super(client, {
      name: "role",
      aliases: ["giverole"],
      group: "administrator",
      memberName: "role",
      description: "Grants a member a specified role.",
      guildOnly: true,
      args: [
        {
          type: "member",
          prompt: "What member do you want to role?",
          key: "member"
        },
        {
          type: "role",
          prompt: "What role would you like to grant this member?",
          key: "role"
        }
      ]
    });
  }
hasPermission(msgObject) {
      if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "")) {
        return true;
      }
  return("Sorry You must be a Red Haven Admin!")
  }
  async run(msgObject, { member, role }) {
    let GuildMember = msgObject.guild.members.find(`id`, member.id);
    if (!GuildMember.roles.has(role.id)) {
      GuildMember.addRole(role.id);
      msgObject.reply(
        "Modified roles for " + member.user.tag + " | + " + role.name
      );
       const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${msgObject.member} has roled  ${member} ${role}! `);
    log.setFooter(
      `RedHaven Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`803326837786148944`).send(log);
    } else {
      GuildMember.removeRole(role.id);
      msgObject.reply(
        "Modified roles for " + member.user.tag + " | - " + role.name
        
      );
    }
  }
};

