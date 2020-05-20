const express = require('express');
var bodyParser = require('body-parser');
const https = require('https');
const app = express();
const {
    Client,
    RichEmbed
} = require('discord.js');
let client = new Client();

let token = process.env.SECRET
let prefix = '!';

async function startApp() {
    var promise = client.login(token)
    promise.catch(function(error) {
      console.error("Discord bot login | " + error);
    });
}
startApp();
client.on("ready", () => {
  console.log("Successfully logged in Discord bot.");
})

var toBan = [];
function byUID(method,args,message) {
  https.get("https://api.roblox.com/users/" + args[2], (res) => {
      
      let data = '';
      res.on('data', d => {
        data += d
      })
      res.on('end', () => {
        if (res.statusCode == 200) {
          toBan.push({method: method,username: JSON.parse(data).Username,value: args[2],cid: message.channel.id});
        } else {
          message.channel.send(method + " failed: Invalid userId " + args[2]);
        }
      });
  }).on('error', error => {
    console.error("RBLX API (UID) | " + error);
  });
}

function byUser(method, username, moderator, reason, msg) {
  const options = {
    hostname: 'api.roblox.com',
    port: 443,
    path: '/users/get-by-username?username=' + username,
    method: 'GET'
  }
  https.get("https://api.roblox.com/users/get-by-username?username=" + username, (res) => {
      let data = '';
      res.on('data', d => {
        data += d
      })
      res.on('end', () => {
        if (JSON.parse(data).Id != undefined) {
          toBan.push({method: method, username: JSON.parse(data).Username, reason: reason, cid: msg.channel.id});
        }
      });
  }).on('error', error => {
    console.error("RBLX API (Username) | " + error);
  });
}

function isCommand(command, message) {
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}

client.on('message', (message) => {
  if(message.author.bot) return;
  if (!message.member.roles.some(r=>["Admin", "Moderator"].includes(r.name))) return 'You must be a Moderator or an Admin to run this command!';
      if (message.member.roles.some(r=>["Admin", "Moderator"].includes(r.name))) {
      const args = message.content.slice(prefix.length).split(' ');
      if (isCommand("ban", message)) {
        if (args[1] == "id") {
          message.channel.send("Attempting to ban player with UserId " + args[2] + "...");
          byUID("Ban",args,message);
        } else if (args[1] == "user") {
          message.channel.send("Attempting to ban player with username " + args[2] + "...");
          byUser("ban",args[2],message.member.displayName,args[3], message);
        } else {
          message.channel.send("Invalid command: Syntax is `ban user Player12` or `ban id 12342312`");
        }
      } else if (isCommand("unban", message)) {
        if (args[1] == "id") {
          message.channel.send("Attempting to unban player with UserId " + args[2]);
          byUID("Unban",args,message);
        } else if (args[1] == "user") {
          message.channel.send("Attempting to unban player with username " + args[2]);
          byUser("Unban",args,message);
        } else {
          message.channel.send("Invalid command: Syntax is `unban user Player12` or `unban id 12342312`");
        }
      }
    }
});
//
app.use(express.static('public'));

app.get('/', function(request, response) {
  if (request.headers.username != undefined) { 
    const channel = client.channels.get(request.headers.cid);
    if (request.headers.rblxerror == undefined) {
      channel.send('Successfully ' + request.headers.method + 'ned user ' + request.headers.username + " | ID: " + request.headers.value);
    } else {
      channel.send("Failed to " + request.headers.method + " user: " + request.headers.username + " | ID: " + request.headers.value + " | `Rblx-Error:  " + request.headers.rblxerror + "`"); 
    }
  }
  response.send(toBan[0]);
  toBan.shift();
});

// listen for requests & Keep bot alive

let listener = app.listen(process.env.PORT, function() {
    //setInterval(() => { // Used to work sometime ago
    //    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    //}, 280000);
    console.log('Not that it matters but your app is listening on port ' + listener.address().port);
});

client.on('error', console.error)