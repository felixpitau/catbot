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
    return this.randomized(['\*rubs his cute cat face on you\* mow :3', ':3c', '\*bumps his face into you\*', '\*purrs\*', '\*obscenely loud purrs\*', '\*walks up to you and brushes up on your leg, purring\*'])
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
    this.react(/(\:badbanana\:|🍌)/gi, Expressions.disgust())
    this.react(/C *H *A+ *O+ *S+/g, ':rocket:')
    this.react(/cat[ -]?bot,? do my (math )?homework/gi, ['I know a bit of math, ask me to calculate something', 'Try my calculate command and I will see what I can do', 'I love doing math, please let me help'])
    this.react(/jubba jubba/gi, ['no, just you', 'just you'])
    this.react(/(i want|gimmi(e)?) (dat|that) (beef|meat|bease|beas)ball!/gi, '<:nobadcat:264224193900445697> no! You can\'t have it!')
    this.react(/(\*|\\\*)gives( cat[ -]bot| the cat)?( a)? treat( to (cat[ -]bot|the cat))?(\*|\\\*)/gi, Expressions.meow() + ' \\*eats up the treat\\*')
    this.react(/(\*|\\\*)flips? (a|the) coin(\*|\\\*)/gi, ['`you flip a coin. It is HEADS`', '`you flip a coin. It is TAILS`'])
    this.react(/(\*|\\\*)pets (the cat|cat bot|(the )?good boy|(the )?good kitty|(the )?very good kitty)(\*|\\\*)/gi, ['Pur', 'Purr', 'Purrr', 'Purrrr~', 'Purrrrr', 'Purrrrrr', 'Purrrrr~!', 'Purrurururr~', 'Purrororor...', 'Purwowa', 'Squek'])
    this.react(/(🔪|🗡)/gi, ['<:knifecat:262081040292642818>', '<:suffer:262079211290886144>'])
  }
}
