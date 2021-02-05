 const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
module.exports = class great extends Command {
  constructor(client) {
    super(client, {
      name: "8ball",
      group: "miscellaneous",
      memberName: "8ball",
      description: "What do you think?",
                              throttling: {
        usages: 1,
        duration: 100
      },
      guildOnly: false
    });
  }
}
var things = ['Yes', 'No', 'Likely', 'Unlikely', 'Probably'];
  var thing = things[Math.floor(Math.random() * things.length)];
  if (command === '8ball') {
     return.reply("" + thing)  
  }