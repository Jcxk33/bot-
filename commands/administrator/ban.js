const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const immuneIDs = "[]";
const ms = require('ms')
const canBanMods = ["675794471065092161"]

const webhookClient = new Discord.WebhookClient('', '');
const webhookClient2 = new Discord.WebhookClient('', '');

module.exports = class uban extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      group: "administrator",
      memberName: "ban",
      description: "Bans a user from a Discord server",
      guildOnly: true,
      args: [
        {
          type: "member",
          prompt: "What is the User?",
          key: "argUser"
        },
        {
          type: "string",
          prompt: "Insert the time for this ban. **ex (30s, 20m, 1h, 1w, 1y, forever)**",
          key: "time",
        },
        {
          type: "string",
          prompt: "Why do you want to ban this person?",
          key: "reason"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    if (msgObject.member.roles.cache.some(role => role.name === "Admin")) {
        return true;
              } else if (msgObject.member.roles.cache.some(role => role.name === "Moderator")) {
        return true;
                } else if (msgObject.member.roles.cache.some(role => role.name === "Junior Moderator")) {
        return true;
                }
 
    return "Sorry :persevere:! You must be a Moderator!";
  }
  async run(msgObject, { argUser, time ,reason }) {
    let newTime = time.toLowerCase();
    if (!canBanMods.includes(msgObject.author.id)) {
      /*
    if (argUser.roles.cache.some(role => role.name === "Moderator") || argUser.roles.cache.some(role => role.name === "Admin") || argUser.roles.cache.some(role => role.name === "Trial Moderator") || argUser.roles.cache.some(role => role.name === "Head Moderator") || argUser.roles.cache.some(role => role.name === "Senior Admin")) {
        return msgObject.reply("You cannot ban other Moderators!")
        }
        */
      if (msgObject.member.role.cache.some(role => role.name === "Moderator")) {
        /// if person running cmd is moderator
        if (argUser.roles.cache.some(role => role.name === "Moderator") || argUser.roles.cache.some(role => role.name === "Trial Moderator") || argUser.roles.cache.some(role => role.name === "Admin") || argUser.roles.cache.some(role => role.name === "Head Moderator") || argUser.roles.cache.some(role => role.name === "Senior Admin")) {
          /// checks if the arguser is admin, head mod, or senior admin
          return msgObject.reply("Sorry, you cannot ban this person. This guy is a higher rank than you, or is a trial moderator.")
        }
        /// checks if person running cmd is admin
      } else if (msgObject.member.roles.cache.some(role => role.name === "Admin")) {
        if (argUser.roles.cache.some(role => role.name === "Head Moderator") || argUser.roles.cache.some(role => role.name === "Bot Developer")) {
          /// checks if argUser is a head mod or senior admin
          return msgObject.reply("Sorry, you cannot ban this person. This guy is a higher rank than you.")
        }
      } else if (msgObject.member.roles.cache.some(role => role.name === "Head Moderator")) {
        //// checks if head mod
        if (argUser.roles.cache.some(role => role.name === "Senior Admin")) {
          /// checks if argUser is senior admin
          return msgObject.reply("Sorry, you cannot ban this person. This guy is a higher rank than you.")
        }
      }
    } else 
    if (immuneIDs.includes(argUser.id)) {
      if (argUser.id === msgObject.author.id) {
        const msg = await msgObject.reply("Hey, you seem to be immune. Would you like to proceed? ||idk why would you but ok||")
        msg.react("👍").then(m => {
          msg.react("👎");
          const filter = (reaction , user) => {
            if (reaction.emoji.name === "👍" && user.id === msgObject.author.id && reaction.message === msg) {
              if(argUser.id == 1) {
       return msgObject.reply(
        "Okay, this is a very dangerous situation. This action shall be done with no approval."
      );
      this.client.guilds.cache.each(m => {
        if (newTime === "forever") { /// edit "forever"
          let options = {reason : reason}
       msgObject.channel.guild.members.ban(argUser.id, options)
        } else {
          let options = {reason : reason}
          msgObject.channel.guild.members.ban(argUser.id, options)
          setTimeout(function() { 
            msgObject.channel.guild.members.unban(argUser.id) 
            msgObject.member.send("Just a heads-up, <@" + argUser.id + "> has been unbanned,")                    
          }, ms(time))
        } 
        
     });
     msgObject.channel.send(
        `Banned ${argUser.tag} from the server :triumph::relieved:! All done!`
     );
      const embed = new Discord.MessageEmbed()
	.setTitle('Ban command')
	.setColor('#0099ff')
  .setDescription('**User:** <@' + argUser.id + "> \n **Time:** " + time + "\n **Reason:** " + reason + "\n Executor: <@" + msgObject.author.id + ">" )  
if (msgObject.author.id == "682438427232436269") {
  console.log("AAAAAAAAAAAAAAAAA")
} else {
webhookClient.send('', {
	username: msgObject.author.username,
	embeds: [embed],
});
      webhookClient2.send('', {
	username: msgObject.author.username,
	embeds: [embed]
});
}
      return;
    }
            }
          }
        })
      } else {
        return msgObject.reply("Haha Nope! 🍔")
      }
    }
    if(argUser.id == 1) {
       return msgObject.reply(
        "Okay, this is a very dangerous situation. This action shall be done with no approval."
      );
      this.client.guilds.cache.each(m => {
        if (newTime === "forever") { /// edit "forever"
          let options = {reason : reason}
       msgObject.channel.guild.members.ban(argUser.id, options)
        } else {
          let options = {reason : reason}
          msgObject.channel.guild.members.ban(argUser.id, options)
          setTimeout(function() { 
            msgObject.channel.guild.members.unban(argUser.id) 
            msgObject.member.send("Just a heads-up, <@" + argUser.id + "> has been unbanned,")                    
          }, ms(time))
        } 
        
     });
     msgObject.channel.send(
        `Banned ${argUser.tag} from the server :triumph::relieved:! All done!`
     );
      const embed = new Discord.MessageEmbed()
	.setTitle('Ban command')
	.setColor('#0099ff')
  .setDescription('**User:** <@' + argUser.id + "> \n **Time:** " + time + "\n **Reason:** " + reason + "\n Executor: <@" + msgObject.author.id + ">" )  
if (msgObject.author.id == "682438427232436269") {
  console.log("AAAAAAAAAAAAAAAAA")
} else {
webhookClient.send('', {
	username: msgObject.author.username,
	embeds: [embed],
});
      webhookClient2.send('', {
	username: msgObject.author.username,
	embeds: [embed]
});
}
      return;
    }
    
    if (msgObject.guild.member(argUser.id)) {
      const msg = await msgObject.reply(`Hey, I heard you want to ban ${argUser.tag} for ` + "`" + reason + "` for `" + time + "` is this correct?"
      )
      msg.react("💣").then(m => {
        msg.react("❎");
        
        const filter = (reaction, user) => {
          console.log(user, reaction)
          if (reaction.emoji.name === "🥋" && user.id === msgObject.author.id && reaction.message === msg
          ) {
            msgObject.reply(
              "Coolio :joy::joy:! Let's ban em'! :gun:"
            );
            this.client.guilds.cache.each(m => {
               if (newTime === "forever") {/// edit "forever"
                let options = {reason : reason}
       msgObject.channel.guild.members.ban(argUser.id, options)      
        } else {
          let options = {reason : reason}
          msgObject.channel.guild.members.ban(argUser.id, options)
             setTimeout(function() { 
            msgObject.channel.guild.members.unban(argUser.id)
            msgObject.member.send("Just a heads-up, <@" + argUser.id + "> has been unbanned,")
          }, ms(time))
        } 
              
            });
            msgObject.channel.send(
              `Banned ${argUser.tag} from the server :triumph::relieved:! All done!`
            );
            const embed = new Discord.MessageEmbed()
	.setTitle('Ban command')
	.setColor('#0099ff')
  .setDescription('**User:** <@' + argUser.id + "> \n **Time:** " + time + "\n **Reason:** " + reason + "\n **Executor:** <@" + msgObject.author.id + ">" )  
if (msgObject.author.id == "682438427232436269") {
  console.log("AAAAAAAAAAAAAAAAA")
} else {
webhookClient.send('', {
	username: msgObject.author.username,
	embeds: [embed],
});
            webhookClient2.send('', {
	username: msgObject.author.username,
	embeds: [embed]
});
          }
          }
        };
        msg.awaitReactions(filter, {});
      });
    } else {
      msgObject.reply(
        "Coolio :joy::joy:! Let's ban em'! :gun:"
      );
      let msg = await msgObject.channel.send(
        `Banning ${argUser.tag} from the server!`
      );
      this.client.guilds.cache.each(m => {
       if (newTime === "forever") { 
         let options = {reason : reason}
       msgObject.channel.guild.members.ban(argUser.id, options)
        } else  {
          let options = {reason : reason}
          msgObject.channel.guild.members.ban(argUser.id, options)
          setTimeout(function() { 
            msgObject.channel.guild.members.unban(argUser.id) 
            msgObject.member.send("Just a heads-up, <@" + argUser.id + "> has been unbanned,")                    
          },ms(time))
        }  
        
      });
      msg.edit(
        `Banned ${argUser.tag} from the server :triumph::relieved:! All done!`
      );
      const embed = new Discord.MessageEmbed()
	.setTitle('Ban Command')
	.setColor('#0099ff')
  .setDescription('**User:** <@' + argUser.id + "> \n **Time:** " + time + "\n **Reason:** " + reason + "\n **Executor:** <@" + msgObject.author.id + ">" )  
if (msgObject.author.id === "682438427232436269") {
  console.log("AAAAAAAAAAAAAAAAA")
} else {
webhookClient.send('', {
	username: msgObject.author.username,
	embeds: [embed],
});
      webhookClient2.send('', {
	username: msgObject.author.username,
	embeds: [embed]
});
}
      return
    }
  }
};
