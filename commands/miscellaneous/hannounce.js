const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "hannounce",
      aliases: ["han"],
      group: "miscellaneous",
      memberName: "hannounce",
      description: "Posts an announcement needed by Staff / Government, that tags @here",
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
hasPermission(msgObject) {
  if(msgObject.guild.id == 871166263945216040 || msgObject.guild.id == 871166263945216040){
     if (msgObject.member.roles.find(role => role.name === "Admin")) {
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
      return "Sorry 😣! You must be a Admin!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
        .get("871166263945216040")
      .channels.find("id", "871166773725118565");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("**Mayflower Announcement**")
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setDescription(description)
      .setFooter('State of Mayflower', 'https://cdn.discordapp.com/icons/800898562786590771/992d0fe8b8ef622128a7750259f1b863.jpg')
      .setTimestamp();
     channel.send("@here", Embed);
        msgObject.reply(`**Congrats** :sunglasses:! You have announced your Announcement!`);
  }
};
