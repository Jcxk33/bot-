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
    const MainServer = msgObject.client.guilds.get(
      "759963799213572146"
    );
    if ((msgObject.guild.id == 759963799213572146)) {
      if (msgObject.member.roles.find(role => role.name === "Colonel")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Major General")) {
        return true;
          } else if (msgObject.member.roles.find(role => role.name == "Brigadier General")) {
        return true;
                } else if (msgObject.member.roles.find(role => role.name == "Command Sergeant Major")) {
        return true;
                     } else if (msgObject.member.roles.find(role => role.name == "Major General's Aid")) {
        return true;
                      } else if (msgObject.member.roles.find(role => role.name == "Deputy Command Sergeant Major")) {
        return true;
      }
     return "Sorry 😣! You must be a Colonel+ to run this command";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the National Guard Server Server!"
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
    log.setDescription(`${message.member.displayName} has kicked ${person} `);
   log.setFooter(
      `GunFights Command Logging`,
      `https://cdn.discordapp.com/icons/729884219701985420/ed159f1ba6b46d1ad5529c42ffb4b68e.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`799567798900490280`).send(log);
    }
}