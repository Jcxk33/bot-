const Discord = require("discord.js")
const { Command } = require("discord.js-commando")


module.exports = class nominate extends Command {
  constructor(client){
    super(client, {
      name: "nominate", 
      description: "nominate for position ",
      
      group: "miscellaneous",
      memberName: "nominate",
      
      args: [
        {
          type: "string",
          prompt: "nomination?",
          key: "nomination",
          oneOf: ["gubernatorial", "senate", "sheriff"]
        }
      ]
    })
  }
  
  async run(message, { nomination }){
    const person = message.guild.member(message.author)
    
    let govRoleName = "Gubernatorial Candidate"
    let senateRoleName = "Campaigner"
    let sheriffRoleName = "Sheriff Candidate"
    
    let govRole = message.guild.roles.find(role => role.name == govRoleName).id
    let senateRole = message.guild.roles.find(role => role.name == senateRoleName).id
    let sheriffRole = message.guild.roles.find(role => role.name == sheriffRoleName).id
    
    console.log(sheriffRole)
    
    if(nomination == "gubernatorial"){
      if(person.roles.find(role => role.id == govRole)){
        message.channel.send("role")
      } else {
        message.channel.send("no role")
      }
    } else if(nomination == "senate"){
      if(person.roles.find(role => role.id == senateRole)){
        message.channel.send("role")
      } else {
        message.channel.send("no role")
      }
    } else if(nomination == "sheriff"){
      if(person.roles.find(role => role.id == sheriffRole)){
        person.removeRole(sheriffRole)
        
        message.reply("un nominated for sheriff")
      } else {
        person.addRole(sheriffRole)
        
        message.reply("nominated for sheriff")
      }
    }
  }
}