import Talent from '../talent'
import fs from 'fs'
import path from 'path'

export default class Quotes extends Talent {

  onMessage (message) {
    let m = message
    let quotePat = /^\"(.+)\" ([a-z]+) ([0-9]{4})$/gi
    let quotesPath = path.join(__dirname, '..', 'mem', 'quotes.json')
    this.react(m, quotePat, () => {
      if (this.isInPublic(m)) {
        let quotesMem = JSON.parse(fs.readFileSync(quotesPath))
        let quoteExec = quotePat.exec(m.content)
        quotesMem.push({
          dateAdded: Date.now(),
          addedByUser: m.author.id,
          removedByUser: null,
          dateRemoved: null,
          quote: quoteExec[1],
          by: quoteExec[2],
          year: quoteExec[3]
        })
        fs.writeFileSync(quotesPath, JSON.stringify(quotesMem))
        this.say(m, 'Quote has been added to the quote journal!')
      } else {
        this.say(m, 'You can only record quotes for the quote journal in a public channel')
      }
    })
    this.react(m, /^quote/gi, () => {
      this.react(m, /^quote$/gi, '`usage: quote (awards|list)`')
      this.react(m, /^quote backup$/gi, () => {
        fs.copyFileSync(quotesPath, path.join(__dirname, '..', 'mem', 'quotes-backup-' + Math.floor(Math.random() * 10000) + '.json'))
        this.say(m, 'Quote journal has been backed up!')
      })
      this.react(m, /^quote awards/gi, () => {

      })
      this.react(m, /^quote list$/gi, () => {
        // this.react(m, /^quote list$/gi, '`usage: quote list`')
        let quotesMem = JSON.parse(fs.readFileSync(quotesPath))
        this.say(m, 'Here are the latest quotes in the quote journal:')
        for (let i = 0; i < (quotesMem.length > 5 ? 5 : quotesMem.length); i++) {
          let quote = quotesMem[i]
          this.say(m, '"' + quote.quote + '" ' + quote.by + ' ' + quote.year)
        }
      })
    })
  }
}
