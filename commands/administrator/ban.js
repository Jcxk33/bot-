const Discord = require("discord.js")
const { Command } = require("discord.js-commando")

module.exports = class ban extends Command {
    constructor(client){
        super(client, {
            name: "ban",
            aliases: [],
            description: "bans someone from server",

            memberName: "ban",
            group: "administrator",
            guildOnly: true,

            args: [
                {
                    type: "member",
                    prompt: "who are you banning?",
                    key: "person",
                },
                {
                    type: "string",
                    prompt: "why are you banning them?",
                    key: "reason",
                },
            ]
        })
    }
         hasPermission(msgObject) {
  if(msgObject.guild.id == 871166263945216040 || msgObject.guild.id == 871166263945216040){
     if (msgObject.member.roles.find(role => role.name === "Founder")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Command Team")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Staff")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a Staff Member!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }
    async run(message, { person, reason }){
        message.guild.member(person).ban(reason).then(() => {
            message.reply(`successfully banned ${person.user.tag}`)
        }).catch(error => {
            message.reply(`failed to ban ${person.user.tag}\`\`\`js\n${error}\`\`\``)
            return
        })
         const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${message.member.displayName} has banned ${person} `);
      log.setFooter(
     `Warzone Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`871166806193225728`).send(log);

    }
}