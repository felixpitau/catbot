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
    return game
  }

  save (update = {}) {
    let game = {
      players: this.players,
      choices: this.choices,
      turnCount: this.turnCount,
      status: this.status,
      plays: this.plays,
      subject: this.subject
    }
    game = Object.assign(game, update)
    fs.writeFile(this.path, JSON.stringify(game), 'utf8', function (err) {
      if (err) {
        this.message.channel.send('Oops! Something went wrong! D:')
        return console.log(err);
      }
    });
    this.load()
  }

  onJoin () {
    // Add player to the game if they are not already in
    this.players.push({
      id: id,
      play: null
    })
    this.say('You have been added to the game!')
  }

  onLeave () {
    // Remove player from game, advance turn if turn is on leaving player
  }

  onStart () {
    // Start the game by clearing current playing data, wait for joinging and ready commands
  }

  onSet () {
    // Make changes to settings. Will fully implement later
  }

  onReady () {
    // Start the game by displaying choices for the first player
  }

  showChoice () {
    // Display the two choices of subjects
  }

  showPrompt () {
    // Display the choices of a prompt, filter the prompt and choice texts
  }

  onPlay (number) {
    // record the choice for each player, make sure it is private. Check if the last number has been played then reveal, score, advance turn and display next choice
  }

  onChoose (number) {
    // Take choice and display a prompt
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
    for (this.players)
  }

  get whoseTurn () {
    // return the id of the player whose turn it is, null if not
    if (this.players.length > 0) {
      this.players(this.turnCount % this.players.length)
    }
  }

  onMessage (message) {
    let m = message
    let id = m.author.id
    let react = this.react
    let say = this.say
    react(/^imagineif/gi, () => {
      this.load()
      react(/^imagineif$/gi, 'use `imagineif (status|join|leave|ready|play|choose)`')
      react(/^imagineif status/gi, () => {
        say('')
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
      }, () => {
        react(
          /^imagineif (join|leave|ready|play|choose)/gi,
          'You cannot do that because a game has not been started!',
          'That is not a valid command'
        )
      })
      react(/^imagineif join/gi, () => {
        if (this.isInGame(id)) {
          say('You are already in the game!')
        } else {
          this.onJoin(id)
        }
      })
      react(/^imagineif leave/gi, () => {
        if (this.isInGame(id)) {
          this.onLeave()
        } else {
          say('You were not even in the game!')
        }
      })
      react(/^imagineif ready/gi, () => {
        if (this.status === 'ready') {
          this.onReady()
        } else {
          say('A game has not been started or is already in play!')
        }
      })
      let playPat = /^imagineif play ([0-6])/gi
      react(playPat, () => {
        if (this.status === 'play') {
          this.onPlay(playPat.exec(m.content)[1])
        } else {
          say('You cannot do that at this time')
        }
      })
      let choosePat = /^imagineif choose ([0-2])/gi
      react(choosePat, () => {
        if (this.status === 'choose') {
          if (this.whoseTurn === id) {
            this.onChoose(choosePat.exec(m.content)[1])
          } else {
            say('You cannot do that because it is not your turn!')
          }
        } else {
          say('It is not yet time to choose the next subject!')
        }
      })
      this.save()
    })
  }
}
