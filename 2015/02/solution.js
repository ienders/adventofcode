let totalWrappingPaper = 0
let totalRibbon = 0

const processLine = (line) => {
  const sideLengths = parseLine(line)
  totalWrappingPaper += squareFeetNeeded(sideLengths)
  totalRibbon += ribbonNeeded(sideLengths)
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

const ribbonNeeded = (sideLengths) => {
  // Like the wrapping paper solution, sorting makes this pretty simple.
  // We take 2x the shortest two sides plus the volume.
  sideLengths.sort((a, b) => a - b)
  return 2 * sideLengths[0]
       + 2 * sideLengths[1]
       + sideLengths[0] * sideLengths[1] * sideLengths[2]
}

const report = () => {
  console.log(`Part 1: The elves need ${totalWrappingPaper} square feet of wrapping paper.`)
  console.log(`Part 2: The elves need ${totalRibbon} feet of ribbon.`)
}

require('readline').
    createInterface({ input: require('fs').createReadStream('input.txt') }).
    on('line', processLine).
    on('close', report)
