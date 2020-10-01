const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const yesServers = "[746921954803581008]"

module.exports = class great extends Command {
  constructor(client) {
    super(client, {
      name: "great",
      group: "misc",
      memberName: "great",
      description: "Find a random #great-logs message",
      guildOnly: true
    });
  }
  async run(msgObject, { target, reason }) {
    if (yesServers.includes(msgObject.guild.id)) {
    const mainserver = msgObject.client.guilds.cache.get("746921954803581008");
   // const attachement = new Discord.MessageAttachment('https://cdn.glitch.com/58fa0569-0e07-48e0-9812-3be4aa2724da%2Fimage0%20(1).png?v=1598684232193')
    let channel = mainserver.channels.cache.get("746921954803581008"); /// 744203756517720146"
    channel
      .messages.fetch()
      .then(messages => {
        let randomMsg = messages.random();
      if (randomMsg === undefined) {
        return msgObject.reply("<#759420741987991583> does not have any messages in it.")
      };
        let made = new Date(randomMsg.createdTimestamp);
        let date = made.toDateString();
      if (randomMsg.attachments.size == 0) {
        msgObject.reply(
          `<#759420741987991583> - ${date}:\n\ ${randomMsg}`, 
        );
      } else {
      console.log(randomMsg)
        msgObject.reply(
          `<#7759420741987991583> - ${date}:\n\  ${randomMsg}`, randomMsg.attachments.first()
        );
      }
      })
      .catch(console.error);
    } else {
      return msgObject.reply("This command can only be run in the main Discord Server!")
    }
  }
};
