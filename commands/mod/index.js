const config = require("./config.json");
const discord = require("discord.js");
const client = new discord.Client();
const Trello = require("trello");
const trello = new Trello(config.trelloAppKey,config.trelloToken);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

if (command === 'gunban') {
  if(!message.member.roles.some(r=>["key","Founder"].includes(r.name)) )
            message.channel.send("<@" + message.author.id + ">, Sorry :persevere:! You must be a Mayflower Mod or Admin!")
   let cardID = args[0]
   if (!cardID) {
            message.channel.send("<@" + message.author.id + ">, Thank you for being with the **Mano County Moderation Team**! Who would you like to **unban**? :detective:")
   } else;
    trello.deleteCard(cardID,
    function(err, deletedcard) {
      if (err) {
        console.log("error with deleting card." + err)
         message.channel.send("<@" + message.author.id + ">, Sorry, that command has already been executed!")
      }
      else {
        console.log("card deleted!")
        message.channel.send("<@" + message.author.id + ">, Congrats :raised_hands:! Your command will be executed shortly!")
      }
    }
)}


client.login(config.token);
