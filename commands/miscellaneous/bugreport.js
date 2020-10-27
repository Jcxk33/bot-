const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "bugreport",
      group: "miscellaneous",
      memberName: "bugreport",
      description: "Reports a bug",
      args: [
        {
          type: "string",
          prompt: "What is the bug with the bot?",
          key: "notes"
        }
      ]
    });
  }
  
  async run(msgObject, { notes }) {
    const tony = this.guild.(u => u.tag === 'Zar#1332').id
    
    tony.send("test123")
  }
};
