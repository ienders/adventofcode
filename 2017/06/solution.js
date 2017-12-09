const cycle = state => {
  const next = [ ...state ]
  let toRedistribute = state.reduce((a, b) => Math.max(a, b))
  let index = state.indexOf(toRedistribute)
  next[index] = 0
  while (toRedistribute > 0) {
    index = (index + 1) % state.length
    next[index] += 1
    toRedistribute -= 1
  }
  return next
}

const solve = initialState => {
  const snapshots = {}
  let cycles = 0
  let state = initialState
  while (true) {
    cycles += 1
    state = cycle(state)
    const key = state.join(',')
    const found = snapshots[key]
    if (found) return [ cycles, cycles - found ]
    snapshots[key] = cycles
  }
}

const input = require('fs').readFileSync('input.txt', 'utf8').split(/\s+/).map(Number)

const solution = solve(input)
console.log('Part 1', solution[0])
console.log('Part 2', solution[1])
