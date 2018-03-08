import id from './mem/id'

export default class Talent {
  constructor (name) {
    this.name = name
  }

  isFromSelf (message) {
    return (message.author.id === id.bot.catbot)
  }

  isInPrivate (message) {
    return (typeof message.server === 'undefined')
  }

  isInPublic (message) {
    return (typeof message.server !== 'undefined')
  }

  isIn (message, channel) {
    // general, animals, memes, cursed, interesting, music, lair
    return (message.channel.id === id.channel[channel])
  }

  react (message, pattern, output, elseif) {
    if (message.author.id !== id.bot.catbot) {
      if (pattern instanceof RegExp) {
        if (message.content.match(pattern) !== null) {
          if (output instanceof Function) {
            output()
          } else if (typeof output === 'string') {
            message.channel.send(output)
          } else if (output instanceof Array) {
            message.channel.send(output[Math.floor(Math.random() * output.length)])
          }
        } else {
          if (elseif !== null && elseif instanceof Function) {
            elseif()
          }
        }
      }
    }
  }

  say (message, text) {
    if (text instanceof String) {
      message.channel.send(output)
    } else if (text instanceof Array) {
      message.channel.send(output[Math.floor(Math.random() * output.length)])
    }
  }

  onMessage (message) {
    // ...
  }
}
