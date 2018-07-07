import Calculate from './talents/calculate'
import Expressions from './talents/expressions'
import MagicConch from './talents/magicconch'
import Quotes from './talents/quotes'
import Imagine from './talents/imagine'
import Rhyme from './talents/rhyme'

export default [
  new Calculate('calculate'),
  new Expressions('expressions'),
  new MagicConch('magicconch'),
  new Quotes('quotes'),
  new Imagine('imagine'),
  new Rhyme('rhyme')
]
