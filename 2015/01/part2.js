const fs = require('fs')

let floor = 0
let basementHit = false
let input = fs.readFileSync('input.txt', 'utf8')
for (let i = 0; i < input.length; i++) {
  switch(input.charAt(i)) {
    case '(':
      floor += 1
      break
    case ')':
      floor -= 1
      break
  }
  if (floor < 0 && !basementHit) {
    console.log(`Santa first hit the basement at position ${i + 1}`)
    basementHit = true
  }
}

console.log(`Santa ends on floor ${floor}`)
