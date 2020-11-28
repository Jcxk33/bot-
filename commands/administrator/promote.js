const Discord = require("discord.js")
const { Command } = require("discord.js-commando")
const roblox = require("noblox.js")

module.exports = class promote extends Command { 
  constructor(client){
    super(client, {
      name: "promote", 
      description: "Promote people within the group.",
      
      memberName: "promote",
      group: "administrator",
      
      args: [
        {
          type: "string",
          prompt: "What is their Roblox username?",
          key: "desiredPlayer",
          label: "username",
        }
      ]
    })
  }
  
  hasPermission(message){
    const validRole = "🎄 | Christmas"
    if(message.member.roles.some(role => role.name == validRole)){
      return true 
    } else {
      return "Sorry, :persevere:! You must be a Mayflower Administrator! :grimacing:"
    }
  }
  
  async run(message, { desiredPlayer }){
    let robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0YjEwMGRkOC01MDNlLTQxZDYtYTY2My00YTcwZWMxNjBlNWYiLCJzdWIiOjgwMzU5NzcyNX0.LGFFBlKm-zdXIlZ6wXRFvjdAwCU7bww1-7Rbjhl7vow"
    
    let groupID = 8141418
    
    let playerName 
    let playerID 
    
    let playerRank 
    let playerOldRank 
    let playerNewRank 
    
    
    // Detection System 
    a
    
    
      
    
  }
}