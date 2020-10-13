const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const immuneIDs = "[675794471065092161]"

const webhookClient = new Discord.WebhookClient('', '');
const webhookClient2 = new Discord.WebhookClient('', '');

module.exports = class uban extends Command {
  constructor(client) {
    super(client, {
      name: "unban",
      group: "mod",
      memberName: "unban",
      description: "Unbans a user from the Discord",
      guildOnly: true,
      args: [
        {
          type: "user",
          prompt: "What is the User?",
          key: "target"
        },
        {
          type: "string",
          prompt: "What is the reason for unbanning this user?",
          key: "reason",
          default: "No Reason Provided"
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
    return "Sorry :persevere:! You must be a Staff Member!";
  }
  async run(msgObject, { target, reason }) {
    if (immuneIDs.includes(target.id)) {
     if (target.id === msgObject.author.id) {
       const msg = await msgObject.reply("Hey, you seem to be immune. Would you like to proceed?")
       msg.react("👍").then(m => {
         msg.react("👎");
         const filter = (reaction, user) => {
           if (reaction.emoji.name === "👍" && user.id === msgObject.author.id && reaction.message === msg) {
             msgObject.reply(
      `Coolio :joy::joy:! Let's unban em' from the server! :gun:`
    );
      let guildBans = msgObject.guild.fetchBans();
       console.log(guildBans)      
      msgObject.channel.guild.members.unban(target.id) 
      const embed = new Discord.MessageEmbed()
	.setTitle('Unban Command')
	.setColor('#0099ff')
  .setDescription('**User:** <@' + target.id + "> \n **Reason:** " + reason + "\n **Executor:** <@" + msgObject.author.id + ">")  
if (msgObject.author.id === "682438427232436269") {
  console.log("AAAAAAAAAAAAAAAAA")
} else {
webhookClient.send('', {
});
      webhookClient2.send('', {
});

}
    return msgObject.channel.send(
      `Unbanned ${target.tag} :triumph::relieved:! All done!`
    );
           }
         }
         msg.awaitReactions(filter, {})
       })
       
     } else {
       msgObject.reply("Sorry, this person is immune, so only he/she can run this command on his/herself.")
     }
    } else {
    
      msgObject.channel.guild.members.unban(target.id) 
      const embed = new Discord.MessageEmbed()
	.setTitle('Unban Command')
	.setColor('#0099ff')
  .setDescription('**User:** <@' + target.id + "> \n **Reason:** " + reason + "\n **Executor:** <@" + msgObject.author.id + ">")  
if (msgObject.author.id === "682438427232436269") {
  console.log("AAAAAAAAAAAAAAAAA")
} else {
webhookClient.send('', {
});
      webhookClient2.send('', {
});
}
   return msgObject.channel.send(
      `Unbanned ${target.tag} :triumph::relieved:! All done!`
    );
    }
  }
};
