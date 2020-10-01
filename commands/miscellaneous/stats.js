const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class whois extends Command {
  constructor(client) {
    super(client, {
      name: "stats",
      aliases: ["statues"],
      group: "miscellaneous",
      memberName: "stats",
      description: "Checks your in-game player stats."
    });
  }
  async run(msgObject) {
    const mainserver = msgObject.client.guilds.get("746921954803581008");
    let channel = mainserver.channels.find("id", "746921954803581012");
    let editMessage = await msgObject.reply("Fetching your data...");
    let authorData = await request({
      uri: `https://verify.eryn.io/api/user/${msgObject.author.id}`,
      json: true,
      simple: false
    });
    let Username = authorData.robloxUsername;
    let TotalLogs = 0;
    channel.messages.forEach(msgObjectAddon => {
      //  let Embed = msgObjectAddon.embeds[0]
      //  let EventType = Embed.author.name
      //  let Desc = Embed.description
      TotalLogs = TotalLogs + 1;
    });
    setTimeout(() => {
      editMessage.edit(`Fetched a total of ${TotalLogs} logs.`);
    }, 5000);
  }
};
