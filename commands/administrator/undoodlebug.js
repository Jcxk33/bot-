const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
module.exports = class uban extends Command {
  constructor(client) {
    super(client, {
      name: "undodoelbug",
      group: "administrator",
      memberName: "undoodlebug",
      description: "Unbans a user from all Discords",
      guildOnly: true,
      hidden: true,
      args: [
        {
          type: "user",
          prompt: "What is the User?",
          key: "target"
        },
        {
          type: "string",
          prompt: "What is the reason for un ultra banning this user?",
          key: "reason",
          default: "No Reason Provided"
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
      } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
        return true;
   } else if (msgObject.member.roles.find(role => role.name == "Senior Management")) {
        return true;
   }
    return "Sorry 😣! You must be a Charleston Admin!";
  }
  async run(msgObject, { target, reason }) {
    msgObject.reply(
      `Coolio :joy::joy:! Let's unban em' from everything! :gun:`
    );
    this.client.guilds.forEach(m => {
      m.unban(target.id, `"${reason}" - ${msgObject.author.tag}`);
    });
    msgObject.channel.send(
      `Unbanned ${target.tag} in all the servers :triumph::relieved:! All done!`
    );
  }
};