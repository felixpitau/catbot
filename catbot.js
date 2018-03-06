require("babel-register");
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const id = require('./mem/id')

const talents = require('./talent').talents

client.on('ready', () => {
  console.log('Cat bot is ready!')
})

client.on('message', message => {
  for (let talent in talents) {
    talent.onMessage(message)
  }
})

client.login(id.login)
