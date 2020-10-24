// Const

const http = require("http");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const commando = require("discord.js-commando");
const request = require("request-promise");
const path = require("path");
const config = require(path.join(__dirname, "config", "config.json"));


// Client
const client = new commando.CommandoClient({
  owner: ["675794471065092161", "329719053168148481"],
  commandPrefix: ";",
  unknownCommandResponse: false,
  selfbot: false,
  commandEditableDuration: 60
});

// Status
client.once("ready", () => {
  client.user.setPresence({
    game: { name: "with Cleo" },
  });
});

          const mainserver = msgObject.client.guilds.get("706999196124840009");
          let channel = mainserver.channels.find("id", "740496274175819777");
            if (msg.content.includes('@Zar#1332')) {
  msg.channel.send("Did you just tag him... WOW");
}


// Registrys
client.registry
  .registerGroups([
    ["mod", "Moderation Commands"],
    ["miscellaneous", "Miscellaneous Commands"],
    ["administrator", "Administrator Commands"],
    ["es", "ES commands"],
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, "commands"));

message.channel.send.say('online!')

// Client Login
client.login(config.token);