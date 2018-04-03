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
      let settings = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mem', 'settings.json')))
      this.react(m, /^quote$/gi, 'usage: `quote (awards|list|doc)`')
      this.react(m, /^quote doc/gi, 'Here you go! https://docs.google.com/spreadsheets/d/1YJzJnFVqwSMjaeuuZDgdzMitVQ9mMRCyVVwPeTo8cgM/edit?usp=sharing')
      this.react(m, /^quote backup$/gi, () => {
        fs.copyFileSync(quotesPath, path.join(__dirname, '..', 'mem', 'quotes-backup-' + Math.floor(Math.random() * 10000) + '.json'))
        this.say(m, 'Quote journal has been backed up!')
      })
      this.react(m, /^quote awards/gi, () => {
        let qaCategories = ["Funniest Quote", "Most Inappropriate", "Best Out-of-Context", "Most Concerning", "Most Savage", "Best for a T-Shirt", "Most Loved", "Most Hated", "Best Quote with Response"];
        let lastYear = (new Date().getFullYear()) - 1
        this.react(m, /^quote awards$/gi, 'usage: `quote awards (categories|nominate|vote)`')
        this.react(m, /^quote awards categories/gi, () => {
          message.channel.send('***QUOTE AWARD CATEGORIES for ' + lastYear + ':***');
          let response = '';
          for (let i = 1; i <= qaCategories.length; i++) {
            response += '**' + i + '.** ' + qaCategories[i - 1] + '\n';
          }
          message.channel.send(response);
        })
        this.react(m, /^quote awards nominate/gi, () => {
          this.react(m, /^quote awards nominate$/gi, 'usage: `quote awards nominate <category> <quote line from google doc>`')
          this.react(m, /^quote awards nominate [0-9]+ [0-9]+$/gi, () => {
            if (settings.quote.nominate) {
              if (this.isInPrivate(m)) {
                let qaPat = /(quote awards nominate )([0-9]+) ([0-9]+)/gi
                let qaArr = qaPat.exec(message.content)
                let qaCategory = parseInt(qaArr[2])
                let qaQuote = parseInt(qaArr[3])
                let qaPath = path.join(__dirname, '..', 'mem', 'quoteawards.json')
                if (qaCategory > 0 && qaCategory < 10) {
                  if (qaQuote > 105 && qaQuote < 394) {
                    let quoteawards = JSON.parse(fs.readFileSync(qaPath))
                    if (quoteawards[lastYear][message.author.id] == null) {
                      quoteawards[lastYear][message.author.id] = {}
                    }
                    quoteawards[lastYear][message.author.id][qaCategory] = qaQuote.toString()
                    fs.writeFile(qaPath, JSON.stringify(quoteawards), 'utf8', function (err) {
                      if (err) {
                        message.channel.send('Oops! I broke it! D:')
                        return console.log(err);
                      }
                      message.channel.send('You have voted for quote #' + qaQuote + ' for ' + qaCategories[qaCategory - 1])
                    });
                  } else {
                    message.channel.send('Incorrect quote number. Please refer to the quote list and the numbers left of it.')
                  }
                } else {
                  message.channel.send('Incorrect category number. Please refer to the list provided by `quote awards categories`.')
                }
              } else {
                this.say(m, 'Please nominate in a DM to me, cat bot!')
              }
            } else {
              this.say(m, 'You cannot nominate quotes at this time')
            }
          })
        })
        this.react(m, /^quote awards vote/gi, () => {
          this.react(m, /^quote awards vote$/gi, 'usage: `quote awards vote <category> [<quote from list>]`')
          this.react(m, /^quote awards vote [0-9]+ [0-9]+$/gi, () => {
            if (settings.quote.vote) {
              // TODO: implement this
            } else {
              this.say(m, 'You cannot vote on quotes at this time')
            }
          })
        })
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
