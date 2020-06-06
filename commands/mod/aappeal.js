const express = require('express');
const app = express();
const axios = require('axios');
const Discord = require('discord.js');
const bot = new Discord.Client();
const {
    Client,
    RichEmbed
} = require('discord.js');
let client = new Client();
let token = "NzE0NDMzNDAzMzk4NjUxOTI1.XtHicw.GYlH6l24P8Id4QQLBNUx22PrnAw" //Your token here (Discord bot)
let scriptID = "" + "/exec" //Your scriptID for your google sheets
let BOTID = 714433403398651925 // Prevents bot from talking to itself, make sure to put your bots ID there.
async function startApp() {
    client.login(token)
    console.log("Successfully logged Discord bot in");
}
startApp();
client.on("ready", () => {
    console.log("Ready");
})



let prefix = ';';



function isCommand(command, message) {
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}



client.on('message', (message) => {
  if (message.author.id != BOTID) {
      if (message.member.roles.some(role => role.name === 'Moderator', 'Admin')) {
      const args = message.content.slice(prefix.length).split (' ');
      let reason = args.slice(2).join(" ");
      if (isCommand("aappeal", message)) {
        console.log("I told that man the updates!")
        message.channel.send("**Wowzers**, :raised_hands: :shield:  your command has been executed on " + args[1]);
        axios.post("https://script.google.com/macros/s/" + scriptID + "?sheet=Global&key=" + args[1] + "&value=" + false, {});
        let appeallog = message.guild.channels.find(`name`, "appeal-logs");
        if(!appeallog) return message.channels.send("Uh my man did you delete it?");
        let sayBAN = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("Accepted " + args[1] + " Appeal.")
        .setTimestamp()
        appeallog.send(sayBAN)
         let warnlog = message.guild.channels.find(`name`, "moderation-logs");
            if(!warnlog) return message.channel.send("Couldn't find `moderation-logs` channel.");
            let coolkid = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setTitle("Unbanned " + args[1])
            .setDescription("Appeal Accepted!")
            warnlog.send(coolkid)
            let loglog = message.guild.channels.find(`name`, "server-logs");
            if(!loglog) return message.channel.send("Couldn't find `server-logs` channel.");
            let logBAN = new Discord.RichEmbed()
            .setColor("#AF00FF")
            .setTitle("Moderator " + message.author.username)
            .addField("Has ran the command ''aappeal'' command on " + args[1], "with the whole reason of " + reason)
            .setTimestamp()
          loglog.send(logBAN)
      }
    }
  }
});