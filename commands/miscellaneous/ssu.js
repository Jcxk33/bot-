const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "ssu",
      aliases: ["startup"],
      group: "miscellaneous",
      memberName: "ssu",
      description: "Posts a server startup to the #ssu channel",
      ownerOnly: true,
      throttling: {
		usages: 1,
		duration: 8000,
	},
      args: [
        {
          type: "string",
          prompt: "What are the notes for the ssu?",
          key: "notes"
        }
      ]
    });
  }
hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("706999196124840009");
    if (msgObject.guild.id == 706999196124840009) {
      if (msgObject.member.roles.find(role => role.name === "BOT")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
         } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
        return true;
      }
    }
    return "Sorry 😣! You must be a Mayflower Moderator!!";
  }
  
  async run(msgObject, { notes }) {
    let channel = this.client.guilds
      .get("706999196124840009")
      .channels.find("id", "763539950360592414");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setTitle(`Server Startup`)
      .setDescription(`${msgObject.author} is conducting a server startup!`)
      .addField(
        `:link: Link`,
        `[State of Mayflower](https://www.roblox.com/games/5883511054/New-Haven-County)`
      )
    
      .addField(`:book: Notes`, `${notes}`)
      .setTimestamp();
    channel.send("@hre", Embed);

    msgObject.reply(`Congrats :sunglasses:! You have announced a server startup!`);
                const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${msgObject.member} has Announced an SSU for **${notes}**!! `);
    log.setFooter(
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/706999196124840009/a7ab98d9916c3482d5c4f0156b786b60.png?size=128`
    );
    log.setTimestamp();
    this.client.channels.get(`790345391912517632`).send(log);
  }
};
