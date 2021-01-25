const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const roblox = require("noblox.js");
module.exports = class credits extends Command {
  constructor(client) {
    super(client, {
      name: "deport",
      description: "ICF Uses this to Deport Someone",
      group: "icf",
      guildOnly: true,
      memberName: "deport",
      args: [
        {
          prompt: "Who's Deportion do you wish to handle?",
          type: "string",
          key: "person"
        }
      ]
    });
  }

 hasPermission(msgObject) {
  if(msgObject.guild.id == 800898562786590771 || msgObject.guild.id == 800898562786590771){
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
        msgObject.member.roles.find(role => role.name == "Admin")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a ICF Agent Member!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the Red Havem Server"
      );
    }
  }
  async run(message, args) {
    var webhook = new Discord.WebhookClient("", "");
    var nickname;
    if (message.member.nickname) {
      nickname = message.member.nickname;
    } else {
      nickname = message.author.username;
    }

    let playerName = args.person;
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_879734FAEA807830811CA157225453FE4B75EDE93E4E624A7CB7A53EEFC29B0778B517185199457CC8D1F8E9279E97BEB3B0634D5A8B930C344B539F36729868103FBD2B7692AD39D5834700D8A416D659DA20F6E52F462AB195A8D981089B5271B2C5864F5D12C11274803EC3FBE9F27F7136B4ACB9DA60B26DCF8C3D3A5019B09272BFBABBF8F0671DDDCD538D55FDB717879AFCEB2A8F14B3407BDDBAF258502F4B155DB3C21EEC0A972C87BE284EFD01EB7C49A6D9F268EF9584899E564A2BB69290DFCB1F3ACE6CD890849DAB8EB4D9975F41679A47BAC282E05C9FAC7A144C00BFE084290D68180F76D415249ACE065EB5FEEA61718B803A9E4BD208E0D835401C618A5CF2F6B5F941BA1F284B5089BEA195EF8B3B0048EE54ED9EFDE7FDD13CF0CCAFB67A6244C719B9E355C4F67CC082"
    await roblox.setCookie(robloxToken);

    let groupID = 7900529;
    let playerID = await roblox.getIdFromUsername(args.person);
    playerName = await roblox.getUsernameFromId(playerID);
    await roblox.setRank(groupID, playerID, 1);

    const log = new Discord.RichEmbed();
    log.setTitle(`Citizenship Management`);
    log.setColor(`1D37D9`);
    log.setDescription(`${message.author} has deported **${args.person}**!`);
     log.setFooter(
      `RedHaven Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`803326837786148944`).send(log);
    
    
    message.reply(`**Done,** :raised_hands:  Successfully Deported`);
  }
};
