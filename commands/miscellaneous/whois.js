const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class whois extends Command {
  constructor(client) {
    super(client, {
      name: "whois",
      aliases: ["roly"],
      group: "miscellaneous",
      memberName: "whois",
      description: "Checks a user",
      args: [
        {
          type: "user",
          prompt: "What is the User?",
          key: "argUser",
        }
      ]
    });
  }
  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("769267730041667604");
    if (msgObject.guild.id == 769267730041667604) {
      if (msgObject.member.roles.find(role => role.name === "Admin","Senior Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("709627046069927937")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
        return true;
      }
      return "Sorry 😣! You must be a Moderator!";
    } else {
    }}
  async run(msgObject, { argUser }) {
    let made = new Date(argUser.createdTimestamp);
    let date = made.toDateString();
    let editMessage = await msgObject.reply("Fetching user's data...");
    let Embed = new Discord.RichEmbed()
      .setAuthor(argUser.tag, argUser.avatarURL)
      .setColor("RANDOM")
      .setTitle("**__User Information__**")
      .setThumbnail(argUser.avatarURL, {size: 128})
      .setDescription(`<@${argUser.id}>`)
      .addField("**__Created At__** :label:", date)
      .addField("**__ID__** :pencil:", argUser.id, true)
      .addField("**__Username__** :speech_balloon:", argUser.username, true)
      .addField("**__Discord Tag__** :performing_arts:", argUser.discriminator, true)
      .addField("**__Roles__** :brain: ", argUser.roles, true)
      .addField("**Self Bot** :robot:", argUser.bot, true)
      .setTimestamp();
    editMessage.edit("Done!");
    editMessage.edit(Embed);
    let editMsg = await msgObject.reply(
      "Checking if a roblox account is linked..."
    );
    let data = await request({
      uri: `https://verify.eryn.io/api/user/${argUser.id}`,
      json: true,
      simple: false
    });
    if (data.robloxUsername !== undefined) {
      editMsg.edit("A roblox account is linked! Fetching data... :brain:");
      let Data = await request({
        uri: `https://api.roblox.com/users/get-by-username?username=${data.robloxUsername}`,
        json: true,
        simple: false
      });
      const profileLink = `https://www.roblox.com/users/${data.robloxId}/profile`;
      const avatarURL = `https://assetgame.roblox.com/Thumbs/Avatar.ashx?username=${encodeURIComponent(
        data.robloxUsername
      )}`;
      let pastNames = "None";
      let joinDate = "Unknown";
      try {
        const profileSource = await request({
          uri: profileLink
        });

        joinDate = profileSource.match(
          /Join Date<p class=text-lead>(.*?)<li/
        )[1];
        pastNames = profileSource
          .match(
            /<span class=tooltip-pastnames data-toggle=tooltip title="?(.*?)"?>/
          )[1]
          .substr(0, 1024);
      } catch (e) {}
      let Plan = "Unknown";
      try {
        const response = await request({
          uri: `https://groups.roblox.com/v1/users/${encodeURIComponent(
            data.robloxId
          )}/group-membership-status`,
          simple: false,
          resolveWithFullResponse: true
        });
        const membershipType = JSON.parse(response.body).membershipType;
        Plan = "None";

        if (membershipType === 4) {
          Plan = "Premium";
        }
      } catch (e) {}
      let RobloxEmbed = new Discord.RichEmbed()
        .setAuthor(Data.Username, avatarURL)
        .setColor("RANDOM")
        .setTitle(Data.Username)
        .setURL(profileLink)
        .addField(":id: UserID", Data.Id, true)
        .addField(":timer:  Account Created", joinDate, true)
        .addField(":name_badge: Past Names", pastNames, true)
        .addField(":money_mouth: Membership", Plan, true);
      editMsg.edit("Done! :pray: ");
      editMsg.edit(RobloxEmbed);
    } else {
      editMsg.edit("A roblox account is not linked!:raised_hands: :raised_hands: ");
      editMsg.delete();
    }
  }
};
