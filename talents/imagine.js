import Talent from '../talent'
import prompts from '../data/imagine.json'
import { client } from '../catbot'

default export class Imagine extends Talent {

  turn () {
    let g = Imagine.game
    if (g.inGame) {
      for (let player in g.players) {
        if (player.turn) {
          return player.id
        }
      }
    }
  }

  onMessage (message) {
    let m = message
    this.react(m, /^\imagineif/gi, () => {
      if (Imagine.game === null) {
        Imagine.game = {
          rolled: false,
          turnCount: 0,
          inGame: false,
          players: [],
          subjects: []
        }
      }
      let g = Imagine.game
      this.react(m, /^imagineif$/gi, 'use: `imagineif (status|roll|choose|join|start|end)`')
      this.react(m, /^imagineif status$/gi, () => {
        if (g.inGame) {
          this.say(m, 'A game is in progress and it is ' + client.fetchUser(g.turn).username + '\'s turn!')
        } else {
          this.say(m, 'A game is not currently in progress')
        }
      })
      this.react(m, /^imagineif roll$/gi, () => {
        if (g.inGame) {
          if (this.turn() === m.author) {
            if (g.rolled === false) {
              this.say(m, 'Rolling!')
              g.rolled = true
              let roll = () => {return g.subjects[Math.floor(Math.random() * g.subjects.length)]}
              let rollOne = roll()
              let rollTwo = roll()
              until (rollOne !== rollTwo || g.subjects.length < 2) {
                rollTwo = roll()
              }
            } else {
              this.say(m, 'You already rolled! You must now choose!')
            }
          } else {
            this.say(m, 'It is not your turn, it is ' + client.getchUser(g.turn).username + '\'s turn!')
          }
        } else {
          this.say(m, 'There is no game to roll for!')
        }
      })
    })
    this.react(m, /^imagineif choose/gi, () => {
      this.react(m, /^imagineif choose$/gi, 'use `imagineif choose (1..6)` to choose a person or a response')
    })
    this.react(m, /^imagineif join/gi, () => {
      
    })
    this.react(m, /^imagineif start/gi, () => {
      
    })
    this.react(m, /^imagineif end/gi, () => {
      
    })
  }
}
