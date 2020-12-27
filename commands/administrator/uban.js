const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
module.exports = class uban extends Command {
  constructor(client) {
    super(client, {
      name: "uban",
      group: "administrator",
      memberName: "uban",
      description: "Bans a user from all Discords",
      guildOnly: true,
      hidden: true,
      args: [
        {
          type: "user",
          prompt: "What is the User?",
          key: "argUser"
        },
        {
          type: "string",
          prompt: "What is the reason for ultra banning this user?",
          key: "reason"
        }
      ]
    });
  }
hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("706999196124840009");
    if (msgObject.guild.id == 706999196124840009) {
      if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      }
    }
    return "Sorry 😣! You must be a Mayflower Admin!";
  }
  async run(msgObject, { argUser, reason }) {
    
    if(argUser.id == 451158541823377438) {
      msgObject.reply(
        "Okay, this is a very dangerous situation. This action shall be done with no approval."
      );
      this.client.guilds.forEach(m => {
       m.ban(argUser.id, `"${reason}" - ${msgObject.author.tag}`);
     });
     msgObject.channel.send(
       `Banned ${argUser.tag} in all the servers :triumph::relieved:! All done!`
     );
      return;
    }
    
    if (msgObject.guild.member(argUser.id)) {
      const msg = await msgObject.reply(
        `Hey, I heard you want to ultra ban ${argUser.tag} for ` +
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
              "Coolio :joy::joy:! Let's ban em' from everything! :gun:"
              
            );
            this.client.guilds.forEach(m => {
              m.ban(argUser.id, `"${reason}" - ${msgObject.author.tag}`);
            });
            msgObject.channel.send(
              `Banned ${argUser.tag} in all the servers :triumph::relieved:! All done!`
              
            );
          }
        };
        msg.awaitReactions(filter, {});
               const log = new Discord.RichEmbed();
    log.setTitle(`Command Logging`);
    log.setColor(`1D37D9`);
    log.setDescription(`${msgObject.member.displayName} has Universal Banned  ${argUser} for ** ${reason}!! ** `);
    log.setFooter(
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/706999196124840009/a7ab98d9916c3482d5c4f0156b786b60.png?size=128`
    );
    log.setTimestamp();
    this.client.channels.get(`790345391912517632`).send(log);
      });
    } else {
      msgObject.reply(
        "Coolio :joy::joy:! Let's ban em' from everything! :gun:"
      );
      let msg = await msgObject.channel.send(
        `Banning ${argUser.tag} in all the servers!`
      );
      this.client.guilds.forEach(m => {
        m.ban(argUser.id, `"${reason}" - ${msgObject.author.tag}`);
      });
      msg.edit(
        `Banned ${argUser.tag} in all the servers :triumph::relieved:! All done!`
      );
    }
  }
};
