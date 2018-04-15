import Talent from '../talent'

export default class MagicConch extends Talent {
  onMessage (message) {
    let m = message
    this.react(/^magic ?(conch|shell|conch shell),? ?(should).+( or ).+\??/gi, () => {
      let prompt = /^(magic ?(conch|shell|conch shell),? ?(should)) (.+)\?/gi
      let prpt = prompt.exec(message.content)
      let choices = prpt[4].split(/,\s|\sor\s/i)
      let who = prpt[4].split(/\s/i)[0]
      let choice = choices[Math.floor(Math.random() * choices.length)]
      choice = choice.replace(/[\s^]your[\s\.$]/gi, ' <my> ')
      choice = choice.replace(/[\s^]my[\s\.$]/gi, ' your ')
      choice = choice.replace(/[\s^]<my>[\s\.$]/gi, ' my ')
      choice = choice.replace(/[\s^]you[\s\.$]/gi, ' <me> ')
      choice = choice.replace(/[\s^]me[\s\.$]/gi, ' you ')
      choice = choice.replace(/[\s^]<me>[\s\.$]/gi, ' me ')
      choice = choice.replace(/[\s^]yourself[\s\.$]/gi, ' <myself> ')
      choice = choice.replace(/[\s^]myself[\s\.$]/gi, ' yourself ')
      choice = choice.replace(/[\s^]<myself>[\s\.$]/gi, ' myself ')
      let responces = [
        ":shell: " + (who == "i" || who == "I" ? "You" : who) + " shouldn't do " + (choices.length > 2 ? 'any' : 'either') + " of those things~",
        ":shell: " + (who == "i" || who == "I" ? "You" : who) + " should do " + (choices.length > 2 ? 'all' : 'both') + " of those things~",
        ":shell: I recommend " + (who == "i" || who == "I" ? "you" : who) + " " + choice + "~",
        ":shell: I think " + (who == "i" || who == "I" ? "you" : who) + " " + choice + "~",
        ":shell: I ***INSIST*** " + (who == "i" || who == "I" ? "you" : who) + " " + choice + "~",
        ":shell: I highly recommend " + (who == "i" || who == "I" ? "you" : who) + " " + choice + "~",
        ":shell: " + (who == "i" || who == "I" ? "You" : who) + " should " + choice + "~",
        ":shell: " + choice + "~",
        ":shell: " + choice + " is the best option of those" + (choices.length === 2 ? ' two' : (choices.length === 3 ? ' three' : '')) + "~",
        ":shell: Go with " + choice + ". It is the best option~",
        ":shell: If you're not going to go with " + choice + " then you have my sympathy~",
        ":shell: " + choice.toUpperCase() + "~",
        ":shell: " + (who == "i" || who == "I" ? "You" : who) + " shouldn't " + choice + " at least~",
        ':shell: Try asking again~']
      this.say(responces)
    }, () => {
      this.react(/magic (conch|shell|conch shell),.+\??/gi, () => {
        this.say([':shell: No~', ':shell: No~', ':shell: No~', ':shell: No~', ':shell: No~', ':shell: No~', ':shell: Yes~', ':shell: Yes~', ':shell: Yes~',':shell: Yes~', ':shell: Yes~', ':shell: Yes~', ':shell: Maybe someday~', ':shell: Try asking again~'])
      })
    })
  }
}
