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

  onMessage (message) {
    // ...
  }
}

export let talents = [
  new (import './talents/calculate')('calculate'),
]
