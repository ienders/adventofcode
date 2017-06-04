const solve = (visitors) => {
  let visitedHouses = {}
  let housesGifted = 0
  let positions = {}

  const visit = (position) => {
    const key = position.join(',')
    if (!visitedHouses[key]) {
      housesGifted += 1
      visitedHouses[key] = true
    }
  }

  visitors.forEach((visitor) => {
    positions[visitor] = [ 0, 0 ]
    visit(positions[visitor])
  })

  const input = require('fs').readFileSync('input.txt', 'utf8')
  for (let i = 0; i < input.length; i++) {
    const visitor = visitors[i % visitors.length]
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

  return housesGifted
}

console.log(`Part 1: ${solve([ 'Santa' ])} houses received at least one present.`)
console.log(`Part 2: ${solve([ 'Santa', 'Robo-Santa' ])} houses received at least one present.`)
