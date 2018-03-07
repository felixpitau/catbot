require("babel-register")
const Discord = require('discord.js')
const fs = require('fs')
const id = require('./mem/id.json')

const talents = require('./talents')

const client = new Discord.Client({
  token: id.login,
  autorun: true
})

client.on('ready', () => {
  console.log('Cat bot is ready!')
})

client.on('message', message => {
  for (let talent in talents) {
    talent.onMessage(message)
  }
})
