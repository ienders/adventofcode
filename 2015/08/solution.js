let stringCharacters = 0
let codeCharacters = 0
let encodedCharacters = 0

const processLine = (line) => {
  codeCharacters += line.length
  stringCharacters += eval(line).length
  encodedCharacters += `"${line.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')}"`.length
}

const report = () => {
  console.log(`Part 1: ${codeCharacters - stringCharacters}`)
  console.log(`Part 2: ${encodedCharacters - codeCharacters}`)
}

require('readline').
    createInterface({ input: require('fs').createReadStream('input.txt') }).
    on('line', processLine).
    on('close', report)
