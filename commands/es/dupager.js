const Discord = require("discord.js");
const { Command } = require("discord.js-commando");

const mongoose = require("mongoose");
const path = require("path");
const pagerSchema = require(path.join(
  __dirname + "/../../models",
  "pagersch.js"
));

module.exports = class dupager extends Command {
  constructor(client) {
    super(client, {
      name: "dupager",
      group: "es",
      memberName: "dupager",
      description: "Deletes a user's post from pagers",
      guildOnly: true,
      args: [
        {
          type: "user",
          prompt: "Who's pager do you want to delete?",
          key: "argUser"
        }
      ]
    });
  }
 hasPermission(msgObject) {
    if (msgObject.channel.id == 871166263945216040) {
      return true;
  } else if (msgObject.member.roles.find(role => role.name == "Verified")) {
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
    return "Sorry 😣! You must be Verified";
    } else {
      return "Sorry :persevere:! You must use this in #bot-commands!";
    }
  }
  async run(msgObject, { pager, argUser }) {
    if (msgObject.channel.id == 871166780318572624) {
      mongoose.connect(
        "mongodb+srv://Azflakes:LEODOJ667@testingroblox.4ykci.mongodb.net/mayFLOWData?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
      pagerSchema.findOne(
        {
          pagerplayer: argUser.id
        },
        (err, pg) => {
          if (!pg || pg === null) {
            msgObject.reply(
              "Sorry :persevere:! " + argUser + " doesn't have any active pagers."
            );
          } else {
            const mainserver = msgObject.client.guilds.get(
              "871166263945216040"
            );
            let channel = mainserver.channels.find("id", "871880239377170462");
            channel.fetchMessage(pg.pagerid).then(daMsg => {
              if (daMsg) {
                daMsg.delete();
              }
            });
            channel.fetchMessage(pg.pagertagid).then(daNextMsg => {
              if (daNextMsg) {
                daNextMsg.delete();
              }
            });
            pg.remove();
            msgObject.reply("Successfully deleted " + argUser + "'s pager.");
            return;
            
            argUser.send("Next time delete your own pager, Don't make ES Command do it! 😣")
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
