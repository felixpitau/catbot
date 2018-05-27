import Talent from '../talent'

export default class Expressions extends Talent {

  static randomized (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  static meow () {
    return this.randomized(["mew", "mow", "meow", "mrow", "mrew", "meow meow", "squek", "<:meowza:282343437263568908> \\*screams\\*", "<:yall:280549831628554240> \\*screams\\*"])
  }

  static disgust () {
    return this.randomized(['<:eugh:281915858123751425>', '<:suffer:262079211290886144>', '<:why:282346198969483264>', '<:knifecat:262081040292642818>', '<:myorg:281918808313167882>'])
  }

  static nice () {
    return this.randomized(['\*rubs his cute cat face on you\* mow :3', ':3c', '\*bumps his face into you\*', '\*purrs\*', '\*obscenely loud purrs\*', '\*walks up to you and brushes up on your leg, purring\*', '\*looks to you and slowly blinks\*', '\*rolls onto his back to expose his belly\*'])
  }

  static weird () {
    return this.randomized([Expressions.meow(), Expressions.nice(), Expressions.disgust(), '\*knocks over something from a shelf\*', '\*looks out the window, starts chattering\*', '\*does a big stretch and a big yawn\*', '\*wiggles\*', '\*catches his noodle tail with his mouth \*' + Expressions.meow()])
  }

  static offering (t) {
    let thing = {
      original: t,
      without: {
        det: (t.slice(0, 2) === 'a ' ? t.slice(2) : (t.slice(0, 4) === 'the ' ? t.slice(4) : (t.slice(0, 3) === 'an ' ? t.slice(3) : t)))
      }
    }
    if (thing.without.det === 'banana') {
      return Expressions.disgust()
    }
    if (thing.without.det === 'cucumber' || thing.without.det === 'zucchini') {
      return this.randomized(['\*jumps high into the air and runs away\*', '<:why:282346198969483264> \*cries\*', Expressions.disgust()])
    }
    return this.randomized(
      ['\*sniffs the ' + thing.without.det + '\*',
      '\*headbumps the ' + thing.without.det + '\*',
      Expressions.weird(),
      '\*jumps and runs away\*',
      '\*licks the ' + thing.without.det + '\*',
      '\*sniffs the ' + thing.without.det + ' then headbumps it\*'
    ])
  }

  onMessage (message) {
    this.react(/(cat[ -]?bot)/gi, () => {
      this.react(/say meow/gi, Expressions.meow())
      this.react(/(a )?goo+d (boy|girl|cat|kitty)/gi, Expressions.nice())
      this.react(/(how|what) do you (really )?(feel|think) (of|about)/gi, () => {
        this.react(/dog/gi, 'Hurr durr durr ima dog! http://i.imgur.com/IDYevDg.gif')
        this.react(/sock/gi, 'Blarrnaldkfjglks! https://31.media.tumblr.com/256bff810c7fdacc98e03d97260c5c5c/tumblr_inline_nagb4bbbI51re1lpn.gif')
        this.react(/(shower|bath ?time|baths)/gi, ':C https://i.redd.it/d6zn9zpplkky.jpg')
        this.react(/surprise/gi, 'https://68.media.tumblr.com/fdbeac84506bb34d944388bd1d46b40f/tumblr_onadogjcrX1uuyy36o1_400.gif')
      })
      this.react(/what is your favorite christmas song?/gi, '♫♪ https://www.youtube.com/watch?v=LUoDmRM2aJ0 ♫')
    })
    if (!this.isFromSelf) {
      this.react(/\:ohno\:/gi, 'https://68.media.tumblr.com/fdbeac84506bb34d944388bd1d46b40f/tumblr_onadogjcrX1uuyy36o1_400.gif')
    }
    this.react(/(\:badbanana\:|🍌)/gi, Expressions.disgust())
    this.react(/C *H *A+ *O+ *S+/g, ':rocket:')
    this.react(/cat[ -]?bot,? do my (math )?homework/gi, ['I know a bit of math, ask me to calculate something', 'Try my calculate command and I will see what I can do', 'I love doing math, please let me help'])
    this.react(/jubba jubba/gi, ['no, just you', 'just you'])
    this.react(/(i want|gimmi(e)?) (dat|that) (beef|meat|bease|beas)ball!/gi, '<:nobadcat:264224193900445697> no! You can\'t have it!')
    this.react(/(\*|\\\*)gives( cat[ -]bot| the cat)?( a)? treat( to (cat[ -]bot|the cat))?(\*|\\\*)/gi, Expressions.meow() + ' \\*eats up the treat\\*')
    this.react(/(\*|\\\*)flips? (a|the) coin(\*|\\\*)/gi, ['`you flip a coin. It is HEADS`', '`you flip a coin. It is TAILS`'])
    this.react(/(\*|\\\*)pets (the cat|cat ?bot|(the )?good boy|(the )?good kitty|(the )?very good kitty)(\*|\\\*)/gi, ['Pur', 'Purr', 'Purrr', 'Purrrr~', 'Purrrrr', 'Purrrrrr', 'Purrrrr~!', 'Purrurururr~', 'Purrororor...', 'Purwowa', 'Squek'])
    this.react(/(\*|\\\*)(points at (cat ?bot|the cat))(\*|\\\*)/gi, Expressions.weird())
    this.react(/(🔪|🗡)/gi, ['<:knifecat:262081040292642818>', '<:suffer:262079211290886144>'])
    let offerPat = /(\*|\\\*)(offers|gives) ([a-z\' \.\!\?]+) to (cat ?bot|the cat)(\*|\\\*)/gi
    this.react(offerPat, () => {
      let offerRes = offerPat.exec(message.content)
      this.say(Expressions.offering(offerRes[3]))
    })
    let offerTwoPat = /(\*|\\\*)(offers|gives) (cat ?bot|the cat) ([a-z\' \.\!\?]+)(\*|\\\*)/gi
    this.react(offerTwoPat, () => {
      let offerRes = offerTwoPat.exec(message.content)
      this.say(Expressions.offering(offerRes[4]))
    })
    this.react(/O+H+ *N+O+ *!*/g, 'https://cdn.discordapp.com/attachments/135149561420185600/434023786489184275/OHNO.gif')
    this.react(/O+H+ *M+Y+ *G+O+D+ *!*/g, 'https://cdn.discordapp.com/attachments/135149561420185600/431286080260669440/OHMYGOD.gif')
    this.react(/H+O+L+Y+ *S+H+I+T+ *!*/g, 'https://cdn.discordapp.com/attachments/135149561420185600/431286339070197760/HOLYSHIT.gif')
    this.react(/i *refuse/gi, 'https://gfycat.com/ReadyEcstaticHamadryas')
    this.react(/act *3.*/gi, 'https://gfycat.com/LateFalseDorado')
    this.react(/s-h-i-t/gi, 'https://cdn.discordapp.com/attachments/362059928292294660/437719810785411094/1524430919455910.gif')
  }
}
