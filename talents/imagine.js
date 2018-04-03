import Talent from '../talent'
import prompts from '../data/imagine.json'
import { client } from '../catbot'

export default class Imagine extends Talent {

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
      stage: 'subject',
      turnCount: 0,
      inGame: true,
      subject: {},
      players: [],
      subjects: []
    }
    this.showSubject(m)
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

  subjectAdd (m) {
    // TODO: finish this
  }

  subjectRemove (m) {
    // TODO: finish this
  }

  showSubject (m, choice) {
    let roll = () => {return g.subjects[Math.floor(Math.random() * g.subjects.length)]}
    let rollOne = roll()
    let rollTwo = roll()
    do {
      rollTwo = roll()
    } while (rollOne === rollTwo && g.subjects.length > 1)
    Imagine.subjects = [rollOne, rollTwo]
    this.say(m, client.findUser(this.turn()).username + ', it is your turn. Choose a subject: 1. ' + rollOne + ' 2. ' + rollTwo)
  }

  showChoices (m) {
    // TODO: finish this
  }

  choose (m) {
		let g = Imagine.game
		let choicePat = /^imagineif choose ([0-9])$/gi
		let choice = Number.parseInt(m.content.match(choicePat)[1])
		if (g.stage === 'subject') {
      if (this.turn() === m.author.id) {
      	if (choice === 1 || choice === 2) {
          for (let subject in g.subjects) {
            if (Imagine.subjects[choice - 1] === subject.name) {
              g.subject = subject
            }
          }
          this.say(m, 'You have picked ' + g.subject + '!')
          this.showChoices(m)
        }
      } else {
        this.say(m, 'It is not your turn!')
      }
    } else if (g.stage === 'choice') {
      if (this.isInPrivate(m)) {
        if (choice > 0 && choice <= g.subject.choices.length) {
          this.showSubject(m)
        }
      } else {
        this.say(m, 'You must submit that in private!')
      }
    }
  }

  dub (text) {
    // TODO: replace {name} and pronouns in text and return result
  }

  onMessage (message) {
    let m = message
    if (Imagine.game === null) {
      Imagine.game = {
        stage: 'subject',
        turnCount: 0,
        inGame: false,
        subject: {},
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
          this.choice(m)
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
      this.react(m, /^imagineif subject add/gi, () => {
        this.react(m, /^imagineif subject add$/gi, 'use: `imagineif subject add (he|she|they) (name)`')
        this.react(m, /^imagineif subject add (he|she|they) (.+)$/gi, () => {
          this.subjectAdd(m)
        })
      })
      this.react(m, /^imagineif subject remove/gi, () => {
        this.react(m, /^imagineif subject remove$/gi, 'use: `imagineif subject remove (name)`')
        this.react(m, /^imagineif subject remove (.+)$/gi, () => {
          this.subjectRemove(m)
        })
      })
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
      })
      this.react(m, /^imagineif end\!$/gi, () => {
        this.end(m)
      })
    })
  }
}
