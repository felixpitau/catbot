import Talent from '../talent'
import Rhymez from 'rhymez'

export default class Rhyme extends Talent {

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  onMessage (message) {
    let m = message
    if (!this.isFromSelf) {
      this.react(/^rhyme (.+)/gi, () => {
        let rhymez = new Rhymez()
        let rhymepat = /^rhyme (.+)/gi
        let terms = rhymepat.exec(m.content)[1].split(' ')
        for (let term in terms) {
          let t = terms[term]
          let r = this.shuffle(rhymez.rhyme(t)).slice(0, 20).join(', ')
          this.say('**Rhandom rhymes for ' + t.toUpperCase() + '**\n' + r)
        }
      })
    }
  }

}
