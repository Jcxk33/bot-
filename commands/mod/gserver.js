const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const Trello = require("trello");
const request = require("request-promise");
module.exports = class getservercommand extends Command {
  constructor(client) {
    super(client, {
      name: "gserver",
      aliases: ["getserver"],
      group: "mod",
      memberName: "gserver",
      description: "Retrieves information about a given player's server",
      guildOnly: true,
      args: [
        {
          type: "string",
          prompt: "Server/User?",
          key: "serverUser",
          default: ""
        }
      ]
    });
  }
  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("746921954803581008");
    if (msgObject.guild.id == 746921954803581008) {
      if (msgObject.member.roles.find(role => role.name === "Moderator")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      
            } else if (msgObject.member.roles.find(role => role.name === "Junior Moderator")) {
        return true;
      
            } else if(msgObject.author == this.client.users.get("242876771387572224")){
      return true;
    }else if (msgObject.member.roles.find(role => role.name === " Bot Developer")) {
        return true;
      }
      return "Sorry 😣! You must be a Moderator or Admin!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the " +
        MainServer.name +
        "!"
      );
    }
  }
  async run(msgObject, { serverUser }) {
    let data = await request({
      uri: `https://games.roblox.com/v1/games/5561650167/servers/Public?sortOrder=Asc&limit=100`,
      json: true,
      simple: false
    }).catch(err => {
      msgObject.reply("Sorry 😣! There are currently no running servers!");
    });
    if (!serverUser) {
      let embed = new Discord.RichEmbed()
        .setAuthor("")
        .setTitle("Servers")
        .setTimestamp();
      let Servers = 0;
      data.data.forEach(Data => {
        Servers = Servers + 1;
        embed.addField(
          `Server ${Data.playing}/${Data.maxPlayers} ${Data.id}`,
          `[gunFIGHTS Link](https://www.roblox.com/games/5561650167/gunFIGHTS)\n[Detailed Link](https://games.roblox.com/v1/games/5561650167/servers/Public?sortOrder=Asc&limit=100jobId=${Data.id})`
        );
      });
      embed.setDescription(`There are currently ${Servers} servers.`);
      if (Servers === 0) {
        msgObject.reply("Sorry 😣! There are currently no running servers!");
      } else {
        msgObject.channel.send(embed);
      }
    } else {
      var trello = new Trello(
        "b3e86d17c55b6dc170e3e426e4e1a491",
        "f2ef765f0ae529428cafc0f675d6da19273c2a3c4b9bd32efba2e7c9ad649cc9"
      );
      let Servers = 0;
      let valid = false;
      data.data.forEach(Data => {
        Servers = Servers + 1;
        if (Data.id === serverUser) {
          valid = true;
        }
      });
      if (Servers === 0) {
        msgObject.reply("Sorry 😣! There are currently no running servers!");
      } else {
        if (!valid) {
          msgObject.reply("Sorry :persevere:! This server does not exist!");
        } else {
          let embed = new Discord.RichEmbed()
          .setTitle(`Server Information`)
          .set
          // trello.addCard(
          //   `${msgObject.channel.id} ${msgObject.id} ${serverUser}`,
          //   "",
          //   "5f7614bdbe45c32d22e5591c"
          // );
        }
      }
    }
  }
};
