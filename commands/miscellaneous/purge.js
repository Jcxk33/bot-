const commando = require('discord.js-commando');
class PurgeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            group: 'miscellaneous', // like your !roll command
            memberName: 'purge',
            description: 'Purge some messages from a Text Channel.',
            args: [
                {
                    key: 'numToPurge',
                    label: 'number',
                    prompt: 'Please input a number ( > 0) of messages to be deleted.',
                    type: 'integer'
                }
            ]
        });
    }
  
hasPermission(msgObject) {
  if(msgObject.guild.id == 801647258386300978 || msgObject.guild.id == 801647258386300978){
     if (msgObject.member.roles.find(role => role.name === "Developer")) {
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
    run(msg, { numToPurge }) {
        let channel = msg.channel;

        // fail if number of messages to purge is invalid
        if (numToPurge <= 0) {
            return msg.reply('Purge number must be greater than 0');
        }

        // channel type must be text for .bulkDelete to be available
        else if (channel.type === 'text') {
            return channel.fetchMessages({limit: numToPurge})
                .then(msgs => channel.bulkDelete(msgs))
                .then(msgs => msg.reply (`🙏 Successfully deleted ${msgs.size} message(s)!`))
                .catch(console.error);
        }
        else {
            return msg.reply('Sorry ☹️ You must use this command in a text channel!');
        }
    }
};

module.exports = PurgeCommand