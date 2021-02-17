const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
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
                        if(text == "senate","Senate" || text == "gubernatorial") return true
                    }
                }
            ]
        })
    }
  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("800898562786590771");
    if (msgObject.guild.id == 800898562786590771) {
      if (msgObject.member.roles.find(role => role.name === "yea")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
    }
      return "Sorry 😣! elections are closed";
    }
  } 
    async run(message, args) {
        let SenateCandidate = message.guild.roles.find(r => r.name === "Senate Candidate");
        let GubernatorialCandidate = message.guild.roles.find(r => r.name === "Gubernatorial Candidate");
        var nickname
        if (message.member.nickname) {
            nickname = message.member.nickname
        } else {
            nickname = message.author.username
        }
      
            if (args.option == 'senate','Senate') {
              message.member.addRole(SenateCandidate)
            message.reply('Successfully Joined Senate Elections 🤗')
            } else {
            if (args.option == 'gubernatorial') {
              message.member.addRole(GubernatorialCandidate)
            message.reply('Successfully joined the Gubernatorial Elections 🤗')
            } else {
              message.reply('Guess there was an error? :shrug:')
            }
    }
    }
}