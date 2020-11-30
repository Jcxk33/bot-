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
    const MainServer = msgObject.client.guilds.get("780139458020114432");
    if (msgObject.guild.id == 780139458020114432) {
      if (msgObject.member.roles.find(role => role.name === "Moderator")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Senior Admin")) {
        return true;
         } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Head Moderator")) {
        return true;
      }
      return "Sorry 😣! You must be a LETIVERSITY Moderator!!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the " +
        MainServer.name +
        "!"
      );
    }
  }
    async run(message, args) {
        var webhook = new Discord.WebhookClient('783082861452066846', 'AYV1LikFViq6-lkHYRImoMzU4LiIrJvhIXkHmaoGmAmXGONFCKheWDuL_JV6LA8L2FIT')
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