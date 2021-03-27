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
      name: "pager",
      group: "es",
      memberName: "pager",
      description: "Sends an alert to the pager.",
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 300
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
    if (msgObject.channel.id == 808115419842871346) {
      return true;
   } else if (msgObject.member.roles.find(role => role.name == "SO")) {
        return true;
     } else if (msgObject.member.roles.find(role => role.name == "NG")) {
        return true;
       } else if (msgObject.member.roles.find(role => role.name == "NGMP")) {
        return true;
         } else if (msgObject.member.roles.find(role => role.name == "PPD")) {
        return true;
           } else if (msgObject.member.roles.find(role => role.name == "LPD")) {
        return true;
             } else if (msgObject.member.roles.find(role => role.name == "MSP")) {
        return true;
              } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
        return true;
                   } else if (msgObject.member.roles.find(role => role.name == "Senior Admin")) {
        return true;
               
    return "Sorry 😣! You must be part of a Law Enforcement Agency!";
    } else {
      return "Sorry :persevere:! You must use this in #es-general!";
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
          const mainserver = msgObject.client.guilds.get("808115419842871346");
          let channel = mainserver.channels.find("id", "818538756726456362");
          channel.send("@here").then(PM => {
            let embed = new Discord.RichEmbed()
              .setAuthor(msgObject.member.displayName)
              .setTitle("New Pager!")
              .setDescription(reason)
              .addField(
                "Links",
                `[Roblox Profile](https://www.roblox.com/users/${authorData.robloxId}/profile)\n\[Game Link](https://www.roblox.com/games/5071031824/Archived-County-GRAND-REOPENING?refPageId=a065b08b-1cab-4024-8410-213ca9d51a69)`
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
                "Cheers, that's been added to <#818538756726456362>!"
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
