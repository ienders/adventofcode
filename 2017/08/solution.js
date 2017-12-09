const comparators = {
  '>': (a, b) => a > b,
  '<': (a, b) => a < b,
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '==': (a, b) => a === b,
  '!=': (a, b) => a !== b
}

const operators = {
  'inc': (a, b) => a + b,
  'dec': (a, b) => a - b
}

const solve = () => {
  const registers = {}
  let max = 0

  const registerValue = (name) => {
    if (typeof registers[name] !== 'undefined') return registers[name]
    return registers[name] = 0
  }

  input.forEach(instruction => {
    const [ operation, condition ] = instruction.split(" if ")
    let [ resultreg, op, amount ] = operation.split(" ")
    let [ checkreg, cmp, value ] = condition.split(" ")
    amount = parseInt(amount)
    value = parseInt(value)
    const passed = comparators[cmp](registerValue(checkreg), value)
    if (passed) {
      registers[resultreg] = operators[op](registerValue(resultreg), amount)
      if (registers[resultreg] > max) max = registers[resultreg]
    }
  })

  return [
    Object.values(registers).reduce((a, b) => Math.max(a, b)),
    max
  ]
}

const input = require('fs').readFileSync('input.txt', 'utf8').split("\n")
const solution = solve(input)

console.log('Part 1', solution[0])
console.log('Part 2', solution[1])
