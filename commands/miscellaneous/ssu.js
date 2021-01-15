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
		duration: 400,
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
      if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Head Moderator")) {
        return true;
      }
  return("Sorry You must be a gunfights Staff Member")
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
        `[NHC Gunfights](https://www.roblox.com/games/5604561827/NHC-Gunfights-WP)`
      )
    
      .addField(`:book: Notes`, `${notes}`)
      .setTimestamp();
    channel.send("@here", Embed);

    msgObject.reply(`Congrats :sunglasses:! You have announced a server startup!`);
                const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${msgObject.member} has Announced an SSU for **${notes}**!! `);
     log.setFooter(
      `GunFights Command Logging`,
      `https://cdn.discordapp.com/icons/729884219701985420/ed159f1ba6b46d1ad5529c42ffb4b68e.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`799567798900490280`).send(log);
  }
};
