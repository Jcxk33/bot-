const Discord = require('discord.js')
const {
    Command
} = require('discord.js-commando')
module.exports = class credits extends Command {
    constructor(client) {
        super(client, {
            name: 'nominate',
            description: 'Handles specified target\'s Appeal appeal',
            group: 'miscellaneous',
            guildOnly: true,
            memberName: 'nominate',
            args: [
                {
                    key: 'option',
                    prompt: 'What election would you like to join?',
                    type: 'string',
                    validate: text => {
                        if(text == "Gubernatorial" || text == "Sheriff") return true
                    }
                }
            ]
        })
    }

    hasPermission(message) {
        if (!message.member.roles.has('706999434730405982')) return 'Sorry :tired_face: You must be a citizen! :raised_hands:'
        return true
    }
    async run(message, args) {
        let govcand = message.guild.roles.find(r => r.name === "Gubernatorial Candidate");
        var nickname
        if (message.member.nickname) {
            nickname = message.member.nickname
        } else {
            nickname = message.author.username
        }
            if (args.option == 'gov') {
              message.member.addRole(govcand)
            } else {
            if (args.option == 'gov') {
              message.member.addRole(govcand)
            }
            message.reply('Success, Test! 🤗')
    }
    }
}