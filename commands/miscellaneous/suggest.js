const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class suggest extends Command {
  constructor(client) {
    super(client, {
      name: "suggest",
      aliases: ["sg"],
      group: "miscellaneous",
      memberName: "suggest",
      description: "Suggests something to be added into the game",
      ownerOnly: false,
                        throttling: {
        usages: 1,
        duration: 200
      },
      args: [
        {
          type: "string",
          prompt: "What is the Description?",
          key: "description"
        }
      ]
    });
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("964306940563963904")
      .channels.find("id", "964310595929264149");
        const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${msgObject.author} has suggested ** ${description} ** `);
      log.setFooter(
     `State of Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/867863166691180604/9861a1b18abd3207ccf144e36fc8e9cd.png`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`966471593582800977`).send(log);

    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Suggestion")
      .setDescription(description)
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
    
      .setTimestamp();
    channel.send(Embed).then(Embed => {
        Embed.react("✔️")
       Embed.react("❌")
          msgObject.reply(
        "**Congratulations, **suggestion successfully made!:smile: "
      );
    });
  }
};
