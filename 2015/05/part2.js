const HAS_REPEATING_PAIRS = /(..).*\1/
const HAS_REPEATED_LETTERS_INTERJECTED = /(.).\1/

const stringIsNice = (str) => {
  return str.match(HAS_REPEATING_PAIRS) && str.match(HAS_REPEATED_LETTERS_INTERJECTED)
}

const input = require('fs').createReadStream('input.txt')
const reader = require('readline').createInterface({ input })

let niceStrings = 0

reader.on('line', (line) => {
  if (stringIsNice(line)) { niceStrings += 1 }
})

reader.on('close', () => {
  console.log(`${niceStrings} strings on Santa's list are nice.`)
})
