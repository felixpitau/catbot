import id from './mem/id'
import settings from './mem/settings'

export default class Talent {
  constructor (name) {
    this.name = name
    this._message = null
    this.lastMessage = null
    if (settings[name]) {
      this.settings = settings[name]
    }
  }

  get message () {
    return this._message
  }

  isFrom (name) {
    return (this.message.author.id === id.member[name])
  }

  get isFromSelf () {
    return (this.message.author.id === id.bot.catbot)
  }

  get isInPrivate () {
    return (this.message.channel.type === 'dm')
  }

  get isInPublic () {
    return (this.message.channel.type === 'text')
  }

  isIn (channel) {
    // general, animals, memes, cursed, interesting, music, lair
    return (this.message.channel.id === id.channel[channel])
  }

  react (pattern, output, elseif) {
    if (this.message.author.id !== id.bot.catbot) {
      if (pattern instanceof RegExp) {
        if (this.message.content.match(pattern) !== null) {
          if (output instanceof Function) {
            output()
          } else if (typeof output === 'string') {
            this.message.channel.send(output)
          } else if (output instanceof Array) {
            this.message.channel.send(output[Math.floor(Math.random() * output.length)])
          }
        } else {
          if (elseif !== null && elseif instanceof Function) {
            elseif()
          }
        }
      }
    }
  }

  say (text) {
    if (typeof text === 'string') {
      this.message.channel.send(text)
    } else if (text instanceof Array) {
      this.message.channel.send(text[Math.floor(Math.random() * text.length)])
    }
  }

  _beforeOnMessage (message) {
    this._message = message
  }

  _afterOnMessage () {
    this.lastMessage = this.message
    this._message = null
  }

  onMessage (message) {
    // ...
  }
}
