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
		duration: 3600,
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
      if (msgObject.member.roles.find(role => role.name === "Developer")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Server Management")) {
        return true;
   } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
        return true;
   }
    return "Sorry 😣! You must be a Charleston Moderator!!";
  }
  async run(msgObject, { notes }) {
    let channel = this.client.guilds
      .get("754201074935529553")
      .channels.find("id", "778623315987398720");
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
        `[Jackson County](https://www.roblox.com/games/5866088106/Jackson-County-NEW-RELEASE?refPageId=27d0ab13-448f-4bae-8ba5-bc01d05edf69#)`
      )
      .addField(`:book: Notes`, `${notes}`)
      .setTimestamp();
    channel.send("@here", Embed);

    msgObject.reply(`Congrats :sunglasses:! You have announced a server startup!`);
  }
};
