import Talent from '../talent'
import prompts from '../data/imagine.json'
import { client } from '../catbot'
import fs from 'fs'
import path from 'path'

export default class Imagine extends Talent {

  get path () {
    return path.join(__dirname, '..', 'mem', 'imagine.json')
  }

  load () {
    let game = JSON.parse(fs.readFileSync(this.path))
    this.players = game.players
    this.choices = game.choices
    this.turnCount = game.turnCount
    this.status = game.status
    this.plays = game.plays
    this.subject = game.subject
    this.play = game.play
    return game
  }

  save (update = {}) {
    let game = {
      players: this.players,
      choices: this.choices,
      turnCount: this.turnCount,
      status: this.status,
      plays: this.plays,
      subject: this.subject,
      play: this.play
    }
    game = Object.assign(game, update)
    fs.writeFile(this.path, JSON.stringify(game), 'utf8', function (err) {
      if (err) {
        this.message.channel.send('Oops! Something went wrong! D:')
        return console.log(err);
      }
    });
  }

  onJoin (id, name) {
    // Add player to the game if they are not already in
    this.players.push({
      id: id,
      play: null,
      score: 0,
      name: name
    })
    this.say('You have been added to the game!')
  }

  onLeave (id) {
    // Remove player from game, advance turn if turn is on leaving player
    let player = {
      name: 'somebody'
    }
    console.log(this.players)
    for (let i in this.players) {
      console.log(i)
      if (this.players[i].id === id) {
        player = this.players.splice(i, 1)
      }
    }
    this.sayIn('lair', player[0].name + ' has left the game!')
  }

  onStart () {
    // Start the game by clearing current playing data, wait for joinging and ready commands
    this.status = 'ready'
    this.players = []
    this.choices = []
    this.plays = []
    this.turnCount = 0
    this.subject = {}
    this.play = {}
    this.say('A new game has been started, you can now join by using `imagineif join`')
  }

  onSet () {
    // Make changes to settings. Will fully implement later
  }

  onReady () {
    // Start the game by displaying choices for the first player
    if (this.status === 'ready') {
      this.sayIn('lair', 'Welcome to ***Imagine If***!')
    }
    if (this.status === 'choose' || this.status === 'ready') {
      this.showChoice()
    } else {
      this.showPlay()
    }
  }

  showPlay () {
    // Display the choices of a prompt, filter the prompt and choice texts
    if (this.status !== 'play') {
      this.status = 'play'
      this.play = prompts[Math.floor(Math.random() * prompts.length)]
    }
    let filterText = (t) => {
      return this.filterText(t, this.subject.name, this.subject.pronoun)
    }
    let play = this.play
    let choicesText = ''
    play.choices.forEach((text, n) => {
      choicesText += filterText((n + 1) + '. ' + text) + '\n'
    })
    this.sayIn(
      'lair',
      '```md\n' +
      '# ' + filterText(play.prompt) + ' #\n\n' +
      choicesText + '\n' +
      'play (1-' + play.choices.length + ')' +
      '```'
    )
  }

  onPlay (id, number) {
    // Record the choice for each player
    // Check if the last number has been played then reveal, score, advance turn and display next choice.
    // Check if score limit reached and end game
    this.player(id).play = parseInt(number - 1)
    let playCount = 0
    let plays = {}
    for (let i in this.players) {
      let player = this.players[i]
      if (player.play !== null) {
        playCount++
        if (typeof plays[player.play] === 'undefined') {
          plays[player.play] = [player.id]
        } else {
          plays[player.play].push(player.id)
        }
      }
    }
    if (playCount === this.players.length) {
      let highestCount = 2
      for (let i in plays) {
        let play = plays[i]
        if (play.length > highestCount) {
          highestCount = play.length
        }
      }
      let scoreText = ''
      let scoringPlayers = []
      for (let i in plays) {
        if (plays[i].length === highestCount) {
          for (let j in plays[i]) {
            let player = this.player(plays[i][j])
            player.score++
          }
        }
      }
      for (let i in this.players) {
        let player = this.players[i]
        scoreText += player.name + ' played ' + (player.play + 1) + '. ' + this.subject.choices[parseInt(player.play)]
        player.play = null
      }
      if (scoreText === '') {
        this.sayIn('lair', 'Nobody gets any points this round!')
      } else {
        this.sayIn('lair', scoreText)
      }
      let scoreLimit = this.settings.winning
      let winnerList = []
      for (let i in this.players) {
        let player = this.players[i]
        if (player.score >= scoreLimit) {
          winnerList.push(player)
        }
      }
      if (winnerList.length > 0) {
        this.sayIn('lair', 'GAME OVER!\nAnd the winner' + (winnerList.length > 1 ? 's' : '') + ' of this game ' + (winnerList.length > 1 ? 'are' : 'is') + ': ')
        winnerList.forEach(winner => {
          this.sayIn('lair', '@' + winner.name)
        })
        this.status = 'none'
        this.players = []
        this.choices = []
        this.plays = []
        this.turnCount = 0
        this.subject = {}
        this.play = {}
      } else {
        this.turnCount++
        this.showScore()
        this.showChoice()
      }
    }
  }

