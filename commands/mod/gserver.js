const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const Trello = require("trello");
const request = require("request-promise");
module.exports = class getservercommand extends Command {
  constructor(client) {
    super(client, {
      name: "gserver",
      aliases: ["getserver", "getservers", "gservers"],
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
  if(msgObject.guild.id == 964306940563963904 || msgObject.guild.id == 964306940563963904){
     if (msgObject.member.roles.find(role => role.name === "Administrators")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("708499283002785883")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Moderator")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Havencrest Founder")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a Moderator!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
      );
    }
  }
  async run(msgObject, { serverUser }) {
    let data = await request({
      uri: `https://games.roblox.com/v1/games/7743505493/servers/Public?sortOrder=Asc&limit=100`,
      json: true,
      simple: false
    }).catch(err => {
      msgObject.reply("Sorry :frowning2:! There are currently no running servers!");
    });
    if (!serverUser) {
      let embed = new Discord.RichEmbed()
        .setAuthor("")
        .setTitle("Current Servers")
        .setTimestamp();
      let Servers = 0;
      data.data.forEach(Data => {
        Servers = Servers + 1;
        embed.addField(
          `Server ${Data.playing}/${Data.maxPlayers} ${Data.id}`,
          `[New Haven County](https://www.roblox.com/games/7743505493/cityWARE)\n[Detailed Link](https://games.roblox.com/v1/games/7743505493/servers/Public?sortOrder=Asc&limit=100jobId=${Data.id})`
        );
      });
      embed.setDescription(`There are currently ${Servers} servers.`);
      if (Servers === 0) {
        msgObject.reply("Sorry :frowning2:! There are currently no running servers!");
      } else {
        msgObject.reply(
          "Heyo!! :raised_hands: Here's a list of running servers!:smiley: ",
          embed
        );
      }
    } else {
      var trello = new Trello(
        "33c4644733ac7670dc1f0378911c3716",
        "9a224ecff7ece350dd6a38cbaf8d20575807691b8e745a494628537a8f84b5dc"
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
        msgObject.reply("Sorry :frowning2:! There are currently no running servers!");
      } else {
        if (!valid) {
          msgObject.reply("Sorry :angry:! This server does not exist!");
        } else {
          let data = await request({
            uri: `https://games.roblox.com/v1/games/8894808113/servers/Public?sortOrder=Asc&limit=100`,
            json: true,
            simple: false
          }).catch(err => {
            msgObject.reply(
              "Sorry :angry:! There are currently no running servers!"
            );
          });

          let editMessage = await msgObject.reply(
            "Uhh :thinking:! Let me search for the info!"
          );

          data.data.forEach(Data => {
            if (Data.id == serverUser) {
              let embed = new Discord.RichEmbed()
                .setTitle(`Detailed Information`)
                .setDescription(
                  `Server \`${Data.id}\` with ${Data.playing}/${Data.maxPlayers} players active!`
                );

              if (Data.playing > 25) {
                editMessage.edit(
                  "Sorry :pleading_face:! The information is too large to upload!"
                );
                return;
              }

              Data.playerIds.forEach(player => {
                let playerName;
                let playerID = player;

                async function fetchData() {
                  let playerData = request({
                    uri: `http://api.roblox.com/users/${playerID}`,
                    json: true,
                    simple: false
                  })
                    .then(data => {
                      playerName = data.Username;

                      embed.addField(
                        `${playerName}`,
                        `[Profile Link](https://www.roblox.com/users/${playerID})`,
                        true
                      );
                    })
                    .catch(err => {
                      msgObject.reply(
                        "Sorry :pouting_cat:! There has been an issue with obtaining information!"
                      );
                    });
                }

                fetchData();

                 setTimeout(() => {
                   embed.addField(
                     `${playerName}`,
                     `[Profile Link](https://www.roblox.com/users/${playerID})`,
                     true
                   );
                 }, 1000);

                   embed.addField(
                     `${playerName}`,
                     `[Profile Link](https://www.roblox.com/users/${playerID})`
                   );
              });

              setTimeout(() => {
                editMessage.edit(
                  "Found it :raised_hands:! More information below!",
                  embed
                );
              }, 4000);

               msgObject.reply(
                 "Found it :raised_hands:! You will find the list below!",
                 embed
               );
            } else {
              msgObject.reply("Sorry :persevere:! This server does not exist!");
            }
          });

          trello.addCard(
             `${msgObject.channel.id} ${msgObject.id} ${serverUser}`,
             "",
            "6110926e9ed55c857f1fc09a"
          );
        }
      }
    }
  }
};
