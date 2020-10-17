const Discord = require("discord.js");
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
      guildOnly: true
    });
  }
  hasPermission(msgObject) {
    if (msgObject.channel.id == 766565513261481984) {
      return true;
    } else {
      return "Sorry :persevere:! You must use this in #es-general!";
    }
  }
  async run(msgObject, { pager }) {
    if (msgObject.channel.id == 766565513261481984) {
      mongoose.connect(
        "mongodb+srv://NotCINDERS:Blackie3323@cluster0.aeqnw.mongodb.net/mayFLOWData?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
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
              "719627673839861830"
            );
            let channel = mainserver.channels.find("id", "746921954803581008");
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
            msgObject.reply("Successfully deleted your pager.");
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