  showChoice () {
    // Display the two choices of subjects
    let subjects = this.settings.subjects
    if (this.status !== 'choose') {
      this.status = 'choose'
      let roll = () => {return subjects[Math.floor(Math.random() * subjects.length)]}
      let rollOne = roll()
      let rollTwo = roll()
      do {
        rollTwo = roll()
      } while (rollOne === rollTwo && subjects.length > 1)
      this.choices = [rollOne, rollTwo]
    }
    this.sayIn(
      'lair',
      '***@' + this.whoseTurn.name + '***, ' +
      'it is your turn. Choose a subject:' +
      '```md\n' +
      '1. ' + this.choices[0].name + '\n' +
      '2. ' + this.choices[1].name + '\n\n' +
      'choose (1|2)\n' +
      '```'
    )
  }

  onChoose (id, number) {
    // Take choice and display a prompt
    this.subject = this.choices[number - 1]
    this.showPlay()
  }

  showScore () {
    let scoreText = ''
    this.players.forEach(player => {
      scoreText += '* ' + player.name + ' has ' + player.score + ' points\n'
    })
    this.sayIn(
      'lair',
      '```md\n' +
      '# SCOREBOARD #\n' +
      scoreText + '\n' +
      '```'
    )
  }

  filterText (text, name, pronoun) {
    let re = {
      "they": {
        "they": "they",
        "their": "their",
        "theirs": "theirs",
        "them": "them"
      },
      "he": {
        "they": "he",
        "their": "his",
        "theirs": "his",
        "them": "him"
      },
      "she": {
        "they": "she",
        "their": "her",
        "theirs": "hers",
        "them": "her"
      }
    }
    for (let p in re[pronoun]) {
      let r = re[pronoun][p]
      text = text.split('{' + p + '}').join(r)
    }
    text = text.split('{name}').join(name)
    return text
  }

  isInGame (id) {
    // return true if player is in the game
    for (let i in this.players) {
      if (this.players[i].id === id) {
        return true
      }
    }
    return false
  }

  player (id) {
    for (let i in this.players) {
      if (this.players[i].id === id) {
        return this.players[i]
      }
    }
  }

  get whoseTurn () {
    // return the id of the player whose turn it is, null if not
    if (this.players.length > 0) {
      return this.players[this.turnCount % this.players.length]
    }
  }

  onMessage (message) {
    let m = message
    let id = m.author.id
    let react = (r, o, e) => { this.react(r, o, e) }
    let say = (msg) => { this.say(msg) }

    let playRes = (n) => {
      if (this.isInGame(id)) {
        if (this.isInPrivate) {
          if (this.status === 'play') {
            this.onPlay(id, n)
          } else {
            say('You cannot do that at this time')
          }
        } else {
          say('You can only do that in private!')
        }
      } else {
        say('You have to be in the game to do that!')
      }
    }
    let chooseRes = (n) => {
      if (this.isInGame(id)) {
        if (this.status === 'choose') {
          if (this.whoseTurn.id === id) {
            this.onChoose(id, n)
          } else {
            say('You cannot do that because it is not your turn!')
          }
        } else {
          say('It is not yet time to choose the next subject!')
        }
      } else {
        say('You cannot do that because you are not in the game!')
      }
    }

    if (this.isInGame(id)) {
      react(/^play ([1-6])$/gi, () => {
        playRes((/^play ([1-6])$/gi).exec(m.content)[1])
      })
      react(/^choose ([1-6])$/gi, () => {
        chooseRes((/^choose ([1-6])$/gi).exec(m.content)[1])
      })
    }

    react(/^imagineif/gi, () => {
      this.load()
      react(/^imagineif$/gi, 'use `imagineif (status|join|leave|ready|play|choose)`')
      react(/^imagineif status/gi, () => {
        let statusText = {
          'none': 'There is no game running. ',
          'ready': 'The game is ready for joining. ',
          'play': 'Waiting for everybody to make their play. ',
          'choose': 'Waiting for a choice of subject'
        }
        this.sayIn('lair', statusText[this.status])
        this.showScore()
        if (this.status === 'play' || this.status === 'choose') {
          this.onReady()
        }
      })
      react(/^imagineif start/gi, () => {
        react(/^imagineif start\!$/gi, () => {
          this.onStart()
        }, () => {
          if (this.status === 'none') {
            this.onStart()
          } else {
            say('The game has already been started! use `imagineif start!` to override')
          }
        })
      })
      react(/^imagineif join/gi, () => {
        if (this.status !== 'none') {
          if (this.isInGame(id)) {
            say('You are already in the game!')
          } else {
            this.onJoin(id, m.author.username)
          }
        } else {
          say('A game has not been started yet!')
        }
      })
      react(/^imagineif leave/gi, () => {
        if (this.isInGame(id)) {
          this.onLeave(id)
        } else {
          say('You were not even in the game!')
        }
      })
      react(/^imagineif ready/gi, () => {
        if (this.status === 'ready') {
          if (this.players.length > 0) {
            this.onReady()
          } else {
            say('There are not enough players to start!')
          }
        } else {
          say('A game has not been started or is already in play!')
        }
      })
      let playPat = /^imagineif play ([1-6])/gi
      react(playPat, () => {
        playRes(playPat.exec(m.content)[1])
      })
      let choosePat = /^imagineif choose ([1-2])/gi
      react(choosePat, () => {
        chooseRes(choosePat.exec(m.content)[1])
      })
      this.save()
    })
  }
}
