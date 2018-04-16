import Talent from '../talent'

export default class Example extends Talent {

  constructor (name) {
    super(name)

    this.doNotLike = ''
  }

  // This method is triggered when a message is recieved
  onMessage (message) {
    let m = message // So we don't have to type `message` each time

    /*
    // Outputs "Meow!" in the same channel the message is recieved inspect
    // Never use this.say without an if statement or this.react. Otherwise it will loop forever
    */
    this.say('Meow!')

    // Output to a particular channel
    // general, animals, memes, cursed, interesting, music, lair and "like this"
    this.sayIn('lair', 'Meow! (in the lair)')

    /*
    // Uses a regular expression to match against the message's content
    // the second argument can be a function, string or array
    //    as a function, it will be executed upon a match
    //    as a string it will be output in the same channel
    //    as an array it will randomly choose a string from the array to output to the same channel
    // an optional third argument can be used the same way but is triggered when the text does not match
    // For more info on Regular Expressions visit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    */

    this.react(/apple/gi, 'That is an apple!')
    this.react(/banana/gi, ['That is a banana!', 'I do not like the banana!'])
    this.react(/banana banana/gi, () => {
      this.say('I really do not like that banana, I do not like you now!')
      this.doNotLike = m.author.id // record user id
    })

    /*
    // A talent has some built in conditions
    */

    if (this.isInPrivate) {
      this.say('You just sent a PM to catbot!')
    }

    if (this.isInPublic) {
      this.say('You said something in the public chat!')
    }

    if (this.isFrom('carson')) {
      this.say('A message from Carson! *gasp*')
    }
  }

}
