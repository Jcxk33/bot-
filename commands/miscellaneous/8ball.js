const Discord = require("discord.js");
const { Command } = require("discord.js-commando");

module.exports = class EightballCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: "8ball",
      group: "miscellaneous",
      memberName: "8ball",
      description: "What do you think?",
      throttling: {
        usages: 1,
        duration: 10,
         guildOnly: false,
      },
                  args: [
        {
          type: "string",
          prompt: "What is the question?",
          key: "description"
         }
      ]
    });
  }
  
  run(message) {
    var things = ["Yes", "No", "Likely", "Unlikely", "Absolutely Not", "I think you know the answer","Probably", "I would usually Smirk at that, but no","Of course!","Uh Duh 🙄"];
    var thing = things[Math.floor(Math.random() * things.length)];

    return message.reply(thing);
  }
};