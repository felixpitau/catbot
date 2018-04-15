import Talent from '../talent'
import prompts from '../data/imagine.json'
import { client } from '../catbot'
import fs from 'fs'
import path from 'path'

export default class Imagine extends Talent {

  get path () {
    return path.join(__dirname, '..', 'mem', 'imagine.json')
  }

  get game () {
    return JSON.parse(fs.readFileSync(this.path))
  }

  set game (game) {
    fs.writeFile(this.path, JSON.stringify(game), 'utf8', function (err) {
      if (err) {
        this.message.channel.send('Oops! Something went wrong! D:')
        return console.log(err);
      }
    });
  }

  save () {
    this.game = {
      players: this.players,
      choices: this.choices,
      turnCount: this.turnCount
    }
  }

  load () {
    this.players = this.game.players
    this.choices = this.game.choices
    this.turnCount = this.game.turnCount
  }

  onJoin () {
    // Add player to the game if they are not already in
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
  }

  get whoseTurn () {
    // return the id of the player whose turn it is
  }

  onMessage (message) {
    let m = message
    let react = this.react
    let say = this.say
    react(/^imagineif/gi, () => {
      react(/^imagineif$/gi, 'use `imagineif (status|join|leave|ready|play|choose)`')
      react(/^imagineif status/gi, () => {
        say('')
      })
      react(/^imagineif join/gi, this.onJoin)
      if (this.isInGame(m.author.id)) {
        react(/^imagineif leave/gi, this.onLeave)
        react(/^imagineif ready/gi, this.onReady)
        let playPat = /^imagineif play ([0-6])/gi
        react(playPat, () => {
          this.onPlay(playPat.exec(m.content)[1])
        })
        if (this.whoseTurn === m.author.id) {
          let choosePat = /^imagineif choose ([0-2])/gi
          react(choosePat, () => {
            this.onChoose(choosePat.exec(m.content)[1])
          })
        } else {
          say('You cannot do that because it is not your turn!')
        }
      } else {
        say('You cannot do that because you are not in the game!')
      }
    })
  }
}
