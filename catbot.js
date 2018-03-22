require("babel-register")
const Discord = require('discord.js')
const fs = require('fs')
const id = require('./mem/id.json')

const talents = require('./talents').default

const client = new Discord.Client()

client.on('ready', () => {
  console.log('Cat bot is ready!')
})

client.on('message', message => {
  for (let talent in talents) {
    talents[talent].onMessage(message)
  }
})

module.exports.client = client

client.login(id.login)
