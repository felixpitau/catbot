import Talent from '../talent'

export default class Example extends Talent {

  // This method is triggered when a message is recieved
  onMessage (message) {
    let m = message // So we don't have to type `message` each time

    /*
    // Outputs "Meow!" in the same channel the message is recieved inspect
    // Never use this.say without an if statement or this.react. Otherwise it will loop forever
    this.say('Meow!')
    */

    /*
    // Uses a regular expression to match against the message's content
    // the second argument can be a function, string or array
    //    if a function, it will be executed upon a match
    // For more info on Regular Expressions visit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    this.react(/apple/gi, 'That is an apple!')
    this.react(/banana/gi)
    */
  }

}
