import Talent from '../talent'
import math from 'mathjs'

let parser = math.parser()

export default class Calculate extends Talent {

  parseDice (text) {
    let rollPat = /\d*d\d+/gi
    let rollArr = []
    let rollMatches = text.match(rollPat)
    if (rollMatches !== null) {
      for (let i = 0; i < rollMatches.length; i++) {
        let roll = rollMatches[i]
        let numPat = /(\d*)d(\d+)/gi
        let num = numPat.exec(roll)
        let rollVal = 0
        let rollCount = parseInt(num[1])
        if (num[1] == "")
          rollCount = 1;
        for (let j = 0; j < rollCount; j++) {
          rollVal += Math.ceil(Math.random() * parseInt(num[2]))
        }
        text = text.replace(/\d*d\d+/i, rollVal)
      }
    }
    return text
  }

  calculate (text, scope) {
    return parser.eval(this.parseDice(text), scope)
  }

  onMessage (message) {
    if (!this.isFromSelf) {
      let content = message.content
      if (content.match(/^(roll\+)(.+)/gi) !== null) {
          content = 'roll 2d6+' + (/^(roll\+)(.+)/gi).exec(content)[2]
      }
      if (content.match(/^(calculate|calc|roll) (.+)/gi) !== null) {
        let data = this.loadMemory('calculate')
        let scope = data[message.author.id]
        let calcPat = /^(calculate|calc|roll) (.+)/gi
        let rollPat = /(\d*d\d+)/gi
        let calcArr = calcPat.exec(content)
        let parsable = calcArr[2]
        let rollArr = rollPat.exec(parsable)
        let result = 'error'
        try {
          result = math.eval(this.parseDice(parsable), scope)
        }
        catch (error) {
          result = error
        }
        this.saveMemory('calculate', data)
        let isRoll = (/^(roll)/gi).exec(content) !== null
        message.reply((isRoll ? '🎲 ' : '📊 ') + result)
      }
    }
  }
}
