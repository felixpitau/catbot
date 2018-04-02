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

  start (m) {
    this.say(m, 'Starting game! Join up by using `imagineif join`')
    Imagine.game = {
      stage: 'person',
      turnCount: 0,
      inGame: true,
      players: [],
      subjects: []
    }
  }

  end (m) {
    let g = Imagine.game
    g.inGame = false
  }

  join (m) {
    let g = Imagine.game
    if (!g.inGame) {
      return false
    }
    let exists = false
    for (let player in g.players) {
      if (player.id === m.author.id) {
        exists = true
        break
      }
    }
    if (!exists) {
      g.players.push({
        id: m.author.id,
        position: 0,
        score: 0,
        inGame: true,
        choice: false,
        turn: false
      })
    } else {
      this.say(m, 'You have already joined!')
    }
  }

  leave (m) {
    let g = Imagine.game
    for (let player in g.players) {
      if (player.id === m.author.id) {
        player.inGame = false
      }
    }
  }

  subjectAdd (m, subject) {
    
  }

  subjectRemove (m, subject) {
    
  }

  showSubject (m, choice) {
    let roll = () => {return g.subjects[Math.floor(Math.random() * g.subjects.length)]}
    let rollOne = roll()
    let rollTwo = roll()
    until (rollOne !== rollTwo || g.subjects.length < 2) {
      rollTwo = roll()
    }
    this.say(m, client.findUser(this.turn()).username + ', it is your turn. Choose a subject: 1. ' + rollOne + ' 2. ' + rollTwo)
  }

  choose (m, choice) {
    
  }

  onMessage (message) {
    let m = message
    if (Imagine.game === null) {
      Imagine.game = {
        stage: 'person',
        turnCount: 0,
        inGame: false,
        players: [],
        subjects: []
      }
    }
    let g = Imagine.game
    this.react(m, /^\imagineif/gi, () => {
      this.react(m, /^imagineif$/gi, 'use: `imagineif (status|subject|choose|join|start|end)`')
      this.react(m, /^imagineif status$/gi, () => {
        if (g.inGame) {
          this.say(m, 'A game is in progress and it is ' + client.fetchUser(this.turn()).username + '\'s turn!')
        } else {
          this.say(m, 'A game is not currently in progress')
        }
      })
    })
    this.react(m, /^imagineif choose/gi, () => {
      this.react(m, /^imagineif choose$/gi, 'use `imagineif choose (1..6)` to choose a person or a response')
      this.react(m, /^imagineif choose [0-9]$/gi, () => {
        if (g.inGame) {
          if (g.stage === 'person') {
            
          } else if (g.stage === 'response') {
            
          }
        } else {
          this.say(m, 'There is no game running right now')
        }
      })
    })
    this.react(m, /^imagineif join/gi, () => {
      this.join(m)
    })
    this.react(m, /^imagineif leave/gi, () => {
      this.leave(m)
    })
    this.react(m, /^imagineif subject/gi, () => {
      this.react(m, /^imagineif subject$/gi, 'use: `imagineif subject (add|remove)`')
    })
    this.react(m, /^imagineif start/gi, () => {
      this.react(m, /^imagineif start$/gi, () => {
        if (g.inGame) {
          this.say(m, 'You already have a game going! do `imagineif start!` to start anyways')
        } else {
          this.start(m)
        }
      })
      this.react(m, /^imagineif start\!$/gi, () => {
        this.start(m)
      })
    })
    this.react(m, /^imagineif end/gi, () => {
      this.react(m, /^imagineif end$/gi, () => {
        if (g.inGame) {
          this.say(m, 'Are you sure? do `imagineif end!` if you\'re sure')
        } else {
          this.say(m, 'There is no game running to end.')
        }
      }
      this.react(m, /^imagineif end\!$/gi, () => {
        this.end(m)
      })
    })
  }
}
