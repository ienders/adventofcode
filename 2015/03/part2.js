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
let positions = { santa: [ 0, 0 ], roboSanta: [ 0, 0 ] }

visit(positions.santa)

// Not technically needed for our algorithm, but if visits were
// to have more side effects this would be more likely to be future-proof.
visit(positions.roboSanta)

for (let i = 0; i < input.length; i++) {
  const visitor = i % 2 == 1 ? 'santa' : 'roboSanta'
  switch(input.charAt(i)) {
    case '^':
      positions[visitor][0] += 1
      break
    case '<':
      positions[visitor][1] -= 1
      break
    case '>':
      positions[visitor][1] += 1
      break
    case 'v':
      positions[visitor][0] -= 1
      break
  }
  visit(positions[visitor])
}

console.log(`${housesGifted} houses received at least one present.`)
