const Discord = require('discord.js')
const {
    Command
} = require('discord.js-commando')
module.exports = class credits extends Command {
    constructor(client) {
        super(client, {
            name: 'nominate',
            description: 'Nominating into an election',
            group: 'miscellaneous',
            guildOnly: true,
            memberName: 'nominate',
            args: [
                {
                    key: 'option',
                    prompt: 'What election would you like to join?',
                    type: 'string',
                    validate: text => {
                        if(text == "Senate" || text == "Gubernatorial") return true
                    }
                }
            ]
        })
    }
  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("706999196124840009");
    if (msgObject.guild.id == 706999196124840009) {
      if (msgObject.member.roles.find(role => role.name === "Citizen")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Bots")) {
        return true;
      return "Sorry 😣! You Must be a Citizen!";
    };
    }
  }
    async run(message, args) {
        let senatecandidate = message.guild.roles.find(r => r.name === "AKFJHBAKSFHBKAJSBFKAUJSF");
        let GubernatorialCandidate = message.guild.roles.find(r => r.name === "Gubernatorial Candidate");
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
            if (args.option == 'Gubernatorial') {
              message.member.addRole(GubernatorialCandidate)
            message.reply('Successfully joined the Gubernatorial Elections 🤗')
            } else {
              message.reply('Guess there was an error? :shrug:')
            }
    }
    }
}