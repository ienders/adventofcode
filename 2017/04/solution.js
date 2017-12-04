const countValidPhrases = (phrases, transmute) => phrases.reduce((count, phrase) => {
  const seen = {}
  const words = phrase.split(' ')
  for (let i = 0; i < words.length; i++) {
    const match = transmute(words[i])
    if (seen[match]) return count
    seen[match] = true
  }
  return count + 1
}, 0)

const phrases = require('fs').readFileSync('input.txt', 'utf8').split("\n")

console.log('Part 1', countValidPhrases(phrases, word => word))
console.log('Part 2', countValidPhrases(phrases, word => word.split('').sort().join('')))
