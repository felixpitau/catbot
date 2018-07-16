import Talent from '../talent'
import Calculate from './calculate'

export default class Motw extends Talent {

  get path () {
    return path.join(__dirname, '..', 'mem', 'tt.json')
  }

  load () {
    let data = JSON.parse(fs.readFileSync(this.path))
    this.data = data
    return data
  }

  save (update = {}) {
    let data = this.data
    data = Object.assign(data, update)
    fs.writeFile(this.path, JSON.stringify(data), 'utf8', function (err) {
      if (err) {
        this.message.channel.send('Oops! Something went wrong! D:')
        return console.log(err);
      }
    });
  }

  onMessage (message) {
    this.react(/$tt/gi, () => {
      this.react(/$tt character/gi, () => {
        this.react(/$tt character help^/gi, 'usage: `motw character (create|moves|remove|switch to) [help]`')

        this.react(/$tt character create/gi, () => {
          this.react(/$tt character create help^/gi, 'usage: `motw character create <full name> the <profession>`')
          this.react(/$tt character create (.+) the (.+)^/gi, () => {
            this.data[]
          })
        })
      })
    })
    this.react(/$> (.+)/gi, () => {
      
      //Calculate.calculate()
    })
  }

}
