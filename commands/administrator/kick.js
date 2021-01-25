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
      if (msgObject.member.roles.find(role => role.name === "Owner")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Developer")) {
        return true;
        } else if (msgObject.member.roles.find(role => role.name == "asdas")) {
        return true;
      }
  return("Sorry You must be a Virgina Owner")
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
    log.setDescription(`${message.member.displayName} has kicked ${person} `);
    log.setFooter(
      `RedHaven Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`803326837786148944`).send(log);
    }
}