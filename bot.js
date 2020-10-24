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
  owner: ["669518615199875082", "675794471065092161"],
  commandPrefix: ";",
  unknownCommandResponse: true,
  selfbot: false,
  commandEditableDuration: 60
});

// Status
client.once("ready", () => {
  client.user.setPresence({
    game: { name: "with Cleo" },
  });
});


// Registrys
client.registry
  .registerGroups([
    ["mod", "Moderation commands"],
    ["miscellaneous", "Miscellaneous commands"],
    ["administrator", "Administrator commands"],
    ["es", "ES commands"],
    ["no", "no no square"]
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, "commands"));

// Port
var server = require("http").createServer(app);
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

// I dont know what the fuck all this shit is

// Client Login
client.login(config.token);