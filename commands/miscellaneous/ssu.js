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
  if(msgObject.guild.id == 867863166691180604 || msgObject.guild.id == 867863166691180604){
     if (msgObject.member.roles.find(role => role.name === "Admin")) {
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
        msgObject.member.roles.find(role => role.name == "Developer")
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
  async run(msgObject, { notes }) {
    let channel = this.client.guilds
      .get("867863166691180604")
      .channels.find("id", "867863166917279753");
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
        `[New Haven County](https://web.roblox.com/games/6735534216/New-Haven-County?refPageId=5941efa8-f8e8-4ac1-b3f3-68db3e20a616)`
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
     `State of Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/867863166691180604/9861a1b18abd3207ccf144e36fc8e9cd.png`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`867863167853133824`).send(log);
      
    this.client.channels.get(`867863167853133824`).send(log);
  }
};
