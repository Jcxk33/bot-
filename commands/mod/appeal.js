const Discord = require('discord.js')
const {
    Command
} = require('discord.js-commando')
module.exports = class credits extends Command {
    constructor(client) {
        super(client, {
            name: 'appeal',
            description: 'Handles specified target\'s Appeal appeal',
            group: 'mod',
            guildOnly: true,
            memberName: 'appeal',
            args: [{
                    key: 'target',
                    prompt: 'Who\'s Appeal appeal do you wish to handle?',
                    type: 'string'
                },
                {
                    key: 'option',
                    prompt: 'Do you wish to `accept`/`deny` this  appeal?',
                    type: 'string',
                    validate: text => {
                        if(text == "accept" || text == "deny" ) return true
                    }
                }
            ]
        })
    }

        hasPermission(msgObject) {
  if(msgObject.guild.id == 964306940563963904 || msgObject.guild.id == 964306940563963904){
     if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("708499283002785883")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Moderator")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a Moderator!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }
    async run(message, args) {
        var webhook = new Discord.WebhookClient('964379582717366322', 'dVnAj-Mjt5woA0gFz0L8AXrbkA26Kp_7LMhgZhTc3-B7OxEAaYvoEofXKCbuJhQz_r9T')
        var nickname
        if (message.member.nickname) {
            nickname = message.member.nickname
        } else {
            nickname = message.author.username
        }
            var choice
            if (args.option == 'accept') {
                choice = 'Accepted'
            }
            if (args.option == 'deny') {
                choice = 'Denied'
            }
            
            const embed = new Discord.RichEmbed()
                .setTimestamp()
                .setTitle(`${args.target}'s Appeal`)
                .setDescription(choice)
            webhook.send('', {
                username: 'Appeal',
                embeds: [embed]
            })
            message.reply('Successfully sent your appeal message! 🤗')
    }
}