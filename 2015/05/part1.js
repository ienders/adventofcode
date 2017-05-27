const HAS_AT_LEAST_THREE_VOWELS = /([aeiou].*){3}/
const HAS_CONSECUTIVE_CHARACTERS = /(.)\1+/
const HAS_BAD_THINGS = /(ab)|(cd)|(pq)|(xy)/

const stringIsNice = (str) => {
  return str.match(HAS_AT_LEAST_THREE_VOWELS) &&
      str.match(HAS_CONSECUTIVE_CHARACTERS) &&
      !str.match(HAS_BAD_THINGS)
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
