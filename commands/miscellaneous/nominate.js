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
                        if(text == "Senate" || text == "Sheriff") return true
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
        let senatecandidate = message.guild.roles.find(r => r.name === "Senate Candidate");
        let sheriffcand = message.guild.roles.find(r => r.name === "Sheriff Elec");
        var nickname
        if (message.member.nickname) {
            nickname = message.member.nickname
        } else {
            nickname = message.author.username
        }
      
            if (args.option == 'Senate') {
              message.member.addRole(senatecandidate)
            message.reply('Successfully joined the Senate Election! 🤗')
            } else {
            if (args.option == 'Sheriff') {
              message.member.addRole(sheriffcand)
            message.reply('Successfully joined the Sheriff Elections! 🤗')
            } else {
              message.reply('Guess there was an error? :shrug:')
            }
    }
    }
}