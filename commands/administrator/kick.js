const Discord = require("discord.js")
const { Command } = require("discord.js-commando")

module.exports = class kick extends Command {
    constructor(client){
        super(client, {
            name: "kick",
            aliases: [],
            description: "kick someone from server",

            memberName: "kick",
            group: "administrator",
            guildOnly: true,

            args: [
                {
                    type: "member",
                    prompt: "who are you kicking?",
                    key: "person",
                },
                {
                    type: "string",
                    prompt: "why are you kicking them?",
                    key: "reason",
                },
            ]
        })
    }
   hasPermission(msgObject) {
  if(msgObject.guild.id == 832707053243727912 || msgObject.guild.id == 832707053243727912){
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
        message.guild.member(person).kick(reason).then(() => {
            message.reply(`successfully kicked ${person.user.tag}`)
        }).catch(error => {
            message.reply(`failed to kick ${person.user.tag}\`\`\`js\n${error}\`\`\``)
            return
        })
         const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
       log.setFooter(
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`83270705459036168422`).send(log);
    }
}