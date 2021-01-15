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
        duration: 40
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
      .get("729884219701985420")
      .channels.find("id", "769368824352735232");
        const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${msgObject.member} has suggested **${description}**!! `);
    log.setFooter(
      `GunFights Command Logging`,
      `https://cdn.discordapp.com/icons/729884219701985420/ed159f1ba6b46d1ad5529c42ffb4b68e.jpg`
    );
    log.setTimestamp(); 
    this.client.channels.get(`799567798900490280`).send(log);
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
