const solve = (target) => {
  const md5 = require('md5')
  const secretKey = require('fs').readFileSync('secret_key', 'utf8')

  const targetLength = target.length
  let i = 1
  while (md5(`${secretKey}${i}`).substring(0, targetLength) !== target) i += 1
  return i
}

console.log(`Part 1: ${solve('00000')}`)
console.log(`Part 2: ${solve('000000')}`)
