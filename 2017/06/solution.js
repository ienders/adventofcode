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

const snapshot = (state) => state.join(',')

const firstRepeat = (initialState) => {
  const snapshots = {}
  let cycles = 0
  let state = initialState
  while (true) {
    cycles += 1
    state = cycle(state)
    const key = snapshot(state)
    if (snapshots[key]) return [ cycles, state ]
    snapshots[key] = true
  }
}

const cycleToTarget = (initialState, target) => {
  const targetSnapshot = snapshot(target)
  let cycles = 0
  let state = initialState
  while (true) {
    cycles += 1
    state = cycle(state)
    if (snapshot(state) == targetSnapshot) return cycles
  }
}

const input = require('fs').readFileSync('input.txt', 'utf8').split(/\s+/).map(Number)

const repeated = firstRepeat(input)

console.log('Part 1', repeated[0])
console.log('Part 2', cycleToTarget(repeated[1], repeated[1]))
