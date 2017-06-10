const solve = (input, times) => {
  let saying = input
  for (let i = 0; i < times; i++) {
    let next = ''
    let prevChar = saying.charAt(0)
    let count = 1
    for (let c = 1; c < saying.length; c++) {
      const currChar = saying.charAt(c)
      if (currChar === prevChar) {
        count += 1
      } else {
        next += `${count}${prevChar}`
        prevChar = currChar
        count = 1
      }
    }
    saying = next + `${count}${prevChar}`
  }
  return saying.length
}

const input = require('fs').readFileSync('input.txt', 'utf8')

console.log('Part 1', solve(input, 40))
console.log('Part 2', solve(input, 50))
