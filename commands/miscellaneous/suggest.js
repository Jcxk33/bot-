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
      .get("706999196124840009")
      .channels.find("id", "776261957165907979");
        const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${msgObject.member} has suggested **${description}**!! `);
    log.setFooter(
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/706999196124840009/a7ab98d9916c3482d5c4f0156b786b60.png?size=128`
    );
    log.setTimestamp();
    this.client.channels.get(`790345391912517632`).send(log);
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
