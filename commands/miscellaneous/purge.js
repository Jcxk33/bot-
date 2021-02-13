const Discord = require("discord.js");
const { Command } = require("discord.js-commando");

module.exports = class purge extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "purge",
      group: "miscellaneous",
      memberName: "purge",
      description: "What do you think?",
      throttling: {
        usages: 1,
        duration: 10,
      },
      guildOnly: false,
    });
  }
hasPermission(msgObject) {
  if(msgObject.guild.id == 790148683097571338 || msgObject.guild.id == 790148683097571338){
     if (msgObject.member.roles.find(role => role.name === "kjgasdkjasnd")) {
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
        msgObject.member.roles.find(role => role.name == "Admin")
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
}

message.channel.bulkDelete(args[0]) .then (() => {
message.channel
  .send('**__Cleared ${args[0]} messages')
  .then(msg => msg.delete(2000));
}
                  