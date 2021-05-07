const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class suggest extends Command {
  constructor(client) {
    super(client, {
      name: "poll",
      aliases: ["pl"],
      group: "miscellaneous",
      memberName: "poll",
      description: "Makes a poll with reactions",
      ownerOnly: false,
                        throttling: {
        usages: 1,
        duration: 20
      },
      args: [
        {
          type: "string",
          prompt: "What is the Question?",
          key: "Question"
        }
      ]
    });
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
        msgObject.member.roles.find(role => role.name == "Developer")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Admin")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a Developer or Admin!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }
  async run(msgObject, { Question }) {
    let channel = this.client.guilds
      .get("832707053243727912")
      .channels.find("id", "832707054053097475");
        const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
     log.setDescription(`${msgObject.author} has made a Poll about  ${Question} `);
      log.setFooter(
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`832707054590361684`).send(log);

    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Poll")
      .setDescription(Question)
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
    
      .setTimestamp();
    channel.send("@here", Embed).then(Embed => {
        Embed.react("✔️")
       Embed.react("❌")
          msgObject.reply(
        "**Congratulations, **Poll successfully made!:smile: "
      );
    });
  }
};
