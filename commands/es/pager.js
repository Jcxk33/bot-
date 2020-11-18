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
		duration: 500,
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
    if (msgObject.channel.id == 778744682070802453) {
      return true;
    } else if (msgObject.member.roles.find(role => role.name == "Losten Police Department")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "Charleston State Police")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "Jackson County Sheriffs")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "Patterson Police Department")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "CNG")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "Developer")) {
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
          const mainserver = msgObject.client.guilds.get("754201074935529553");
          let channel = mainserver.channels.find("id", "778744655613263873");
          channel.send("@here").then(PM => {
            let embed = new Discord.RichEmbed()
              .setAuthor(msgObject.member.displayName)
              .setTitle("New Pager!")
              .setDescription(reason)
              .addField(
                "Links",
                `[Roblox Profile](https://www.roblox.com/users/${authorData.robloxId}/profile)\n\[Game Link](https://www.roblox.com/games/5883511054/New-Haven-County?refPageId=021519da-3ed4-468a-9bc2-d1d014beddc9#)`
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
                "Cheers, that's been added to <#778744655613263873>!"
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
