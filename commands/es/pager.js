const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
const mongoose = require("mongoose");
const path = require("path");
const pagerSchema = require(path.join(
  __dirname + "/../../models",
  "pagersch.js"
));

module.exports = class pager extends Command {
  constructor(client) {
    super(client, {
      name: "modpager",
      group: "es",
      memberName: "mpager",
      description: "Sends an alert to the pager.",
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 3000
      },
      args: [
        {
          type: "string",
          prompt: "What is the pager about?",
          key: "reason"
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
    return "Sorry 😣! You must be Verified!";
    } else {
      return "Sorry :persevere:! You must use this in #bot-commands!";
    }
  }
  async run(msgObject, { reason }) {
    mongoose.connect(
      "mongodb+srv://Azflakes:LEODOJ667@testingroblox.4ykci.mongodb.net/mayFLOWData?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    let authorData = await request({
      uri: `https://verify.eryn.io/api/user/${msgObject.author.id}`,
      json: true,
      simple: false
    });

    pagerSchema.findOne(
      {
        pagerplayer: msgObject.author.id
      },
      (err, pg) => {
        if (!pg || pg === null) {
          const mainserver = msgObject.client.guilds.get("871166263945216040");
          let channel = mainserver.channels.find("id", "871880239377170462");
          channel.send("<@&871166754351636540>").then(PM => {
            let embed = new Discord.RichEmbed()
              .setAuthor(msgObject.member.displayName)
              .setTitle("New Mod-Pager!")
              .setDescription(reason)
              .addField(
                "Links",
                `[Roblox Profile](https://www.roblox.com/users/${authorData.robloxId}/profile)\n\[Game Link](https://www.roblox.com/games/7182509907/Plymouth-Warzone)`
              )
              .setTimestamp()
              .setColor("RED");
            channel.send(embed).then(m => {
              m.react("✅");
              const newPAGER = new pagerSchema({
                _id: mongoose.Types.ObjectId(),
                pagerplayer: msgObject.author.id,
                pagerid: m.id,
                pagertagid: PM.id,
                secondarypagerid: ""
              });
              newPAGER.save();
              msgObject.reply(
                "Cheers, that's been added to <#871880239377170462>!"
              );
            });
          });
        } else {
          msgObject.reply(
            "Sorry :persevere:! You already have an active pager."
          );
          
          return;
        }
      }
    );
  }
};
