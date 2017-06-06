const HAS_AT_LEAST_THREE_VOWELS = /([aeiou].*){3}/
const HAS_CONSECUTIVE_CHARACTERS = /(.)\1+/
const HAS_BAD_THINGS = /(ab)|(cd)|(pq)|(xy)/
const HAS_REPEATING_PAIRS = /(..).*\1/
const HAS_REPEATED_LETTERS_INTERJECTED = /(.).\1/

const solve = (niceMatcher) => {
  let niceStrings = 0

  const processLine = (line) => {
    if (niceMatcher(line)) niceStrings += 1
  }

  const report = () => {
    console.log(`${niceStrings} strings on Santa's list are nice.`)
  }

  require('readline').
      createInterface({ input: require('fs').createReadStream('input.txt') }).
      on('line', processLine).
      on('close', report)
}

solve((str) => (
  str.match(HAS_AT_LEAST_THREE_VOWELS) &&
    str.match(HAS_CONSECUTIVE_CHARACTERS) &&
    !str.match(HAS_BAD_THINGS)
))

solve((str) => (
  str.match(HAS_REPEATING_PAIRS) && str.match(HAS_REPEATED_LETTERS_INTERJECTED)
))
