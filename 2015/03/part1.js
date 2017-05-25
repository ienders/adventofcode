const fs = require('fs')

let visitedHouses = {}
let housesGifted = 0

const visit = (position) => {
  const key = `${position[0]}@${position[1]}`
  if (!visitedHouses[key]) {
    housesGifted += 1
    visitedHouses[key] = true
  }
}

let input = fs.readFileSync('input.txt', 'utf8')
let santaPosition = [ 0, 0 ]

visit(santaPosition)

for (let i = 0; i < input.length; i++) {
  switch(input.charAt(i)) {
    case '^':
      santaPosition[0] += 1
      break
    case '<':
      santaPosition[1] -= 1
      break
    case '>':
      santaPosition[1] += 1
      break
    case 'v':
      santaPosition[0] -= 1
      break
  }
  visit(santaPosition)
}

console.log(`Santa gifted at least one present to ${housesGifted} houses.`)
