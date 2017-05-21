const readline = require('readline')
const fs = require('fs')

let total = 0

const processLine = (line) => {
  total += squareFeetNeeded(parseLine(line))
}

const parseLine = (line) => {
  return line.split('x').map((sideLength) => parseInt(sideLength, 10))
}

const squareFeetNeeded = (sideLengths) => {
  // Since we're sorting, we know that the smallest side will be
  // the multiplication of the first two entries, so we can just
  // take three of those and call it a day instead of trying to do
  // any min-maxing.
  // Our formula then becomes 3x smallest side + 2x next side + 2x last side.
  sideLengths.sort((a, b) => a - b)

  return 3 * sideLengths[0] * sideLengths[1]
       + 2 * sideLengths[1] * sideLengths[2]
       + 2 * sideLengths[2] * sideLengths[0]
}

const report = () => {
  console.log(`The elves need ${total} square feet of wrapping paper.`)
}

const input = fs.createReadStream('input.txt')
const reader = readline.createInterface({ input })

reader.on('line', processLine)
reader.on('close', report)
