const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class blacklist extends Command {
  constructor(client) {
    super(client, {
      name: "blacklist",
      aliases: ["bl"],
      group: "icf",
      memberName: "blacklist",
      description: "ICF Uses this to blacklist a user",
      ownerOnly: false,
                        throttling: {
        usages: 1,
        duration: 100
      },
      args: [
        {
          type: "string",
          prompt: "Roblox username?",
          key: "title"
            },
        {
          type: "string",
          prompt: "What is the Reason?",
          key: "reason"
        }
      ]
    });
  }
    hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("706999196124840009","784521928659959860");
    if (msgObject.guild.id == 706999196124840009, 784521928659959860) {
      if (msgObject.member.roles.find(role => role.name === "ICF")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("675794471065092161")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "ICF Director")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Senior Admin")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a ICF Agent Member!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the " +
        MainServer.name +
        "!"
      );
    }
  }
  async run(msgObject, { title }) {
    let channel = this.client.guilds
    
      .get("706999196124840009")
      .channels.find("id", "742230356048216125");
    let Embed = new Discord.RichEmbed()
      .setColor("")
      .setTitle("**Citizenship Blacklist**")
      .setDescription(`${title} has been Blacklisted from obtaining Citizenship by ${msgObject.member.displayName}`)
      .setTimestamp();
    channel.send(Embed).then(Embed => {
          msgObject.reply(
        "**Congratulations,** :grin:This user has been blacklisted!"
      );
    });
  }
};