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
      
      
    })
  }
  
  hasPermission(message){
    
  }
  
  async run(message, { args }){
    
  }
}