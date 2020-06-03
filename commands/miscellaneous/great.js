const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
module.exports = class great extends Command {
  constructor(client) {
    super(client, {
      name: "great",
      group: "miscellaneous",
      memberName: "great",
      description: "Find a random #great-logs message",
      guildOnly: true
    });
  }
  async run(msgObject, { target, reason }) {
    const mainserver = msgObject.client.guilds.get("673619643533099027");
    let channel = mainserver.channels.find("id", "681630741569732618");
    channel
      .fetchMessages()
      .then(messages => {
        let randomMsg = messages.random();
        let made = new Date(randomMsg.createdTimestamp);
        let date = made.toDateString();
        msgObject.reply(
          `<#681630741569732618> - ${date}:\n\  ${randomMsg.content}`
        );
      })
      .catch(console.error);
  }
};
