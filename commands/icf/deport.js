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
  if(msgObject.guild.id == 816741621558804520 || msgObject.guild.id == 816741621558804520){
     if (msgObject.member.roles.find(role => role.name === "ICF")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("ICF Director")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "Admin")
      ) {
        return true;
      } else if (
        msgObject.member.roles.find(role => role.name == "sd")
      ) {
        return true;
      }
      return "Sorry 😣! You must be a member of the ICF";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the State of Mayflower!"
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
      let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_00BF723D6A05593F416372AE5B730F31FA99B6E9F9BD9CDE9E20473497FC275793013F52EAC40F38BEBB8CBE6D99B99653C7711A2A4D0EB1A6EDBFE4F17E7D0B3C4EBB5F5B154994EDDB367564C7ACAE28D0B9512DFD5C9303512B1FDB8F6D9E394BFBC4442F9586F4A7957F7B85C581A109204B7BB7D0BF4DFA9623ADD15B3D0897888CF8BB1148715B4CDDD22766741C15C4AA7CF40F626F3DAF224E5EEB5690D3D3934236B15B3CCC827C9261F5817FFF45ED0FC50303FB47597889D51F0FE673E8628DAF06E56DACBFA099FF4966D2BE7ADF2EDF5336A9604348C25FD2462848D9631A9B5C47660437E885EF6AC7CE4901ECC3CF6541618898E5C6B110BA89651CEF8F20149C2BA6A3ADE367358D85D3A6150F2DE5472840858B4462C456C4B6F111"
    await roblox.setCookie(robloxToken);

    let groupID = 9559573;
    let playerID = await roblox.getIdFromUsername(args.person);
    playerName = await roblox.getUsernameFromId(playerID);
    await roblox.setRank(groupID, playerID, 1);

    const log = new Discord.RichEmbed();
    log.setTitle(`Citizenship Management`);
    log.setColor(`1D37D9`);
    log.setDescription(`${message.author} has deported **${args.person}**!`);
     log.setFooter(
      `Mayflower Command Logging`,
      `https://cdn.discordapp.com/icons/800898562786590771/37333243b8096739df4b9a019f48e79b.jpg`
    );
    log.setTimestamp(); 
      
    this.client.channels.get(`813967149017071627`).send(log);

    
    
    message.reply(`**Done,** :raised_hands:  Successfully Deported`);
  }
};
