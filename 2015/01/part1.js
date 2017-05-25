const fs = require('fs')

let floor = 0
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
}

console.log(`Santa is on floor ${floor}`)
