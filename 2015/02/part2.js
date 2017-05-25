const readline = require('readline')
const fs = require('fs')

let total = 0

const processLine = (line) => {
  total += ribbonNeeded(parseLine(line))
}

const parseLine = (line) => {
  return line.split('x').map((sideLength) => parseInt(sideLength, 10))
}

const ribbonNeeded = (sideLengths) => {
  // Like the previous solution, sorting makes this pretty simple.
  // We take 2x the shortest two sides plus the volume.
  sideLengths.sort((a, b) => a - b)
  return 2 * sideLengths[0]
       + 2 * sideLengths[1]
       + sideLengths[0] * sideLengths[1] * sideLengths[2]
}

const report = () => {
  console.log(`The elves need ${total} feet of ribbon.`)
}

const input = fs.createReadStream('input.txt')
const reader = readline.createInterface({ input })

reader.on('line', processLine)
reader.on('close', report)
