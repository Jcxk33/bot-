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

    hasPermission(message) {
        if (!message.member.roles.has('754222325510963271','778755649889894411')) return 'Sorry :tired_face: You must be a Moderator! :raised_hands:'
        return true
    }
    async run(message, args) {
        var webhook = new Discord.WebhookClient('754203043041378324', 'cvUU-GO1Szippw13-VF9m0MI1vauFPnOCaW3_Alca1ZEzfMV4lC2jvxE1zxKt8FNG062')
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