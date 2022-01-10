const Discord = require("discord.js");
const { Command } = require("discord.js-commando");

const mongoose = require("mongoose");
const request = require("request-promise");
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
          prompt: "What would you like to edit your pager to?",
          key: "upd"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    if (msgObject.channel.id == 930029181000114178) {
      return true;
    } else if (msgObject.member.roles.find(role => role.name == "Lander Police Department")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "State Police")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "Sheriff’s Office")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "Plymouth Police Department")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "National Guard Military Police")) {
        return true;
    } else if (msgObject.member.roles.find(role => role.name == "Admin")) {
        return true;
    return "Sorry 😣! You must be part of a Law Enforcement Agency!";
    } else {
      return "Sorry :persevere:! You must use this in #es-general!";
    }
  }
  async run(msgObject, { pager, upd }) {


                          
    if (msgObject.channel.id == 930029181000114181) {
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
      // New Embed
          const newem = new Discord.RichEmbed()
    .setAuthor(msgObject.member.displayName)
    .setTitle("Edited Pager!")
    .setDescription(upd)
    .addField(
          "Links",
          `[Roblox Profile](https://www.roblox.com/users/${authorData.robloxId}/profile)\n\[Game Link](https://www.roblox.com/games/5883511054/New-Haven-County)`
          )
    .setTimestamp()
    .setColor("RED")
          
          // End of Embed
      
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
              "867863166691180604"
            );
            let channel = mainserver.channels.find("id", "867863167337103360");
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
