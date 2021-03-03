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
  if(msgObject.guild.id == 801647258386300978 || msgObject.guild.id == 801647258386300978){
     if (msgObject.member.roles.find(role => role.name === "Developer")) {
      
     }
  }
}
  async run(msgObject, { notes }) {
    let channel = this.client.guilds
      .get("790148683097571338")
      .channels.find("id", "813968936012873728");
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
        `[New Haven County](https://www.roblox.com/games/6432437697/New-Haven-County-Remastered#)`
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
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`807012671983583303`).send(log);
  }
};
