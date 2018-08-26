import Talent from '../talent'
import Calculate from './calculate'
import moves from '../data/tt.moves.json'

const calc = new Calculate('calculate')

export default class Tt extends Talent {

  onMessage (message) {
    this.react(/^tt/gi, () => {
      let data = this.loadMemory('tt')
      this.react(/^tt help$/gi, 'usage: `tt (profession) [help]`')
      this.react(/^tt profession/gi, () => {
        this.react(/^tt profession help$/gi, 'usage: `tt profession [ <current profession> | help ]`', () => {
          this.react(/^tt profession (.+)$/gi, () => {
            let profPat = /^tt profession (.+)$/gi
            let profession = profPat.exec(message.content)[1]
            if (typeof moves.promoves[profession] === 'object') {
              data[message.author.id].profession = profession
            }
          })
        })
        this.react(/^tt profession$/gi, 'Your profession is: ' + data[message.author.id].profession)
      })
    })
    this.react(/^> (.+)/gi, () => {
      let data = this.loadMemory('calculate')
      let scope = data[message.author.id]
      for (let i in moves.basic) {
        let move = moves.basic[i]
        let movePat = new RegExp(i, 'gi')
        this.react(movePat, () => {
          if (typeof move.roll === 'string') {
            try {
              this.say('🎲 ' + calc.calculate(move.roll, scope))
            }
            catch (error) {
              this.say('🎲 ' + error)
            }
            this.say('```md\n' + move.description + '\n```')
          }
        })
      }
    })
  }

}
