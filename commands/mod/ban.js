const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
module.exports = class uban extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      group: "mod",
      memberName: "ban",
      description: "Bans a user from the Discord",
      guildOnly: true,
      args: [
        {
          type: "user",
          prompt: "What is the User?",
          key: "argUser"
        },
        {
          type: "string",
          prompt: "What is the reason for banning this user?",
          key: "reason"
        }
      ]
    });
  }
  hasPermission(msgObject) {
      if (msgObject.member.roles.find(role => role.name === "Bots")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("242876771387572224")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Staff")) {
        return true;
      }
  }
  async run(msgObject, { argUser, reason }) {
    
    if(argUser.id == 675794471065092161) {
      msgObject.reply(
        "Okay, this is a very dangerous situation. This action shall be done with no approval."
      );
      let options = { reason: reason };
      msgObject.channel.guild.members.ban(argUser.id, options)
     msgObject.channel.send(
       `Banned ${argUser.tag} in all the servers :triumph::relieved:! All done!`
     );
      return;
    }
    
    if (msgObject.guild.member(argUser.id)) {
      const msg = await msgObject.reply(
        `Hey, I heard you want to ban ${argUser.tag} for ` +
          "`" +
          reason +
          "` is this correct?"
      );
      msg.react("💣").then(m => {
        msg.react("❎");
        const filter = (reaction, user) => {
          if (
            reaction.emoji.name === "💣" &&
            user.id === msgObject.author.id &&
            reaction.message === msg
          ) {
            msgObject.reply(
              "Coolio :joy::joy:! Let's ban em'! :gun:"
            );
            let options = { reason: reason };
            msgObject.channel.guild.members.ban(argUser.id, options)
            msgObject.channel.send(
              `Banned ${argUser.tag} in the server :triumph::relieved:! All done!`
            );
          }
        };
        msg.awaitReactions(filter, {});
      });
    } else {
      msgObject.reply(
        "Coolio :joy::joy:! Let's ban em'! :gun:"
      );
      let msg = await msgObject.channel.send(
        `Banning ${argUser.tag} in the server!`
      );
      this.client.guilds.forEach(m => {
        m.ban(argUser.id, `"${reason}" - ${msgObject.author.tag}`);
      });
      msg.edit(
        `Banned ${argUser.tag} in the server :triumph::relieved:! All done!`
      );
    }
  }
};
