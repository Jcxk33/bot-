const Discord = require("discord.js")
const { Command } = require("discord.js-commando")

module.exports = class kick extends Command {
    constructor(client){
        super(client, {
            name: "kick",
            aliases: [],
            description: "kick someone from server",

            memberName: "kick",
            group: "administrator",
            guildOnly: true,

            args: [
                {
                    type: "member",
                    prompt: "who are you kicking?",
                    key: "person",
                },
                {
                    type: "string",
                    prompt: "why are you kicing them?",
                    key: "reason",
                },
            ]
        })
    }

    async run(message, { person, reason }){
        message.guild.member(person).kick(reason).then(() => {
            message.reply(`successfully kicked ${person.user.tag}`)
        }).catch(error => {
            message.reply(`failed to kick ${person.user.tag}\`\`\`js\n${error}\`\`\``)
            return
        })
    }
}