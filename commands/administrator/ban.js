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
     if (msgObject.member.roles.find(role => role.name === "Senior Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Moderator")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Admin")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a Moderator or Admin!";
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
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`832707054590361684`).send(log);

    }
}