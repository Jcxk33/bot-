 const Discord = require('discord.js')
const {
    Command
} = require('discord.js-commando')
module.exports = class credits extends Command {
    constructor(client) {
        super(client, {
            name: 'cappeal',
            description: 'Handles specified target\'s citizenship appeal',
            group: 'mod',
            guildOnly: true,
            memberName: 'cappeal',
            args: [{
                    key: 'target',
                    prompt: 'Who\'s citizenship appeal do you wish to handle?',
                    type: 'string'
                },
                {
                    key: 'option',
                    prompt: 'Do you wish to `accept`/`deny`/`invprivate` this citizenship appeal?',
                    type: 'string',
                    validate: text => {
                        if(text == "accept" || text == "deny" || text == "invprivate") return true
                    }
                }
            ]
        })
    }

    hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("754201074935529553");
    if (msgObject.guild.id == 754201074935529553) {
      if (msgObject.member.roles.find(role => role.name === "ICF")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "ICF Director")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Senior Admin")) {
        return true;
      }
      return "Sorry 😣! You must be a Staff Member!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the " +
        MainServer.name +
        "!"
      );
    }
  }
    async run(message, args) {
        var webhook = new Discord.WebhookClient('754202923726012507', 'ieaUbDs95hQX1kUeUniCW9US5CvSWhUd6KxkG-E3vIXadkYIet7rSbk-SNcxuQSbOUZI')
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
            if (args.option == 'invprivate') {
                choice = 'Inventory Private'
            }
            const embed = new Discord.RichEmbed()
                .setTimestamp()
                .setTitle(`${args.target}'s Citizenship Appeal`)
                .setDescription(choice)
            webhook.send('', {
                username: 'Citizenship',
                embeds: [embed]
            })
            message.reply('Successfully sent your appeal message! 🤗')
    }
}