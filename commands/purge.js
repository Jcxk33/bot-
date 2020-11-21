const Discord = require("discord.js");
const moment = require("moment");


module.exports.run = async (bot,message,args) => {
  if(message.member.hasPermission("MANAGE_MESSSAGES")) return message.reply("Sorry Dude! You do not have Manage Message Permissions!")
  if(!args[0]) return message.channel.send("You have to specify a number of messages to purge!")
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Purged ${args[0]} messages.`).then(msg => msg.delete(2000));
                                           
});
  
module.exports.help = {
  name: "purge",
  description: "Delete messages in said channel"
}
}