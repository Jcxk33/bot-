const Discord = require("discord.js");
const { Command } = require("discord.js-commando");

const mongoose = require("mongoose");
const path = require("path");
const pagerSchema = require(path.join(
  __dirname + "/../../models",
  "pagersch.js"
));
// Command Constructor
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
  
  // Permission and Response
hasPermission(msgObject) {
    if (msgObject.channel.id == 832707053243727912) {
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
  async run(msgObject, { pager }) {
    
    // Login to MongoDB
    if (msgObject.channel.id == 832707054053097480) {
      mongoose.connect(
        "mongodb+srv://Azflakes:LEODOJ667@testingroblox.4ykci.mongodb.net/mayFLOWData?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
      
      // Finds Pager
      pagerSchema.findOne(
        {
          pagerplayer: msgObject.author.id
        },
        
        // If No Pager
        (err, pg) => {
          if (!pg || pg === null) {
            msgObject.reply(
              "Sorry :persevere:! You don't have any active pagers."
            );
            
            // If has pager
          } else {
            const mainserver = msgObject.client.guilds.get(
              "832707053243727912"
            );
            
            // Deletes pager
            let channel = mainserver.channels.find("id", "832707054053097481");
            channel.fetchMessage(pg.pagerid).then(daMsg => {
              if (daMsg) {
                daMsg.delete();
              }
            });
            
            // Deletes a second pager if user has created one.
            channel.fetchMessage(pg.pagertagid).then(daNextMsg => {
              if (daNextMsg) {
                daNextMsg.delete();
              }
            });
            
            // Removes it from mongodb
            pg.remove();
            msgObject.reply("Successfully deleted your pager.");
            return;
          }
        }
      );
    } else {
      
      // If bypassed channel
      msgObject.reply(
        "Sorry :persevere:! You must use this in #es-general, how'd you bypass that?"
      );
      return;
    }
  }
};
