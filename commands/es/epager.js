const Discord = require("discord.js");
const { Command } = require("discord.js-commando");

const mongoose = require("mongoose");
const path = require("path");
const pagerSchema = require(path.join(
  __dirname + "/../../models",
  "pagersch.js"
));

module.exports = class epager extends Command {
  constructor(client) {
    super(client, {
      name: "epager",
      group: "es",
      memberName: "epager",
      description: "Deletes a user's post from pagers",
      guildOnly: true,
args: [

{
type: "string",
prompt: "What do you want to edit the pager to?",
key: "edited"
}

]
    });
  }
  hasPermission(msgObject) {
    if (msgObject.channel.id == 746255037931454485) {
      return true;
    } else {
      return "Sorry :persevere:! You must use this in #es-general!";
    }
  }
  async run(msgObject, { pager, edited }) {
    if (msgObject.channel.id == 746255037931454485) {
      mongoose.connect(
        "mongodb+srv://Azflakes:leodoj667>@testingroblox.4ykci.mongodb.net/<dbname>?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );

let newembed = new Discord.RichEmbed()
              .setAuthor(msgObject.member.displayName)
              .setTitle("New Pager!")
              .setDescription(edited)
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
            let channel = mainserver.channels.find("id", "706999196124840009");
            channel.fetchMessage(pg.pagerid).then(daMsg => {
              if (daMsg) {
                daMsg.edit(newembed);
              }
            });
            channel.fetchMessage(pg.pagertagid).then(daNextMsg => {
              if (daNextMsg) {
                daNextMsg.edit(newembed);
              }
            });
            pg.remove();
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
