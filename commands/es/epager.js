const Discord = require("discord.js);
const { Command } = require("discord.js-commando");

const mongoose = require("mongoose");
const path = require("path");
const pagerSchema = require(path.join(
  __dirname + "/../../models",
  "pagersch.js"
));

module.exports = class dpager extends Command {
  constructor(client) {
    super(client, {
      name: "dpager",
      group: "es",
      memberName: "dpager",
      description: "Deletes a user's post from pagers",
      guildOnly: true,
      args: [
        {
          type: "string",
          prompt: "What would you like to edit your pager to?",
          key: "upd"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    if (msgObject.channel.id == 746255037931454485) {
      return true;
    } else if (msgObject.member.roles.find(role => role.name == "LPD")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "MSP")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "NHCSO")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "PPD")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "NGMP")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
        return true;
    return "Sorry 😣! You must be part of a Law Enforcement Agency!";
    } else {
      return "Sorry :persevere:! You must use this in #es-general!";
    }
  }
  async run(msgObject, { pager, upd, {
    if (msgObject.channel.id == 746255037931454485) {
      mongoose.connect(
        "mongodb+srv://Azflakes:LEODOJ667@testingroblox.4ykci.mongodb.net/mayFLOWData?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
      
       let newem = new Discord.RichEmbed()
              .setAuthor(msgObject.member.displayName)
              .setTitle("Edited Pager!")
              .setDescription(upd
          .addField(
                "Links",
                `[Roblox Profile](https://www.roblox.com/users/${authorData.robloxId}/profile)\n\[Game Link](https://www.roblox.com/games/5488843612/New-Haven-County-Remade)`
              )
              .setTimestamp()
              .setColor("RED");
      
      pagerSchema.findOne(
        {
          pagerplayer: msgObject.author.id
        },
        (err, pg) => {
          if (!pg || pg === null) {
            msgObject.reply(
              "Sorry :persevere:! You don't have any active pagers."
            );
          } else {
            const mainserver = msgObject.client.guilds.get(
              "706999196124840009"
            );
            let channel = mainserver.channels.find("id", "740496274175819777");
            channel.fetchMessage(pg.pagerid).then(daMsg => {
              if (daMsg) {
                daMsg.edit(newem);
              }
            });
            msgObject.reply("Successfully edited your pager.");
            return;
          }
        }
      );
    } else {
      msgObject.reply(
        "Sorry :persevere:! You must use this in #es-general, how'd you bypass that?"
      );
      return;
    }
  }
};
