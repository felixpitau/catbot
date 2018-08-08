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
	this.react(/AAAAAAA+/g, 'https://cdn.discordapp.com/attachments/362059928292294660/468560120541085697/MQFeTXV.jpg')
	this.react(/Y+E+S+!+( *Y+E+S+!+)*/g, 'https://cdn.discordapp.com/attachments/362059928292294660/468561440286965791/Qgl3Q2K.gif')
	this.react(/N+O+!+( *N+O+!+)*/g, 'https://thumbs.gfycat.com/MerryHeftyGavial-size_restricted.gif')
	this.react(/eat *shit!*/gi, 'https://cdn.discordapp.com/attachments/362059928292294660/468561766088179713/Eat_Shit.png')
	this.react(/that'?s *bullshit/gi, 'https://cdn.discordapp.com/attachments/362059928292294660/468565634142437386/5ca.jpg')
	this.react(/duwang/gi, 'https://cdn.discordapp.com/attachments/362059928292294660/468566055900676096/duwang_1.jpg')
	this.react(/it was me/gi, 'https://cdn.discordapp.com/attachments/362059928292294660/468567076986945536/566.gif')
	this.react(/w+r+y+!*/gi, 'https://cdn.discordapp.com/attachments/362059928292294660/468567308139233282/wry.gif')
	this.react(/D+I+O+!*/g, ['https://cdn.discordapp.com/attachments/362059928292294660/468568193464664103/DioBPflww.png', 'https://cdn.discordapp.com/attachments/362059928292294660/468568723175899138/16d1efc40b9daa76cda63e70d8bbf90cac6e3f30_00.jpg', 'https://cdn.discordapp.com/attachments/362059928292294660/468568738703081476/DioP2.png', 'https://cdn.discordapp.com/attachments/362059928292294660/468568932249370636/download.jpg', 'https://cdn.discordapp.com/attachments/362059928292294660/468568946946211840/tenor.gif', 'https://cdn.discordapp.com/attachments/362059928292294660/468568956060434442/images.jpg', 'https://cdn.discordapp.com/attachments/362059928292294660/468567076986945536/566.gif', 'https://cdn.discordapp.com/attachments/362059928292294660/468567308139233282/wry.gif', 'https://cdn.discordapp.com/attachments/362059928292294660/468570220630376469/DOrFwp.gif'])
	this.react(/(THE +WO+RLD!*)|(ZA +WA+RUDO!*)/g, 'https://cdn.discordapp.com/attachments/362059928292294660/468570220630376469/DOrFwp.gif')
	this.react(/ora!*( *ora!*)+/gi, ['https://i.imgur.com/1wb4XCj.gif', 'https://cdn.discordapp.com/attachments/362059928292294660/468849400802705419/34b.png'])
	this.react(/dora(ra)+!*/gi, 'https://cdn.discordapp.com/attachments/362059928292294660/468848264121417738/dorara.gif')
	this.react(/muda!*( *muda!*)+/gi, 'https://78.media.tumblr.com/96f94d4dd2d9c0ecdcdce22ba9eec664/tumblr_inline_orav20Vs1H1s8a2ua_540.png')
	this.react(/yare *yare( *daze).*/gi, 'https://thumbs.gfycat.com/ImaginaryDeadGlobefish-size_restricted.gif')
	this.react(/nyo!*( *ho!*)+/gi, 'https://thumbs.gfycat.com/ImaginaryDeadGlobefish-size_restricted.gif')
	this.react(/ari!*( *ari!*)+/gi, 'https://i.ytimg.com/vi/QCFu_6NeWDk/hqdefault.jpg')
	this.react(/arrivederci!*/gi, 'https://pm1.narvii.com/5973/b8abff913124a489b3b4c8b13c2f4cacb542302c_hq.jpg')
	this.react(/vola!*( *vola!*)+/gi, 'https://scontent-frt3-2.cdninstagram.com/vp/d83c6b2db1cab0b8a968dbab88a8b266/5BE5738C/t51.2885-15/sh0.08/e35/s640x640/36159609_1888650664488380_410052364678987776_n.jpg')
	this.react(/pass!* *pass!*( *pass!*)+/gi, 'https://vignette.wikia.nocookie.net/jjba/images/c/ca/SexPistols_ASB.jpg')
	this.react(/eme(l|r)a(l|r)u?do? *su?pu?(l|r)ashu?!*/gi, 'https://vignette.wikia.nocookie.net/powerlisting/images/8/81/Hierophant_Green%27s_Emerald_Splash%21%21%21%21_JoJo.gif/revision/latest?cb=20180412154853')
	this.react(/true +man'?s +world/gi, 'https://i.kym-cdn.com/photos/images/original/000/815/300/f43.png')
    this.react(/🤚/g, '<:screaming:325097530943602709>')
  }
}
